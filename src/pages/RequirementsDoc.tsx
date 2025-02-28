
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
    // Create a new PDF document
    const doc = new jsPDF();
    
    // Configure PDF document
    doc.setFont("helvetica");
    doc.setFontSize(12);
    
    // Add document title - simple and clean
    doc.setFontSize(24);
    doc.setTextColor(214, 90, 18); // Primary color
    doc.text("Exception Management System", 20, 20);
    
    // Add subtitle - simple and clean
    doc.setFontSize(16);
    doc.setTextColor(100, 100, 100); 
    doc.text("Requirements Documentation", 20, 30);
    
    // Document info - simplified
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Version: 1.0", 20, 40);
    doc.text("Date: " + new Date().toLocaleDateString(), 20, 45);
    
    // Add a separator line
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(20, 50, 190, 50);
    
    // Table of contents - simplified
    let y = 60;
    doc.setFontSize(14);
    doc.setTextColor(214, 90, 18);
    doc.text("Contents", 20, y);
    y += 10;
    
    // Simplified table of contents - note: removed Technical Requirements
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    
    const tocItems = [
      { name: "Executive Summary", page: 1 },
      { name: "Business Requirements", page: 2 },
      { name: "Workflow Requirements", page: 3 }
    ];
    
    tocItems.forEach(item => {
      doc.text(item.name, 25, y);
      doc.text(item.page.toString(), 190, y);
      y += 6;
    });
    
    y += 15;
    
    // Executive Summary Section - clean and simple
    doc.setFontSize(16);
    doc.setTextColor(214, 90, 18);
    doc.text("Executive Summary", 20, y);
    y += 8;
    
    // Purpose section - simplified
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    
    const purposeText = "The Exception Management System streamlines the handling of compliance exceptions, " +
                      "policy deviations, and risk-related decisions across the organization. It creates " +
                      "a centralized platform that ensures all exceptions are properly documented, " +
                      "reviewed, approved, and monitored in accordance with regulatory requirements " +
                      "and internal policies.";
    
    const purposeLines = doc.splitTextToSize(purposeText, 170);
    purposeLines.forEach(line => {
      doc.text(line, 20, y);
      y += 6;
    });
    
    // Key Drivers section - simplified list
    y += 6;
    doc.setFontSize(12);
    doc.setTextColor(214, 90, 18);
    doc.text("Key Drivers", 20, y);
    doc.setTextColor(0, 0, 0);
    y += 8;
    
    // Simple bullet list
    const drivers = [
      "Risk Mitigation: Ensure all exceptions are properly evaluated and their potential impact understood",
      "Regulatory Compliance: Meet documentation and approval requirements for regulators",
      "Audit Readiness: Maintain comprehensive records for internal and external audits",
      "Operational Efficiency: Streamline approval workflows and reduce bottlenecks"
    ];
    
    drivers.forEach(driver => {
      const driverLines = doc.splitTextToSize("• " + driver, 165);
      driverLines.forEach((line, i) => {
        doc.text(line, i === 0 ? 20 : 22, y);
        y += 6;
      });
    });
    
    // Business Value section - simplified list with measurable context
    y += 6;
    doc.setFontSize(12);
    doc.setTextColor(214, 90, 18);
    doc.text("Business Value & Measurable Outcomes", 20, y);
    doc.setTextColor(0, 0, 0);
    y += 8;
    
    // Detailed metrics with measurable context
    const metrics = [
      "60% Reduction in exception processing time (from avg. 12 days to 4.8 days)",
      "85% Improved audit compliance rates (from 68% compliance to 98% compliance)",
      "40% Decrease in risk incidents (from avg. 25 per quarter to 15 per quarter)",
      "100% Exception traceability (up from 76% trackable exceptions)"
    ];
    
    metrics.forEach(metric => {
      const metricLines = doc.splitTextToSize("• " + metric, 165);
      metricLines.forEach((line, i) => {
        doc.text(line, i === 0 ? 20 : 22, y);
        y += 6;
      });
    });
    
    // Current state vs. future state
    y += 6;
    doc.setFontSize(12);
    doc.setTextColor(214, 90, 18);
    doc.text("Current vs. Future State", 20, y);
    doc.setTextColor(0, 0, 0);
    y += 8;
    
    const stateComparison = "The current manual exception management process requires an average of 45 minutes " +
                           "of administrative time per request and involves 7 handoffs between departments. " +
                           "The EMS will reduce administrative time to 15 minutes per request (67% reduction) " +
                           "and decrease handoffs to 3 automated touchpoints, resulting in estimated annual " +
                           "savings of 2,800 staff hours and $210,000 in operational costs.";
    
    const stateLines = doc.splitTextToSize(stateComparison, 170);
    stateLines.forEach(line => {
      doc.text(line, 20, y);
      y += 6;
    });
    
    // Move to next page for detailed requirements
    doc.addPage();
    
    // Parse the markdown content
    const content = getRequirementsMarkdown();
    const lines = content.split('\n');
    
    // Initialize y position on new page
    y = 20;
    
    // Add section header for business requirements - simple
    doc.setFontSize(16);
    doc.setTextColor(214, 90, 18);
    doc.text("Business Requirements", 20, y);
    y += 10;
    
    // Process the requirements line by line with simple formatting
    let inBusinessRequirements = false;
    let inWorkflowRequirements = false;
    let skipSection = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip document title and empty lines
      if (line === '' || line.startsWith('# Exception Management')) continue;
      
      // Check for section headers
      if (line.startsWith('## Business Requirements')) {
        inBusinessRequirements = true;
        inWorkflowRequirements = false;
        skipSection = false;
        continue;
      } else if (line.startsWith('## Workflow Requirements')) {
        // Start a new page for workflow requirements
        doc.addPage();
        y = 20;
        doc.setFontSize(16);
        doc.setTextColor(214, 90, 18);
        doc.text("Workflow Requirements", 20, y);
        y += 10;
        
        inBusinessRequirements = false;
        inWorkflowRequirements = true;
        skipSection = false;
        continue;
      } else if (line.startsWith('## Technical Requirements')) {
        // Skip technical requirements section
        skipSection = true;
        continue;
      }
      
      // Skip processing if we're in the technical requirements section
      if (skipSection) continue;
      
      // Check if we need a new page
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      
      // Process subsection headers (### becomes bold text)
      if (line.startsWith('### ')) {
        doc.setFontSize(12);
        doc.setTextColor(214, 90, 18);
        doc.text(line.substring(4), 20, y);
        y += 8;
        continue;
      }
      
      // Handle list items - convert markdown bullets to proper formatting
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
      
      // Handle numbered workflow items - simple numbered format
      if (inWorkflowRequirements && /^\d+\./.test(line)) {
        const numMatch = line.match(/^(\d+)\.\s*(.*)/);
        if (numMatch && numMatch.length >= 3) {
          const num = numMatch[1];
          const text = numMatch[2];
          
          doc.setFontSize(10);
          doc.setTextColor(0, 0, 0);
          
          // Draw step text
          const wrappedLines = doc.splitTextToSize(`${num}. ${text}`, 165);
          wrappedLines.forEach((wrappedLine, index) => {
            doc.text(wrappedLine, index === 0 ? 25 : 30, y);
            y += 5;
          });
          
          y += 3;
          continue;
        }
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
    
    // Add simple footer to all pages
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      
      // Simple footer
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("Exception Management System Requirements", 20, 290);
      
      // Page numbers
      doc.text(`Page ${i} of ${pageCount}`, 180, 290);
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
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="bg-primary/10 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Processing Time</span>
                    <span className="font-bold text-lg text-primary">60%</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Current: ~12 days</span>
                    <span>Target: 4.8 days</span>
                  </div>
                </div>
                <div className="bg-secondary/10 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Audit Compliance</span>
                    <span className="font-bold text-lg text-secondary">85%</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Current: 68%</span>
                    <span>Target: 98%</span>
                  </div>
                </div>
                <div className="bg-secondary/10 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Risk Incidents</span>
                    <span className="font-bold text-lg text-secondary">40%</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Current: ~25/qtr</span>
                    <span>Target: 15/qtr</span>
                  </div>
                </div>
                <div className="bg-primary/10 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Traceability</span>
                    <span className="font-bold text-lg text-primary">100%</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Current: 76%</span>
                    <span>Target: 100%</span>
                  </div>
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-3 text-xs">
                <p className="font-medium mb-1">Operational Impact:</p>
                <p>Current process: 45 min/request, 7 handoffs between departments</p>
                <p>Future state: 15 min/request, 3 automated touchpoints</p>
                <p className="mt-1 font-medium">Annual Savings: 2,800 staff hours (~$210,000)</p>
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
