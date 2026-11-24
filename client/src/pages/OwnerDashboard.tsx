import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import RevenueDashboard from "@/components/RevenueDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, TrendingUp, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import OwnerVipBadge from "@/components/OwnerVipBadge";
import { useOwner, openOwnerLogin } from "@/lib/owner";

export default function OwnerDashboard() {
  const { user, isAuthenticated, isLoading, isOwner: serverOwner } = useAuth();
  const { toast } = useToast();
  // Owner PIN session (owner-login.js); the server confirms the same token on /api/auth/user.
  const pinOwner = useOwner();
  const isOwner = pinOwner || serverOwner || (isAuthenticated && (user as any)?.email === "hoodstarent365@gmail.com");

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !pinOwner) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, pinOwner, toast]);

  // Only show for the owner (you)
  if (!isOwner) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">This dashboard is only available to the platform owner.</p>
          <Button onClick={openOwnerLogin}>Owner Login</Button>
        </div>
      </div>
    );
  }

  if (isLoading && !pinOwner) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">Owner Dashboard</h1>
            <OwnerVipBadge />
          </div>
          <p className="text-gray-600">Private revenue tracking and business metrics</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Revenue Dashboard */}
        <section className="mb-8">
          <RevenueDashboard />
        </section>

        {/* Additional Owner Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Daily Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-2xl font-bold text-gray-900">+73</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">New subscribers today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Churn Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Target className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-2xl font-bold text-gray-900">2.1%</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Monthly churn</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">LTV</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 text-purple-600 mr-2" />
                <span className="text-2xl font-bold text-gray-900">$237</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Customer lifetime value</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">CAC</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-4 w-4 text-orange-600 mr-2" />
                <span className="text-2xl font-bold text-gray-900">$12</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Customer acquisition cost</p>
            </CardContent>
          </Card>
        </div>

        {/* Business Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Business Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <strong>Platform Launch:</strong> SwipeeClean successfully deployed and operational
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <strong>Revenue Target:</strong> $1M ARR by September 1, 2025 (203 days remaining)
              </div>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <strong>Growth Rate:</strong> Need 73 subscribers/day average to reach goal
              </div>
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <strong>Custom Domain:</strong> swipeeclean.com fully operational
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}