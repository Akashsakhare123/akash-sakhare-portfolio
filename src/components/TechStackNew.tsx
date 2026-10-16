import {useEffect,useRef} from "react";
import "./styles/TechStackNew.css";

import { techStack } from '../data/technologies';

const TechStackNew = () => {
  const video=useRef<HTMLVideoElement>(null);
  useEffect(()=>{const element=video.current;if(!element)return;const media=matchMedia('(prefers-reduced-motion: reduce)');let visible=false;const update=()=>{if(visible&&!document.hidden&&!media.matches)void element.play().catch(()=>{});else element.pause();};const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;update();},{rootMargin:'100px'});observer.observe(element);media.addEventListener('change',update);document.addEventListener('visibilitychange',update);return()=>{observer.disconnect();element.pause();media.removeEventListener('change',update);document.removeEventListener('visibilitychange',update);};},[]);
  return (
    <div className="techstack-new">
      {/* Video Background */}
      <div className="techstack-video-container">
        <video
          ref={video}
          preload="none"
          loop
          muted
          playsInline
          className="techstack-video"
        >
          <source src="/video/video.webm" type="video/webm" />
        </video>
        {/* Dark Overlay */}
        <div className="techstack-overlay"></div>
      </div>

      {/* Content */}
      <div className="techstack-content">
        <h2>Tech Stack</h2>
        
        <div className="techstack-pyramid">
          {techStack.map((row, rowIndex) => (
            <div key={rowIndex} className="techstack-row">
              {row.map((tech, techIndex) => (
                <a
                  key={techIndex}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="techstack-item"
                  title={tech.name}
                  data-cursor="disable"
                >
                  <img src={tech.icon} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                  <span>{tech.name}</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStackNew;
