import { useState } from "react";
import { Upload as UploadIcon, FileText, AlertTriangle, CheckCircle, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

export default function Upload() {
  const [files, setFiles] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const newFiles = selectedFiles.map((file, index) => ({
      id: Date.now() + index,
      file,
      status: 'pending',
      progress: 0,
      errors: []
    }));
    setFiles([...files, ...newFiles]);
  };

  const processFiles = async () => {
    setUploading(true);
    
    for (let i = 0; i < files.length; i++) {
      if (files[i].status === 'pending') {
        // Simulate file processing
        setFiles(prev => prev.map((f, idx) => 
          idx === i ? { ...f, status: 'processing', progress: 0 } : f
        ));

        // Simulate progress
        for (let progress = 0; progress <= 100; progress += 20) {
          await new Promise(resolve => setTimeout(resolve, 200));
          setFiles(prev => prev.map((f, idx) => 
            idx === i ? { ...f, progress } : f
          ));
        }

        // Simulate validation results
        const hasErrors = Math.random() > 0.7; // 30% chance of errors
        const errors = hasErrors ? [
          'Missing supervisor name in row 5',
          'Invalid zip code format in row 12',
          'Missing material description in row 8'
        ] : [];

        setFiles(prev => prev.map((f, idx) => 
          idx === i ? { 
            ...f, 
            status: hasErrors ? 'error' : 'success',
            progress: 100,
            errors
          } : f
        ));
      }
    }
    
    setUploading(false);
    toast({
      title: "Upload completed",
      description: "All files have been processed. Check results below.",
    });
  };

  const removeFile = (id: number) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case 'processing':
        return <div className="w-4 h-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />;
      default:
        return <FileText className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge variant="default">Success</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      case 'processing':
        return <Badge variant="secondary">Processing</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Upload Data</h1>
        <p className="text-muted-foreground">Import Excel sheets containing job logs and supervisor data</p>
      </div>

      <Card className="shadow-subtle">
        <CardHeader>
          <CardTitle>Excel File Upload</CardTitle>
          <CardDescription>
            Upload Excel files containing customer information, supervisor details, observations, and materials used
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed border-border rounded-lg p-8">
            <div className="text-center">
              <UploadIcon className="mx-auto h-12 w-12 text-muted-foreground" />
              <div className="mt-4">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-sm font-medium text-foreground">Click to upload files</span>
                  <span className="text-sm text-muted-foreground"> or drag and drop</span>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Supports Excel files (.xlsx, .xls) and CSV files
                </p>
              </div>
            </div>
          </div>

          {files.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Uploaded Files</h3>
                <Button 
                  onClick={processFiles} 
                  disabled={uploading || files.every(f => f.status !== 'pending')}
                >
                  Process Files
                </Button>
              </div>

              {files.map((fileItem) => (
                <Card key={fileItem.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(fileItem.status)}
                      <div>
                        <p className="font-medium text-sm">{fileItem.file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(fileItem.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      {getStatusBadge(fileItem.status)}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(fileItem.id)}
                      disabled={fileItem.status === 'processing'}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {fileItem.status === 'processing' && (
                    <div className="mt-3">
                      <Progress value={fileItem.progress} className="w-full" />
                      <p className="text-xs text-muted-foreground mt-1">
                        Processing... {fileItem.progress}%
                      </p>
                    </div>
                  )}

                  {fileItem.errors.length > 0 && (
                    <div className="mt-3">
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          <div className="space-y-1">
                            <p className="font-medium">Validation Errors Found:</p>
                            <ul className="list-disc list-inside space-y-1">
                              {fileItem.errors.map((error: string, index: number) => (
                                <li key={index} className="text-sm">{error}</li>
                              ))}
                            </ul>
                          </div>
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}

          <Alert>
            <FileText className="h-4 w-4" />
            <AlertDescription>
              <strong>Required Excel columns:</strong> Customer Name, State, Zip Code, Supervisor Name, 
              Well Name, Date, Materials Used, Tools Used, Observations, Status
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}