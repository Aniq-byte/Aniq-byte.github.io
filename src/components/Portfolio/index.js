import React, { useEffect, useState } from "react";
import Loader from "react-loaders";
import AnimatedLetters from "../AnimatedLetters";
import "./index.scss";
import { getDocs, collection } from 'firebase/firestore/lite';
import { db } from '../../firebase';

const Portfolio = () => { 
    const [letterClass, setLetterClass] = useState('text-animate');
    const [portfolio, setPortfolio] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
          setLetterClass('text-animate-hover');
        }, 3000);
        return () => clearTimeout(timer);
      }, []);

    useEffect(() => {
        getPortfolio();
    }, []);

    const getPortfolio = async () => {
        const querySnapshot = await getDocs(collection(db, 'portfolio'));
        setPortfolio(querySnapshot.docs.map((doc) => doc.data()));
    }

    const renderPortfolio = (portfolio) => {
        return (
            <div className="images-container">
                {
                    portfolio.map((port, idx) => {
                        return (
                            <div className="image-box" key={idx}>
                                <img 
                                src={port.image}
                                className="portfolio-image"
                                alt="portfolio" />
                                <div className="content">
                                    <p className="title">{port.name}</p>
                                    <h4 className="description">{port.description}</h4>
                                    <button
                                        className="btn"
                                        onClick={() => window.open(port.srcCodeUrl)}
                                    >See Project</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }


    return (
        <>
            <div className="container portfolio-page">
                        <h1 className="page-title">
                    <AnimatedLetters
                        letterClass={letterClass}
                        strArray={"Publications & Projects".split("")}
                        idx={15}
                    />
                </h1>
                <div className="publications">
                  <h3>Publications</h3>
                  <p>
                    <strong>Undistillable Open Language Models with Teacher Scrambling</strong>
                    <br />
                    Sebastian Dionicio, Aniq Elahi, Domenic Rosati, Hassan Sajjad
                    <br />
                    LoCk-LLM Workshop @ NeurIPS 2025
                    <br />
                    <a href="#" onClick={() => window.open('#')}>[Paper]</a>
                  </p>
                </div>

                <div className="research">
                  <h3>Ongoing Research</h3>
                  <div className="research-cards">
                    <div className="research-card">
                      <p className="title">Inter-Agent Collusion in LLM-Based Multi-Agent Systems</p>
                      <p className="description">Studying coordination failures and collusion dynamics using multi-step reasoning and agent memory.</p>
                    </div>
                    <div className="research-card">
                      <p className="title">Dynamic Questionnaires for Relapse Prediction</p>
                      <p className="description">Extending adaptive assessment frameworks with knowledge graphs and multimodal time-series data.</p>
                    </div>
                  </div>
                </div>

                <div className="projects-list">
                  <h3>Projects</h3>
                  {renderPortfolio(portfolio)}
                  <div className="static-projects">
                    <div className="static-card">
                      <p className="title">Election Prediction Polymarket</p>
                      <p className="description">Probabilistic forecasting and market-based aggregation for election outcomes.</p>
                    </div>
                    <div className="static-card">
                      <p className="title">Firelink</p>
                      <p className="description">A platform for real-time wildfire risk analysis and information linking across sources.</p>
                    </div>
                  </div>
                </div>
            </div>
            <Loader type="pacman" />
        </>
    );
}

export default Portfolio;