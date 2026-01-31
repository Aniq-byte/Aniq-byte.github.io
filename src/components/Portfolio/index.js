import React, { useEffect, useState } from "react";
import Loader from "react-loaders";
import AnimatedLetters from "../AnimatedLetters";
import "./index.scss";
import { getDocs, collection, query, orderBy } from 'firebase/firestore/lite';
import { db } from '../../firebase';
import { useLocation } from 'react-router-dom';

const Portfolio = () => { 
    const [letterClass, setLetterClass] = useState('text-animate');
    const [portfolio, setPortfolio] = useState([]);
    const location = useLocation();
    const highlightParam = new URLSearchParams(location.search).get('highlight') || '';

    useEffect(() => {
        const timer = setTimeout(() => {
          setLetterClass('text-animate-hover');
        }, 3000);
        return () => clearTimeout(timer);
      }, []);

    useEffect(() => {
        getPortfolio();
    }, []);

    useEffect(() => {
        if (!highlightParam || portfolio.length === 0) return;
        const target = document.querySelector('.image-box.highlight-bounce');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [highlightParam, portfolio]);

    const getPortfolio = async () => {
        const q = query(collection(db, 'portfolio'), orderBy('order', 'asc'));
        const querySnapshot = await getDocs(q);
        setPortfolio(querySnapshot.docs.map((doc) => doc.data()));
    }

    const renderPortfolio = (portfolio) => {
        const highlightLower = highlightParam.trim().toLowerCase();
        return (
            <div className="images-container">
                {
                    portfolio.map((port, idx) => {
                        const nameLower = (port.name || '').toLowerCase();
                        const isHighlighted = Boolean(highlightLower) && (
                            nameLower === highlightLower ||
                            nameLower.includes(highlightLower)
                        );
                        return (
                            <div
                                className={`image-box${isHighlighted ? ' highlight-bounce' : ''}`}
                                key={idx}
                            >
                                <img 
                                src={port.image}
                                className="portfolio-image"
                                alt="portfolio" />
                                {Array.isArray(port.tags) && port.tags.length > 0 && (
                                  <div className="project-tags">
                                    {port.tags.map((tag, tagIdx) => (
                                      <span className="project-tag" key={tagIdx}>{tag}</span>
                                    ))}
                                  </div>
                                )}
                                <div className="content">
                                    <p className="title">{port.name}</p>
                                    <h4 className="description">{port.description}</h4>
                                    {port.srcCodeUrl && (
                                      <button
                                        className="btn"
                                        onClick={() => window.open(port.srcCodeUrl)}
                                      >
                                        See Github
                                      </button>
                                    )}
                                    {port.LiveDemoUrl && (
                                      <button
                                        className="btn"
                                        onClick={() => window.open(port.LiveDemoUrl)}
                                      >
                                        See Presentation
                                      </button>
                                    )}
                                    {port.reportUrl && (
                                      <button
                                        className="btn"
                                        onClick={() => window.open(port.reportUrl)}
                                      >
                                        See Technical Report
                                      </button>
                                    )}
                                    {port.newsurl && (
                                      <button
                                        className="btn"
                                        onClick={() => window.open(port.newsurl)}
                                      >
                                        Featured in The Guardian
                                        </button>
                                    )}
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
                <br />
                <div className="publications">
                  <h3>Publications</h3>
                  <p>
                    <strong className="pub-title">Undistillable Open Language Models with Teacher Scrambling</strong>
                    <br />
                    Sebastian Dionicio, <span className="pub-author">Aniq Elahi</span>, Domenic Rosati, Hassan Sajjad
                    <br />
                    <span className="pub-venue">Thirty-Ninth Annual Conference on Neural Information Processing Systems. LoCk-LLM Workshop @ <span className="pub-venue-bold">NeurIPS 2025</span></span>
                    <br />
                    [
                    <a className="pub-link" href="https://openreview.net/forum?id=g9vFg3O8YY" target="_blank">Paper</a>
                    ]
                  </p>
                </div>

                <br />

                <div className="research">
                  <h3>Ongoing Research</h3>
                  <p className="description"> Graduate Researcher with the Dalhousie Applied Machine Learning Research (<a className="pub-link" href="https://web.cs.dal.ca/~gaw/" target="_blank">DAMLR</a>), focused on agentic and multi-agent systems under the supervision of Ga Wu, with ongoing work targeted toward peer-reviewed publications alongside academic and industry collaborators.</p>
                  <div className="research-cards">
                    <div className="research-card">
                        <p className="title">Point of Failure Detection in Multi-Agent Systems via Cascaded Conformal Prediction</p>
                        <p className="description">
                          Better identifying root failure points in multi-agent system trajectories with statistical methods and extending existing benchmarks with
                          synthetically generated long-horizon datasets; work submitted to ICML (under review).
                        </p>
                    </div>

                    <div className="research-card">
                        <p className="title">Adaptive Questionnaires for Psychological Assessment</p>
                        <p className="description">
                          Developing conversational agent-driven assessment systems that adaptively probe symptoms and comorbidities,
                          with a 200-participant clinical study currently underway.
                        </p>
                    </div>

                    <div className="research-card">
                        <p className="title">Inter-Agent Alignment and Collusion in LLM-Based Systems</p>
                        <p className="description">
                          Studying emergent coordination, collusion, and failure modes in LLM-based multi-agent systems
                          using deep reinforcement learning, MARL, and multi-step reasoning.
                        </p>
                    </div>

                    <div className="research-card">
                        <p className="title">Multimodal Relapse Prediction for Major Depressive Disorder</p>
                        <p className="description">
                          Exploring relapse prediction using multimodal time-series signals and structured knowledge to
                          model uncertainty and longitudinal patient trajectories.
                        </p>
                      </div>
                  </div>
                </div>

                <br />

                <div className="projects-list">
                  <h3>Projects</h3>
                  {renderPortfolio(portfolio)}
                </div>
            </div>
            <Loader type="pacman" />
        </>
    );
}

export default Portfolio;
