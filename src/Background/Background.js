import React from 'react';
import './Background.css'

const Background = () => {
  const sections = [
    {
      topTitle: "Systems and Distributed Computing",
      subtitle: "C, Golang",
      body: [
        "I've spent significant time diving deep into systems and distributed computing during my studies. From building core system components like string compression encoder/decoders and dynamic memory allocators to creating a microservice simulator with virtual machines, I've developed a strong foundation in low-level programming. My proficiency in C/C++ and Golang, combined with nearly 2 years of experience as a ",
        "systems programming TA",
        " and coursework in distributed systems, has given me a thorough understanding of how complex systems work under the hood. In my final semester I am bettering my grasp on such concepts as a ",
        "distributed systems TA."
      ]
    },
    {
      topTitle: "Software Development (Fullstack)",
      subtitle: "Python, PHP, React, SQL",
      body: "On the backend development side, I've worked on several interesting projects that challenged me to think about scalable solutions. I built an explore page algorithm for a recipe sharing platform, complete with a smart filtering system that matches recipes to available ingredients. Using Python and PHP, I developed core fullstack features for a quiz application, handling everything from room creation to scoring systems. I've also gained practical experience with SQL, worked on AI agent training, and am currently exploring API integration through a music platform migration project."
    },
    {
      topTitle: "Algorithms and Performance Engineering",
      subtitle: "C++, SLURM",
      body: [
        "My foundation in algorithms and performance engineering comes from both teaching and hands-on experience. As an ",
        "algorithms and complexity TA",
        ", I helped others understand fundamental concepts, while my work in parallel and distributed computing let me put theory into practice. Using an ",
        "HPC center",
        ", I optimized sorting algorithms for distributed memory systems and parallelized image processing convolutions."
      ]
    }
  ];

  return (
    <section id="background">
      <h1>My Interests</h1>
      <div>
        {sections.map((section, index) => (
          <div key={index}>
            <div>
              <span>{section.topTitle}</span>
              <div>{section.subtitle}</div>
            </div>
            <div className="body-text">
              {Array.isArray(section.body) ? (
                section.body.map((text, i) => (
                  i % 2 === 0 ? text : <span key={i} className="highlight">{text}</span>
                ))
              ) : (
                section.body
              )}
            </div>
          </div>
        ))}
      </div>
      <div>
        <div>
          "Design is where science and art break even."
        </div>
        <div>
          - Robin Matthews
        </div>
      </div>
    </section>
  );
};

export default Background;