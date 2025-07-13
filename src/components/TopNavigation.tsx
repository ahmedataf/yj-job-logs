import { BarChart3, FileText, Upload, Users, Settings, Home, Download, AlertTriangle } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Job Logs", url: "/logs", icon: FileText },
  { title: "Upload Data", url: "/upload", icon: Upload },
  { title: "Download Reports", url: "/download", icon: Download },
  { title: "Users", url: "/users", icon: Users },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Error Logs", url: "/errors", icon: AlertTriangle },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function TopNavigation() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="mb-8">
      {/* Brand Header */}
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-elegant">
            <FileText className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-foreground">DrillLog Pro</span>
            <span className="text-sm text-muted-foreground">Oil Well Management System</span>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="bg-card rounded-lg border border-border shadow-subtle p-4">
        <div className="flex flex-wrap gap-2">
          {navigationItems.map((item) => (
            <Button
              key={item.title}
              variant={isActive(item.url) ? "default" : "ghost"}
              size="sm"
              className={`hover-scale transition-all ${
                isActive(item.url) 
                  ? "shadow-oil" 
                  : "hover:bg-muted hover:shadow-subtle"
              }`}
              asChild
            >
              <NavLink
                to={item.url}
                className="flex items-center gap-2 px-4 py-2"
              >
                <item.icon className="w-4 h-4" />
                <span className="font-medium">{item.title}</span>
              </NavLink>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}