import { useState } from "react";
import { Settings as SettingsIcon, Save, Shield, Database, Mail, Bell, User, Lock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    errorAlerts: true,
    weeklyReports: false,
    autoBackup: true,
    dataRetention: "2-years",
    timezone: "america-central",
    maxFileSize: "50",
    allowedFormats: "xlsx,xls,csv",
    systemMaintenance: false
  });

  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your system settings have been updated successfully.",
    });
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Configure system preferences and operational parameters</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Settings */}
        <Card className="shadow-subtle">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Configure email alerts and system notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive updates via email</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(value) => updateSetting('emailNotifications', value)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Error Alerts</Label>
                <p className="text-sm text-muted-foreground">Instant alerts for critical errors</p>
              </div>
              <Switch
                checked={settings.errorAlerts}
                onCheckedChange={(value) => updateSetting('errorAlerts', value)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">Automated weekly summary reports</p>
              </div>
              <Switch
                checked={settings.weeklyReports}
                onCheckedChange={(value) => updateSetting('weeklyReports', value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="shadow-subtle">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Management
            </CardTitle>
            <CardDescription>
              Configure data storage and backup settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Backup</Label>
                <p className="text-sm text-muted-foreground">Automatic daily backups</p>
              </div>
              <Switch
                checked={settings.autoBackup}
                onCheckedChange={(value) => updateSetting('autoBackup', value)}
              />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Data Retention Period</Label>
              <Select 
                value={settings.dataRetention} 
                onValueChange={(value) => updateSetting('dataRetention', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-year">1 Year</SelectItem>
                  <SelectItem value="2-years">2 Years</SelectItem>
                  <SelectItem value="5-years">5 Years</SelectItem>
                  <SelectItem value="indefinite">Indefinite</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Timezone</Label>
              <Select 
                value={settings.timezone} 
                onValueChange={(value) => updateSetting('timezone', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="america-eastern">Eastern Time</SelectItem>
                  <SelectItem value="america-central">Central Time</SelectItem>
                  <SelectItem value="america-mountain">Mountain Time</SelectItem>
                  <SelectItem value="america-pacific">Pacific Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* File Upload Settings */}
        <Card className="shadow-subtle">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              File Upload Configuration
            </CardTitle>
            <CardDescription>
              Configure file upload limits and accepted formats
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Maximum File Size (MB)</Label>
              <Input
                type="number"
                value={settings.maxFileSize}
                onChange={(e) => updateSetting('maxFileSize', e.target.value)}
                placeholder="50"
              />
            </div>
            <div className="space-y-2">
              <Label>Allowed File Formats</Label>
              <Input
                value={settings.allowedFormats}
                onChange={(e) => updateSetting('allowedFormats', e.target.value)}
                placeholder="xlsx,xls,csv"
              />
              <p className="text-xs text-muted-foreground">
                Comma-separated list of file extensions
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="shadow-subtle">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security & Access
            </CardTitle>
            <CardDescription>
              Configure security and access control settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">Restrict system access for maintenance</p>
              </div>
              <Switch
                checked={settings.systemMaintenance}
                onCheckedChange={(value) => updateSetting('systemMaintenance', value)}
              />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Session Timeout</Label>
              <Select defaultValue="4-hours">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-hour">1 Hour</SelectItem>
                  <SelectItem value="4-hours">4 Hours</SelectItem>
                  <SelectItem value="8-hours">8 Hours</SelectItem>
                  <SelectItem value="24-hours">24 Hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Password Policy</Label>
              <Textarea
                placeholder="Minimum 8 characters, must include uppercase, lowercase, numbers, and special characters"
                rows={3}
                disabled
                className="resize-none"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Configuration */}
      <Card className="shadow-subtle">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Configuration
          </CardTitle>
          <CardDescription>
            Configure SMTP settings for email notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>SMTP Server</Label>
              <Input placeholder="smtp.example.com" />
            </div>
            <div className="space-y-2">
              <Label>Port</Label>
              <Input placeholder="587" />
            </div>
            <div className="space-y-2">
              <Label>Username</Label>
              <Input placeholder="notifications@company.com" />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label>From Name</Label>
              <Input placeholder="DrillLog Pro System" />
            </div>
            <div className="space-y-2">
              <Label>From Email</Label>
              <Input placeholder="noreply@company.com" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}