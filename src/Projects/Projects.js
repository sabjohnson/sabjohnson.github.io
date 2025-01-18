import React from 'react';
import './Projects.css';

const Projects = () => {
  // Project data structure
  const projects = [
    {
      title: "Project 1",
      thumbnail: {
        image: "/assets/banana-ascii.png",
        alt: "View my specialties!",
        link: "https://google.com"
      },
      description: "Lorem ipsum odor amet, consectetuer adipiscing elit. Risus mattis urna nascetur nam curabitur? Nullam tortor suspendisse urna orci ut sit facilisi.",
      tags: ["React", "Node.js"], // Optional: Add technologies used
      github: "https://github.com/yourusername/project1", // Optional: Add source code link
      demo: "https://demo-link.com" // Optional: Add demo link
    },
    {
      title: "Project 2",
      thumbnail: {
        image: "/assets/banana-ascii.png",
        alt: "View my specialties!",
        link: "https://google.com"
      },
      description: "Lorem ipsum odor amet, consectetuer adipiscing elit. Risus mattis urna nascetur nam curabitur? Nullam tortor suspendisse urna orci ut sit facilisi. Potenti parturient consectetur phasellus diam posuere sociosqu habitasse penatibus donec.",
      tags: ["Python", "Flask"],
      github: "https://github.com/yourusername/project2",
      demo: "https://demo-link.com"
    },
    {
      title: "Project 3",
      thumbnail: {
        image: "/assets/banana-ascii.png",
        alt: "View my specialties!",
        link: "https://google.com"
      },
      description: "Lorem ipsum odor amet, consectetuer adipiscing elit. Risus mattis urna nascetur nam curabitur?",
      tags: ["JavaScript", "CSS"],
      github: "https://github.com/yourusername/project3",
      demo: "https://demo-link.com"
    }
  ];

  // Handle click events
  const handleLinkClick = (url) => {
    window.open(url);
  };

  // Render project tile
  const ProjectTile = ({ project }) => (
    <div className="tile">
      <div className="thumbnail">
        <a onClick={() => handleLinkClick(project.thumbnail.link)}>
          <img 
            src={project.thumbnail.image} 
            alt={project.thumbnail.alt} 
          />
        </a>
      </div>
      <div className="project-description">
        <div className="project-title">
          <h2>{project.title}</h2>
        </div>
        <div className="project-blurb">{project.description}</div>
        {project.tags && (
          <div className="project-tags">
            {project.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        )}
        <div className="project-links">
          {project.github && (
            <a 
              onClick={() => handleLinkClick(project.github)}
              className="github-link"
            >
              Source Code
            </a>
          )}
          {project.demo && (
            <a 
              onClick={() => handleLinkClick(project.demo)}
              className="demo-link"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section id="projects">
      <h1>My Projects</h1>
      <p>This section is under construction. Coming soon...</p>
      {/* <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectTile key={index} project={project} />
        ))}
      </div> */}
    </section>
  );
};

export default Projects;