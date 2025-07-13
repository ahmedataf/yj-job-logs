import { BarChart3, TrendingUp, Users, FileText, AlertTriangle, CheckCircle, Upload, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Job Logs",
      value: "1,247",
      change: "+12.5%",
      icon: FileText,
      trend: "up"
    },
    {
      title: "Active Supervisors",
      value: "28",
      change: "+2 this month",
      icon: Users,
      trend: "up"
    },
    {
      title: "Pending Reviews",
      value: "43",
      change: "-8.2%",
      icon: AlertTriangle,
      trend: "down"
    },
    {
      title: "Completed Jobs",
      value: "892",
      change: "+15.3%",
      icon: CheckCircle,
      trend: "up"
    }
  ];

  const recentActivities = [
    { id: 1, action: "New job log uploaded", supervisor: "Mike Johnson", time: "2 minutes ago", status: "success" },
    { id: 2, action: "Error in Excel parsing", file: "well_data_batch_12.xlsx", time: "15 minutes ago", status: "error" },
    { id: 3, action: "Supervisor profile updated", supervisor: "Sarah Williams", time: "1 hour ago", status: "info" },
    { id: 4, action: "Job log validated", customer: "Texas Oil Corp", time: "2 hours ago", status: "success" },
    { id: 5, action: "New user registered", user: "Robert Chen", time: "3 hours ago", status: "info" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your drilling operations and job logs</p>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-subtle hover:shadow-oil transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Common tasks and operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button asChild className="flex-1 hover-scale">
              <Link to="/upload" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Job Log File
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1 hover-scale">
              <Link to="/analytics" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                View Analytics
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-subtle hover:shadow-oil transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className={`text-xs flex items-center gap-1 ${
                stat.trend === 'up' ? 'text-success' : 'text-destructive'
              }`}>
                <TrendingUp className={`h-3 w-3 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 shadow-subtle">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest updates and system events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant={
                      activity.status === 'success' ? 'default' : 
                      activity.status === 'error' ? 'destructive' : 'secondary'
                    } className="w-2 h-2 p-0 rounded-full" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.supervisor || activity.file || activity.user || activity.customer}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Error Logs */}
        <Card className="shadow-subtle">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Recent Error Logs
            </CardTitle>
            <CardDescription>Latest system errors and warnings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-2 border border-border rounded-lg">
              <div className="flex items-center gap-2">
                <Badge variant="destructive" className="w-2 h-2 p-0 rounded-full" />
                <span className="text-sm text-foreground">Excel parsing failed</span>
              </div>
              <span className="text-xs text-muted-foreground">2 mins ago</span>
            </div>
            <div className="flex items-center justify-between p-2 border border-border rounded-lg">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full" />
                <span className="text-sm text-foreground">Missing supervisor data</span>
              </div>
              <span className="text-xs text-muted-foreground">15 mins ago</span>
            </div>
            <div className="flex items-center justify-between p-2 border border-border rounded-lg">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full" />
                <span className="text-sm text-foreground">Upload timeout</span>
              </div>
              <span className="text-xs text-muted-foreground">1 hour ago</span>
            </div>
            <Button variant="outline" size="sm" asChild className="w-full mt-3">
              <Link to="/errors" className="flex items-center gap-2">
                View All Errors
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}