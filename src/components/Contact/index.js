import { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useRef } from 'react'
import emailjs from '@emailjs/browser'
import AnimatedLetters from '../AnimatedLetters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLinkedin,
  faGithub,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { SiGooglescholar } from 'react-icons/si'
import './index.scss'

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const form = useRef()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        'service_ng2sesb', 'template_iqp0sh9', form.current, 'C6KUdYMjyP1Ihwk0w')
      .then(
        () => {
          alert('Message successfully sent!')
          window.location.reload(false)
        },
        () => {
          alert('Failed to send the message, please try again')
        }
      )
  }
 
  return (
    <>
      <div className="container contact-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'm', 'e']}
              idx={15}
            />
          </h1>
          <p>
            If you have any other requests or
            questions, please do not hesitate to contact me using the form from below.
          </p>
          <div className="social-links">
            <a
              href="https://www.linkedin.com/in/aniq-elahi"
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              href="https://github.com/Aniq-byte"
              target="_blank"
              rel="noreferrer"
              title="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
              href="https://scholar.google.ca/citations?user=NJa6llQAAAAJ&hl=en"
              target="_blank"
              rel="noreferrer"
              title="Google Scholar"
            >
              <SiGooglescholar size={24} />
            </a>
            <a
              href="https://x.com/AniqElahi33686"
              target="_blank"
              rel="noreferrer"
              title="Twitter/X"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
          <div className="contact-form">
            <form ref={form} onSubmit={sendEmail}>
              <ul>
                <li className="half">
                  <input placeholder="Name" type="text" name="name" required />
                </li>
                <li className="half">
                  <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    required
                  />
                </li>
                <li>
                  <input
                    placeholder="Subject"
                    type="text"
                    name="subject"
                    required
                  />
                </li>
                <li>
                  <textarea
                    placeholder="Message"
                    name="message"
                    required
                  ></textarea>
                </li>
                <li>
                  <input type="submit" className="flat-button" value="SEND" />
                </li>
              </ul>
            </form>
          </div>
        </div>
        <div className="info-map">
          Aniq Elahi
          <br />
          Dalhousie University
          <br />
          Halifax, NS <br />
          Canada<br />
          <br />
          <span>aniqelahi1@gmail.com</span>
        </div>
        <div className="map-wrap">
          <MapContainer center={[44.636600, -63.591654]} zoom={15}> 
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Contact