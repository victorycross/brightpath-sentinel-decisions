
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
  // This function would be implemented similarly to the others,
  // but we need the actual Copilot guide content which isn't available in the provided code
  // For now, we'll create a placeholder function that downloads a basic guide
  
  const copilotGuideContent = `# Copilot Studio Implementation Guide

## Overview
This guide provides instructions for setting up your Copilot Studio agent for the Exception Management System.

## Prerequisites
- Microsoft 365 account with Copilot Studio access
- Understanding of your exception management process
- SharePoint lists already set up (see SharePoint Setup Guide)

## Steps for Creating Your Copilot
1. Access Copilot Studio
2. Create a new Copilot
3. Configure the exception management topics
4. Connect to SharePoint lists
5. Test and publish your Copilot
6. Integrate with Power Apps

For detailed steps, please refer to the full Copilot Studio documentation.
`;

  // Create and download the file
  const blob = new Blob([copilotGuideContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Copilot_Complete_Guide.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
