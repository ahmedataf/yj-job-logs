import { useState } from "react";
import { Download as DownloadIcon, FileText, Calendar, Filter, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Download() {
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState("last-30-days");
  const [searchTerm, setSearchTerm] = useState("");

  const reportTypes = [
    {
      id: "job-logs",
      name: "Complete Job Logs Report",
      description: "All job logs with customer, supervisor, and operational details",
      size: "2.4 MB",
      lastGenerated: "2024-01-15 10:30 AM"
    },
    {
      id: "supervisor-summary",
      name: "Supervisor Performance Summary",
      description: "Performance metrics and completion rates by supervisor",
      size: "1.1 MB",
      lastGenerated: "2024-01-15 09:15 AM"
    },
    {
      id: "customer-analysis",
      name: "Customer Analysis Report",
      description: "Customer activity, locations, and job frequency analysis",
      size: "3.2 MB",
      lastGenerated: "2024-01-15 08:45 AM"
    },
    {
      id: "materials-inventory",
      name: "Materials & Tools Usage",
      description: "Inventory tracking and usage patterns for materials and tools",
      size: "1.8 MB",
      lastGenerated: "2024-01-14 05:30 PM"
    },
    {
      id: "error-analysis",
      name: "Error Analysis Report",
      description: "Data validation errors and system issues breakdown",
      size: "0.8 MB",
      lastGenerated: "2024-01-14 03:20 PM"
    },
    {
      id: "regional-breakdown",
      name: "Regional Operations Breakdown",
      description: "Job distribution and performance by state and region",
      size: "2.1 MB",
      lastGenerated: "2024-01-14 02:10 PM"
    }
  ];

  const handleReportSelection = (reportId: string, checked: boolean) => {
    if (checked) {
      setSelectedReports([...selectedReports, reportId]);
    } else {
      setSelectedReports(selectedReports.filter(id => id !== reportId));
    }
  };

  const selectAllReports = () => {
    if (selectedReports.length === reportTypes.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(reportTypes.map(report => report.id));
    }
  };

  const downloadSelected = () => {
    if (selectedReports.length === 0) return;
    
    // Simulate download
    selectedReports.forEach(reportId => {
      const report = reportTypes.find(r => r.id === reportId);
      if (report) {
        console.log(`Downloading: ${report.name}`);
      }
    });
  };

  const filteredReports = reportTypes.filter(report =>
    report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Download Reports</h1>
        <p className="text-muted-foreground">Generate and download comprehensive reports for your drilling operations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters */}
        <Card className="shadow-subtle">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Date Range</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 days</SelectItem>
                  <SelectItem value="last-90-days">Last 90 days</SelectItem>
                  <SelectItem value="last-year">Last year</SelectItem>
                  <SelectItem value="all-time">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Format</label>
              <Select defaultValue="excel">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Button 
                onClick={downloadSelected} 
                disabled={selectedReports.length === 0}
                className="w-full"
              >
                <DownloadIcon className="w-4 h-4 mr-2" />
                Download Selected ({selectedReports.length})
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reports List */}
        <Card className="lg:col-span-3 shadow-subtle">
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
            <CardDescription>
              Select reports to download. All reports are generated based on your current filter settings.
            </CardDescription>
            <div className="flex items-center gap-4 pt-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" onClick={selectAllReports}>
                {selectedReports.length === reportTypes.length ? 'Deselect All' : 'Select All'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <div key={report.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <Checkbox
                    checked={selectedReports.includes(report.id)}
                    onCheckedChange={(checked) => handleReportSelection(report.id, checked as boolean)}
                  />
                  <FileText className="w-8 h-8 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{report.name}</h3>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {report.size}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Last generated: {report.lastGenerated}
                      </span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleReportSelection(report.id, !selectedReports.includes(report.id))}
                  >
                    <DownloadIcon className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}