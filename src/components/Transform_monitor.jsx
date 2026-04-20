import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "./api";
import "../custom_styles.css";
import parse, { domToReact } from "html-react-parser";
import { ROOT_URL } from "./api";
import DOMPurify from "dompurify";
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subCatRes, cardRes, menuRes] = await Promise.all([
          api.get("/solution-sub-cat"),
          api.get("/solution-card"),
          api.get("/navbar-menu"),
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
                    <div className="rounded-lg overflow-hidden selected-img-wrapper">
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
                        style={{ objectFit: "cover" }}
                      />
                    ))}
                  </div>
                </div>

                <div className="col-lg-6">
                  <h2
                    className="fw-bold mb-3"
                    dangerouslySetInnerHTML={{ __html: solution_sub_cat.heading }}
                  ></h2>

                  <div className="border-top pt-3 mb-3">
                    <div
                      className="text-sm mobile-big-text"
                      dangerouslySetInnerHTML={{
                        __html: solution_sub_cat.description1 || "",
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    {navbarMenu.find((item) => item.id === 4) && (
                      <Link to={navbarMenu.find((item) => item.id === 4).link}>
                        <button className="btn btn-primary px-4 py-2 rounded-pill">
                          Start Order Request
                        </button>
                      </Link>
                    )}
                  </div>

                  <div
                    className="border-top pt-3 text-sm mobile-big-text"
                    dangerouslySetInnerHTML={{
                      __html: solution_sub_cat.description2 || "",
                    }}
                  />
                </div>

              </div>
            </div>
          </section>

          {solution_sub_cat.imagechart && (
            <section className="mb-0 px-3">
              <img
                src={`${ROOT_URL}/${solution_sub_cat.imagechart}`}
                alt="Chart Banner"
                className="chart-img"
              />
            </section>
          )}


        </div>
      ) : (
        <p className="text-center mt-5">Loading...</p>
      )}


      <section className="py-5" style={{ backgroundColor: "#fafafa" }}>
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-semibold text-uppercase text-primary small mb-2">
              Functional Capabilities
            </h2>
            <p className="display-5 text-dark mx-auto" style={{ fontWeight: "600", maxWidth: "800px" }}>
              Smart Monitoring Features Built for Reliability
            </p>
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
                  className="d-flex justify-content-center px-3"   //  padding reduced
                >
                  <div
                    className="card-capability-group w-100 rounded-4 border border-slate-200 bg-white p-4 card-highlight-transition h-100 d-flex flex-column"
                    style={{
                      transition: "all 0.3s ease",
                      maxWidth: "100%"   // full width 
                    }}
                  >

                    {/* ICON */}
                    <div
                      className="icon-box-dynamic mb-4 d-flex align-items-center justify-content-center"
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

                    {/* TITLE */}
                    <h3
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "600",
                        color: "#0f172a",
                        marginBottom: "1rem"
                      }}
                    >
                      {title}
                    </h3>

                    {/* DESC */}
                    <p
                      style={{
                        color: "#475569",
                        lineHeight: "1.75",
                        fontSize: "1rem"
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      <section className="mb-1 pt-5 text-center">
        <Container>
          <p className="fw-semibold text-uppercase text-primary small mb-2">
            System Components & Architecture
          </p>

          <h3 className="display-5 text-dark mx-auto" style={{ fontWeight: "600", maxWidth: "900px" }}>
            Structured for Industrial Deployment
          </h3>
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