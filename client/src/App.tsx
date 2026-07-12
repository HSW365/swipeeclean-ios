import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
// import { useAuth } from "@/hooks/useAuth"; // REMOVED - DIRECT ACCESS
import { ErrorBoundary } from "./ErrorBoundary";

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
import Settings from "@/pages/Settings";

import SpamBlocker from "@/pages/SpamBlocker";
import SpyDetector from "@/pages/SpyDetector";
import ViralShare from "@/pages/ViralShare";
import RealFileCleaner from "@/pages/RealFileCleaner";

function Router() {
  // DIRECT ACCESS - NO AUTHENTICATION REQUIRED
  return (
    <Switch>
      <Route path="/" component={SimpleLanding} />
      <Route path="/clean" component={Clean} />
      <Route path="/subscribe" component={PayPalSubscribe} />
      <Route path="/demo-subscribe" component={DemoSubscribe} />
      <Route path="/quick-subscribe" component={QuickSubscribe} />
      <Route path="/preview" component={PreviewDashboard} />
      <Route path="/home" component={Home} />
      <Route path="/stats" component={Stats} />
      <Route path="/profile" component={Profile} />
      <Route path="/organize" component={MediaOrganizer} />
      <Route path="/viral" component={Viral} />
      <Route path="/email" component={EmailClean} />
      <Route path="/icloud" component={iCloudClean} />
      <Route path="/pricing" component={Pricing} />
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
      <Route path="/subscribe" component={SubscribePage} />
      <Route path="/owner" component={OwnerAccess} />
      <Route path="/owner-dashboard" component={OwnerDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
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
