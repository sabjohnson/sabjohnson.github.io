import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import './Landing.css';
import ASCIIFluidBackground from '../Ascii/Ascii';

function Landing() {
  const typedElement = useRef(null);

  useEffect(() => {
    const options = {
      strings: ["Hello World..."],
      typeSpeed: 100,
      backSpeed: 50,
      showCursor: true,
      cursorChar: "",
      loop: false,
    };
    const typed = new Typed(typedElement.current, options);
  }, []);

  return (
    <ASCIIFluidBackground>
      <div id="xp-module">
        <section id="about" className="landing-section">
          <div id="overlay-container">
            <div id="ascii-card">
              <div className="content-box">
                <div className="typing-container">
                  <span ref={typedElement}></span>
                </div>
                <p className="about-description">
                  Hi! My name is Sabrina Johnson and I am an aspiring software engineer (currently) based in New York. 
                  I am set to graduate with my B.S. in Computer Science from the University at Buffalo in May 2025.  
                  Keep reading to learn more about my background!
                </p>
              </div>
            </div>
          </div>

          {/* Anchor button outside of the card */}
          <div className="anchor-button">
            <a href="#background">
              <img src="/assets/icons/downarrow-icon.png" alt="View my specialties!" />
            </a>
          </div>
        </section>
      </div>
    </ASCIIFluidBackground>
  );
}

export default Landing;
