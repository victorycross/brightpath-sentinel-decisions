import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileDown, File, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BusinessRequirements } from "@/components/requirements/BusinessRequirements";
import { WorkflowRequirements } from "@/components/requirements/WorkflowRequirements";
import { TechnicalRequirements } from "@/components/requirements/TechnicalRequirements";
import { getRequirementsMarkdown } from "@/utils/requirementsExport";
import jsPDF from "jspdf";
import { Document, Packer, Paragraph, HeadingLevel } from "docx";

export const RequirementsDoc = () => {
  const { toast } = useToast();

  const handleMarkdownExport = () => {
    const content = getRequirementsMarkdown();
    
    const blob = new Blob([content], { type: "text/markdown" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "exception_management_requirements.md";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Documentation Exported",
      description: "Requirements documentation has been downloaded as a Markdown file.",
    });
  };

  const handlePdfExport = () => {
    const doc = new jsPDF();
    const content = getRequirementsMarkdown();
    
    doc.setFont("helvetica");
    doc.setFontSize(12);
    
    doc.setFontSize(16);
    doc.text("Exception Management System", 20, 20);
    doc.setFontSize(14);
    doc.text("Requirements Documentation", 20, 30);
    
    doc.setFontSize(12);
    
    const lines = doc.splitTextToSize(content, 170);
    
    let y = 40;
    lines.forEach(line => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, 20, y);
      y += 7;
    });
    
    doc.save("exception_management_requirements.pdf");

    toast({
      title: "Documentation Exported",
      description: "Requirements documentation has been downloaded as a PDF file.",
    });
  };

  const handleWordExport = async () => {
    const content = getRequirementsMarkdown();
    
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: "Exception Management System",
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            text: "Requirements Documentation",
            heading: HeadingLevel.HEADING_2,
          }),
          ...content.split('\n').map(line => 
            new Paragraph({
              text: line.trim(),
            })
          ),
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "exception_management_requirements.docx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Documentation Exported",
      description: "Requirements documentation has been downloaded as a Word document.",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card className="p-6 md:p-8 bg-gradient-to-br from-card to-secondary/10 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Exception Management System
            </h1>
            <p className="text-muted-foreground mt-2">
              Comprehensive Requirements Documentation
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleMarkdownExport} className="gap-2 shadow-lg hover:shadow-xl transition-all">
              <FileDown className="h-4 w-4" />
              Export to MD
            </Button>
            <Button onClick={handlePdfExport} variant="secondary" className="gap-2 shadow-lg hover:shadow-xl transition-all">
              <File className="h-4 w-4" />
              Export to PDF
            </Button>
            <Button onClick={handleWordExport} variant="outline" className="gap-2 shadow-lg hover:shadow-xl transition-all">
              <FileText className="h-4 w-4" />
              Export to Word
            </Button>
          </div>
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BusinessRequirements />
            <div className="space-y-6">
              <WorkflowRequirements />
              <TechnicalRequirements />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
