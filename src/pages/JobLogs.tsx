import { useState } from "react";
import { Search, Filter, MoreVertical, Eye, Edit, Trash2, Download } from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function JobLogs() {
  const [searchTerm, setSearchTerm] = useState("");

  const jobLogs = [
    {
      id: "JL-2024-001",
      customer: "Texas Oil Corporation",
      wellName: "Permian Basin Well #47",
      supervisor: "Mike Johnson",
      state: "Texas",
      zipCode: "79701",
      status: "Completed",
      date: "2024-01-15",
      tools: ["Drill Pipe", "Fishing Tool", "Casing"],
      observations: "Successful completion of drilling operation"
    },
    {
      id: "JL-2024-002", 
      customer: "Gulf Coast Energy",
      wellName: "Offshore Platform Alpha",
      supervisor: "Sarah Williams",
      state: "Louisiana",
      zipCode: "70112",
      status: "In Progress",
      date: "2024-01-14",
      tools: ["Mud Pump", "BOP", "Rotary Table"],
      observations: "Ongoing drilling at 8,500 ft depth"
    },
    {
      id: "JL-2024-003",
      customer: "Rocky Mountain Oil",
      wellName: "Bakken Shale Site 12",
      supervisor: "Robert Chen",
      state: "North Dakota",
      zipCode: "58801",
      status: "Under Review",
      date: "2024-01-13",
      tools: ["Hydraulic Fracturing Unit", "Proppant"],
      observations: "Awaiting geological survey results"
    },
    {
      id: "JL-2024-004",
      customer: "California Energy Corp",
      wellName: "Central Valley Well #23",
      supervisor: "Lisa Rodriguez",
      state: "California",
      zipCode: "93230",
      status: "Completed",
      date: "2024-01-12",
      tools: ["Electric Pump", "Tubing", "Packer"],
      observations: "Production test completed successfully"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "default";
      case "In Progress":
        return "secondary";
      case "Under Review":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const filteredLogs = jobLogs.filter(log =>
    log.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.wellName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.supervisor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Job Logs</h1>
        <p className="text-muted-foreground">Manage and review all drilling operation logs</p>
      </div>

      <Card className="shadow-subtle">
        <CardHeader>
          <CardTitle>Job Log Database</CardTitle>
          <CardDescription>
            Complete record of all drilling operations and supervisor observations
          </CardDescription>
          <div className="flex items-center gap-4 pt-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by customer, well name, supervisor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <Button className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Well Name</TableHead>
                <TableHead>Supervisor</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.id}</TableCell>
                  <TableCell>{log.customer}</TableCell>
                  <TableCell>{log.wellName}</TableCell>
                  <TableCell>{log.supervisor}</TableCell>
                  <TableCell>{log.state}, {log.zipCode}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(log.status)}>
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Edit className="w-4 h-4" />
                          Edit Log
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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