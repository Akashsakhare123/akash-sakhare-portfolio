export type Project = {
  slug: string; number: string; title: string; category: string; summary: string;
  accent: "gold" | "ink"; preview: "consultation" | "company" | "tasks" | "blood-bank";
  stack: string[]; role: string; contributions: string[]; challenge: string;
  architecture: { title: string; description: string }[]; outcome: string;
  liveUrl?: string; sourceUrl?: string;
  image?: { src: string; alt: string; source: string };
};

// Content supplied by Akash. Missing dates, repositories, and screenshots are
// not inferred from unrelated public projects or demonstration interfaces.
export const projects: Project[] = [
  {
    slug: "flyhigh", number: "01", title: "FlyHigh", category: "Full Stack Development & Real-Time Communication",
    summary: "An expert consultation marketplace connecting users with professionals for online video consultations, with expert discovery, profile management, consultation workflows, payments, and real-time communication.",
    accent: "gold", preview: "consultation", role: "Full stack development · platform contributions",
    liveUrl: "https://flyhigh-qbas.onrender.com",
    stack: ["React.js", "JavaScript", "HTML5", "CSS3", "TypeScript (where applicable)", "Java", "Spring Boot", "Spring Security", "REST APIs", "Node.js signalling", "MongoDB", "Razorpay", "WebSockets / Socket.IO", "WebRTC"],
    challenge: "Users need a convenient way to find suitable experts and connect with them remotely. FlyHigh brings expert discovery and online consultation functionality together in one platform.",
    contributions: [
      "Developed responsive React.js dashboards for expert discovery and consultation workflows, with secure authentication and role-based access.",
      "Implemented authentication, consultation scheduling, payments, and expert-management REST APIs.",
      "Developed backend functionality using Java and Spring Boot.",
      "Worked with MongoDB for application data and implemented TTL-based automatic data cleanup.",
      "Contributed to REST API integration between frontend components and backend services.",
      "Worked on real-time consultation notifications and video-call connection workflows.",
      "Contributed to payment-related integration using Razorpay.",
    ],
    architecture: [
      { title: "Client & services", description: "Separated frontend and backend responsibilities, connecting React components to Java and Spring Boot services through REST APIs." },
      { title: "Application data", description: "Used MongoDB for application and profile data, with TTL-based automatic cleanup." },
      { title: "Real-time communication", description: "Used real-time events and Node.js signalling workflows to coordinate video-call connections and notifications with WebSockets / Socket.IO and WebRTC." },
      { title: "Payment integration", description: "Integrated Razorpay for payment-related functionality within the consultation workflows." },
    ],
    outcome: "Contributed to a full-stack consultation platform combining expert discovery, consultation workflows, payments, and real-time video communication.",
  },
  {
    slug: "trinade-website", number: "02", title: "Trinade Company Website", category: "Frontend Development, Responsive Design & SEO",
    summary: "A professional, responsive company website presenting business services, solutions, and projects through a structured web experience.",
    accent: "ink", preview: "company", role: "Frontend development · responsive UI & SEO", liveUrl: "https://trinade.com",
    image: { src: "/projects/trinade-reference.webp", alt: "Cropped reference of the live Trinade company website, featuring its cream, black, and gold design.", source: "https://trinade.com" },
    stack: ["React.js", "JavaScript", "HTML5", "CSS3", "Git", "GitHub", "npm", "Responsive layouts", "Reusable components", "CSS animations"],
    challenge: "Businesses need an accessible online presence that clearly communicates their services and capabilities. This website provides a central place for visitors to explore company information and offerings.",
    contributions: [
      "Developed a responsive website using React.js.",
      "Built reusable UI components to improve code organization and maintainability.",
      "Implemented dynamic content rendering for company services, solutions, and project sections.",
      "Developed interface styling and animations to improve user interaction.",
      "Worked on SEO improvements to support search engine visibility.",
      "Used Git and GitHub for source control and contributed to deployment activities.",
    ],
    architecture: [
      { title: "Reusable components", description: "Component-based development using reusable React components for the company interface." },
      { title: "Responsive presentation", description: "Responsive layouts accommodate different screen sizes, with restrained CSS animations and interface styling." },
      { title: "Structured content", description: "Reusable structures present services, solutions, and project information through dynamic rendering." },
      { title: "Development workflow", description: "Git-based version control and collaborative development supported source management and deployment contributions." },
    ],
    outcome: "Developed a responsive company website that presents business services and project information in a structured, professional interface.",
  },
  {
    slug: "mern-todo", number: "03", title: "MERN Stack CRUD To-Do Application", category: "MERN Stack, CRUD Operations & REST APIs",
    summary: "A database-backed task management application for creating, viewing, updating, and deleting tasks through a connected web interface.",
    accent: "gold", preview: "tasks", role: "Full stack development · end-to-end CRUD workflows",
    stack: ["React.js", "JavaScript", "HTML5", "CSS3", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    challenge: "Managing tasks through disconnected notes or manual records can make updates difficult. This application provides a centralized interface for maintaining task information.",
    contributions: [
      "Developed a React.js interface for displaying and managing tasks.", "Implemented task creation and editing workflows.",
      "Developed backend endpoints using Node.js and Express.js.", "Integrated MongoDB for persistent task storage.",
      "Connected frontend actions with backend APIs to perform CRUD operations.",
      "Worked on the application flow between UI interactions, API requests, and database updates.",
    ],
    architecture: [
      { title: "Frontend", description: "Separated UI rendering and task interaction from backend processing and data access." },
      { title: "REST API", description: "Structured Node.js and Express.js API functionality around creating, retrieving, updating, and deleting records." },
      { title: "Persistence", description: "Used MongoDB for persistent task information, with frontend actions connected to the backend APIs." },
    ],
    outcome: "Built a full-stack application demonstrating end-to-end CRUD operations and database integration.",
  },
  {
    slug: "blood-bank", number: "04", title: "Blood Bank Management Application", category: "Full Stack Development & Database Management",
    summary: "A MERN application focused on organizing blood donation-related information and supporting straightforward management workflows.",
    accent: "ink", preview: "blood-bank", role: "Full stack development · interface, APIs & database integration",
    stack: ["React.js", "JavaScript", "HTML5", "CSS3", "Node.js", "Express.js", "MongoDB", "API-based communication"],
    challenge: "Blood donation activities involve organizing donor information and blood-related records. A digital management application can make this information easier to maintain and access.",
    contributions: [
      "Developed a full-stack web application using the MERN stack.", "Worked on the frontend interface for blood bank management workflows.",
      "Implemented backend functionality using Node.js and Express.js.", "Integrated MongoDB for application data storage.",
      "Connected the frontend to backend services for data operations.", "Focused on creating a straightforward and user-friendly interface.",
    ],
    architecture: [
      { title: "Interactive interface", description: "Used a React frontend for interactive application workflows and a straightforward management interface." },
      { title: "Application API", description: "Used an Express backend for API requests and backend processing, keeping the client interface separate from application logic." },
      { title: "Application records", description: "Used MongoDB for storing and retrieving records through connected application services." },
    ],
    outcome: "Developed a full-stack application focused on organizing blood donation-related information and providing an accessible interface for management tasks.",
  },
];
export function getProject(slug: string) { return projects.find((project) => project.slug === slug); }
