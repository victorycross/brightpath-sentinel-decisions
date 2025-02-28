
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
    
    // Configure PDF document
    doc.setFont("helvetica");
    doc.setFontSize(12);
    
    // Add header
    doc.setFontSize(24);
    doc.setTextColor(214, 90, 18); // Primary color close to #D04A02
    doc.text("Exception Management System", 20, 20);
    doc.setFontSize(16);
    doc.setTextColor(235, 140, 0); // Secondary color close to #EB8C00
    doc.text("Requirements Documentation", 20, 30);
    
    // Add executive summary title
    doc.setFontSize(18);
    doc.setTextColor(214, 90, 18);
    doc.text("Executive Summary", 20, 45);
    
    // Reset to standard text color
    doc.setTextColor(0, 0, 0);
    
    // Purpose section
    doc.setFontSize(14);
    doc.setTextColor(235, 140, 0);
    doc.text("Purpose", 20, 55);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    
    const purposeText = "The Exception Management System streamlines the handling of compliance exceptions, " +
                      "policy deviations, and risk-related decisions across the organization. It creates " +
                      "a centralized platform that ensures all exceptions are properly documented, " +
                      "reviewed, approved, and monitored in accordance with regulatory requirements " +
                      "and internal policies.";
    
    const purposeLines = doc.splitTextToSize(purposeText, 170);
    let y = 60;
    purposeLines.forEach(line => {
      doc.text(line, 20, y);
      y += 5;
    });
    
    // Key Drivers section
    doc.setFontSize(14);
    doc.setTextColor(235, 140, 0);
    doc.text("Key Drivers", 20, y + 5);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    
    y += 10;
    doc.text("• Risk Mitigation: Ensure all exceptions are properly evaluated and their potential impact understood", 25, y);
    y += 5;
    doc.text("• Regulatory Compliance: Meet documentation and approval requirements for regulators", 25, y);
    y += 5;
    doc.text("• Audit Readiness: Maintain comprehensive records for internal and external audits", 25, y);
    y += 5;
    doc.text("• Operational Efficiency: Streamline approval workflows and reduce bottlenecks", 25, y);
    
    // Business Value section
    doc.setFontSize(14);
    doc.setTextColor(235, 140, 0);
    doc.text("Business Value", 20, y + 10);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    
    y += 15;
    doc.text("• 60% Reduction in exception processing time", 25, y);
    y += 5;
    doc.text("• 85% Improved audit compliance rates", 25, y);
    y += 5;
    doc.text("• 40% Decrease in risk incidents", 25, y);
    y += 5;
    doc.text("• 100% Exception traceability", 25, y);
    
    // Draw a separator line
    y += 10;
    doc.setDrawColor(214, 90, 18, 0.5);
    doc.line(20, y, 190, y);
    
    // Get the requirements content
    const lines = content.split('\n');
    let currentSection = "";
    
    // Add content starting from after our executive summary
    y += 15;
    
    // Process the content line by line
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // If we need a new page
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      
      // Skip empty lines
      if (line === '') continue;
      
      // Check if this is a main section header (starts with # )
      if (line.startsWith('# ')) {
        doc.setFontSize(18);
        doc.setTextColor(214, 90, 18);
        doc.text(line.substring(2), 20, y);
        y += 10;
        continue;
      }
      
      // Check if this is a section header (starts with ## )
      if (line.startsWith('## ')) {
        currentSection = line.substring(3);
        doc.setFontSize(16);
        doc.setTextColor(214, 90, 18);
        doc.text(currentSection, 20, y);
        y += 8;
        continue;
      }
      
      // Check if this is a subsection header (starts with ### )
      if (line.startsWith('### ')) {
        doc.setFontSize(14);
        doc.setTextColor(235, 140, 0);
        doc.text(line.substring(4), 20, y);
        y += 7;
        continue;
      }
      
      // Handle list items
      if (line.startsWith('- ')) {
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        const bulletedLine = "• " + line.substring(2);
        const wrappedLines = doc.splitTextToSize(bulletedLine, 165);
        wrappedLines.forEach((wrappedLine, index) => {
          if (index === 0) {
            doc.text(wrappedLine, 25, y);
          } else {
            doc.text(wrappedLine, 27, y); // Indent continuation lines
          }
          y += 5;
        });
        continue;
      }
      
      // Handle nested list items
      if (line.startsWith('  - ')) {
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        const bulletedLine = "  ◦ " + line.substring(4);
        const wrappedLines = doc.splitTextToSize(bulletedLine, 160);
        wrappedLines.forEach((wrappedLine, index) => {
          if (index === 0) {
            doc.text(wrappedLine, 30, y);
          } else {
            doc.text(wrappedLine, 32, y); // Indent continuation lines
          }
          y += 5;
        });
        continue;
      }
      
      // Handle numbered list items (1., 2., etc.)
      if (/^\d+\./.test(line)) {
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        const wrappedLines = doc.splitTextToSize(line, 165);
        wrappedLines.forEach((wrappedLine, index) => {
          if (index === 0) {
            doc.text(wrappedLine, 25, y);
          } else {
            doc.text(wrappedLine, 27, y); // Indent continuation lines
          }
          y += 5;
        });
        continue;
      }
      
      // Handle regular text
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      const wrappedLines = doc.splitTextToSize(line, 170);
      wrappedLines.forEach(wrappedLine => {
        doc.text(wrappedLine, 20, y);
        y += 5;
      });
    }
    
    // Save the PDF
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

        {/* Executive Summary Section */}
        <Card className="p-6 border-none shadow-md bg-gradient-to-r from-primary/5 to-secondary/5 mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">Executive Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="text-xl font-medium text-secondary">Purpose</h3>
              <p className="text-sm leading-relaxed">
                The Exception Management System streamlines the handling of compliance exceptions, 
                policy deviations, and risk-related decisions across the organization. It creates 
                a centralized platform that ensures all exceptions are properly documented, 
                reviewed, approved, and monitored in accordance with regulatory requirements 
                and internal policies.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-medium text-secondary">Key Drivers</h3>
              <ul className="text-sm space-y-2 list-disc pl-5">
                <li><span className="font-medium">Risk Mitigation</span>: Ensure all exceptions are properly evaluated and their potential impact understood</li>
                <li><span className="font-medium">Regulatory Compliance</span>: Meet documentation and approval requirements for regulators</li>
                <li><span className="font-medium">Audit Readiness</span>: Maintain comprehensive records for internal and external audits</li>
                <li><span className="font-medium">Operational Efficiency</span>: Streamline approval workflows and reduce bottlenecks</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-medium text-secondary">Business Value</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-primary/10 rounded-lg p-3 flex flex-col items-center text-center">
                  <span className="font-bold text-lg">60%</span>
                  <span>Reduction in exception processing time</span>
                </div>
                <div className="bg-secondary/10 rounded-lg p-3 flex flex-col items-center text-center">
                  <span className="font-bold text-lg">85%</span>
                  <span>Improved audit compliance rates</span>
                </div>
                <div className="bg-secondary/10 rounded-lg p-3 flex flex-col items-center text-center">
                  <span className="font-bold text-lg">40%</span>
                  <span>Decrease in risk incidents</span>
                </div>
                <div className="bg-primary/10 rounded-lg p-3 flex flex-col items-center text-center">
                  <span className="font-bold text-lg">100%</span>
                  <span>Exception traceability</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

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
