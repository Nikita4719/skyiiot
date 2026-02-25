import { useState, useEffect } from "react";
import "./index.css";
import avdo from "../assets/avdo.mp4";
import avdo2 from "../assets/avdo2.mp4";
import team1 from "../assets/team1.jpeg";
import team2 from "../assets/team2.jpg";
import team3 from "../assets/team3.png";
import api from "./api";
import { ROOT_URL } from "./api";
export default function Team() {
    const [teamData, setTeamData] = useState([]);
    const [smarterData, setSmarterData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const teamres = await api.get("/our-team");
                const smarterres = await api.get("/smarter");
                setTeamData(teamres.data);
                setSmarterData(smarterres.data[0]);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (teamData.length === 0) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % teamData.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [teamData]);

    return (
        <div>
            <section className="team-section gap-1">
                <div className="container">
                    <div className="row align-items-center">

                        {/* LEFT SIDE DETAILS vvvvvvvvvjaiswal*/}
                        <div className="col-lg-6 team-details">
                            <h1>{teamData[activeIndex]?.heading}</h1>
                            <h2>{teamData[activeIndex]?.paragraph}</h2>
                            <p></p>
                        </div>

                        {/* RIGHT SIDE IMAGES */}
                        <div className="col-lg-6 text-center">
                            <div className="image-stack">
                                {teamData.map((member, index) => (
                                    <img
                                        key={index}
                                        src={`${ROOT_URL}/${member.image}`}
                                        alt={member.name}
                                        className={`team-img ${index === activeIndex ? "active" : ""
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="automation-section py-1 bg-light">
                <div className="container">
                    <div className="row align-items-start g-5">

                        {/* LEFT VIDEO */}
                        <div className="col-lg-6">
                            <div className="video-wrapper">
                                <video
                                    src={smarterData?.media ? `${ROOT_URL}/${smarterData.media}` : "null"}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-100"
                                />
                            </div>
                        </div>

                        {/* RIGHT CONTENT */}
                        <div className="col-lg-6">
                            <h2 className="fw-bold mb-4">
                               {smarterData.heading}
                            </h2>

                            <p className="text-muted mb-4">{smarterData.para}</p>

                            <ul className="automation-list">
                                <li className="mb-3">
                                    <strong>Seamless Device Integration</strong> Enable effortless communication between devices, PLCs, and sensors across your infrastructure.
                                </li>
                                <li className="mb-3">
                                    <strong>Real-Time Data Transmission</strong>  Capture, process, and relay insights instantly for fast and informed decisions.
                                </li>
                                <li className="mb-3">
                                    <strong>Remote Monitoring & Control</strong> Manage operations anytime, from anywhere — securely and reliably.
                                </li>
                                <li className="mb-3">
                                    <strong>Plug & Play Deployment</strong>  SKY IIOT fits right into your existing setup with minimal configuration and maximum value.
                                </li>
                                <li className="mb-3">
                                    <strong>Streamlined Workflows</strong>  Eliminate manual intervention with automated alerts, task assignments, and decision triggers.
                                </li>
                            </ul>

                        </div>

                    </div>
                </div>
            </section>

            <section className="automation-section py-2 bg-light">
                <div className="container">
                    <div className="row align-items-start g-5">
                        <div className="col-lg-6">
                            <h2 className="fw-bold mb-4">
                                AI-Powered Intelligence at the Edge
                            </h2>
                            <h4 className="fw-semibold mb-1">
                                Where Raw Data Becomes Actionable Intelligence
                            </h4>

                            <p className="text-muted mb-2">
                                our IIOT devices aren't just connected they're smart. With advanced edge computing and real-time analytics, SKY IIOT transforms your infrastructure into an intelligent, self-aware ecosystem.
                            </p>


                            <h4 className="fw-semibold mb-1">Turning Data into Real-Time Intelligence</h4>
                            <p className="text-muted mb-2">
                                In industrial environments, raw data is only as valuable as the action it drives. SKY IIOT bridges the gap between data generation and smart decision-making with real-time analytics, automation, and edge intelligence.
                            </p>
                            <ul className="automation-list text-start ps-0">
                                <li className="mb-2">
                                    Edge AI Processing - Analyze and act at the edge to reduce latency.
                                </li>
                                <li className="mb-2">
                                    Event-Based Triggers - Automate actions when specific conditions are met.
                                </li>
                                <li className="mb-2">
                                    Predictive Intelligence - Anticipate failures and optimize performance.
                                </li>
                                <li className="mb-2">
                                    Cloud & Edge Sync - Seamlessly synchronize data across your ecosystem.
                                </li>

                            </ul>

                        </div>

                        <div className="col-lg-6">
                            <div className="video-wrapper">
                                <video
                                    src={avdo2}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-100"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
}
