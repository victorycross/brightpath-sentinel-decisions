
import { Button } from "@/components/ui/button";
import { FileDown, FileSpreadsheet, Copy } from "lucide-react";
import { jsPDF } from "jspdf";
import { useToast } from "@/components/ui/use-toast";
import { 
  exceptionRequestFields, 
  exceptionRequestChoices 
} from "@/components/sharepoint/data/exceptionRequestFields";
import { 
  approversFields, 
  approverRoleChoices 
} from "@/components/sharepoint/data/approversFields";
import { approvalHistoryFields } from "@/components/sharepoint/data/approvalHistoryFields";

export function PageHeader() {
  const { toast } = useToast();

  const handleDownload = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.setTextColor(41, 98, 255);
    doc.text("SharePoint List Setup Guide", 20, 20);
    
    // Subtitle
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text("Complete guide to configure SharePoint lists for the Exception Management System", 20, 30);
    
    // Section: Lists Overview
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("1. Lists Required", 20, 45);
    
    doc.setFontSize(12);
    doc.text("• Exception Requests List: Stores all exception requests and their details", 25, 55);
    doc.text("• Exception Approvers List: Users who can approve exception requests", 25, 62);
    doc.text("• Exception Approval History List: Tracks the approval flow and history", 25, 69);
    
    // Exception Requests List Details
    doc.setFontSize(16);
    doc.text("2. Exception Requests List Configuration", 20, 85);
    
    let yPos = 95;
    doc.setFontSize(12);
    doc.text("Required Fields:", 25, yPos);
    yPos += 7;
    
    exceptionRequestFields.forEach(field => {
      if (field.required) {
        doc.text(`• ${field.name} (${field.type})`, 30, yPos);
        yPos += 7;
        
        // Prevent text from going off the page
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
      }
    });
    
    // Approvers List Details
    yPos += 5;
    doc.setFontSize(16);
    doc.text("3. Exception Approvers List Configuration", 20, yPos);
    yPos += 10;
    
    doc.setFontSize(12);
    doc.text("Required Fields:", 25, yPos);
    yPos += 7;
    
    approversFields.forEach(field => {
      if (field.required) {
        doc.text(`• ${field.name} (${field.type})`, 30, yPos);
        yPos += 7;
        
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
      }
    });
    
    // Approval History List Details
    yPos += 5;
    doc.setFontSize(16);
    doc.text("4. Exception Approval History List Configuration", 20, yPos);
    yPos += 10;
    
    doc.setFontSize(12);
    doc.text("Required Fields:", 25, yPos);
    yPos += 7;
    
    approvalHistoryFields.forEach(field => {
      if (field.required) {
        doc.text(`• ${field.name} (${field.type})`, 30, yPos);
        yPos += 7;
        
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
      }
    });
    
    // Choice Fields
    if (exceptionRequestChoices && exceptionRequestChoices.length > 0) {
      yPos += 5;
      doc.setFontSize(16);
      doc.text("5. Required Choice Field Values", 20, yPos);
      yPos += 10;
      
      doc.setFontSize(12);
      exceptionRequestChoices.forEach(choice => {
        doc.text(`${choice.title}:`, 25, yPos);
        yPos += 7;
        
        choice.options.forEach(option => {
          doc.text(`• ${option}`, 30, yPos);
          yPos += 7;
          
          if (yPos > 270) {
            doc.addPage();
            yPos = 20;
          }
        });
        
        yPos += 3;
      });
    }
    
    // Final notes
    yPos += 10;
    doc.setFontSize(14);
    doc.setTextColor(41, 98, 255);
    doc.text("Additional Notes", 20, yPos);
    yPos += 10;
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("• Ensure all lookup fields are properly connected between lists", 25, yPos);
    yPos += 7;
    doc.text("• Configure appropriate permissions for each list", 25, yPos);
    yPos += 7;
    doc.text("• Test the configuration with sample data before full deployment", 25, yPos);
    
    // Save the PDF
    doc.save("SharePoint_List_Setup_Guide.pdf");
    
    // Show success toast
    toast({
      title: "Guide Downloaded",
      description: "SharePoint List Setup Guide has been downloaded successfully.",
      duration: 3000,
    });
  };

  const handleCopyContent = () => {
    const content = `
# SharePoint List Setup Guide
Complete guide to configure SharePoint lists for the Exception Management System

## 1. Lists Required
• Exception Requests List: Stores all exception requests and their details
• Exception Approvers List: Users who can approve exception requests
• Exception Approval History List: Tracks the approval flow and history
`;

    navigator.clipboard.writeText(content);
    toast({
      title: "Content Copied",
      description: "Overview information has been copied to clipboard.",
      duration: 3000,
    });
  };

  const handleDownloadText = () => {
    const content = `
# SharePoint List Setup Guide
Complete guide to configure SharePoint lists for the Exception Management System

## 1. Lists Required
• Exception Requests List: Stores all exception requests and their details
• Exception Approvers List: Users who can approve exception requests
• Exception Approval History List: Tracks the approval flow and history
`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "SharePoint_Overview.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Text File Downloaded",
      description: "SharePoint overview has been downloaded as a text file.",
      duration: 3000,
    });
  };
  
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-muted/30 p-6 rounded-lg border animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold flex items-center text-primary">
          <FileSpreadsheet className="mr-3 h-8 w-8" />
          SharePoint List Setup Guide
        </h1>
        <p className="text-muted-foreground mt-2">
          Complete guide to configure SharePoint lists for the Exception Management System
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
        <Button variant="outline" size="sm" onClick={handleCopyContent}>
          <Copy className="mr-2 h-4 w-4" />
          Copy Overview
        </Button>
        <Button variant="outline" size="sm" onClick={handleDownloadText}>
          <FileDown className="mr-2 h-4 w-4" />
          Download as Text
        </Button>
        <Button className="mt-0" variant="default" onClick={handleDownload}>
          <FileDown className="mr-2 h-4 w-4" />
          Download Complete Guide
        </Button>
      </div>
    </div>
  );
}
