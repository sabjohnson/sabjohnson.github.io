import React, { useState } from 'react';
import './Experience.css';

const Experience = () => {
  const [openIndex, setOpenIndex] = useState(null);
  
  const experienceData = [
    {
      title: "Lead Undegraduate TA (Systems Programming)",
      period: "2023 - Present",
      location: "Buffalo, NY",
      website: "https://cse.buffalo.edu/~eblanton/course/cse220/",
      description: "As a Teaching Assistant at the University at Buffalo, I have taken on leadership responsibilities beyond traditional duties like holding labs, office hours, and grading. For the past three semesters, I have led the TA pool for Systems Programming, introducing a Kanban board to streamline task distribution and establishing a team dedicated to addressing student questions on our online forum. My feedback has helped alter lab content to be more rich and concise.",
      skills: ["C", "Linux/Unix"]
    },
    {
      title: "Undegraduate TA (Distributed Systems)",
      period: "2024 - Present",
      location: "Buffalo, NY",
      website: "",
      description: "Held office hours twice a week to aid students in debugging their implementations of distributed messaging services, Kademlia inspired hash tables and Raft consensus protocols.",
      skills: ["Golang"]
    },
    {
      title: "Research Intern - HILS Lab",
      period: "2024 - 2024",
      location: "Buffalo, NY",
      website: "https://www.acsu.buffalo.edu/~ehsanesf/",
      description: "We designed trials and collected data for a classifier detecting stroke patient fatigue in robotic rehabilitation tasks using live participants and a wearable sensor, the MyoBand. I trained and evaluated models in MATLAB using the aggregated data, achieving 87.5% accuracy with a Mahalanobis distance classifier. This analysis guided the selection of the most effective model for the next phase of research: integrating a classifier into a rehabilitation robot’s control system. Identifying a strong classifier aids in ensuring that the agent’s control system keeps exercises engaging and challenging, ideally optimizing patient recovery speeds. I presented this work at our program’s research symposium and was one of six researchers selected from a competitive cohort of 30 to represent the University at Buffalo at the statewide CSTEP conference in April 2025.",
      skills: ["C++", "MATLAB", "MyoBand"]
    },
    {
      title: "Research Intern - Unfold Studios",
      period: "2024 - 2024",
      location: "Hybrid",
      website: "https://unfold.studio/",
      description: "Under the mentorship of Christopher Proctor, I contributed to integrating AI into Unfold Studio, a web application with over 15,000 users designed for teaching middle and secondary students to code in Ink, a narrative scripting language for Role Playing Games (RPGs). My work focused on designing, coding and evaluating the usefulness of OpenAI-powered features in the product’s text editor, such as detail generation, character dialogue creation, and branching storylines. This research explored how AI could enhance the creative development process and foster situational awareness in classroom settings.",
      skills: ["Python"]
    },
    {
      title: "Undegraduate TA (Algorithms and Complexity)",
      period: "2023 - 2024",
      location: "Buffalo, NY",
      website: "",
      description: "Reviewed algorithm design paradigms and time complexity analysis. Graded/provided feedback on assigned homeworks and exams. Assisted +300 students in formation of proofs and programming assignments through hosted office hours twice a week.",
      skills: ["Python", "Java"]
    },
    {
      title: "Intern - Summer at Discovery's Edge Labs",
      period: "2023 - 2023",
      location: "Remote",
      website: "",
      description: "Researched basic machine learning techniques (Q-Learning, Deep Q-Learning, NEAT implementation, etc.) through development of AI coding project. Facilitated group meetings and project development as team lead of 6.",
      skills: ["Python"]
    },
    {
      title: "Flight Software Developer - University at Buffalo NanoStat Lab",
      period: "2023 - 2023",
      location: "Buffalo, NY",
      website: "",
      description: "As a Flight Software Developer at UBNL, I collaborated with a team of 8 developers to contribute to the GLADOS Core Flight System (cFS), a 6U CubeSat designed to improve Space Situational Awareness (SSA) by characterizing objects in Geostationary Orbit (GEO) using 'Glint' analysis. GLADOS, set to launch in 2025, is part of a mission in partnership with the Air Force Research Lab (AFRL) and NASA, with the goal of enabling faster detection of anomalies and potential threats by tracking both translational and orientation states of space objects. My contributions included cleaning up the legacy database of code, ensuring the system's efficiency and reliability.",
      skills: ["Python"]
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="experience">
      <h1>Professional Experience</h1>
      <div className="accordion-container">
        {experienceData.map((exp, index) => (
          <div key={index} className="accordion-item">
            <div 
              className="accordion-header"
              onClick={() => toggleAccordion(index)}
            >
              <div className="title-section">
                <div className="job-title">{exp.title}</div>
                <div className="period">{exp.period}</div>
              </div>
              <div className="toggle-icon">
                {openIndex === index ? '−' : '+'}
              </div>
            </div>

            {openIndex === index && (
              <div className="accordion-content">
                <div className="job-details">
                  <div className="location-website">
                    <div>{exp.location}</div>
                    <a href={exp.website} target="_blank" rel="noopener noreferrer">
                      {exp.website}
                    </a>
                  </div>
                  <div className="description">{exp.description}</div>
                  <div className="skills">
                    {exp.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="skill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;