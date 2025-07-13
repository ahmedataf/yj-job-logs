import { useState } from "react";
import { Plus, Search, MoreVertical, Edit, Trash2, Shield, User, UserCheck, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const users = [
    {
      id: 1,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      role: "Senior Supervisor",
      department: "Field Operations",
      status: "Active",
      lastActive: "2 hours ago",
      jobsCompleted: 47,
      avatar: "MJ"
    },
    {
      id: 2,
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      role: "Field Supervisor",
      department: "Field Operations",
      status: "Active",
      lastActive: "1 hour ago",
      jobsCompleted: 32,
      avatar: "SW"
    },
    {
      id: 3,
      name: "Robert Chen",
      email: "robert.chen@example.com",
      role: "Operations Manager",
      department: "Management",
      status: "Active",
      lastActive: "30 minutes ago",
      jobsCompleted: 89,
      avatar: "RC"
    },
    {
      id: 4,
      name: "Lisa Rodriguez",
      email: "lisa.rodriguez@example.com",
      role: "Field Supervisor",
      department: "Field Operations",
      status: "Inactive",
      lastActive: "2 days ago",
      jobsCompleted: 28,
      avatar: "LR"
    },
    {
      id: 5,
      name: "David Thompson",
      email: "david.thompson@example.com",
      role: "Data Analyst",
      department: "Analytics",
      status: "Active",
      lastActive: "5 minutes ago",
      jobsCompleted: 15,
      avatar: "DT"
    },
    {
      id: 6,
      name: "Jennifer Lee",
      email: "jennifer.lee@example.com",
      role: "Safety Coordinator",
      department: "Safety",
      status: "Active",
      lastActive: "1 hour ago",
      jobsCompleted: 23,
      avatar: "JL"
    }
  ];

  const getRoleIcon = (role: string) => {
    if (role.includes("Manager")) return Shield;
    if (role.includes("Supervisor")) return UserCheck;
    return User;
  };

  const getRoleBadge = (role: string) => {
    if (role.includes("Manager")) return "destructive";
    if (role.includes("Senior")) return "default";
    if (role.includes("Supervisor")) return "secondary";
    return "outline";
  };

  const getStatusBadge = (status: string) => {
    return status === "Active" ? "default" : "secondary";
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">User Management</h1>
        <p className="text-muted-foreground">Manage system users, roles, and permissions</p>
      </div>

      <Card className="shadow-subtle">
        <CardHeader>
          <CardTitle>System Users</CardTitle>
          <CardDescription>
            Manage user accounts, roles, and access permissions for the drilling operations system
          </CardDescription>
          <div className="flex items-center gap-4 pt-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search users by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Create a new user account for the drilling operations system
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter email address" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="supervisor">Field Supervisor</SelectItem>
                        <SelectItem value="senior-supervisor">Senior Supervisor</SelectItem>
                        <SelectItem value="manager">Operations Manager</SelectItem>
                        <SelectItem value="analyst">Data Analyst</SelectItem>
                        <SelectItem value="coordinator">Safety Coordinator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="field-ops">Field Operations</SelectItem>
                        <SelectItem value="management">Management</SelectItem>
                        <SelectItem value="analytics">Analytics</SelectItem>
                        <SelectItem value="safety">Safety</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1">Create User</Button>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Jobs Completed</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => {
                const RoleIcon = getRoleIcon(user.role);
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary font-medium">
                            {user.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <RoleIcon className="w-4 h-4 text-muted-foreground" />
                        <Badge variant={getRoleBadge(user.role)}>
                          {user.role}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadge(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{user.jobsCompleted}</TableCell>
                    <TableCell className="text-muted-foreground">{user.lastActive}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Edit className="w-4 h-4" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            Manage Permissions
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                            <Trash2 className="w-4 h-4" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}