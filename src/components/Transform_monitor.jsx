import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../custom_styles.css";
import parse, { domToReact } from "html-react-parser";
import DOMPurify from "dompurify";

const ROOT_URL = "https://skyiot.skylabsapp.com";
const api = axios.create({
  baseURL: `${ROOT_URL}/api`,
});
import {
  Activity,
  BellRing,
  Cpu,
  Database,
  BrainCircuit,
  WifiOff,
  Thermometer,
  Router,
  BarChart3,
  MonitorSmartphone,
  Siren,
  PlugZap,
  HardDrive,
  BatteryCharging,
  ShieldAlert,
  Network,
  Power
} from "lucide-react";
import "../Details.css";

const iconMap = {
  "Smart Sensor Nodes": Thermometer,
  "IoT Gateway": Router,
  "Energy Meter Interface": BarChart3,
  "Dashboard and Mobile App": MonitorSmartphone,
  "Alert Engine": Siren,
  "Integration Layer": PlugZap,
  "Offline Data Buffer": HardDrive,
  "Battery Backup Unit": BatteryCharging,
  "Surge Protection Unit": ShieldAlert
};



export default function TransformMonitor({ solutions }) {
  const { id } = useParams();
  const solutionCatId = Number(id);
  const [selectedImage, setSelectedImage] = useState(null);
  const [solution_sub_cat, setSolution_sub_cat] = useState(null);
  const [navbarMenu, setNavbarMenu] = useState([]);
  const [cardsData, setCardsData] = useState([]);
  const [coreModules, setCoreModules] = useState([
    { title: "Processing unit", desc: "High-performance ARM-based processor for edge computing and data analysis." },
    { title: "Communication Module", desc: "Supports 4G/5G, Wi-Fi, and LoRaWAN for seamless connectivity." },
    { title: "Sensor Interface", desc: "Universal analog and digital inputs for various industrial sensors." },
    { title: "Power Management", desc: "Efficient power circuitry with battery backup and surge protection." },
    { title: "Security Chip", desc: "Hardware-level encryption for secure data transmission and storage." },
    { title: "Status Display", desc: "OLED display for real-time status and diagnostics on the device." }
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subCatRes, cardRes, menuRes, solutionCardsRes] = await Promise.all([
          api.get("/solution-sub-cat"),
          api.get("/solution-card"),
          api.get("/navbar-menu"),
          api.get("/solution-cards"),
        ]);

        const filteredData = subCatRes.data.find(
          (item) => item.solutionCatId === Number(id)
        );

        if (!filteredData) return;

        if (filteredData.image2) {
          try {
            filteredData.image2 = JSON.parse(filteredData.image2);
          } catch {
            filteredData.image2 = [];
          }
        } else {
          filteredData.image2 = [];
        }

        setSolution_sub_cat(filteredData);

        if (filteredData.image2.length > 0) {
          setSelectedImage(`${ROOT_URL}/${filteredData.image2[0]}`);
        } else if (filteredData.image1) {
          setSelectedImage(`${ROOT_URL}/${filteredData.image1}`);
        }

        const filteredCards = cardRes.data.find(
          (item) => item.solutionCatId === Number(id)
        );

        if (filteredCards) {
          const paragraphs = [
            filteredCards.paragraph1,
            filteredCards.paragraph2,
            filteredCards.paragraph3,
            filteredCards.paragraph4,
            filteredCards.paragraph5,
            filteredCards.paragraph6,
          ];

          const cleaned = paragraphs.filter(Boolean);
          setCardsData(cleaned);
        } else {
          setCardsData([]);
        }

        const filteredSolutionCards = solutionCardsRes.data.find(
          (item) => item.solutionCatId === Number(id)
        );

        if (filteredSolutionCards) {
          const paragraphs = [
            filteredSolutionCards.paragraph1,
            filteredSolutionCards.paragraph2,
            filteredSolutionCards.paragraph3,
            filteredSolutionCards.paragraph4,
            filteredSolutionCards.paragraph5,
            filteredSolutionCards.paragraph6,
          ];

          const parsedModules = paragraphs
            .filter(Boolean)
            .map((html) => {
              const cleanHTML = DOMPurify.sanitize(html);
              const temp = document.createElement("div");
              temp.innerHTML = cleanHTML;

              let title = "";
              let desc = "";

              const h4 = temp.querySelector("h4");
              if (h4) {
                title = h4.innerText;
                desc = temp.querySelector("p")?.innerText || "";
              } else {
                const ps = temp.querySelectorAll("p");
                if (ps.length >= 2) {
                  title = ps[0].innerText;
                  desc = ps[1].innerText;
                } else if (ps.length === 1) {
                  desc = ps[0].innerText;
                }
              }

              return {
                title: title.trim(),
                desc: desc.trim()
              };
            });
          setCoreModules(parsedModules);
        } else {
          setCoreModules([]);
        }

        setNavbarMenu(menuRes.data);

      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!solution_sub_cat)
    return <p className="text-center mt-5">Loading...</p>;
  const contactItem = navbarMenu.find(item => item.id === 4);

  const renderTableWithIcons = (html) => {
    // Parse the HTML content to extract table data
    const temp = document.createElement("div");
    temp.innerHTML = DOMPurify.sanitize(html);
    const rows = temp.querySelectorAll("tr");

    // Process all rows
    const allRows = Array.from(rows);

    return (
      <div className="bg-white">
        {allRows.map((row, index) => {
          const cols = row.querySelectorAll("td");
          if (cols.length < 2) return null;

          const title = cols[0].innerText.trim();
          const desc = cols[1].innerText.trim();

          const isHeader = index === 0;

          if (isHeader) {
            return (
              <div
                key={index}
                className="system-grid-header border-b border-slate-200"
                style={{
                  display: "grid",
                  gridTemplateColumns: "320px 1fr",
                  padding: "1rem 1.5rem",
                  background: "#f1f5f9", // slate-100
                  position: "sticky",
                  top: 0,
                  zIndex: 10,
                  fontWeight: "600",
                  color: "#334155", // slate-700
                  fontSize: "1rem"
                }}
              >
                <div>Component</div>
                <div>Description</div>
              </div>
            );
          }

          const iconMap = {
            "Smart Sensor Nodes": Thermometer,
            "Smart Gateway": Router,
            "IoT Gateway": Router,
            "Energy Meter Interface": BarChart3,
            "Edge Processing Unit": Cpu,
            "Cloud Integration Unit": Activity,
            "Dashboard & Mobile App": MonitorSmartphone,
            "Control Interface (HMI)": MonitorSmartphone,
            "Alert Engine": Siren,
            "Alerting Module": Siren,
            "Integration Layer": PlugZap,
            "Connectivity Modules": Network,
            "Power Management Unit": Power,
            "Offline Data Buffer": HardDrive,
            "Battery Backup Unit": BatteryCharging,
            "Surge Protection Unit": ShieldAlert
          };

          const Icon = iconMap[title] || MonitorSmartphone;

          return (
            <div
              key={index}
              className="system-grid-row border-t border-slate-200 hover:bg-blue-50 transition-all duration-300"
              style={{
                display: "grid",
                gridTemplateColumns: "320px 1fr",
                padding: "1.25rem 1.5rem",
                transition: "background-color 0.2s ease"
              }}
            >
              <div className="flex items-center gap-3 font-semibold text-slate-900 d-flex align-items-center gap-3">
                <div className="icon-wrap rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px", flexShrink: 0, backgroundColor: "#eff6ff", color: "#2563eb", borderRadius: "0.75rem" }}>
                  <Icon size={20} />
                </div>
                <span style={{ fontSize: "1rem", fontWeight: "600", color: "#0f172a" }}>{title}</span>
              </div>

              <div className="text-slate-600 flex items-center d-flex align-items-center"
                style={{ color: "#475569", fontSize: "0.95rem", lineHeight: "1.6" }}>
                {desc}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {solution_sub_cat ? (
        <div>
          {solution_sub_cat.image1 && (
            <section className="top-bannerr pt-4">
              <img src={`${ROOT_URL}/${solution_sub_cat.image1}`} alt="Banner" />
            </section>
          )}

          <section className="py-5 bg-white">
            <div className="custom-wrapper">
              <div className="row g-4 align-items-start">

                <div className="col-lg-6 d-flex flex-column flex-lg-row align-items-center">
                  <div className="mb-3 mb-lg-0 me-lg-3">
                    <div className="rounded-lg overflow-hidden selected-img-wrapper" style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.1)" }}>
                      <img
                        src={selectedImage}
                        alt={solution_sub_cat.heading}
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>

                  <div className="thumbnail-container d-flex gap-2 mt-3">
                    {solution_sub_cat?.image2?.map((img, idx) => (
                      <img
                        key={idx}
                        src={`${ROOT_URL}/${img}`}
                        alt={`thumb-${idx}`}
                        onClick={() => setSelectedImage(`${ROOT_URL}/${img}`)}
                        className={`border rounded-lg cursor-pointer thumbnail-img ${selectedImage === `${ROOT_URL}/${img}`
                          ? "border-primary"
                          : "border-secondary"
                          }`}
                        style={{ objectFit: "cover", width: "80px", height: "80px", borderRadius: "12px" }}
                      />
                    ))}
                  </div>
                </div>

                <div className="col-lg-6">
                  <h2
                    className="fw-bold mb-3 display-6"
                    style={{ color: "#17012C" }}
                    dangerouslySetInnerHTML={{ __html: solution_sub_cat.heading }}
                  ></h2>

                  <div className="border-top pt-3 mb-3">
                    <div
                      className="text-muted leading-7"
                      style={{ fontSize: "1.1rem" }}
                      dangerouslySetInnerHTML={{
                        __html: solution_sub_cat.description1 || "",
                      }}
                    />
                  </div>

                  <div className="mb-4">
                    {navbarMenu.find((item) => item.id === 4) && (
                      <Link to={navbarMenu.find((item) => item.id === 4).link}>
                        <button className="btn btn-contact-gradient px-5 py-3 rounded-pill fw-bold shadow-lg">
                          Start Order Request
                        </button>
                      </Link>
                    )}
                  </div>

                  <div
                    className="border-top pt-3 text-muted"
                    dangerouslySetInnerHTML={{
                      __html: solution_sub_cat.description2 || "",
                    }}
                  />
                </div>

              </div>
            </div>
          </section>

          {solution_sub_cat.imagechart && (
            <section className="mb-0">
              <div className="top-bannerr" style={{ marginTop: "0" }}>
                <img
                  src={`${ROOT_URL}/${solution_sub_cat.imagechart}`}
                  alt="Chart Banner"
                  className="chart-img"
                  style={{ marginTop: "0" }}
                />
              </div>
            </section>
          )}




        </div>
      ) : (
        <p className="text-center mt-5">Loading...</p>
      )}


      <section className="py-5" style={{ backgroundColor: "#ffffff" }}>
        <Container>
          <div className="section-header-side mb-5 pb-3 border-bottom border-slate-200">
            <Row className="align-items-end g-3">
              <Col lg={12}>
                <h2 className="fw-bold text-uppercase text-primary small mb-2" style={{ letterSpacing: "0.1em" }}>
                  Functional Capabilities
                </h2>
                <h3 className="display-6 text-dark mb-0" style={{ fontWeight: "700" }}>
                  Smart Monitoring Features Built for Reliability
                </h3>
              </Col>
            </Row>
          </div>
          <Row className="g-4 justify-content-center">
            {cardsData.map((html, index) => {

              const cleanHTML = DOMPurify.sanitize(html);
              const temp = document.createElement("div");
              temp.innerHTML = cleanHTML;

              const title = temp.querySelector("h4")?.innerText || "";
              const desc = temp.querySelector("p")?.innerText || "";

              const iconMapDynamic = {
                "24/7 Real-Time Monitoring": Activity,
                "Multi-Channel Alerts": BellRing,
                "Asset Tagging & Dashboards": Cpu,
                "Fault Event Logging": Database,
                "AI Predictive Maintenance": BrainCircuit,
                "Offline Data Buffering": WifiOff
              };

              const Icon = iconMapDynamic[title] || Activity;

              return (
                <Col
                  key={index}
                  xs={12}
                  md={6}
                  xl={4}
                  className="d-flex justify-content-center px-3"
                >
                  <div
                    className="card-capability-group w-100 rounded-4 border border-slate-200 bg-white p-4 card-highlight-transition h-100 d-flex flex-column align-items-start gap-3"
                    style={{
                      transition: "all 0.3s ease",
                      maxWidth: "100%"
                    }}
                  >
                    {/* ICON */}
                    <div
                      className="icon-box-dynamic d-flex align-items-center justify-content-center flex-shrink-0 mb-2"
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "#eff6ff",
                        color: "#2563eb",
                        borderRadius: "0.75rem"
                      }}
                    >
                      <Icon size={24} />
                    </div>

                    <div className="card-body-content">
                      {/* TITLE */}
                      <h3
                        style={{
                          fontSize: "1.35rem",
                          fontWeight: "600",
                          color: "#0f172a",
                          marginBottom: "0.75rem"
                        }}
                      >
                        {title}
                      </h3>

                      {/* DESC */}
                      <p
                        className="mb-0"
                        style={{
                          color: "#475569",
                          lineHeight: "1.6",
                          fontSize: "0.95rem"
                        }}
                      >
                        {desc}
                      </p>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      <section className="py-5" style={{ backgroundColor: "var(--color-slate-950)" }}>
        <Container>
          <div className="section-header-side mb-5 focus-title-area">
            <Row className="align-items-end g-3">
              <Col lg={12}>
                <h2 className="fw-bold text-uppercase text-blue-400 small mb-2" style={{ letterSpacing: "0.1em", color: "#60a5fa" }}>
                  Core Modules
                </h2>
                <h3 className="display-6 text-white mb-0" style={{ fontWeight: "700" }}>
                  A Powerful Modular Stack Behind the System
                </h3>
              </Col>
            </Row>
          </div>
          <Row className="g-4 justify-content-center">
            {coreModules.map((module, index) => {
              const Icon = Cpu; // Default icon for core modules

              return (
                <Col
                  key={index}
                  xs={12}
                  md={6}
                  xl={4}
                  className="d-flex justify-content-center px-3"
                >
                  <div
                    className="card-capability-group w-100 rounded-4 border border-slate-800 bg-slate-900/50 p-5 card-highlight-transition h-100 d-flex flex-column align-items-start gap-3"
                    style={{
                      transition: "all 0.3s ease",
                      maxWidth: "100%",
                      backgroundColor: "rgba(30, 41, 59, 0.4)",
                      borderColor: "rgba(255, 255, 255, 0.1)",
                      minHeight: "260px"
                    }}
                  >
                    <div
                      className="icon-box-dynamic d-flex align-items-center justify-content-center flex-shrink-0 mb-2"
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "rgba(96, 165, 250, 0.1)",
                        color: "#60a5fa",
                        borderRadius: "0.75rem"
                      }}
                    >
                      <Icon size={24} />
                    </div>

                    <div className="card-body-content">
                      <h3
                        style={{
                          fontSize: "1.35rem",
                          fontWeight: "600",
                          color: "#f8fafc",
                          marginBottom: "0.75rem"
                        }}
                      >
                        {module.title}
                      </h3>
                      <p
                        className="mb-0"
                        style={{
                          color: "#94a3b8",
                          lineHeight: "1.6",
                          fontSize: "0.95rem"
                        }}
                      >
                        {module.desc}
                      </p>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      <section className="mb-0 pt-5">
        <Container>
          <div className="section-header-side mb-4 pb-3 border-bottom border-slate-200">
            <Row className="align-items-end g-3">
              <Col lg={12}>
                <h2 className="fw-bold text-uppercase text-primary small mb-2" style={{ letterSpacing: "0.1em" }}>
                  System Components & Architecture
                </h2>
                <h3 className="display-6 text-dark mb-0" style={{ fontWeight: "700" }}>
                  Structured for Industrial Deployment
                </h3>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      <Container className="py-5">
        <div
          className="system-architecture-grid shadow-lg bg-white border border-slate-200 overflow-hidden"
          style={{ borderRadius: "1.5rem" }}
        >
          <div
            style={{ maxHeight: "600px", overflowY: "auto" }}
            className="custom-scrollbar"
          >
            {renderTableWithIcons(
              DOMPurify.sanitize(solution_sub_cat?.para1 || "")
            )}
          </div>
        </div>
      </Container>

    </div >
  );
}