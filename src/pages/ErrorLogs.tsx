import { useState } from "react";
import { AlertTriangle, Search, Calendar, Filter, RefreshCw, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ErrorLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");

  const errorLogs = [
    {
      id: "ERR-001",
      timestamp: "2024-01-15 14:23:45",
      severity: "High",
      source: "Excel Parser",
      message: "Missing supervisor name in row 5 of well_data_batch_12.xlsx",
      file: "well_data_batch_12.xlsx",
      resolved: false
    },
    {
      id: "ERR-002",
      timestamp: "2024-01-15 13:45:12",
      severity: "Medium",
      source: "Data Validation",
      message: "Invalid zip code format '7970' in customer record for Texas Oil Corp",
      file: "customer_update_jan15.xlsx",
      resolved: true
    },
    {
      id: "ERR-003",
      timestamp: "2024-01-15 12:30:28",
      severity: "Low",
      source: "Upload Process",
      message: "File size exceeds recommended limit (15.2MB > 10MB)",
      file: "complete_logs_Q4_2023.xlsx",
      resolved: false
    },
    {
      id: "ERR-004",
      timestamp: "2024-01-15 11:15:33",
      severity: "High",
      source: "Database",
      message: "Connection timeout while saving job log JL-2024-047",
      file: "system_operation",
      resolved: true
    },
    {
      id: "ERR-005",
      timestamp: "2024-01-15 10:22:41",
      severity: "Medium",
      source: "Excel Parser",
      message: "Unknown material type 'Custom Drill Bit X12' in materials column",
      file: "materials_inventory_jan.xlsx",
      resolved: false
    },
    {
      id: "ERR-006",
      timestamp: "2024-01-15 09:45:17",
      severity: "Low",
      source: "User Authentication",
      message: "Multiple login attempts detected for user: supervisor.mike@company.com",
      file: "auth_system",
      resolved: true
    },
    {
      id: "ERR-007",
      timestamp: "2024-01-15 08:33:52",
      severity: "High",
      source: "Data Validation",
      message: "Duplicate job ID 'JL-2024-033' found in uploaded data",
      file: "job_logs_weekly.xlsx",
      resolved: false
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "destructive";
      case "Medium":
        return "secondary";
      case "Low":
        return "outline";
      default:
        return "outline";
    }
  };

  const getSeverityIcon = (severity: string) => {
    return <AlertTriangle className={`w-4 h-4 ${
      severity === "High" ? "text-destructive" : 
      severity === "Medium" ? "text-warning" : "text-muted-foreground"
    }`} />;
  };

  const filteredErrors = errorLogs.filter(error => {
    const matchesSearch = error.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         error.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         error.file.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         error.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = severityFilter === "all" || error.severity.toLowerCase() === severityFilter;
    
    return matchesSearch && matchesSeverity;
  });

  const errorStats = {
    total: errorLogs.length,
    high: errorLogs.filter(e => e.severity === "High").length,
    medium: errorLogs.filter(e => e.severity === "Medium").length,
    low: errorLogs.filter(e => e.severity === "Low").length,
    resolved: errorLogs.filter(e => e.resolved).length,
    unresolved: errorLogs.filter(e => !e.resolved).length
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Error Logs</h1>
        <p className="text-muted-foreground">Monitor and manage system errors and data validation issues</p>
      </div>

      {/* Error Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="shadow-subtle">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{errorStats.total}</div>
            <p className="text-xs text-muted-foreground">Total Errors</p>
          </CardContent>
        </Card>
        <Card className="shadow-subtle">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-destructive">{errorStats.high}</div>
            <p className="text-xs text-muted-foreground">High Severity</p>
          </CardContent>
        </Card>
        <Card className="shadow-subtle">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">{errorStats.medium}</div>
            <p className="text-xs text-muted-foreground">Medium Severity</p>
          </CardContent>
        </Card>
        <Card className="shadow-subtle">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-muted-foreground">{errorStats.low}</div>
            <p className="text-xs text-muted-foreground">Low Severity</p>
          </CardContent>
        </Card>
        <Card className="shadow-subtle">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">{errorStats.resolved}</div>
            <p className="text-xs text-muted-foreground">Resolved</p>
          </CardContent>
        </Card>
        <Card className="shadow-subtle">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{errorStats.unresolved}</div>
            <p className="text-xs text-muted-foreground">Unresolved</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-subtle">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Error Log Database
          </CardTitle>
          <CardDescription>
            System errors, validation issues, and processing failures
          </CardDescription>
          <div className="flex items-center gap-4 pt-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search errors by message, source, or file..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="high">High Only</SelectItem>
                <SelectItem value="medium">Medium Only</SelectItem>
                <SelectItem value="low">Low Only</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Error ID</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>File</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredErrors.map((error) => (
                <TableRow key={error.id}>
                  <TableCell className="font-medium">{error.id}</TableCell>
                  <TableCell className="text-sm">{error.timestamp}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getSeverityIcon(error.severity)}
                      <Badge variant={getSeverityColor(error.severity)}>
                        {error.severity}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{error.source}</TableCell>
                  <TableCell className="max-w-md">
                    <p className="text-sm truncate" title={error.message}>
                      {error.message}
                    </p>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{error.file}</TableCell>
                  <TableCell>
                    <Badge variant={error.resolved ? "default" : "destructive"}>
                      {error.resolved ? "Resolved" : "Open"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}