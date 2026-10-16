import { profile } from '../data/profile';
import { experiences } from '../data/experience';
import { education } from '../data/education';
import { config } from '../config';
export function getPortfolioAnswer(question:string){
 const query=question.toLowerCase();
 const project=config.projects.find(item=>query.includes(item.title.toLowerCase())||query.includes(item.slug));
 if(project)return `${project.title}: ${project.description}\nTechnologies: ${project.technologies}.\nCase study: ${project.link}${project.liveUrl?'\nLive project: '+project.liveUrl:''}`;
 if(/project|work|built/.test(query))return 'Akash’s projects include '+config.projects.map(item=>`${item.title} (${item.link})`).join(', ')+'. Ask about any project for its details.';
 if(/experience|company|employ|trinade/.test(query))return `${profile.name} has 2 years of full-stack development experience. His supplied role is ${experiences[0].title} at ${experiences[0].context}. Employment: ${experiences[0].period}. ${experiences[0].description}`;
 if(/college|education|degree|graduat/.test(query))return `${education[0].degree}, ${education[0].discipline}, ${education[0].institution}. Study period: ${education[0].startYear} - ${education[0].graduationYear}.`;
 if(/contact|email|phone|location|hire|github|linkedin|instagram|resume/.test(query))return `Email: ${profile.email}\nPhone: ${profile.phoneDisplay}\nLocation: ${profile.location}\nGitHub: ${profile.github}\nLinkedIn: ${profile.linkedin}\nInstagram: ${profile.instagram}\nDownload resume: ${profile.resumePath}`;
 if(/skill|tech|java|react|backend|frontend|mongo|spring|node/.test(query))return `${profile.summary} Additional supplied skills include Angular, TypeScript, Python, Express.js, MySQL, Spring Security, Microservices, JWT Authentication, Git, Postman, WebSockets, Socket.IO, WebRTC and Razorpay integration.`;
 if(/hello|^hi\b|hey|about|who/.test(query))return `Akash Sakhare is a Full Stack Developer. ${profile.summary} This is a local guide using supplied portfolio facts, not a live AI service.`;
 if(/chess|engine|rating|elo/.test(query))return 'This chess experience is included from the MIT-licensed portfolio template. The bundled engine is a demonstration; it is not presented as Akash’s original engine, and no rating is claimed.';
 return 'I do not have confirmed information about that. This local guide can answer questions about Akash’s supplied skills, projects, work experience, education and contact details. For anything else, email '+profile.email+'.';
}
