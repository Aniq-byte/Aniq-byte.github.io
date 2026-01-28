import './index.scss'
import { useState } from 'react'
import LogoS from '../../assets/images/file.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLinkedin,
  faGithub,
  faYoutube,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import {
  faHome,
  faUser,
  faEnvelope,
  faSuitcase,
  faBars,
  faClose,
  faBook,
} from '@fortawesome/free-solid-svg-icons'
import { SiGooglescholar } from 'react-icons/si'
import { Link, NavLink } from 'react-router-dom'

const Sidebar = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="nav-bar">
      <Link 
        className="logo"
        to="/"
        onClick={() => setShowNav(false)}>
        <img src={LogoS} alt="Logo" />
        
      </Link>
      <nav className={showNav ? 'mobile-show' : ''}>
        <NavLink 
          exact="true"
          activeclassname="active"
          to="/"
          onClick={() => setShowNav(false)}>
          <FontAwesomeIcon icon={faHome} color="#bf1e1a" />
        </NavLink>
        <NavLink 
          activeclassname="active"
          className="about-link"
          to="about"
          onClick={() => setShowNav(false)}>
          <FontAwesomeIcon icon={faUser} color="#bf1e1a" />
        </NavLink>
        <NavLink
          activeclassname="active"
          className="portfolio-link"
          to="projects"
          onClick={() => setShowNav(false)}
        >
          <FontAwesomeIcon icon={faSuitcase} color="#bf1e1a" />
        </NavLink>
        <NavLink
          activeclassname="active"
          className="contact-link"
          to="contact"
          onClick={() => setShowNav(false)}
        >
          <FontAwesomeIcon icon={faEnvelope} color="#bf1e1a" />
        </NavLink>
        <FontAwesomeIcon 
          onClick={() => setShowNav(false)}
          icon={faClose}
          color="#ffd700"
          size="3x"
          className='close-icon' />
      </nav>
      <ul>
        <li>
          <a
            href="https://www.linkedin.com/in/aniq-elahi"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              color="#bf1e1a"
              className="anchor-icon"
            />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/Aniq-byte"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faGithub}
              color="#bf1e1a"
              className="anchor-icon"
            />
          </a>
        </li>
        <li>
          <a
            href="https://scholar.google.ca/citations?user=NJa6llQAAAAJ&hl=en"
            target="_blank"
            rel="noreferrer"
          >
            <SiGooglescholar size={20} color="#bf1e1a" />
          </a>
        </li>
        <li>
          <a
            href="https://x.com/AniqElahi33686"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faTwitter}
              color="#bf1e1a"
              className="anchor-icon"
            />
          </a>
        </li>
      </ul>
      <FontAwesomeIcon 
          onClick={() => setShowNav(true)}
          icon={faBars}
          color="#ffd700"
          size="3x"
          className='hamburger-icon' />
    </div>
  )
}

export default Sidebar