
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Download, Info, ArrowRight, CheckCircle, Code, Bot, Database, Puzzle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { downloadAllCopilotGuides } from "@/components/sharepoint/utils/downloadUtils";

export function CopilotGuide() {
  const { toast } = useToast();

  const copyToClipboard = (text: string, itemName: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${itemName} has been copied to your clipboard.`,
    });
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast({
      title: "File Downloaded",
      description: `${filename} has been downloaded.`,
    });
  };

  // Copilot Overview Guide
  const copilotOverviewContent = `# Copilot Studio Implementation Guide

## Overview
This guide provides detailed instructions for setting up your Copilot Studio agent for the Exception Management System.

## Prerequisites
- Microsoft 365 account with Copilot Studio access (E3/E5 license or Copilot Studio add-on)
- Understanding of your exception management process
- SharePoint lists already set up (see SharePoint Setup Guide)
- Power App created (see Power App Guide)

## Steps for Creating Your Copilot
1. Access Copilot Studio
2. Create a new Copilot
3. Configure the exception management topics
4. Connect to SharePoint lists
5. Test and publish your Copilot
6. Integrate with Power Apps

## What You'll Build
A conversational AI agent that can:
- Answer questions about exception policies
- Help users create new exception requests
- Check on status of existing exceptions
- Guide approvers through the review process
- Provide summaries of exceptions by type, status, and risk level
`;

  // Copilot Setup Guide
  const copilotSetupGuide = `# Beginner's Guide: Setting Up Copilot Studio

## Step 1: Access Copilot Studio
1. Go to https://copilotstudio.microsoft.com/
2. Sign in with your Microsoft 365 account
3. If this is your first time, you'll be prompted to accept terms and conditions
4. You'll land on the Copilot Studio home page

## Step 2: Create a New Copilot
1. Click "Create a Copilot" (or "New" button)
2. Enter basic information:
   - Name: "Exception Management Assistant"
   - Description: "AI assistant for managing exception requests"
   - Select your language(s)
   - Choose a base template (Optional: select "Customer Service" if available)
   - Click "Create"

## Step 3: Configure Core Topics
Copilots are organized around "Topics" - conversation paths that help users accomplish tasks.

1. In your new Copilot, go to the "Topics" section
2. Create the following essential topics:
   
   **Greeting Topic**
   - Trigger phrases: "hello", "hi", "start", "begin"
   - Response: "Welcome to the Exception Management Assistant. I can help you create new exception requests, check status, or answer policy questions. What would you like to do today?"
   
   **Create Exception Request Topic**
   - Trigger phrases: "create request", "new exception", "submit exception", "start request"
   - Add nodes to collect required information:
     - Exception type
     - Description
     - Business justification
     - Risk level
     - Timeframe needed
   - End with confirmation and next steps
   
   **Check Status Topic**
   - Trigger phrases: "check status", "my requests", "request update"
   - Add nodes to identify the user and fetch their requests
   - Show status information
   
   **Policy Information Topic**
   - Trigger phrases: "policy", "guidelines", "requirements", "help"
   - Provide information about exception policies
   - Link to formal documentation

## Step 4: Create Advanced Topics
Once you have the basic topics working, add more sophisticated capabilities:

1. **Request Details Topic**
   - Allow users to ask about specific requests by ID
   - Show full details including approval status
   
2. **Approver View Topic**
   - Help approvers find requests needing their review
   - Provide context and recommendations
   
3. **Reporting Topic**
   - Show summaries of exception data
   - Allow filtering by type, status, date range

## Step 5: Connect to Data Sources
1. Go to "Data" section in Copilot Studio
2. Add SharePoint connection:
   - Click "Add data source"
   - Select "SharePoint"
   - Connect to your SharePoint site
   - Select your Exception Requests list
   - Map the fields to entities in your Copilot
   
3. Add Power Automate connection (for actions):
   - Click "Add data source" 
   - Select "Power Automate"
   - Create or select Flows for:
     - Creating a new request
     - Updating request status
     - Sending notifications

## Step 6: Create Actions
Actions allow your Copilot to do things for users.

1. Go to "Actions" section
2. Create "Create Exception Request" action:
   - Connect to your Power Automate flow
   - Define input parameters (request details)
   - Set up confirmation messages
   
3. Create "Approve/Reject Request" action:
   - Allow approvers to take action directly in the chat
   - Add security checks to verify approver permissions
   - Send confirmation emails

## Step 7: Test Your Copilot
1. Click "Test your Copilot" button
2. Try various conversation paths:
   - Creating a new request
   - Checking status
   - Asking policy questions
   - Using actions
3. Test for edge cases and errors
4. Refine responses based on testing

## Step 8: Deploy and Integrate
1. When ready, click "Publish" to make your Copilot live
2. Go to Settings to get your Copilot ID for Power Apps integration
3. Follow the Power Apps guide to add your Copilot to your app
`;

  // Copilot Advanced Customization Guide
  const copilotAdvancedGuide = `# Advanced Guide: Enhancing Your Copilot

## Custom Variables and Context
1. Create variables to track conversation context:
   - Go to "Variables" section
   - Add variables like "CurrentRequestID" or "UserRole"
   - Use them to maintain state across topics

2. Set up context handoffs:
   - Pass variables between topics using "SetVariable" actions
   - Allow multi-step processes to work seamlessly

## Entity Recognition
1. Create custom entities for your domain:
   - "ExceptionType" with prebuilt values
   - "RiskLevel" with associated thresholds
   - "ApproverRole" with department mapping

2. Train your Copilot to recognize entities:
   - Add example utterances with entity values
   - Test and refine recognition accuracy

## Natural Language Understanding Improvements
1. Add alternative phrasings:
   - For each topic, add varied ways users might ask
   - Include industry-specific terminology
   - Account for spelling variations and shorthand

2. Configure fallback mechanisms:
   - Create a robust "None" topic to handle unrecognized queries
   - Add clarifying questions to disambiguate
   - Provide guidance when confused

## Power Automate Integration
1. Create advanced flows:
   - Multi-stage approval processes
   - Conditional notifications based on risk level
   - Automatic document generation

2. Expose flow outputs to Copilot:
   - Return rich data to display in chat
   - Format for readability
   - Include next step guidance

## SharePoint Integration Tips
1. Use advanced query techniques:
   - Filter by multiple criteria
   - Use OData query parameters
   - Implement sorting and pagination

2. Optimize for performance:
   - Cache frequently accessed data
   - Limit result sets
   - Use indexed columns

## Security Best Practices
1. Implement proper authentication:
   - Verify user identity for sensitive operations
   - Check permissions before showing data
   - Log access attempts

2. Handle sensitive information:
   - Don't display full IDs or confidential data
   - Mask sensitive fields in responses
   - Follow data retention policies

## Testing and Analytics
1. Set up comprehensive testing:
   - Create test cases for all user journeys
   - Include edge cases and error conditions
   - Test with different user roles

2. Monitor Copilot performance:
   - Review conversation analytics
   - Identify common failure points
   - Continuously improve based on user interactions
`;

  // Copilot Tips and Best Practices
  const copilotBestPracticesGuide = `# Tips and Best Practices for Copilot Studio

## Conversation Design
1. **Keep Responses Brief**: Users prefer concise answers. Aim for 1-3 sentences unless more detail is explicitly needed.

2. **Use Progressive Disclosure**: Start with basic information, then offer to provide more details if the user wants them.

3. **Provide Clear Options**: When offering choices, limit to 3-5 options and make them distinctive.

4. **Maintain Personality**: Create a consistent voice and tone that reflects your brand.

5. **Acknowledge Uncertainty**: When your Copilot isn't sure, it should admit that rather than guessing.

## Error Handling
1. **Graceful Failures**: Design helpful responses when things go wrong.

2. **Suggest Alternatives**: If a user's request can't be fulfilled, suggest what they can do instead.

3. **Provide Escape Hatches**: Always give users a way to talk to a human if needed.

4. **Track Common Errors**: Review conversation logs to identify and fix frequent issues.

## Performance Optimization
1. **Limit External Calls**: Minimize the number of data source queries per conversation.

2. **Cache Where Possible**: Store commonly accessed information to speed up responses.

3. **Implement Timeouts**: Add proper error handling for slow external systems.

4. **Test Under Load**: Verify your Copilot performs well with multiple simultaneous users.

## Continuous Improvement
1. **Review Conversation Logs**: Regularly examine real conversations to identify improvement areas.

2. **Add New Trigger Phrases**: Continuously expand the ways users can invoke each topic.

3. **Refine Entity Recognition**: Improve accuracy by adding misrecognized phrases as examples.

4. **Solicit User Feedback**: Add a feedback mechanism at the end of conversations.

## Integration Tips
1. **Seamless Context Passing**: When integrating with Power Apps, pass relevant context to make conversations more natural.

2. **Minimize Authentication Friction**: Design flows that require minimal re-authentication.

3. **Consistent Experience**: Ensure visual style and tone match between your app and Copilot.

4. **Cross-Channel Support**: Consider how your Copilot can be accessed from different entry points (Teams, web, mobile).
`;

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card className="p-6 md:p-8 bg-gradient-to-br from-card to-secondary/10 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Copilot Studio Implementation Guide
            </h1>
            <p className="text-muted-foreground mt-2">
              Building an AI assistant for your Exception Management System
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => downloadFile(copilotOverviewContent, "copilot-guide-overview.txt")}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download Overview
            </Button>
            <Button 
              onClick={downloadAllCopilotGuides}
              className="gap-2"
              variant="default"
            >
              <Download className="h-4 w-4" />
              Download All Files
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-6">
            <TabsTrigger value="overview">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
                <span className="sm:hidden">Overview</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="setup">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                <span className="hidden sm:inline">Setup Guide</span>
                <span className="sm:hidden">Setup</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="advanced">
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                <span className="hidden sm:inline">Advanced Guide</span>
                <span className="sm:hidden">Advanced</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="bestpractices">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Best Practices</span>
                <span className="sm:hidden">Tips</span>
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Copilot Studio Overview</CardTitle>
                <CardDescription>
                  Understanding the capabilities of your Exception Management Copilot
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md mb-4 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm">{copilotOverviewContent}</pre>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <Card className="p-4 border border-primary/20">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Info className="w-4 h-4 mr-2 text-blue-500" /> Key Components
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Topics for handling different conversation paths</li>
                      <li>Actions that connect to Power Automate flows</li>
                      <li>Data connections to SharePoint lists</li>
                      <li>Natural language understanding capability</li>
                      <li>Integration with Power Apps and Teams</li>
                    </ul>
                  </Card>
                  <Card className="p-4 border border-secondary/20">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <ArrowRight className="w-4 h-4 mr-2 text-green-500" /> Business Benefits
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>24/7 availability for exception requests</li>
                      <li>Consistent policy guidance</li>
                      <li>Reduced time to process exception requests</li>
                      <li>Simplified approver experience</li>
                      <li>Enhanced governance and compliance</li>
                    </ul>
                  </Card>
                </div>
                
                <div className="flex justify-end gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => copyToClipboard(copilotOverviewContent, "Copilot overview")}
                    className="gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Overview
                  </Button>
                  <Button 
                    onClick={() => downloadFile(copilotOverviewContent, "copilot-overview.txt")}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Overview
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="setup" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Copilot Studio Setup</CardTitle>
                <CardDescription>
                  Step-by-step guide to creating your Exception Management Copilot
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md mb-4 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm">{copilotSetupGuide}</pre>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <Card className="p-4 border border-primary/20">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Essential Topics
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Greeting and introduction</li>
                      <li>Exception request creation</li>
                      <li>Request status checking</li>
                      <li>Policy information and guidance</li>
                      <li>Approver-specific functionality</li>
                    </ul>
                  </Card>
                  <Card className="p-4 border border-secondary/20">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <ArrowRight className="w-4 h-4 mr-2 text-blue-500" /> Integration Points
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>SharePoint lists for data storage</li>
                      <li>Power Automate for workflows</li>
                      <li>Power Apps for user interface</li>
                      <li>Microsoft Teams for collaboration</li>
                      <li>Email for notifications</li>
                    </ul>
                  </Card>
                </div>
                
                <div className="flex justify-end gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => copyToClipboard(copilotSetupGuide, "Copilot setup guide")}
                    className="gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Guide
                  </Button>
                  <Button 
                    onClick={() => downloadFile(copilotSetupGuide, "copilot-setup-guide.txt")}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Copilot Customization</CardTitle>
                <CardDescription>
                  Taking your Copilot to the next level with advanced features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md mb-4 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm">{copilotAdvancedGuide}</pre>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <Card className="p-4 border border-primary/20">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Advanced Features
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Custom entities for specific domain concepts</li>
                      <li>Complex multi-turn conversations</li>
                      <li>Advanced Power Automate integrations</li>
                      <li>Security and compliance controls</li>
                      <li>Robust fallback mechanisms</li>
                    </ul>
                  </Card>
                  <Card className="p-4 border border-secondary/20">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <ArrowRight className="w-4 h-4 mr-2 text-blue-500" /> Customization Areas
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Natural language understanding</li>
                      <li>Context management</li>
                      <li>Data integration patterns</li>
                      <li>Error handling strategies</li>
                      <li>Authentication and security</li>
                    </ul>
                  </Card>
                </div>
                
                <div className="flex justify-end gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => copyToClipboard(copilotAdvancedGuide, "Advanced Copilot guide")}
                    className="gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Guide
                  </Button>
                  <Button 
                    onClick={() => downloadFile(copilotAdvancedGuide, "copilot-advanced-guide.txt")}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bestpractices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Best Practices</CardTitle>
                <CardDescription>
                  Tips and tricks for building effective Copilot solutions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md mb-4 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm">{copilotBestPracticesGuide}</pre>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="conversation">
                    <AccordionTrigger>Conversation Design Tips</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li><strong>Keep it brief:</strong> Users prefer concise responses</li>
                        <li><strong>Use a consistent voice:</strong> Maintain a consistent personality</li>
                        <li><strong>Provide clear options:</strong> Limit choices to 3-5 items</li>
                        <li><strong>Progressive disclosure:</strong> Start simple, allow drilling deeper</li>
                        <li><strong>Set expectations:</strong> Be clear about what your Copilot can and can't do</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="errors">
                    <AccordionTrigger>Error Handling Strategies</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li><strong>Graceful degradation:</strong> Have fallbacks when services are unavailable</li>
                        <li><strong>Clear error messages:</strong> Explain what went wrong in user terms</li>
                        <li><strong>Suggest alternatives:</strong> Provide other options when primary path fails</li>
                        <li><strong>Human escalation:</strong> Always provide a way to reach a human</li>
                        <li><strong>Learn from errors:</strong> Track common failures to improve your Copilot</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="testing">
                    <AccordionTrigger>Testing and Improvement</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li><strong>Test with real users:</strong> Have actual users try your Copilot</li>
                        <li><strong>Review transcripts:</strong> Regularly analyze conversation logs</li>
                        <li><strong>Track satisfaction:</strong> Implement feedback mechanisms</li>
                        <li><strong>Measure outcomes:</strong> Set KPIs for your Copilot</li>
                        <li><strong>Continuous improvement:</strong> Regularly update based on usage patterns</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <div className="flex justify-end gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => copyToClipboard(copilotBestPracticesGuide, "Copilot best practices")}
                    className="gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Guide
                  </Button>
                  <Button 
                    onClick={() => downloadFile(copilotBestPracticesGuide, "copilot-best-practices.txt")}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
