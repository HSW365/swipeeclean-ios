import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
// import { setupAuth, isAuthenticated } from "./replitAuth"; // REMOVED - DIRECT ACCESS

export async function registerRoutes(app: Express): Promise<Server> {
  // NO AUTH SETUP - DIRECT ACCESS TO ALL FEATURES

  // Mock user route - no authentication required
  app.get('/api/auth/user', async (req: any, res) => {
    // Return mock user for public access
    res.json({
      id: "swipeeclean-user",
      email: "user@swipeeclean.com",
      firstName: "SwipeeClean",
      lastName: "User",
      isFounder: false,
      hasSubscription: false
    });
  });

  // Storage analysis routes - public access
  app.get('/api/storage/analysis', async (req: any, res) => {
    try {
      const userId = "swipeeclean-user"; // Use public user ID
      
      let analysis = await storage.getStorageAnalysis(userId);
      
      // Create mock analysis if none exists
      if (!analysis) {
        const mockAnalysis = {
          userId,
          totalStorage: 64000, // 64GB
          usedStorage: 54400, // ~85% used
          photosSize: 15200, // 15.2GB
          downloadsSize: 3400, // 3.4GB
          cacheSize: 2100, // 2.1GB
          musicSize: 1800, // 1.8GB
          duplicatePhotos: 2847,
          oldDownloads: 156,
        };
        analysis = await storage.createStorageAnalysis(mockAnalysis);
      }
      
      res.json(analysis);
    } catch (error) {
      console.error("Error fetching storage analysis:", error);
      res.status(500).json({ message: "Failed to fetch storage analysis" });
    }
  });

  // Cleaning recommendations routes - public access
  app.get('/api/cleaning/recommendations', async (req: any, res) => {
    try {
      const userId = "swipeeclean-user"; // Use public user ID
      let recommendations = await storage.getCleaningRecommendations(userId);
      
      // Create mock recommendations if none exist
      if (recommendations.length === 0) {
        const mockRecommendations = [
          {
            userId,
            type: 'duplicate_photos',
            title: 'Duplicate Photos',
            description: 'These photos appear to be duplicates or very similar. Removing them will free up significant space.',
            sizeInMB: 2300,
            fileCount: 2847,
            priority: 5,
          },
          {
            userId,
            type: 'old_downloads',
            title: 'Old Downloads',
            description: 'Files downloaded more than 6 months ago that you might not need anymore.',
            sizeInMB: 1100,
            fileCount: 156,
            priority: 4,
          },
          {
            userId,
            type: 'cache_files',
            title: 'App Cache Files',
            description: 'Temporary files from apps that can be safely removed to free up space.',
            sizeInMB: 956,
            fileCount: 1203,
            priority: 3,
          },
          {
            userId,
            type: 'music_cache',
            title: 'Music Cache',
            description: 'Offline music content that can be re-downloaded if needed.',
            sizeInMB: 734,
            fileCount: 89,
            priority: 2,
          },
        ];
        recommendations = await storage.createCleaningRecommendations(mockRecommendations);
      }
      
      res.json(recommendations);
    } catch (error) {
      console.error("Error fetching cleaning recommendations:", error);
      res.status(500).json({ message: "Failed to fetch cleaning recommendations" });
    }
  });

  // Update recommendation status - public access
  app.patch('/api/cleaning/recommendations/:id', async (req: any, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!['deleted', 'kept', 'skipped'].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      
      const recommendation = await storage.updateRecommendationStatus(id, status);
      res.json(recommendation);
    } catch (error) {
      console.error("Error updating recommendation:", error);
      res.status(500).json({ message: "Failed to update recommendation" });
    }
  });

  // Cleaning session routes - public access
  app.get('/api/cleaning/session', async (req: any, res) => {
    try {
      const userId = "swipeeclean-user";
      const session = await storage.getCurrentCleaningSession(userId);
      res.json(session);
    } catch (error) {
      console.error("Error fetching cleaning session:", error);
      res.status(500).json({ message: "Failed to fetch cleaning session" });
    }
  });

  app.post('/api/cleaning/session', async (req: any, res) => {
    try {
      const userId = "swipeeclean-user";
      const recommendations = await storage.getCleaningRecommendations(userId);
      
      const newSession = {
        userId,
        totalItems: recommendations.length,
        processedItems: 0,
        deletedItems: 0,
        keptItems: 0,
        spaceSavedMB: 0,
        status: 'active' as const,
      };
      
      const session = await storage.createCleaningSession(newSession);
      res.json(session);
    } catch (error) {
      console.error("Error creating cleaning session:", error);
      res.status(500).json({ message: "Failed to create cleaning session" });
    }
  });

  app.patch('/api/cleaning/session/:id', async (req: any, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const session = await storage.updateCleaningSession(id, updates);
      res.json(session);
    } catch (error) {
      console.error("Error updating cleaning session:", error);
      res.status(500).json({ message: "Failed to update cleaning session" });
    }
  });

  // PayPal hosted buttons - no server routes needed

  // Quick subscribe route (demo mode)
  app.post('/api/quick-subscribe', async (req: any, res) => {
    try {
      const userId = "public-user";
      
      // Update user as subscribed
      await storage.upsertUser({
        id: userId,
        isSubscribed: true
      });

      res.json({
        success: true,
        message: "Successfully subscribed to SwipeeClean Pro",
      });
    } catch (error: any) {
      console.error("Quick subscription error:", error);
      res.status(400).json({ error: { message: error.message } });
    }
  });

  // Media organization routes
  app.post('/api/media/organize', async (req: any, res) => {
    try {
      const userId = "public-user";
      
      // Create default media folders for the user
      const photoFolder = await storage.createMediaFolder({
        userId,
        name: 'Photos',
        type: 'photos',
        path: '/organized/photos',
        itemCount: 1250,
        totalSize: 3200000000, // 3.2GB
      });

      const videoFolder = await storage.createMediaFolder({
        userId,
        name: 'Videos', 
        type: 'videos',
        path: '/organized/videos',
        itemCount: 87,
        totalSize: 15800000000, // 15.8GB
      });

      res.json({ 
        message: 'Media organization completed successfully',
        foldersCreated: 2,
        itemsProcessed: 1337
      });
    } catch (error: any) {
      console.error("Media organization error:", error);
      res.status(500).json({ message: "Failed to organize media" });
    }
  });

  app.get('/api/media/folders', async (req: any, res) => {
    try {
      const userId = "public-user";
      const folders = await storage.getMediaFolders(userId);
      res.json(folders);
    } catch (error: any) {
      console.error("Error fetching media folders:", error);
      res.status(500).json({ message: "Failed to fetch media folders" });
    }
  });

  app.post('/api/media/export', async (req: any, res) => {
    try {
      const userId = "public-user";
      const { folderIds, destination } = req.body;

      if (!folderIds || !Array.isArray(folderIds) || folderIds.length === 0) {
        return res.status(400).json({ message: "Folder IDs are required" });
      }

      // Get folders and calculate totals
      const folders = await storage.getMediaFolders(userId);
      const selectedFolders = folders.filter(f => folderIds.includes(f.id));
      
      const totalItems = selectedFolders.reduce((sum, folder) => sum + (folder.itemCount || 0), 0);
      const totalSize = selectedFolders.reduce((sum, folder) => sum + (folder.totalSize || 0), 0);

      const exportSession = await storage.createExportSession({
        userId,
        folderIds,
        exportPath: destination === 'external' ? '/external-drive/SwipeClean-Export' : '/downloads/SwipeClean-Export',
        status: 'pending',
        totalItems,
        processedItems: 0,
        totalSize,
      });

      // Simulate export processing
      setTimeout(async () => {
        try {
          await storage.updateExportSession(exportSession.id!, {
            status: 'processing',
            processedItems: Math.floor(totalItems * 0.3),
          });

          setTimeout(async () => {
            await storage.updateExportSession(exportSession.id!, {
              status: 'completed',
              processedItems: totalItems,
              completedAt: new Date(),
            });
          }, 5000);
        } catch (error) {
          console.error("Export simulation error:", error);
        }
      }, 2000);

      res.json({
        message: 'Export started successfully',
        sessionId: exportSession.id,
        totalItems,
        totalSize,
      });
    } catch (error: any) {
      console.error("Export error:", error);
      res.status(500).json({ message: "Failed to start export" });
    }
  });

  app.get('/api/media/exports', async (req: any, res) => {
    try {
      const userId = "public-user";
      const exports = await storage.getExportSessions(userId);
      res.json(exports);
    } catch (error: any) {
      console.error("Error fetching export sessions:", error);
      res.status(500).json({ message: "Failed to fetch export sessions" });
    }
  });

  // Spam blocking routes
  app.get('/api/spam/numbers', async (req: any, res) => {
    try {
      const userId = "public-user";
      const spamNumbers = await storage.getSpamNumbers(userId);
      res.json(spamNumbers);
    } catch (error: any) {
      console.error("Error fetching spam numbers:", error);
      res.status(500).json({ message: "Failed to fetch spam numbers" });
    }
  });

  app.post('/api/spam/numbers', async (req: any, res) => {
    try {
      const userId = "public-user";
      const { phoneNumber, type, category, notes } = req.body;
      
      if (!phoneNumber || !type || !category) {
        return res.status(400).json({ message: "Phone number, type, and category are required" });
      }

      const spamNumber = await storage.createSpamNumber({
        userId,
        phoneNumber: phoneNumber.replace(/\D/g, ''),
        type,
        category,
        notes: notes || null,
        isBlocked: true,
        reportCount: 1,
        lastActivity: new Date(),
      });

      res.json(spamNumber);
    } catch (error: any) {
      console.error("Error creating spam number:", error);
      res.status(500).json({ message: "Failed to block number" });
    }
  });

  app.patch('/api/spam/numbers/:id/toggle', async (req: any, res) => {
    try {
      const { id } = req.params;
      const userId = "public-user";
      
      // Get current spam number to toggle its status
      const spamNumbers = await storage.getSpamNumbers(userId);
      const spamNumber = spamNumbers.find(n => n.id === id);
      
      if (!spamNumber) {
        return res.status(404).json({ message: "Spam number not found" });
      }

      const updated = await storage.updateSpamNumber(id, {
        isBlocked: !spamNumber.isBlocked,
      });

      res.json(updated);
    } catch (error: any) {
      console.error("Error toggling spam number:", error);
      res.status(500).json({ message: "Failed to update spam number" });
    }
  });

  app.post('/api/spam/reports', async (req: any, res) => {
    try {
      const userId = "public-user";
      const { phoneNumber, reportType, content, severity } = req.body;
      
      if (!phoneNumber || !reportType) {
        return res.status(400).json({ message: "Phone number and report type are required" });
      }

      const report = await storage.createSpamReport({
        userId,
        phoneNumber: phoneNumber.replace(/\D/g, ''),
        reportType,
        content: content || null,
        severity: severity || 'medium',
        isShared: true,
      });

      // Also create a blocked number entry if it doesn't exist
      const spamNumbers = await storage.getSpamNumbers(userId);
      const existingNumber = spamNumbers.find(n => n.phoneNumber === phoneNumber.replace(/\D/g, ''));
      
      if (!existingNumber) {
        await storage.createSpamNumber({
          userId,
          phoneNumber: phoneNumber.replace(/\D/g, ''),
          type: reportType.includes('text') ? 'texts' : 'calls',
          category: reportType === 'scam' ? 'scam' : 'telemarketer',
          isBlocked: true,
          reportCount: 1,
          lastActivity: new Date(),
        });
      }

      res.json(report);
    } catch (error: any) {
      console.error("Error creating spam report:", error);
      res.status(500).json({ message: "Failed to report spam" });
    }
  });

  app.get('/api/spam/blocked-calls', async (req: any, res) => {
    try {
      const userId = "public-user";
      const blockedCalls = await storage.getBlockedCalls(userId);
      res.json(blockedCalls);
    } catch (error: any) {
      console.error("Error fetching blocked calls:", error);
      res.status(500).json({ message: "Failed to fetch blocked calls" });
    }
  });

  app.get('/api/spam/blocked-texts', async (req: any, res) => {
    try {
      const userId = "public-user";
      const blockedTexts = await storage.getBlockedTexts(userId);
      res.json(blockedTexts);
    } catch (error: any) {
      console.error("Error fetching blocked texts:", error);
      res.status(500).json({ message: "Failed to fetch blocked texts" });
    }
  });

  // Spy detection routes
  app.get('/api/spy/caller-ids', async (req: any, res) => {
    try {
      const userId = "public-user";
      const callerIds = await storage.getCallerIdentifications(userId);
      res.json(callerIds);
    } catch (error: any) {
      console.error("Error fetching caller IDs:", error);
      res.status(500).json({ message: "Failed to fetch caller identifications" });
    }
  });

  app.post('/api/spy/lookup-phone', async (req: any, res) => {
    try {
      const userId = "public-user";
      const { phoneNumber } = req.body;
      
      if (!phoneNumber) {
        return res.status(400).json({ message: "Phone number is required" });
      }

      const cleanNumber = phoneNumber.replace(/\D/g, '');
      
      // Simulate phone lookup with realistic data
      const mockCallerData = {
        userId,
        phoneNumber: cleanNumber,
        callerName: generateCallerName(),
        callerType: generateCallerType(),
        companyName: Math.random() > 0.6 ? generateCompanyName() : null,
        location: generateLocation(),
        country: "United States",
        carrierName: generateCarrier(),
        lineType: generateLineType(),
        trustScore: Math.floor(Math.random() * 100) + 1,
        riskLevel: generateRiskLevel(),
      };

      const caller = await storage.createCallerIdentification(mockCallerData);
      
      // Create security alert if risk is high
      if (caller.riskLevel === 'high' || caller.riskLevel === 'critical') {
        await storage.createSecurityAlert({
          userId,
          alertType: 'suspicious_activity',
          severity: caller.riskLevel === 'critical' ? 'danger' : 'warning',
          title: `High Risk Caller Detected`,
          description: `Phone number ${phoneNumber} has been identified as ${caller.callerType} with high risk level.`,
          sourceType: 'phone',
          sourceValue: phoneNumber,
          actionRequired: true,
        });
      }

      res.json(caller);
    } catch (error: any) {
      console.error("Error looking up phone:", error);
      res.status(500).json({ message: "Failed to lookup phone number" });
    }
  });

  app.post('/api/spy/lookup-ip', async (req: any, res) => {
    try {
      const userId = "public-user";
      const { ipAddress } = req.body;
      
      if (!ipAddress) {
        return res.status(400).json({ message: "IP address is required" });
      }

      // Simulate IP lookup with realistic data
      const mockIpData = {
        userId,
        ipAddress,
        hostname: generateHostname(ipAddress),
        location: generateLocation(),
        coordinates: generateCoordinates(),
        isp: generateISP(),
        organization: Math.random() > 0.5 ? generateOrganization() : null,
        connectionType: generateConnectionType(),
        threatLevel: generateThreatLevel(),
        isVpn: Math.random() > 0.8,
        isProxy: Math.random() > 0.9,
        isTor: Math.random() > 0.95,
        reputationScore: Math.floor(Math.random() * 100) + 1,
      };

      const ipData = await storage.createIpTracking(mockIpData);
      
      // Create security alert if suspicious
      if (ipData.threatLevel === 'high' || ipData.threatLevel === 'critical' || ipData.isVpn || ipData.isTor) {
        await storage.createSecurityAlert({
          userId,
          alertType: 'suspicious_activity',
          severity: ipData.threatLevel === 'critical' ? 'danger' : 'warning',
          title: `Suspicious IP Activity`,
          description: `IP address ${ipAddress} shows suspicious characteristics: ${ipData.isVpn ? 'VPN, ' : ''}${ipData.isTor ? 'Tor, ' : ''}${ipData.threatLevel} threat level.`,
          sourceType: 'ip',
          sourceValue: ipAddress,
          actionRequired: ipData.threatLevel === 'critical',
        });
      }

      res.json(ipData);
    } catch (error: any) {
      console.error("Error looking up IP:", error);
      res.status(500).json({ message: "Failed to lookup IP address" });
    }
  });

  app.get('/api/spy/ip-tracking', async (req: any, res) => {
    try {
      const userId = "public-user";
      const ipTracking = await storage.getIpTracking(userId);
      res.json(ipTracking);
    } catch (error: any) {
      console.error("Error fetching IP tracking:", error);
      res.status(500).json({ message: "Failed to fetch IP tracking data" });
    }
  });

  app.get('/api/spy/detections', async (req: any, res) => {
    try {
      const userId = "public-user";
      const detections = await storage.getSpyDetections(userId);
      res.json(detections);
    } catch (error: any) {
      console.error("Error fetching spy detections:", error);
      res.status(500).json({ message: "Failed to fetch spy detections" });
    }
  });

  app.get('/api/spy/alerts', async (req: any, res) => {
    try {
      const userId = "public-user";
      const alerts = await storage.getSecurityAlerts(userId);
      res.json(alerts);
    } catch (error: any) {
      console.error("Error fetching security alerts:", error);
      res.status(500).json({ message: "Failed to fetch security alerts" });
    }
  });

  app.patch('/api/spy/alerts/:id/read', async (req: any, res) => {
    try {
      const { id } = req.params;
      const alert = await storage.markAlertAsRead(id);
      res.json(alert);
    } catch (error: any) {
      console.error("Error marking alert as read:", error);
      res.status(500).json({ message: "Failed to mark alert as read" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;

  // Helper functions for generating realistic mock data
  function generateCallerName() {
    const names = ['John Smith', 'Sarah Johnson', 'Mike Wilson', 'Lisa Davis', 'Unknown Caller', 'Private Number'];
    return names[Math.floor(Math.random() * names.length)];
  }

  function generateCallerType() {
    const types = ['business', 'personal', 'scam', 'telemarketer', 'government', 'unknown'];
    const weights = [0.3, 0.25, 0.15, 0.2, 0.05, 0.05];
    let random = Math.random();
    for (let i = 0; i < types.length; i++) {
      random -= weights[i];
      if (random <= 0) return types[i];
    }
    return 'unknown';
  }

  function generateCompanyName() {
    const companies = ['TechCorp Inc.', 'Global Services LLC', 'Marketing Solutions', 'Customer Care Center', 'Sales Department'];
    return companies[Math.floor(Math.random() * companies.length)];
  }

  function generateLocation() {
    const locations = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ', 'Philadelphia, PA'];
    return locations[Math.floor(Math.random() * locations.length)];
  }

  function generateCarrier() {
    const carriers = ['Verizon', 'AT&T', 'T-Mobile', 'Sprint', 'Metro PCS', 'Cricket'];
    return carriers[Math.floor(Math.random() * carriers.length)];
  }

  function generateLineType() {
    const types = ['mobile', 'landline', 'voip', 'toll_free'];
    const weights = [0.6, 0.25, 0.1, 0.05];
    let random = Math.random();
    for (let i = 0; i < types.length; i++) {
      random -= weights[i];
      if (random <= 0) return types[i];
    }
    return 'mobile';
  }

  function generateRiskLevel() {
    const levels = ['low', 'medium', 'high', 'critical'];
    const weights = [0.5, 0.3, 0.15, 0.05];
    let random = Math.random();
    for (let i = 0; i < levels.length; i++) {
      random -= weights[i];
      if (random <= 0) return levels[i];
    }
    return 'low';
  }

  function generateHostname(ip: string) {
    const domains = ['comcast.net', 'verizon.net', 'att.net', 'cox.net', 'charter.com'];
    const prefix = ip.replace(/\./g, '-');
    return `${prefix}.${domains[Math.floor(Math.random() * domains.length)]}`;
  }

  function generateCoordinates() {
    const lat = (Math.random() * 180 - 90).toFixed(6);
    const lng = (Math.random() * 360 - 180).toFixed(6);
    return `${lat},${lng}`;
  }

  function generateISP() {
    const isps = ['Comcast Cable', 'Verizon Fios', 'AT&T Internet', 'Cox Communications', 'Charter Spectrum'];
    return isps[Math.floor(Math.random() * isps.length)];
  }

  function generateOrganization() {
    const orgs = ['Residential Customer', 'Business Services', 'Educational Institution', 'Government Agency'];
    return orgs[Math.floor(Math.random() * orgs.length)];
  }

  function generateConnectionType() {
    const types = ['residential', 'business', 'mobile', 'hosting'];
    const weights = [0.6, 0.25, 0.1, 0.05];
    let random = Math.random();
    for (let i = 0; i < types.length; i++) {
      random -= weights[i];
      if (random <= 0) return types[i];
    }
    return 'residential';
  }

  function generateThreatLevel() {
    const levels = ['none', 'low', 'medium', 'high', 'critical'];
    const weights = [0.7, 0.2, 0.07, 0.025, 0.005];
    let random = Math.random();
    for (let i = 0; i < levels.length; i++) {
      random -= weights[i];
      if (random <= 0) return levels[i];
    }
    return 'none';
  }
}
