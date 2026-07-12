import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Phone, MessageSquare, AlertTriangle, Ban, CheckCircle, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import BottomNavigation from "@/components/BottomNavigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { SpamNumber, BlockedCall, BlockedText } from "@shared/schema";

export default function SpamBlocker() {
  const { toast } = useToast();
  const [newNumber, setNewNumber] = useState("");
  const [newNumberType, setNewNumberType] = useState("both");
  const [newNumberCategory, setNewNumberCategory] = useState("telemarketer");
  const [reportNumber, setReportNumber] = useState("");
  const [reportType, setReportType] = useState("spam_call");
  const [reportContent, setReportContent] = useState("");
  const [reportSeverity, setReportSeverity] = useState("medium");

  // Fetch spam numbers
  const { data: spamNumbers = [] } = useQuery<SpamNumber[]>({
    queryKey: ["/api/spam/numbers"],
  });

  // Fetch blocked calls and texts
  const { data: blockedCalls = [] } = useQuery<BlockedCall[]>({
    queryKey: ["/api/spam/blocked-calls"],
  });

  const { data: blockedTexts = [] } = useQuery<BlockedText[]>({
    queryKey: ["/api/spam/blocked-texts"],
  });

  // Add number mutation
  const addNumberMutation = useMutation({
    mutationFn: async () => {
      if (!newNumber.trim()) throw new Error("Phone number is required");
      return apiRequest("POST", "/api/spam/numbers", {
        phoneNumber: newNumber.trim(),
        type: newNumberType,
        category: newNumberCategory,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/spam/numbers"] });
      setNewNumber("");
      toast({
        title: "Number Blocked",
        description: "The phone number has been added to your block list.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Report spam mutation
  const reportSpamMutation = useMutation({
    mutationFn: async () => {
      if (!reportNumber.trim()) throw new Error("Phone number is required");
      return apiRequest("POST", "/api/spam/reports", {
        phoneNumber: reportNumber.trim(),
        reportType,
        content: reportContent.trim(),
        severity: reportSeverity,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/spam/numbers"] });
      setReportNumber("");
      setReportContent("");
      toast({
        title: "Spam Reported",
        description: "Thank you for helping protect the community from spam.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Toggle block status
  const toggleBlockMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("PATCH", `/api/spam/numbers/${id}/toggle`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/spam/numbers"] });
      toast({
        title: "Block Status Updated",
        description: "The number's block status has been changed.",
      });
    },
  });

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'scam': return 'bg-red-100 text-red-800';
      case 'telemarketer': return 'bg-orange-100 text-orange-800';
      case 'robocall': return 'bg-yellow-100 text-yellow-800';
      case 'unknown': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Spam Blocker</h1>
        </div>
      </div>
      
      <main className="container mx-auto px-4 pt-20 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto space-y-6"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-12 h-12 text-blue-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">Spam Blocker</h1>
            </div>
            <p className="text-xl text-gray-600">Block unwanted calls and texts automatically</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Ban className="w-12 h-12 text-red-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900">{spamNumbers.length}</div>
                <div className="text-gray-600">Blocked Numbers</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Phone className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900">{blockedCalls.length}</div>
                <div className="text-gray-600">Calls Blocked</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <MessageSquare className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900">{blockedTexts.length}</div>
                <div className="text-gray-600">Texts Blocked</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="block" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="block">Block Numbers</TabsTrigger>
              <TabsTrigger value="report">Report Spam</TabsTrigger>
              <TabsTrigger value="history">Block History</TabsTrigger>
            </TabsList>

            {/* Block Numbers Tab */}
            <TabsContent value="block" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Number to Block List
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      placeholder="Phone number (e.g., 555-123-4567)"
                      value={newNumber}
                      onChange={(e) => setNewNumber(e.target.value)}
                    />
                    
                    <Select value={newNumberType} onValueChange={setNewNumberType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="calls">Calls Only</SelectItem>
                        <SelectItem value="texts">Texts Only</SelectItem>
                        <SelectItem value="both">Calls & Texts</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={newNumberCategory} onValueChange={setNewNumberCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="telemarketer">Telemarketer</SelectItem>
                        <SelectItem value="scam">Scam</SelectItem>
                        <SelectItem value="robocall">Robocall</SelectItem>
                        <SelectItem value="unknown">Unknown</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    onClick={() => addNumberMutation.mutate()}
                    disabled={addNumberMutation.isPending}
                    className="w-full"
                  >
                    {addNumberMutation.isPending ? "Adding..." : "Block Number"}
                  </Button>
                </CardContent>
              </Card>

              {/* Blocked Numbers List */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Blocked Numbers</CardTitle>
                </CardHeader>
                <CardContent>
                  {spamNumbers.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No numbers blocked yet. Add numbers above to get started.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {spamNumbers.map((number) => (
                        <div key={number.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Phone className="w-5 h-5 text-gray-600" />
                            <div>
                              <div className="font-semibold">{formatPhoneNumber(number.phoneNumber)}</div>
                              <div className="text-sm text-gray-600">
                                Blocks: {number.type} • Reports: {number.reportCount}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <Badge className={getCategoryColor(number.category)}>
                              {number.category}
                            </Badge>
                            
                            <Button
                              variant={number.isBlocked ? "destructive" : "outline"}
                              size="sm"
                              onClick={() => toggleBlockMutation.mutate(number.id)}
                              disabled={toggleBlockMutation.isPending}
                            >
                              {number.isBlocked ? "Unblock" : "Block"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Report Spam Tab */}
            <TabsContent value="report" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Report Spam Number
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Spam phone number"
                      value={reportNumber}
                      onChange={(e) => setReportNumber(e.target.value)}
                    />
                    
                    <Select value={reportType} onValueChange={setReportType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spam_call">Spam Call</SelectItem>
                        <SelectItem value="spam_text">Spam Text</SelectItem>
                        <SelectItem value="scam">Scam Attempt</SelectItem>
                        <SelectItem value="telemarketer">Telemarketer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Textarea
                    placeholder="Describe the spam content or call details (optional)"
                    value={reportContent}
                    onChange={(e) => setReportContent(e.target.value)}
                    rows={3}
                  />
                  
                  <Select value={reportSeverity} onValueChange={setReportSeverity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Severity Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Minor annoyance</SelectItem>
                      <SelectItem value="medium">Medium - Persistent spam</SelectItem>
                      <SelectItem value="high">High - Aggressive or frequent</SelectItem>
                      <SelectItem value="critical">Critical - Scam or fraud attempt</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    onClick={() => reportSpamMutation.mutate()}
                    disabled={reportSpamMutation.isPending}
                    className="w-full"
                  >
                    {reportSpamMutation.isPending ? "Reporting..." : "Report Spam"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Block History Tab */}
            <TabsContent value="history" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Blocked Calls */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Phone className="w-5 h-5 mr-2" />
                      Recent Blocked Calls
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {blockedCalls.length === 0 ? (
                      <div className="text-center py-4 text-gray-500">
                        No blocked calls yet
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {blockedCalls.slice(0, 5).map((call) => (
                          <div key={call.id} className="flex items-center justify-between p-3 border rounded">
                            <div>
                              <div className="font-semibold">{formatPhoneNumber(call.phoneNumber)}</div>
                              <div className="text-sm text-gray-600">
                                {new Date(call.callTime).toLocaleDateString()}
                              </div>
                            </div>
                            <Badge variant="destructive">Blocked</Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recent Blocked Texts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Recent Blocked Texts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {blockedTexts.length === 0 ? (
                      <div className="text-center py-4 text-gray-500">
                        No blocked texts yet
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {blockedTexts.slice(0, 5).map((text) => (
                          <div key={text.id} className="p-3 border rounded">
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-semibold">{formatPhoneNumber(text.phoneNumber)}</div>
                              <Badge variant="destructive">Blocked</Badge>
                            </div>
                            <div className="text-sm text-gray-600 truncate">
                              {text.messageContent || "No content available"}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {new Date(text.receivedTime).toLocaleDateString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
      
      <BottomNavigation />
    </div>
  );
}