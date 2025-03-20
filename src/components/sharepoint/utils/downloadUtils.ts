export function downloadAllSharePointGuides() {
  // Generate all content for the guides
  const architectureContent = `# SharePoint List Architecture Overview

The Exception Management System requires several SharePoint lists to store and manage data effectively. This guide will walk you through setting up each list with the correct fields and configurations.

For optimal performance and integration with Power Apps and Copilot, we recommend creating these lists in a dedicated SharePoint site. This approach helps organize your data and simplifies permissions management.

## Prerequisites
- SharePoint Online site with admin or owner permissions
- Basic understanding of SharePoint list creation
- Microsoft 365 account with appropriate licenses
`;

  const listConfigurationsContent = `# SharePoint List Configurations

## Exception Requests List
The primary list that stores all exception requests and their details

### List Configuration Instructions
1. Navigate to your SharePoint site
2. Click on "New" and select "List"
3. Name the list "Exception Requests"
4. Add a description: "Stores all exception requests and their details"
5. Click "Create"

## Approvers List
Stores information about users who can approve exception requests

### List Configuration Instructions
1. Navigate to your SharePoint site
2. Click on "New" and select "List"
3. Name the list "Exception Approvers"
4. Add a description: "Users who can approve exception requests"
5. Click "Create"

## Exception Approval History List
Tracks the approval flow and history for each exception request

### List Configuration Instructions
1. Navigate to your SharePoint site
2. Click on "New" and select "List"
3. Name the list "Exception Approval History"
4. Add a description: "Tracks the approval flow and history"
5. Click "Create"
`;

  const additionalTipsContent = `# Additional Configuration Tips
Best practices for optimizing your SharePoint lists

## Creating Indexes
For better performance, create indexes on frequently queried fields:
- Status field in Exception Requests list
- SubmittedBy field in Exception Requests list
- RequestID field in Exception Approval History list
- ApproverRole fields in both Approvers and Approval History lists

## Validation Settings
Add column validation to enforce data quality:
- For ExpiryDate: [ExpiryDate] > [SubmittedDate]
- Ensure Title fields have minimum length requirements

## Versioning
Enable versioning on all lists to track changes over time:
1. Go to List Settings
2. Click on "Versioning settings"
3. Select "Create a version each time you edit an item in this list"
4. Set the number of versions to keep (recommend: 10)
5. Click "OK"

## Power App Integration
These SharePoint lists are designed to work seamlessly with the Power App and Copilot implementation described in the Power App Setup and Copilot Guide pages. The field names and types are specifically chosen to facilitate easy integration.

## Pro Tip
After creating your lists, consider creating a few test items to verify your configuration. This will help you identify any issues before connecting to Power Apps and Copilot.
`;

  const exportTemplateContent = `# SharePoint Template Export Guide

This guide explains how to export your existing SharePoint lists as templates to reuse in other sites or environments.

## Exporting a List Template

1. Navigate to the SharePoint list you want to export
2. Click on the gear icon (⚙️) in the top right corner
3. Select "List settings"
4. In the list settings page, click on "Save list as template" under Permissions and Management
5. Fill in the following details:
   - File Name: A name for the template file (e.g., ExceptionRequests)
   - Template Name: A descriptive name (e.g., Exception Requests List Template)
   - Template Description: Brief description of the list purpose
6. Choose whether to include content (if you want to include sample data)
7. Click "OK"

The template will be saved to the List Template Gallery of your site.

## Downloading the List Template

1. Go to the Site Settings page
2. Under Web Designer Galleries, click "List templates"
3. Find your template in the gallery
4. Click on the template name
5. When prompted, save the .stp file to your computer

## Importing a List Template

1. Navigate to the destination site
2. Go to Site Settings
3. Under Web Designer Galleries, click "List templates"
4. Click "Upload" and browse to your .stp file
5. Once uploaded, go to the site where you want to create the list
6. Click on the gear icon (⚙️) and select "Add an app"
7. Your template should appear in the apps list - click on it to create a new list

## Considerations

- List templates may include custom columns, views, and forms
- Some list elements might not transfer perfectly to different site collections
- Consider using PnP Provisioning for more complex scenarios
- For best results, keep column names consistent across your organization
`;

  // Combine all content
  const allContent = `# SharePoint Setup Guide for Exception Management System

${architectureContent}

${listConfigurationsContent}

${additionalTipsContent}

${exportTemplateContent}
`;

  // Create and download the file
  const blob = new Blob([allContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "SharePoint_Complete_Setup_Guide.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadAllPowerAppGuides() {
  // Generate all content for the Power App guides
  const powerAppSetupGuide = `
# Beginner's Guide: Setting Up Your Power App

## Prerequisites
1. Make sure you have a Microsoft 365 account with appropriate licenses
2. Ensure you have access to Power Apps (check with your IT admin if unsure)
3. Make sure your Copilot Studio agent is already created and published

## Step 1: Access Power Apps
1. Open your web browser
2. Go to https://make.powerapps.com/
3. Sign in with your Microsoft 365 account
4. If this is your first time, you might need to accept terms and conditions

## Step 2: Create a New Canvas App
1. On the Power Apps home page, click "Create" in the left navigation
2. Select "Canvas app from blank"
3. Enter "Exception Management App" as the name
4. Choose "Tablet" format (gives you more screen space to work with)
5. Click "Create" to continue

## Step 3: Set Up Your App Interface
1. In the canvas editor, you'll see a blank screen
2. In the left panel, click on "Insert" to add components
3. Add a header by inserting a rectangle at the top:
   - Click "Rectangle" in the shapes menu
   - Position it at the top of the screen
   - Set its fill color to your brand color
4. Add a title by inserting a label:
   - Click "Text label" in the controls menu
   - Position it in the header
   - Change the text to "Exception Management System"
   - Adjust font size, color, and alignment as needed

## Step 4: Create Navigation
1. Add a navigation panel on the left:
   - Insert another rectangle on the left side of the screen
   - Make it full height but about 1/5 of the screen width
   - Set its fill color slightly different from the header
2. Add navigation buttons:
   - Insert buttons for: "Dashboard", "Create Request", "My Requests", "Approvals"
   - Position them vertically in the navigation panel
   - Customize their appearance
   - For each button, set the OnSelect property to navigate to the respective screen

## Step 5: Add Screens
1. Add new screens for each section:
   - Click "New screen" in the top navigation
   - Create screens for: Dashboard, Create Request, My Requests, Approvals
2. Set up navigation between screens:
   - Go back to your buttons
   - Edit the OnSelect property for each button to use Navigate() function
   - Example: Navigate(Dashboard, ScreenTransition.Fade)

## Step 6: Integrate with SharePoint Lists
1. Connect to your data:
   - Click "Data" in the left sidebar
   - Click "Add data" and search for "SharePoint"
   - Connect to your SharePoint site
   - Select the "ExceptionRequests" list you created for your Copilot
2. Create a gallery to display requests:
   - Insert a "Vertical gallery" control on your My Requests screen
   - In the Properties panel, set the data source to your SharePoint list
   - Customize how each item appears in the gallery

## Step 7: Create Form for New Requests
1. On your Create Request screen:
   - Insert a Form control
   - Connect it to your ExceptionRequests SharePoint list
   - Add the relevant fields for your exception request
2. Add a Submit button:
   - Insert a button below the form
   - Set its OnSelect property to submit the form
   - Example: SubmitForm(RequestForm); Navigate(MyRequests, ScreenTransition.Cover)
`;

  const copilotIntegrationGuide = `
# Beginner's Guide: Integrating Copilot with Your Power App

## What is Power Apps Integration?
Connecting your Copilot to Power Apps allows users to interact with your Copilot directly within your app.

## Step 1: Prepare Your Copilot
1. Make sure your Copilot is already set up in Copilot Studio
2. Ensure it's published and working correctly
3. Test it independently before integration

## Step 2: Add the Copilot Component
1. In your Power App canvas, click "Insert" in the left menu
2. Scroll down to "AI" section or search for "Copilot"
3. Select "Copilot" from the options
4. Draw the Copilot chat area on your canvas where you want it to appear
5. You may need to resize it to fit your design

## Step 3: Configure the Copilot Connection
1. With the Copilot component selected, look at the Properties panel
2. Find the "CopilotId" property
3. Enter the ID of your Copilot
   - You can find this in Copilot Studio under your Copilot's settings
   - It will look something like "12345678-abcd-1234-efgh-123456789012"
4. Set other properties like:
   - Height and width
   - DefaultOpen (true/false)
   - WelcomeMessage

## Step 4: Add Context Variables
1. To make your Copilot aware of what's happening in your app:
   - Create global variables in your app to track context
   - Example: Set(CurrentView, "Dashboard") when a user navigates to dashboard
2. Pass these variables to Copilot:
   - With the Copilot component selected
   - Add a custom parameter in the advanced properties
   - Name it something like "AppContext"
   - Value: CurrentView

## Step 5: Enable Actions from Copilot
1. Create functions in your app that Copilot can call:
   - Add a new Flow from the Power Automate section
   - Configure the Flow to perform actions like creating a new request
   - Make the Flow callable from Copilot
2. Connect these actions to your Copilot in Copilot Studio:
   - In Copilot Studio, add a new Action
   - Connect it to your Power Automate Flow
   - Configure input/output parameters

## Step 6: Test the Integration
1. Preview your app by clicking the "Play" button in the top right
2. Test the Copilot by:
   - Opening the Copilot interface
   - Asking questions about exceptions
   - Trying to create a new request through Copilot
   - Testing context awareness (does it know which screen you're on?)

## Step 7: Refine and Publish
1. Make adjustments based on testing:
   - Adjust Copilot positioning and size
   - Refine the interactions and context passing
   - Add more actions if needed
2. Publish your app:
   - Click "File" > "Save" to save your changes
   - Click "Publish" to make it available to users
   - Share the app with relevant users in your organization
`;

  const powerAutomateGuide = `
# Beginner's Guide: Adding Power Automate Flows to Your App

## What are Power Automate Flows?
Power Automate Flows allow you to automate actions and processes between your app and other services, like approval workflows.

## Step 1: Access Power Automate
1. Open your web browser
2. Go to https://flow.microsoft.com/
3. Sign in with your Microsoft 365 account
4. If this is your first time, you might need to accept terms and conditions

## Step 2: Create an Approval Flow
1. Click "Create" in the left menu
2. Select "Automated cloud flow"
3. Give your flow a name like "Exception Request Approval"
4. For trigger, search and select "When an item is created or modified (SharePoint)"
5. Click "Create"

## Step 3: Configure the Trigger
1. In the flow editor, configure the SharePoint trigger:
   - Site Address: (select your SharePoint site)
   - List Name: "ExceptionRequests"
   - Trigger Condition: Status eq 'Pending'
2. Click "New step" to add the next action

## Step 4: Add an Approval Action
1. Search for "Approvals" in the actions search box
2. Select "Start and wait for an approval"
3. Configure the approval:
   - Approval type: Approve/Reject - First to respond
   - Title: "Exception Request: " & trigger('SharePoint').Title
   - Assigned to: Use the assigned approver's email from your SharePoint item
   - Details: Include relevant details from the exception request

## Step 5: Add Conditional Actions
1. Click "New step" and search for "Condition"
2. Set up the condition to check the approval outcome:
   - Left side: outputs('Start_and_wait_for_an_approval')?['outcome']
   - Operator: is equal to
   - Right side: 'Approve'
3. In the "If yes" branch:
   - Add a "Update item" action for SharePoint
   - Update the Status field to "Approved"
4. In the "If no" branch:
   - Add a "Update item" action for SharePoint
   - Update the Status field to "Rejected"

## Step 6: Add Notification Actions
1. In both branches, add an email notification:
   - Search for "Send an email" action
   - Configure the email with appropriate recipient, subject, and body
   - Include the approval outcome and any comments

## Step 7: Save and Test Your Flow
1. Click "Save" at the bottom or top of the screen
2. Test your flow by creating a new exception request in SharePoint
3. Monitor the flow run to ensure it works as expected
4. Fix any issues that arise during testing

## Step 8: Integrate with Your Power App
1. In your Power App, modify your form submission:
   - The flow will trigger automatically when a new SharePoint item is created
   - No additional configuration needed if using the same SharePoint list
2. To trigger the flow manually from the app:
   - Add a "Power Automate" connection in your app
   - Choose your flow from the list
   - Configure any required inputs
`;

  // Combine all content
  const allContent = `# Power Apps Implementation Guide

Building an Exception Management System with Power Apps, Copilot, and SharePoint

## Power App Setup
${powerAppSetupGuide}

## Copilot Integration
${copilotIntegrationGuide}

## Power Automate Integration
${powerAutomateGuide}
`;

  // Create and download the file
  const blob = new Blob([allContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Power_Apps_Complete_Guide.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadAllCopilotGuides() {
  // Generate all content for the Copilot guides
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

  // Combine all content
  const allContent = `# Complete Copilot Studio Implementation Guide

${copilotOverviewContent}

${copilotSetupGuide}

${copilotAdvancedGuide}

${copilotBestPracticesGuide}
`;

  // Create and download the file
  const blob = new Blob([allContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Copilot_Complete_Guide.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
