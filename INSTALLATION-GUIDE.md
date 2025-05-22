# AI✨resume+jd=tailored - Installation Guide

This guide will walk you through the process of setting up the AI✨resume+jd=tailored app on your local machine.

> **Note:** If you just want to use the app without installing it, you can try the [live version on Vercel](https://ai-resume-jd-tailored.vercel.app/).

## Quick Links

- [Live Demo](https://ai-resume-jd-tailored.vercel.app/)
- [GitHub Repository](https://github.com/vuhung16au/ai-resume-jd-tailored)

## Setup Requirements

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18.x or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [A code editor like Visual Studio Code](https://code.visualstudio.com/)
- A Google Gemini API key (see instructions below)
- Recommended: Git for version control

## Getting a Google Gemini API Key

1. Visit the [Google AI Studio](https://ai.google.dev/)
2. Sign in with your Google account
3. Navigate to the API keys section
4. Create a new API key
5. Copy the key for later use

## Installation Steps

### 1. Clone the Repository

```zsh
# Clone the repository to your local machine
git clone https://github.com/vuhung16au/ai-resume-jd-tailored.git
cd ai-resume-jd-tailored
```

### 2. Install Dependencies

```zsh
# Install all required dependencies
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory of the project:

```zsh
# Create a new .env.local file
touch .env.local
```

Then edit the `.env.local` file and add your actual Gemini API key:

```
GOOGLE_GEMINI_API_KEY=your_actual_gemini_api_key_here
```

This API key is used for secure server-side communication with Google's Gemini AI service, which powers the resume tailoring functionality.

### 4. Start the Development Server

```zsh
# Start the development server
npm run dev
```

After running this command, the application should be available at [http://localhost:3000](http://localhost:3000).

## Verifying Installation

To verify that everything is working correctly:

1. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)
2. You should see the AI✨resume+jd=tailored interface
3. Try loading the sample data and generating a tailored resume
4. If the AI processes the request and returns a tailored resume, your setup is complete!

## Troubleshooting

### API Key Issues

If you see errors related to the Gemini API:

- Verify that your API key is correctly set in the `.env.local` file
- Make sure there are no extra spaces or quotes around the API key
- Check if your API key has the appropriate permissions and hasn't expired

### Dependencies Issues

If you encounter issues with dependencies:

```zsh
# Try reinstalling the node modules
rm -rf node_modules
npm install
```

### Port Conflicts

If port 3000 is already in use:

```zsh
# Start the server on a different port
npm run dev -- -p 3001
```

Then access the application at [http://localhost:3001](http://localhost:3001).

## Deployment

For deploying to a production environment, follow these steps:

1. Build the application:

```zsh
npm run build
```

2. Start the production server:

```zsh
npm start
```

### Deploying to Hosting Platforms

For cloud-based hosting options:

- **Vercel (Recommended)**:
  - Connect your GitHub repository
  - Vercel will automatically detect Next.js and deploy appropriately
  - Set up your environment variables in the Vercel dashboard
  - Our official deployment: [https://ai-resume-jd-tailored.vercel.app/](https://ai-resume-jd-tailored.vercel.app/)

- **Netlify**:
  - Use the build command: `npm run build`
  - Set the publish directory to `.next`
  - Configure environment variables in the Netlify dashboard

- **AWS Amplify**:
  - Connect your repository
  - Set the build settings for Next.js
  - Configure environment variables in the Amplify Console

You can fork our [GitHub repository](https://github.com/vuhung16au/ai-resume-jd-tailored) and deploy your own version with customizations.

## File Processing Support

The application supports processing the following file formats:

- PDF documents (`.pdf`) 
- Microsoft Word documents (`.doc`, `.docx`)
- Plain text files (`.txt`)

For optimal results, ensure your documents are properly formatted and readable.

## Next Steps

Once you have the application running, check out the `FEATURES.md` file for details on how to use all the features of the AI✨resume+jd=tailored app. The application includes interactive tutorials to help new users get started.
