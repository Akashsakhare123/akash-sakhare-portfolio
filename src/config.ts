import { profile } from './data/profile';
import { experiences } from './data/experience';
import { projects } from './data/projects';
import { education } from './data/education';
import { skills } from './data/skills';

const projectCards = [
 {category:'Full Stack / Real Time',technologies:'React, Java, Spring Boot, MongoDB, WebRTC, Razorpay'},
 {category:'Web Development',technologies:'React, JavaScript, HTML, CSS, Git'},
 {category:'MERN / CRUD',technologies:'React, Node.js, Express.js, MongoDB'},
 {category:'Full Stack / Management',technologies:'React, Node.js, Express.js, MongoDB'},
];
export const config = {
 developer: {name:profile.name.split(' ')[0],fullName:profile.name,title:profile.title,description:profile.summary,primaryRole:'Java Developer',secondaryRole:'Full-Stack Developer',photo:'/images/akash-mobile-hero.jpeg',resume:profile.resumePath},
 social:{github:'Akashsakhare123',email:profile.email,location:profile.location},
 about:{title:'About Me',description:profile.summary},
 experiences:[...experiences.map(exp=>({position:exp.title,company:exp.context,period:exp.period??'Dates unconfirmed',description:exp.description+' '+exp.details.join(' ')})),...education.map(item=>({position:'BE · Electronics & Telecommunication',company:item.institution,period:item.graduationYear?.toString()??'Year unconfirmed',description:`Bachelor of Engineering (BE) in Electronics and Telecommunication (ENTC). Studied from ${item.startYear} to ${item.graduationYear}.`}))],
 projects:[...projects.map((project,index)=>({id:index+1,slug:project.slug,title:project.title,category:projectCards[index].category,technologies:projectCards[index].technologies,image:project.image?.src??`/projects/${project.slug}.svg`,description:project.summary,link:`/projects/${project.slug}`,liveUrl:project.liveUrl,sourceUrl:project.sourceUrl,illustrative:!project.image})),{id:5,slug:'developer-portfolio',title:'Developer Portfolio',category:'React / TypeScript / Three.js',technologies:'React, TypeScript, Three.js, GSAP, CSS, Vite',image:'/projects/developer-portfolio.svg',description:'Personalized developer portfolio built from the MIT-licensed Redoyanul Haque template, retaining its original 3D scene, layouts and interactions.',link:'/projects/developer-portfolio',liveUrl:undefined,sourceUrl:undefined,illustrative:true}],
 contact:{email:profile.email,phone:profile.phone,phoneDisplay:profile.phoneDisplay,github:profile.github,linkedin:profile.linkedin??'',twitter:'',facebook:'',instagram:profile.instagram},
 skills:{develop:{title:'WEB DEVELOPER',description:'Responsive interfaces & reusable components',details:'Building responsive web interfaces using React.js, JavaScript and TypeScript. Developing reusable components and connecting user-facing workflows with application services.',tools:skills[0].items},design:{title:'FULL-STACK',description:'Backend services & connected web applications',details:'Developing application services with Java, Spring Boot, Node.js and Express.js. Integrating MongoDB, REST APIs, real-time communication and payment workflows.',tools:[...skills[1].items,...skills[2].items]}}
};
