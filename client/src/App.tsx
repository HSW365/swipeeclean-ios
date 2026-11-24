import { useEffect, type ComponentType } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
// import { useAuth } from "@/hooks/useAuth"; // REMOVED - DIRECT ACCESS
import { ErrorBoundary } from "./ErrorBoundary";
import { useOwner, onOwnerChange } from "@/lib/owner";

import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import SimpleLanding from "@/pages/SimpleLanding";
import Home from "@/pages/Home";
import Clean from "@/pages/Clean";
import Stats from "@/pages/Stats";
import Profile from "@/pages/Profile";
import SubscribePage from "@/pages/Subscribe";
import DemoSubscribe from "@/pages/DemoSubscribe";
import PayPalSubscribe from "@/pages/PayPalSubscribe";
import QuickSubscribe from "@/pages/QuickSubscribe";
import MediaOrganizer from "@/pages/MediaOrganizer";
import Viral from "@/pages/Viral";
import EmailClean from "@/pages/EmailClean";
import iCloudClean from "@/pages/iCloudClean";
import Pricing from "@/pages/Pricing";
import ReferralDashboard from "@/pages/ReferralDashboard";
import Analytics from "@/pages/Analytics";
import PreviewDashboard from "@/pages/PreviewDashboard";
import DataCleaner from "@/pages/DataCleaner";
import StorageOptimizer from "@/pages/StorageOptimizer";
import StorageInsights from "@/pages/StorageInsights";
import OwnerDashboard from "@/pages/OwnerDashboard";
import OwnerAccess from "@/pages/OwnerAccess";
import OwnerVip from "@/pages/OwnerVip";
import Settings from "@/pages/Settings";

import SpamBlocker from "@/pages/SpamBlocker";
import SpyDetector from "@/pages/SpyDetector";
import ViralShare from "@/pages/ViralShare";
import RealFileCleaner from "@/pages/RealFileCleaner";

// The owner (signed in with the owner PIN) never sees checkout: these pages show VIP access instead.
function ownerFree<P extends object>(Page: ComponentType<P>) {
  return function OwnerFreePage(props: P) {
    return useOwner() ? <OwnerVip /> : <Page {...props} />;
  };
}
const PayPalSubscribeRoute = ownerFree(PayPalSubscribe);
const DemoSubscribeRoute = ownerFree(DemoSubscribe);
const QuickSubscribeRoute = ownerFree(QuickSubscribe);
const PricingRoute = ownerFree(Pricing);
const SubscribeRoute = ownerFree(SubscribePage);

function Router() {
  // DIRECT ACCESS - NO AUTHENTICATION REQUIRED
  return (
    <Switch>
      <Route path="/" component={SimpleLanding} />
      <Route path="/clean" component={Clean} />
      <Route path="/subscribe" component={PayPalSubscribeRoute} />
      <Route path="/demo-subscribe" component={DemoSubscribeRoute} />
      <Route path="/quick-subscribe" component={QuickSubscribeRoute} />
      <Route path="/preview" component={PreviewDashboard} />
      <Route path="/home" component={Home} />
      <Route path="/stats" component={Stats} />
      <Route path="/profile" component={Profile} />
      <Route path="/organize" component={MediaOrganizer} />
      <Route path="/viral" component={Viral} />
      <Route path="/email" component={EmailClean} />
      <Route path="/icloud" component={iCloudClean} />
      <Route path="/pricing" component={PricingRoute} />
      <Route path="/referrals" component={ReferralDashboard} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/data-cleaner" component={DataCleaner} />
      <Route path="/optimizer" component={StorageOptimizer} />
      <Route path="/insights" component={StorageInsights} />
      <Route path="/spam-blocker" component={SpamBlocker} />
      <Route path="/spy-detector" component={SpyDetector} />
      <Route path="/viral" component={ViralShare} />
      <Route path="/real-cleaner" component={RealFileCleaner} />
      <Route path="/settings" component={Settings} />
      <Route path="/subscribe" component={SubscribeRoute} />
      <Route path="/owner" component={OwnerAccess} />
      <Route path="/owner-dashboard" component={OwnerDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Owner signed in or out: refetch the user so the server re-checks the owner token.
  useEffect(() => onOwnerChange(() => {
    queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
  }), []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div>
            <Toaster />
            <Router />
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
