import { Link, useLocation } from "wouter";
import { Home, Zap, BarChart3, User, FolderOpen, Eye, Shield } from "lucide-react";

export default function BottomNavigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/clean", icon: Zap, label: "Clean" },
    { path: "/spam-blocker", icon: Shield, label: "Spam" },
    { path: "/spy-detector", icon: Eye, label: "Spy" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="max-w-md mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location === path;
            return (
              <Link key={path} href={path}>
                <button
                  className={`flex flex-col items-center py-2 px-3 transition-colors ${
                    isActive 
                      ? "text-primary" 
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <Icon size={20} className="mb-1" />
                  <span className={`text-xs ${isActive ? 'font-medium' : ''}`}>
                    {label}
                  </span>
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
