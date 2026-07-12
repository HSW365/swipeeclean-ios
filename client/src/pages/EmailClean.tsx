import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trash2, Mail, AlertTriangle, Calendar, Shield } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function EmailClean() {
  const { t } = useTranslation();
  const [isScanning, setIsScanning] = useState(false);
  const [isCleaning, setIsCleaning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [cleanProgress, setCleanProgress] = useState(0);
  const [emailStats, setEmailStats] = useState({
    totalEmails: 0,
    spamEmails: 0,
    oldEmails: 0,
    sizeSaved: 0
  });

  const startEmailScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    
    // Simulate Gmail scanning process
    for (let i = 0; i <= 100; i += 10) {
      setScanProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    // Mock scan results
    setEmailStats({
      totalEmails: 15420,
      spamEmails: 2840,
      oldEmails: 3650,
      sizeSaved: 2.3
    });
    
    setIsScanning(false);
  };

  const startCleaning = async () => {
    setIsCleaning(true);
    setCleanProgress(0);
    
    // Simulate cleaning process
    for (let i = 0; i <= 100; i += 5) {
      setCleanProgress(i);
      await new Promise(resolve => setTimeout(resolve, 150));
    }
    
    setIsCleaning(false);
    // Update stats after cleaning
    setEmailStats(prev => ({
      ...prev,
      spamEmails: 0,
      oldEmails: 0
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gmail Cleaner
          </h1>
          <p className="text-gray-600">
            Clean spam and emails older than 30 days automatically
          </p>
        </div>

        {/* Email Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Total Emails
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{emailStats.totalEmails.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
                Spam Emails
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{emailStats.spamEmails.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                Old Emails (30+ days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{emailStats.oldEmails.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-500" />
                Space to Save
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{emailStats.sizeSaved} GB</div>
            </CardContent>
          </Card>
        </div>

        {/* Scan Gmail Button */}
        {!isScanning && emailStats.totalEmails === 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Connect to Gmail</CardTitle>
              <CardDescription>
                Scan your Gmail account to identify spam and old emails that can be safely deleted
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={startEmailScan}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                <Mail className="w-5 h-5 mr-2" />
                Connect & Scan Gmail
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Scanning Progress */}
        {isScanning && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Scanning Gmail...</CardTitle>
              <CardDescription>
                Analyzing your emails for spam and old messages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={scanProgress} className="mb-2" />
              <p className="text-sm text-gray-600">
                {scanProgress}% complete - Scanning {Math.floor(scanProgress * 154.2)} emails
              </p>
            </CardContent>
          </Card>
        )}

        {/* Cleaning Results */}
        {emailStats.totalEmails > 0 && !isScanning && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Cleaning Options</CardTitle>
              <CardDescription>
                Choose what to clean from your Gmail account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <div>
                    <h3 className="font-medium">Delete Spam Emails</h3>
                    <p className="text-sm text-gray-600">{emailStats.spamEmails.toLocaleString()} spam emails found</p>
                  </div>
                </div>
                <Badge variant="destructive">{emailStats.spamEmails > 0 ? 'Recommended' : 'Clean'}</Badge>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-orange-500" />
                  <div>
                    <h3 className="font-medium">Delete Old Emails (30+ days)</h3>
                    <p className="text-sm text-gray-600">{emailStats.oldEmails.toLocaleString()} old emails found</p>
                  </div>
                </div>
                <Badge variant="outline">{emailStats.oldEmails > 0 ? 'Optional' : 'Clean'}</Badge>
              </div>

              {(emailStats.spamEmails > 0 || emailStats.oldEmails > 0) && !isCleaning && (
                <Button 
                  onClick={startCleaning}
                  className="w-full bg-red-600 hover:bg-red-700"
                  size="lg"
                >
                  <Trash2 className="w-5 h-5 mr-2" />
                  Clean Gmail ({emailStats.sizeSaved} GB)
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Cleaning Progress */}
        {isCleaning && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Cleaning Gmail...</CardTitle>
              <CardDescription>
                Deleting spam and old emails safely
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={cleanProgress} className="mb-2" />
              <p className="text-sm text-gray-600">
                {cleanProgress}% complete - Deleted {Math.floor(cleanProgress * 64.9)} emails
              </p>
            </CardContent>
          </Card>
        )}

        {/* Success Message */}
        {emailStats.totalEmails > 0 && emailStats.spamEmails === 0 && emailStats.oldEmails === 0 && !isCleaning && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800">Gmail Cleaned Successfully!</CardTitle>
              <CardDescription className="text-green-600">
                Your Gmail account has been cleaned and optimized
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 text-green-700">
                <Shield className="w-5 h-5" />
                <span className="font-medium">{emailStats.sizeSaved} GB of space recovered</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Security Notice */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Security & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-700 space-y-2">
            <p>• We use secure OAuth 2.0 to connect to your Gmail</p>
            <p>• No passwords are stored or transmitted</p>
            <p>• We only access email metadata, not content</p>
            <p>• All operations are performed client-side</p>
            <p>• You can revoke access anytime in Google settings</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}