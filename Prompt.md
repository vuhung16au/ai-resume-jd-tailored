# Nav bar 

https://github.com/vuhung16au/ai-resume-jd-tailored/issues/5

# Delete the link "Load Sample Data (for testing)"

# Change the name of our app to "AI✨resume+jd=tailored"

# Supported input file formats: 

PDF, DOCX, TXT, RTF, HTML, Markdown

# Step 3.1: UI requirements 

Make sure the web app is responsive and works well on mobile devices.

# Step 3: UI requirements 

- Users can upload their resume in PDF, DOCX, or TXT format for resume and job description.
- Users can paste or upload a job description.  
- Users can view the tailored resume in a side-by-side comparison with the original.
- Users can download the tailored resume (in docx format).
- Users can view a loading spinner while the AI is processing.
- Users can view error messages if the API call fails or if the input is invalid.
- Users can view a success message when the tailored resume is generated successfully.
- Users can view a message if the resume is empty or the JD is too short.
- Users can view a message if the resume is too large or the JD is too long.
- Users can view a message if the resume is not in the correct format.

# Step 2: Security requirements

- Make sure that Gemini API key is not exposed to the client-side code.

# Step 1: Setup the project 

That's an excellent idea for a web app! The "ai-resume-jd-tailored" app would be incredibly useful for job seekers. Let's break down how we can approach building this, leveraging Next.js, Gemini, Tailwind CSS, and Vercel.

### App Concept: "ai-resume-jd-tailored"

**Core Functionality:** Users upload their resume and paste/upload a job description. The AI (Gemini) analyzes both, identifies keywords and critical skills from the JD, and then rephrases/highlights relevant sections of the resume to align better with the JD.

**Key Features:**

1.  **Resume Upload:** Allow users to upload their resume (e.g., PDF, DOCX, TXT).
2.  **JD Input:** Provide a text area for users to paste the job description, or an option to upload a JD file.
3.  **AI Processing:** Send the resume content and JD content to the Gemini API for analysis and tailoring.
4.  **Tailored Resume Display:** Present the rephrased/tailored resume to the user. This could be:
    * A side-by-side comparison of original vs. tailored.
    * A downloadable tailored resume.
    * Highlighted changes in the tailored version.
5.  **User-Friendly Interface:** Clean and intuitive design using Tailwind CSS.
6.  **Loading/Processing States:** Clear feedback to the user while the AI is working.
7.  **Error Handling:** Graceful handling of API errors or invalid inputs.

### Technical Stack & Architecture

* **Frontend:** Next.js (React Framework)
    * **Why Next.js?** Server-side rendering (SSR) or Static Site Generation (SSG) for performance and SEO (though less critical for a logged-in app, it's good practice), API routes for backend logic (e.g., handling file uploads, calling Gemini API), and a great developer experience.
* **Styling:** Tailwind CSS
    * **Why Tailwind?** Utility-first CSS framework for rapid UI development, highly customizable, and easy to maintain.
* **AI Model:** Google Gemini API
    * **Why Gemini?** Powerful large language model capable of text analysis, rephrasing, summarization, and content generation, perfect for this use case.
* **Deployment:** Vercel
    * **Why Vercel?** Seamless deployment for Next.js applications, built-in CI/CD, and serverless functions (for Next.js API routes).

### High-Level Architecture Flow

1.  **User Interface (Next.js + Tailwind):**
    * User lands on the app, sees input fields for resume and JD.
    * Uses file input component for resume upload.
    * Uses a `textarea` for JD input.
    * Click "Tailor Resume" button.
2.  **Frontend to Backend (Next.js API Route):**
    * The frontend sends the resume content (after reading it, perhaps as text) and the JD text to a Next.js API route (e.g., `/api/tailor-resume`).
    * **File Handling (Important Consideration):**
        * If the resume is a PDF/DOCX, you'll need a library to extract text from it on the server-side (within the Next.js API route). Popular choices include `pdf-parse` for PDFs or `mammoth` for DOCX. For now, let's assume direct text input for simplicity or focus on processing the text from the files.
3.  **Backend to AI (Gemini API):**
    * The Next.js API route receives the resume text and JD text.
    * It then makes a request to the Gemini API with a well-crafted prompt.
4.  **Gemini AI Processing:**
    * Gemini receives the prompt, analyzes the resume and JD.
    * It generates the tailored resume content based on the prompt's instructions.
5.  **AI to Backend:**
    * Gemini sends the tailored resume text back to the Next.js API route.
6.  **Backend to Frontend:**
    * The Next.js API route sends the tailored resume text back to the frontend.
7.  **Display Tailored Resume (Next.js + Tailwind):**
    * The frontend displays the tailored resume to the user.

### Detailed Steps & Considerations

#### 1. Project Setup (Next.js)

```bash
npx create-next-app@latest ai-resume-jd-tailored --typescript --eslint --tailwind --app --src-dir
cd ai-resume-jd-tailored
```

This command sets up a Next.js project with TypeScript, ESLint, Tailwind CSS, the new App Router, and a `src` directory.

#### 2. UI Development (Tailwind CSS)

* **`src/app/page.tsx` (or similar for your main page):**
    * Input field for JD (textarea).
    * Input for resume (file input, or another textarea for pasting raw resume text for initial development).
    * A button to trigger the tailoring process.
    * A display area for the tailored resume.

#### 3. Resume Text Extraction (If supporting file uploads)

* This is the trickiest part if you want to support PDF/DOCX uploads directly.
* **On the client-side (less recommended for large files or security):** Not ideal for file processing.
* **On the server-side (Next.js API Route):**
    * You'll need to use libraries like `formidable` or `multer` (if using a more traditional Node.js backend, though Next.js API routes can handle `FormData` directly) to parse multipart form data from the file upload.
    * Then, use a library like `pdf-parse` or `mammoth` to extract text.
    * **Example (pseudocode for API route):**
        ```typescript
        // src/app/api/upload-resume/route.ts
        import { NextRequest, NextResponse } from 'next/server';
        import formidable from 'formidable'; // You might need to install this
        import fs from 'fs/promises';
        // import pdfParse from 'pdf-parse'; // Install this if you want PDF support
        // import mammoth from 'mammoth'; // Install this if you want DOCX support

        export async function POST(req: NextRequest) {
          // ... handle file upload and text extraction ...
          // For now, let's assume the client sends text directly
          const { resumeText, jdText } = await req.json(); // Simpler for initial development
          return NextResponse.json({ resumeText, jdText }); // Just for testing
        }
        ```
        *Self-correction:* For the initial MVP, consider simplifying by asking users to *paste* their resume text. This avoids the complexity of file parsing for now. We can add file upload later.

#### 4. Gemini API Integration (Next.js API Route)

* Install the Google Generative AI SDK: `npm install @google/generative-ai`
* Create an API route (e.g., `src/app/api/tailor-resume/route.ts`).
* This route will:
    1.  Receive the resume text and JD text from the frontend.
    2.  Construct a prompt for the Gemini API.
    3.  Call the Gemini API.
    4.  Return the tailored resume content.

* **Example Gemini Prompt (Crucial for good results):**

    ```
    "You are an expert resume tailor. Your goal is to rewrite or rephrase sections of a given resume to perfectly align with a provided job description, highlighting relevant skills and experiences.

    **Resume:**
    [Paste User's Resume Here]

    **Job Description:**
    [Paste Job Description Here]

    **Instructions:**
    1. Analyze the job description for key skills, keywords, responsibilities, and qualifications.
    2. Review the provided resume and identify sections that can be rephrased or emphasized to match the job description.
    3. Focus on quantifiable achievements where possible.
    4. Ensure the tailored resume sounds natural and professional.
    5. Do NOT invent new experiences or skills that are not present in the original resume. Only rephrase existing information.
    6. Present the tailored resume in a clear, easy-to-read format, similar to a standard resume (e.g., with sections for Summary, Experience, Education, Skills).
    7. Provide only the tailored resume, no conversational text before or after.
    "
    ```

    * **Refinement for Prompt:** You might want to experiment with different prompt structures. For instance, asking Gemini to return specific sections (e.g., Summary, Experience, Skills) as JSON could make parsing easier on the frontend if you want to display them in structured components. For a first version, just getting plain text is fine.

#### 5. Frontend-Backend Communication

* Use `Workspace` or a library like `axios` on the frontend to send the resume and JD data to your Next.js API route.
* Handle loading states and potential errors.

#### 6. Deployment (Vercel)

* **Environment Variables:** Store your Gemini API key securely as an environment variable on Vercel.
    * `GEMINI_API_KEY=YOUR_GEMINI_API_KEY`
* Push your code to a Git repository (GitHub, GitLab, Bitbucket).
* Connect your repository to Vercel. Vercel will automatically detect it's a Next.js app and deploy it.
* Next.js API routes run as serverless functions on Vercel.

### Iteration & Future Enhancements

* **Downloadable Output:** Provide a button to download the tailored resume as a PDF or DOCX (this would require server-side rendering to a document format, which can be complex, or using a client-side library like `jsPDF` for basic PDF generation).
* **Highlighting Changes:** Use a diffing library to show what changed between the original and tailored resume.
* **User Accounts:** Allow users to save their resumes and JDs, and generate multiple tailored versions.
* **Resume Scoring:** Add a feature that scores how well the tailored resume matches the JD.
* **Customization Options:** Let users specify what sections they want tailored or what specific aspects of the JD to prioritize.
* **Rate Limiting/Cost Management:** For the Gemini API, implement rate limiting and monitor API usage to manage costs.
* **Error Handling and Edge Cases:** What happens if the resume is blank, or the JD is too short? How to handle very large inputs?

