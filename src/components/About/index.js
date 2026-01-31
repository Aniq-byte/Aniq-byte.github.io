import { useEffect, useState } from 'react'
import {
  faAngular,
  faAws,
  faGitAlt,
  faHtml5,
  faJsSquare,
  faReact, 
  faPython,
  faJava,
} from '@fortawesome/free-brands-svg-icons'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './index.scss'

const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="container about-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['A', 'b', 'o', 'u', 't', ' ', 'm', 'e']}
              idx={15}
            />
          </h1>
          <p>
          Master of Computer Science student with 3+ years of industry experience and active research in Agentic AI and Multi-Agent Systems.
          </p>
          <p align="LEFT">
          Research interests include LLM-based agents, deep reinforcement learning, and model safety, with experience contributing to peer-reviewed publications and applied research in healthcare.
          </p>
          <p>
          Strong data analytics skills paired with hands-on experience building data pipelines and deploying and scaling ML systems, gives me familiarity with all stages of the research and engineering lifecycle.
          </p>
          <p>
          Outside of work, I enjoy surfing, skiing, cooking, and staying active. Fun Fact: I'm currently part of five intramural sports teams (soccer, volleyball, dodgeball, water polo, and basketball).
          </p>
        </div>

        <div className="stage-cube-cont">
          <div className="cubespinner">
            <div className="face1">
              <FontAwesomeIcon icon={faPython} color="#ffd343" />
            </div>
            <div className="face2">
              <FontAwesomeIcon icon={faJava} color="#F06529" />
            </div>
            <div className="face3">
              <FontAwesomeIcon icon={faAws} color="#1B243D" />
            </div>
            <div className="face4">
              <FontAwesomeIcon icon={faReact} color="#5ED4F4" />
            </div>
            <div className="face5">
              <FontAwesomeIcon icon={faJsSquare} color="#EFD81D" />
            </div>
            <div className="face6">
              <FontAwesomeIcon icon={faGitAlt} color="#EC4D28" />
            </div>
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default About