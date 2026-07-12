import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Eye, MapPin, Wifi, AlertTriangle, Search, Phone, Monitor, Globe, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import BottomNavigation from "@/components/BottomNavigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { CallerIdentification, IpTracking, SpyDetection, SecurityAlert } from "@shared/schema";

export default function SpyDetector() {
  const { toast } = useToast();
  const [lookupNumber, setLookupNumber] = useState("");
  const [lookupIp, setLookupIp] = useState("");

  // Fetch caller identifications
  const { data: callerIds = [] } = useQuery<CallerIdentification[]>({
    queryKey: ["/api/spy/caller-ids"],
  });

  // Fetch IP tracking data
  const { data: ipTracking = [] } = useQuery<IpTracking[]>({
    queryKey: ["/api/spy/ip-tracking"],
  });

  // Fetch spy detections
  const { data: spyDetections = [] } = useQuery<SpyDetection[]>({
    queryKey: ["/api/spy/detections"],
  });

  // Fetch security alerts
  const { data: securityAlerts = [] } = useQuery<SecurityAlert[]>({
    queryKey: ["/api/spy/alerts"],
  });

  // Phone number lookup mutation
  const phoneLibraryMutation = useMutation({
    mutationFn: async () => {
      if (!lookupNumber.trim()) throw new Error("Phone number is required");
      return apiRequest("POST", "/api/spy/lookup-phone", {
        phoneNumber: lookupNumber.trim(),
      });
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/spy/caller-ids"] });
      toast({
        title: "Phone Lookup Complete",
        description: `Identified: ${data.callerName || 'Unknown'} - ${data.callerType || 'Unclassified'}`,
      });
      setLookupNumber("");
    },
    onError: (error) => {
      toast({
        title: "Lookup Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // IP address lookup mutation
  const ipLookupMutation = useMutation({
    mutationFn: async () => {
      if (!lookupIp.trim()) throw new Error("IP address is required");
      return apiRequest("POST", "/api/spy/lookup-ip", {
        ipAddress: lookupIp.trim(),
      });
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/spy/ip-tracking"] });
      toast({
        title: "IP Lookup Complete",
        description: `Location: ${data.location || 'Unknown'} - ISP: ${data.isp || 'Unknown'}`,
      });
      setLookupIp("");
    },
    onError: (error) => {
      toast({
        title: "Lookup Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Mark alert as read mutation
  const markAlertReadMutation = useMutation({
    mutationFn: async (alertId: string) => {
      return apiRequest("PATCH", `/api/spy/alerts/${alertId}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/spy/alerts"] });
    },
  });

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  };

  const getThreatBadge = (level: string) => {
    switch (level) {
      case 'critical': return <Badge variant="destructive">Critical</Badge>;
      case 'high': return <Badge className="bg-red-100 text-red-800">High Risk</Badge>;
      case 'medium': return <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>;
      case 'low': return <Badge className="bg-green-100 text-green-800">Low Risk</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getCallerTypeBadge = (type: string) => {
    switch (type) {
      case 'business': return <Badge className="bg-blue-100 text-blue-800">Business</Badge>;
      case 'personal': return <Badge className="bg-green-100 text-green-800">Personal</Badge>;
      case 'scam': return <Badge variant="destructive">Scam</Badge>;
      case 'telemarketer': return <Badge className="bg-orange-100 text-orange-800">Telemarketer</Badge>;
      case 'government': return <Badge className="bg-purple-100 text-purple-800">Government</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const unreadAlerts = securityAlerts.filter(alert => !alert.isRead);
  const criticalDetections = spyDetections.filter(detection => detection.threatLevel === 'critical' && !detection.isResolved);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Eye className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Spy Detector</h1>
            </div>
            {unreadAlerts.length > 0 && (
              <Badge variant="destructive">{unreadAlerts.length} alerts</Badge>
            )}
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 pt-6 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto space-y-6"
        >
          {/* Critical Alerts */}
          {criticalDetections.length > 0 && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Critical threats detected!</strong> {criticalDetections.length} active security issues require immediate attention.
              </AlertDescription>
            </Alert>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Phone className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{callerIds.length}</div>
                <div className="text-sm text-gray-600">Identified Callers</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Globe className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{ipTracking.length}</div>
                <div className="text-sm text-gray-600">Tracked IPs</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Shield className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{spyDetections.length}</div>
                <div className="text-sm text-gray-600">Spy Detections</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <AlertTriangle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{unreadAlerts.length}</div>
                <div className="text-sm text-gray-600">Active Alerts</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="lookup" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="lookup">Lookup</TabsTrigger>
              <TabsTrigger value="callers">Caller ID</TabsTrigger>
              <TabsTrigger value="tracking">IP Tracking</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* Lookup Tab */}
            <TabsContent value="lookup" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone Number Lookup */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Phone className="w-5 h-5 mr-2" />
                      Phone Number Lookup
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      placeholder="Enter phone number (e.g., 555-123-4567)"
                      value={lookupNumber}
                      onChange={(e) => setLookupNumber(e.target.value)}
                    />
                    
                    <Button 
                      onClick={() => phoneLibraryMutation.mutate()}
                      disabled={phoneLibraryMutation.isPending}
                      className="w-full"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      {phoneLibraryMutation.isPending ? "Looking up..." : "Identify Caller"}
                    </Button>
                    
                    <div className="text-sm text-gray-600">
                      Get caller name, location, carrier info, and threat assessment
                    </div>
                  </CardContent>
                </Card>

                {/* IP Address Lookup */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      IP Address Lookup
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      placeholder="Enter IP address (e.g., 192.168.1.1)"
                      value={lookupIp}
                      onChange={(e) => setLookupIp(e.target.value)}
                    />
                    
                    <Button 
                      onClick={() => ipLookupMutation.mutate()}
                      disabled={ipLookupMutation.isPending}
                      className="w-full"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      {ipLookupMutation.isPending ? "Tracing..." : "Trace IP Location"}
                    </Button>
                    
                    <div className="text-sm text-gray-600">
                      Get location, ISP, threat level, and proxy detection
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Caller ID Tab */}
            <TabsContent value="callers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Identified Callers</CardTitle>
                </CardHeader>
                <CardContent>
                  {callerIds.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No caller identifications yet. Use the lookup tool to identify phone numbers.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {callerIds.map((caller) => (
                        <div key={caller.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">{formatPhoneNumber(caller.phoneNumber)}</div>
                            <div className="flex items-center space-x-2">
                              {getCallerTypeBadge(caller.callerType || 'unknown')}
                              {getThreatBadge(caller.riskLevel || 'low')}
                            </div>
                          </div>
                          
                          <div className="text-lg font-medium text-gray-900 mb-1">
                            {caller.callerName || 'Unknown Caller'}
                          </div>
                          
                          {caller.companyName && (
                            <div className="text-sm text-gray-600 mb-1">
                              Company: {caller.companyName}
                            </div>
                          )}
                          
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>Location: {caller.location || 'Unknown'}</div>
                            <div>Carrier: {caller.carrierName || 'Unknown'}</div>
                            <div>Line Type: {caller.lineType || 'Unknown'}</div>
                            <div>Trust Score: {caller.trustScore || 'N/A'}/100</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* IP Tracking Tab */}
            <TabsContent value="tracking" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>IP Address Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  {ipTracking.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No IP addresses tracked yet. Use the lookup tool to trace IP locations.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {ipTracking.map((ip) => (
                        <div key={ip.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold font-mono">{ip.ipAddress}</div>
                            <div className="flex items-center space-x-2">
                              {getThreatBadge(ip.threatLevel || 'none')}
                              {ip.isVpn && <Badge className="bg-purple-100 text-purple-800">VPN</Badge>}
                              {ip.isProxy && <Badge className="bg-orange-100 text-orange-800">Proxy</Badge>}
                              {ip.isTor && <Badge variant="destructive">Tor</Badge>}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                              <div className="font-medium">Location</div>
                              <div>{ip.location || 'Unknown'}</div>
                            </div>
                            <div>
                              <div className="font-medium">ISP</div>
                              <div>{ip.isp || 'Unknown'}</div>
                            </div>
                            <div>
                              <div className="font-medium">Organization</div>
                              <div>{ip.organization || 'Unknown'}</div>
                            </div>
                            <div>
                              <div className="font-medium">Connection Type</div>
                              <div>{ip.connectionType || 'Unknown'}</div>
                            </div>
                          </div>
                          
                          {ip.reputationScore && (
                            <div className="mt-2 text-sm">
                              Reputation Score: {ip.reputationScore}/100
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              {/* Security Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Security Alerts
                    {unreadAlerts.length > 0 && (
                      <Badge variant="destructive">{unreadAlerts.length} unread</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {securityAlerts.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No security alerts. Your system is secure.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {securityAlerts.slice(0, 10).map((alert) => (
                        <div 
                          key={alert.id} 
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            !alert.isRead ? 'bg-blue-50 border-blue-200' : 'bg-white'
                          }`}
                          onClick={() => !alert.isRead && markAlertReadMutation.mutate(alert.id)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">{alert.title}</div>
                            <div className="flex items-center space-x-2">
                              {getThreatBadge(alert.severity)}
                              {!alert.isRead && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                            </div>
                          </div>
                          
                          <div className="text-sm text-gray-600 mb-2">
                            {alert.description}
                          </div>
                          
                          {alert.sourceType && alert.sourceValue && (
                            <div className="text-xs text-gray-500">
                              Source: {alert.sourceType} - {alert.sourceValue}
                            </div>
                          )}
                          
                          <div className="text-xs text-gray-400 mt-1">
                            {alert.createdAt ? new Date(alert.createdAt).toLocaleString() : 'Unknown date'}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Spy Detections */}
              <Card>
                <CardHeader>
                  <CardTitle>Spy Detection History</CardTitle>
                </CardHeader>
                <CardContent>
                  {spyDetections.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No spy activity detected. Your privacy is protected.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {spyDetections.slice(0, 10).map((detection) => (
                        <div key={detection.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">{detection.detectionType.replace('_', ' ').toUpperCase()}</div>
                            <div className="flex items-center space-x-2">
                              {getThreatBadge(detection.threatLevel)}
                              {detection.isResolved ? (
                                <Badge className="bg-green-100 text-green-800">Resolved</Badge>
                              ) : (
                                <Badge className="bg-yellow-100 text-yellow-800">Active</Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="text-sm text-gray-600 mb-2">
                            Source: {detection.sourceIdentifier}
                          </div>
                          
                          <div className="text-sm text-gray-700 mb-2">
                            {detection.detectionReason}
                          </div>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div>Confidence: {detection.confidence}%</div>
                            <div>{detection.detectedAt ? new Date(detection.detectedAt).toLocaleString() : 'Unknown date'}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
      
      <BottomNavigation />
    </div>
  );
}