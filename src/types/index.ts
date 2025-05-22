// Define types for the resume tailoring app

export interface ResumeRequest {
  resumeText: string;
  jobDescription: string;
}

export interface ResumeResponse {
  tailoredResume: string;
}

export interface ErrorResponse {
  error: string;
}
