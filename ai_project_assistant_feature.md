# AI Project Assistant Feature

## Overview

The AI Project Assistant is a feature designed to streamline the process of posting jobs on the Dev Jobs Platform. It provides a conversational interface for clients to input project details, which are then used to create a job post. The assistant also integrates with external systems to update project status and trigger additional workflows.

## Key Components

- **Frontend (Assistant UI)**: The user interface where clients interact with the AI Project Assistant. It includes a chat interface for inputting project details.
- **Slot Engine (State Machine)**: Manages the conversation flow, extracting intents and filling slots with project details.
- **Generators**: Responsible for creating project titles, descriptions, skills, milestones, and budget estimates based on the collected information.
- **Local Storage**: Stores the assistant state and job draft data locally.
- **Post Job Wizard**: A multi-step form that finalizes the job posting process.
- **Backend API**: Handles job creation and updates on the server.
- **Analytics**: Tracks user interactions and assistant performance.
- **GoHighLevel Opportunity Pipeline**: Updates the opportunity status in the GoHighLevel CRM.
- **GitHub Pages**: Triggers builds for documentation, wireframes, and prototypes.
- **Developer Team Email**: Sends notifications and outputs to the development team.

## Workflow

1. **Session Start**: The user opens the AI Project Assistant, initializing the session and preparing the UI.
2. **Initial Idea**: The user provides an initial project idea, which the assistant processes to extract key details.
3. **Slot Filling**: Through a conversational flow, the assistant gathers additional project details, filling necessary slots.
4. **Draft Generation**: Once sufficient information is collected, the assistant generates a draft job post, including title, description, skills, milestones, and budget.
5. **Review & Refine**: The user can edit or regenerate sections of the draft as needed.
6. **Export to Post Job Wizard**: The finalized draft is exported to the Post Job Wizard for completion.
7. **Job Posting**: The job is posted on the platform, and the opportunity is updated in the GoHighLevel pipeline.
8. **Build Trigger**: Documentation, wireframes, and prototypes are built and sent to GitHub Pages.
9. **Email Notification**: The development team receives an email with the build output and job details.

## Technical Details

- **HTML Structure**: The `ai-assistant.html` file defines the layout and components of the assistant UI.
- **JavaScript Logic**: The `ai-assistant.js` file contains the logic for managing conversation state and generating job drafts.
- **CSS Styling**: The `assistant.css` file provides styles specific to the AI Project Assistant's chat interface.

## Integration Points

- **GoHighLevel**: The assistant updates the opportunity pipeline to reflect the new job posting.
- **GitHub Pages**: Automated builds are triggered to create and update project documentation and prototypes.
- **Email System**: Notifications are sent to the development team with relevant project details and outputs.

## Future Enhancements

- **Voice Input**: Integrate voice recognition to allow users to dictate project details.
- **AI Improvements**: Enhance the slot-filling logic with machine learning models for better intent recognition.
- **Expanded Integrations**: Connect with additional third-party services for broader functionality.
