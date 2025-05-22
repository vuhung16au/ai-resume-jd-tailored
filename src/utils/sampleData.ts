// Sample data to help users test the app

export const sampleResume = `JOHN DOE
Software Engineer
123 Main Street, Anytown, USA | (123) 456-7890 | john.doe@email.com

SUMMARY
Results-driven software engineer with 5 years of experience developing web applications using JavaScript, React, and Node.js. Strong problem-solving skills with a focus on creating efficient, scalable code.

EXPERIENCE
Senior Frontend Developer, Tech Solutions Inc.
January 2020 - Present
• Developed and maintained multiple React-based web applications, improving performance by 40%
• Collaborated with UX designers to implement responsive designs across desktop and mobile platforms
• Led the migration from a legacy codebase to a modern React/Redux architecture
• Mentored junior developers, conducting code reviews and pair programming sessions

Web Developer, Digital Innovations
June 2017 - December 2019
• Built interactive web applications using JavaScript, HTML5, and CSS3
• Implemented RESTful API integrations for various third-party services
• Reduced page load times by 60% through code optimization and lazy loading techniques
• Participated in agile development practices, including daily stand-ups and sprint planning

EDUCATION
Bachelor of Science in Computer Science
University of Technology, Graduated May 2017
• GPA: 3.8/4.0
• Relevant coursework: Data Structures, Algorithms, Web Development, Database Management

SKILLS
• Programming Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3, Python
• Frontend: React, Redux, Angular, Vue.js, SASS/SCSS, Styled Components
• Backend: Node.js, Express, RESTful APIs, GraphQL
• Tools & Others: Git, Webpack, Jest, Mocha, AWS, Docker, CI/CD pipelines

PROJECTS
Personal Portfolio Website
• Designed and developed a responsive personal website using React and Tailwind CSS
• Implemented dark/light mode toggle and animations using Framer Motion

E-commerce Dashboard
• Created a dashboard for monitoring sales data using React, Chart.js, and Material UI
• Integrated with a Node.js backend to fetch and display real-time data

CERTIFICATIONS
• AWS Certified Developer – Associate (2022)
• MongoDB Certified Developer (2021)
`;

export const sampleJobDescription = `Software Engineer - Frontend
Location: Remote

About Us:
We are a rapidly growing tech company focused on creating innovative solutions for businesses. Our team is passionate about building applications that improve user experiences and solve complex problems.

Job Description:
We are seeking a skilled Frontend Engineer to join our development team. The ideal candidate will have strong experience with React and modern JavaScript practices, with a focus on building responsive and accessible web applications.

Responsibilities:
• Develop new user-facing features using React.js and related technologies
• Build reusable components and libraries for future use
• Optimize applications for maximum speed and scalability
• Collaborate with back-end developers and designers to improve usability
• Ensure the technical feasibility of UI/UX designs
• Maintain code quality and organization
• Stay up-to-date on emerging trends and technologies

Requirements:
• 3+ years of professional experience in frontend development
• Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model
• Thorough understanding of React.js and its core principles
• Experience with popular React workflows (such as Redux)
• Familiarity with RESTful APIs and modern authorization mechanisms
• Knowledge of modern frontend build pipelines and tools
• Experience with common frontend development tools such as Babel, Webpack, etc.
• Good understanding of browser rendering behavior and performance
• Excellent problem-solving skills and attention to detail

Preferred Qualifications:
• Experience with TypeScript
• Familiarity with testing frameworks like Jest
• Understanding of server-side rendering and its benefits
• Knowledge of GraphQL
• Experience with CI/CD workflows

Benefits:
• Competitive salary and equity options
• Health, dental, and vision insurance
• Flexible work hours and remote work policy
• Professional development budget
• Home office stipend
• 401(k) plan with company match

We are an equal opportunity employer and value diversity at our company. We do not discriminate on the basis of race, religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, or disability status.
`;

// Function to load sample data into the form fields
export const loadSampleData = () => {
  return {
    resumeText: sampleResume,
    jobDescription: sampleJobDescription
  };
};
