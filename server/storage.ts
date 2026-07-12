import {
  users,
  storageAnalysis,
  cleaningRecommendations,
  cleaningSessions,
  mediaFolders,
  mediaItems,
  exportSessions,
  spamNumbers,
  spamReports,
  blockedCalls,
  blockedTexts,
  callerIdentification,
  ipTracking,
  spyDetection,
  securityAlerts,
  type User,
  type UpsertUser,
  type StorageAnalysis,
  type InsertStorageAnalysis,
  type CleaningRecommendation,
  type InsertCleaningRecommendation,
  type CleaningSession,
  type InsertCleaningSession,
  type MediaFolder,
  type MediaItem,
  type ExportSession,
  type InsertMediaFolder,
  type InsertMediaItem,
  type InsertExportSession,
  type SpamNumber,
  type SpamReport,
  type BlockedCall,
  type BlockedText,
  type InsertSpamNumber,
  type InsertSpamReport,
  type InsertBlockedCall,
  type InsertBlockedText,
  type CallerIdentification,
  type IpTracking,
  type SpyDetection,
  type SecurityAlert,
  type InsertCallerIdentification,
  type InsertIpTracking,
  type InsertSpyDetection,
  type InsertSecurityAlert,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations - mandatory for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserStripeInfo(userId: string, customerId: string, subscriptionId: string): Promise<User>;
  updateUserFounderStatus(userId: string, phoneNumber: string): Promise<User>;
  
  // Storage analysis operations
  getStorageAnalysis(userId: string): Promise<StorageAnalysis | undefined>;
  createStorageAnalysis(analysis: InsertStorageAnalysis): Promise<StorageAnalysis>;
  
  // Cleaning recommendations operations
  getCleaningRecommendations(userId: string): Promise<CleaningRecommendation[]>;
  createCleaningRecommendations(recommendations: InsertCleaningRecommendation[]): Promise<CleaningRecommendation[]>;
  updateRecommendationStatus(id: string, status: string): Promise<CleaningRecommendation>;
  
  // Cleaning session operations
  getCurrentCleaningSession(userId: string): Promise<CleaningSession | undefined>;
  createCleaningSession(session: InsertCleaningSession): Promise<CleaningSession>;
  updateCleaningSession(id: string, updates: Partial<CleaningSession>): Promise<CleaningSession>;
  
  // Media organization operations
  getMediaFolders(userId: string): Promise<MediaFolder[]>;
  createMediaFolder(folder: InsertMediaFolder): Promise<MediaFolder>;
  getMediaItems(userId: string, folderId?: string): Promise<MediaItem[]>;
  createMediaItems(items: InsertMediaItem[]): Promise<MediaItem[]>;
  
  // Export operations
  getExportSessions(userId: string): Promise<ExportSession[]>;
  createExportSession(session: InsertExportSession): Promise<ExportSession>;
  updateExportSession(id: string, updates: Partial<ExportSession>): Promise<ExportSession>;
  
  // Spam blocking operations
  getSpamNumbers(userId: string): Promise<SpamNumber[]>;
  createSpamNumber(spamNumber: InsertSpamNumber): Promise<SpamNumber>;
  updateSpamNumber(id: string, updates: Partial<SpamNumber>): Promise<SpamNumber>;
  createSpamReport(report: InsertSpamReport): Promise<SpamReport>;
  getBlockedCalls(userId: string): Promise<BlockedCall[]>;
  getBlockedTexts(userId: string): Promise<BlockedText[]>;
  createBlockedCall(call: InsertBlockedCall): Promise<BlockedCall>;
  createBlockedText(text: InsertBlockedText): Promise<BlockedText>;
  
  // Spy detection operations
  getCallerIdentifications(userId: string): Promise<CallerIdentification[]>;
  createCallerIdentification(caller: InsertCallerIdentification): Promise<CallerIdentification>;
  getIpTracking(userId: string): Promise<IpTracking[]>;
  createIpTracking(ip: InsertIpTracking): Promise<IpTracking>;
  getSpyDetections(userId: string): Promise<SpyDetection[]>;
  createSpyDetection(detection: InsertSpyDetection): Promise<SpyDetection>;
  getSecurityAlerts(userId: string): Promise<SecurityAlert[]>;
  createSecurityAlert(alert: InsertSecurityAlert): Promise<SecurityAlert>;
  markAlertAsRead(alertId: string): Promise<SecurityAlert>;
}

export class DatabaseStorage implements IStorage {
  // User operations - mandatory for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserStripeInfo(userId: string, customerId: string, subscriptionId: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        isSubscribed: true,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async updateUserFounderStatus(userId: string, phoneNumber: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        phoneNumber: phoneNumber,
        isFounder: true,
        isSubscribed: true, // permanent free access
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  // Storage analysis operations
  async getStorageAnalysis(userId: string): Promise<StorageAnalysis | undefined> {
    const [analysis] = await db
      .select()
      .from(storageAnalysis)
      .where(eq(storageAnalysis.userId, userId))
      .orderBy(desc(storageAnalysis.createdAt))
      .limit(1);
    return analysis;
  }

  async createStorageAnalysis(analysis: InsertStorageAnalysis): Promise<StorageAnalysis> {
    const [newAnalysis] = await db
      .insert(storageAnalysis)
      .values(analysis)
      .returning();
    return newAnalysis;
  }

  // Cleaning recommendations operations
  async getCleaningRecommendations(userId: string): Promise<CleaningRecommendation[]> {
    return await db
      .select()
      .from(cleaningRecommendations)
      .where(and(
        eq(cleaningRecommendations.userId, userId),
        eq(cleaningRecommendations.status, 'pending')
      ))
      .orderBy(desc(cleaningRecommendations.priority));
  }

  async createCleaningRecommendations(recommendations: InsertCleaningRecommendation[]): Promise<CleaningRecommendation[]> {
    return await db
      .insert(cleaningRecommendations)
      .values(recommendations)
      .returning();
  }

  async updateRecommendationStatus(id: string, status: string): Promise<CleaningRecommendation> {
    const [recommendation] = await db
      .update(cleaningRecommendations)
      .set({ status, updatedAt: new Date() })
      .where(eq(cleaningRecommendations.id, id))
      .returning();
    return recommendation;
  }

  // Cleaning session operations
  async getCurrentCleaningSession(userId: string): Promise<CleaningSession | undefined> {
    const [session] = await db
      .select()
      .from(cleaningSessions)
      .where(and(
        eq(cleaningSessions.userId, userId),
        eq(cleaningSessions.status, 'active')
      ))
      .orderBy(desc(cleaningSessions.createdAt))
      .limit(1);
    return session;
  }

  async createCleaningSession(session: InsertCleaningSession): Promise<CleaningSession> {
    const [newSession] = await db
      .insert(cleaningSessions)
      .values(session)
      .returning();
    return newSession;
  }

  async updateCleaningSession(id: string, updates: Partial<CleaningSession>): Promise<CleaningSession> {
    const [session] = await db
      .update(cleaningSessions)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(cleaningSessions.id, id))
      .returning();
    return session;
  }

  // Media organization operations
  async getMediaFolders(userId: string): Promise<MediaFolder[]> {
    return await db.select().from(mediaFolders)
      .where(eq(mediaFolders.userId, userId))
      .orderBy(desc(mediaFolders.createdAt));
  }

  async createMediaFolder(folder: InsertMediaFolder): Promise<MediaFolder> {
    const [newFolder] = await db.insert(mediaFolders)
      .values(folder)
      .returning();
    return newFolder;
  }

  async getMediaItems(userId: string, folderId?: string): Promise<MediaItem[]> {
    const conditions = [eq(mediaItems.userId, userId)];
    if (folderId) {
      conditions.push(eq(mediaItems.folderId, folderId));
    }
    
    return await db.select().from(mediaItems)
      .where(and(...conditions))
      .orderBy(desc(mediaItems.createdAt));
  }

  async createMediaItems(items: InsertMediaItem[]): Promise<MediaItem[]> {
    if (items.length === 0) return [];
    return await db.insert(mediaItems)
      .values(items)
      .returning();
  }

  // Export operations
  async getExportSessions(userId: string): Promise<ExportSession[]> {
    return await db.select().from(exportSessions)
      .where(eq(exportSessions.userId, userId))
      .orderBy(desc(exportSessions.createdAt));
  }

  async createExportSession(session: InsertExportSession): Promise<ExportSession> {
    const [newSession] = await db.insert(exportSessions)
      .values(session)
      .returning();
    return newSession;
  }

  async updateExportSession(id: string, updates: Partial<ExportSession>): Promise<ExportSession> {
    const [session] = await db.update(exportSessions)
      .set(updates)
      .where(eq(exportSessions.id, id))
      .returning();
    return session;
  }

  // Spam blocking operations
  async getSpamNumbers(userId: string): Promise<SpamNumber[]> {
    return await db.select().from(spamNumbers)
      .where(eq(spamNumbers.userId, userId))
      .orderBy(desc(spamNumbers.createdAt));
  }

  async createSpamNumber(spamNumber: InsertSpamNumber): Promise<SpamNumber> {
    const [newSpamNumber] = await db.insert(spamNumbers)
      .values(spamNumber)
      .returning();
    return newSpamNumber;
  }

  async updateSpamNumber(id: string, updates: Partial<SpamNumber>): Promise<SpamNumber> {
    const [spamNumber] = await db.update(spamNumbers)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(spamNumbers.id, id))
      .returning();
    return spamNumber;
  }

  async createSpamReport(report: InsertSpamReport): Promise<SpamReport> {
    const [newReport] = await db.insert(spamReports)
      .values(report)
      .returning();
    return newReport;
  }

  async getBlockedCalls(userId: string): Promise<BlockedCall[]> {
    return await db.select().from(blockedCalls)
      .where(eq(blockedCalls.userId, userId))
      .orderBy(desc(blockedCalls.createdAt))
      .limit(100);
  }

  async getBlockedTexts(userId: string): Promise<BlockedText[]> {
    return await db.select().from(blockedTexts)
      .where(eq(blockedTexts.userId, userId))
      .orderBy(desc(blockedTexts.createdAt))
      .limit(100);
  }

  async createBlockedCall(call: InsertBlockedCall): Promise<BlockedCall> {
    const [newCall] = await db.insert(blockedCalls)
      .values(call)
      .returning();
    return newCall;
  }

  async createBlockedText(text: InsertBlockedText): Promise<BlockedText> {
    const [newText] = await db.insert(blockedTexts)
      .values(text)
      .returning();
    return newText;
  }

  // Spy detection operations
  async getCallerIdentifications(userId: string): Promise<CallerIdentification[]> {
    return await db.select().from(callerIdentification)
      .where(eq(callerIdentification.userId, userId))
      .orderBy(desc(callerIdentification.createdAt));
  }

  async createCallerIdentification(caller: InsertCallerIdentification): Promise<CallerIdentification> {
    const [newCaller] = await db.insert(callerIdentification)
      .values(caller)
      .returning();
    return newCaller;
  }

  async getIpTracking(userId: string): Promise<IpTracking[]> {
    return await db.select().from(ipTracking)
      .where(eq(ipTracking.userId, userId))
      .orderBy(desc(ipTracking.lastSeen));
  }

  async createIpTracking(ip: InsertIpTracking): Promise<IpTracking> {
    const [newIp] = await db.insert(ipTracking)
      .values(ip)
      .returning();
    return newIp;
  }

  async getSpyDetections(userId: string): Promise<SpyDetection[]> {
    return await db.select().from(spyDetection)
      .where(eq(spyDetection.userId, userId))
      .orderBy(desc(spyDetection.detectedAt));
  }

  async createSpyDetection(detection: InsertSpyDetection): Promise<SpyDetection> {
    const [newDetection] = await db.insert(spyDetection)
      .values(detection)
      .returning();
    return newDetection;
  }

  async getSecurityAlerts(userId: string): Promise<SecurityAlert[]> {
    return await db.select().from(securityAlerts)
      .where(eq(securityAlerts.userId, userId))
      .orderBy(desc(securityAlerts.createdAt));
  }

  async createSecurityAlert(alert: InsertSecurityAlert): Promise<SecurityAlert> {
    const [newAlert] = await db.insert(securityAlerts)
      .values(alert)
      .returning();
    return newAlert;
  }

  async markAlertAsRead(alertId: string): Promise<SecurityAlert> {
    const [alert] = await db.update(securityAlerts)
      .set({ isRead: true, readAt: new Date() })
      .where(eq(securityAlerts.id, alertId))
      .returning();
    return alert;
  }
}

export const storage = new DatabaseStorage();
