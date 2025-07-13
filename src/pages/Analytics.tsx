import { BarChart3, TrendingUp, Activity, MapPin, Calendar, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Analytics() {
  const performanceMetrics = [
    { label: "Total Operations", value: "1,247", change: "+12.5%", trend: "up" },
    { label: "Success Rate", value: "94.2%", change: "+2.1%", trend: "up" },
    { label: "Average Job Duration", value: "4.8 days", change: "-0.7 days", trend: "down" },
    { label: "Material Efficiency", value: "87.3%", change: "+5.2%", trend: "up" }
  ];

  const regionalData = [
    { state: "Texas", jobs: 387, completion: 96.2, supervisors: 12 },
    { state: "Louisiana", jobs: 242, completion: 93.8, supervisors: 8 },
    { state: "North Dakota", jobs: 189, completion: 91.5, supervisors: 6 },
    { state: "California", jobs: 156, completion: 95.1, supervisors: 5 },
    { state: "Oklahoma", jobs: 134, completion: 92.7, supervisors: 4 },
    { state: "Wyoming", jobs: 89, completion: 94.4, supervisors: 3 }
  ];

  const supervisorPerformance = [
    { name: "Mike Johnson", jobs: 47, success: 97.9, avgDuration: 4.2 },
    { name: "Sarah Williams", jobs: 32, success: 96.9, avgDuration: 4.5 },
    { name: "Robert Chen", jobs: 29, success: 93.1, avgDuration: 5.1 },
    { name: "Lisa Rodriguez", jobs: 28, success: 95.5, avgDuration: 4.3 },
    { name: "David Thompson", jobs: 25, success: 92.0, avgDuration: 5.8 }
  ];

  const materialUsage = [
    { item: "Drill Pipe", usage: 89.2, trend: "stable" },
    { item: "Casing", usage: 76.5, trend: "up" },
    { item: "Mud Pump", usage: 67.8, trend: "down" },
    { item: "BOP", usage: 82.1, trend: "up" },
    { item: "Fishing Tools", usage: 45.3, trend: "stable" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Performance insights and operational analytics</p>
        </div>
        <div className="flex items-center gap-4">
          <Select defaultValue="last-30-days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 days</SelectItem>
              <SelectItem value="last-30-days">Last 30 days</SelectItem>
              <SelectItem value="last-90-days">Last 90 days</SelectItem>
              <SelectItem value="last-year">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <Card key={index} className="shadow-subtle">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.label}
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <p className={`text-xs flex items-center gap-1 ${
                metric.trend === 'up' ? 'text-success' : 'text-destructive'
              }`}>
                <TrendingUp className={`h-3 w-3 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                {metric.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Performance */}
        <Card className="shadow-subtle">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Regional Performance
            </CardTitle>
            <CardDescription>Job completion rates by state</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {regionalData.map((region, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{region.state}</span>
                      <span className="text-sm text-muted-foreground">{region.jobs} jobs</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">{region.completion}%</div>
                      <div className="text-xs text-muted-foreground">{region.supervisors} supervisors</div>
                    </div>
                    <Badge variant={region.completion > 95 ? "default" : region.completion > 90 ? "secondary" : "destructive"}>
                      {region.completion > 95 ? "Excellent" : region.completion > 90 ? "Good" : "Needs Improvement"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Supervisor Performance */}
        <Card className="shadow-subtle">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Top Supervisors
            </CardTitle>
            <CardDescription>Performance rankings and metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supervisorPerformance.map((supervisor, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                      #{index + 1}
                    </div>
                    <div>
                      <span className="font-medium text-foreground">{supervisor.name}</span>
                      <div className="text-sm text-muted-foreground">{supervisor.jobs} jobs completed</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">{supervisor.success}% success</div>
                    <div className="text-xs text-muted-foreground">{supervisor.avgDuration} days avg</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Material Usage Analytics */}
      <Card className="shadow-subtle">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Material & Equipment Usage
          </CardTitle>
          <CardDescription>Usage patterns and efficiency metrics for materials and tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {materialUsage.map((material, index) => (
              <div key={index} className="p-4 border border-border rounded-lg text-center">
                <div className="text-lg font-bold text-foreground">{material.usage}%</div>
                <div className="text-sm font-medium text-foreground mt-1">{material.item}</div>
                <Badge 
                  variant={material.trend === 'up' ? 'default' : material.trend === 'down' ? 'destructive' : 'secondary'}
                  className="mt-2"
                >
                  {material.trend}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}