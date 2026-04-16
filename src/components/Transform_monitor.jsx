import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "./api";
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
  ShieldAlert
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
  const tableIcons = [
    Thermometer,
    Router,
    BarChart3,
    MonitorSmartphone,
    Siren,
    PlugZap,
    HardDrive,
    BatteryCharging,
    ShieldAlert
  ];

  const renderTableWithIcons = (html) => {
    return parse(html, {
      replace: (node) => {

        if (node.name === "tr") {

          const rows = node.parent?.children?.filter(n => n.name === "tr") || [];
          const index = rows.indexOf(node);
          if (index === 0) {
            return (
              <tr>
                <th className="text-dark" style={{ width: "70px", textAlign: "center", fontSize: "17px", fontWeight: "600" }}>
                  Icon
                </th>
                {domToReact(node.children)}
              </tr>
            );
          }

          const Icon = tableIcons[index - 1];

          return (
            <tr className="table-row-hover">
              <td className="icon-cell">
                {Icon && <Icon size={18} />}
              </td>
              {domToReact(node.children)}
            </tr>
          );
        }

      },
    });
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


      <section
        className="pt-1 text-center position-relative"
        style={{ marginTop: "50px", zIndex: 2 }}
      >
        <p className="fw-semibold text-uppercase text-primary small mb-2">
          Functional Capabilities
        </p>

        <h4 className=" display-5 text-dark" style={{ fontWeight: "600" }}>
          Smart Monitoring Features Built for Reliability
        </h4>
      </section>


      <section className="py-3">
        <Container fluid className="px-4">
          <Row className="g-5">
            {cardsData.map((html, index) => {

              const cleanHTML = DOMPurify.sanitize(html);
              const temp = document.createElement("div");
              temp.innerHTML = cleanHTML;

              const title = temp.querySelector("h4")?.innerText || "";
              const desc = temp.querySelector("p")?.innerText || "";
              const iconMapDynamic = {
                "24/7 Real-Time Monitoring": Activity,
                "Multi-Channel Alerts": BellRing,
                "Asset Tagging & Dashboards": Database,
                "Fault Event Logging": Cpu,
                "AI Predictive Maintenance": BrainCircuit,
                "Offline Data Buffering": HardDrive
              };

              const Icon = iconMapDynamic[title] || Activity;

              return (
                <Col key={index} xs={12} md={4} xl={4} className="d-flex">
                  <Card className="h-100 shadow border-0 rounded-4 card-hover"
                    style={{ width: "100%", maxWidth: "320px" }} >
                    <Card.Body>

                      {/* ICON */}
                      <div className="icon-box mb-4">
                        <Icon size={25} />
                      </div>

                      {/* TITLE */}
                      <Card.Title className="fw-semibold fs-4 mb-3">
                        {title}
                      </Card.Title>

                      {/* DESCRIPTION */}
                      <Card.Text className="text-muted">
                        {desc}
                      </Card.Text>

                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      <section className="mb-1 pt-5 text-center">
        <p className="fw-semibold text-uppercase text-primary small mb-2">
          System Components & Architecture
        </p>

        <h3 className=" display-5 text-dark" style={{ fontWeight: "600" }}>
          Structured for Industrial Deployment
        </h3>
      </section>

      <Container className="py-4">
        <div className="table-responsive">
          {renderTableWithIcons(
            DOMPurify.sanitize(solution_sub_cat?.para1 || "")
          )}
        </div>
      </Container>
      {/* <section className="container py-5">
        <div className="border-bottom d-flex gap-4 mb-4">
          <button className="btn p-0 border-0 border-bottom border-2 border-primary text-primary fw-semibold">
            System Components & Architecture
          </button>
        </div>

        <h6 className="fw-semibold text-secondary">Basic Info.</h6>

        <div className="row mt-4 g-4">
          {["para1"].map((key, idx) => {

            const cleanHTML = DOMPurify.sanitize(solution_sub_cat[key] || "");

            return (
              <div className="col-lg-6 d-flex" key={idx}>
                <div
                  className="p-4 border rounded d-flex flex-column w-100"
                  style={{ backgroundColor: "#F1F5F9" }}
                >
                  <div
                    // className={`${key === "para1" ? "table-fix" : ""} mobile-big-text`}
                    dangerouslySetInnerHTML={{ __html: cleanHTML }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section> */}

    </div >
  );
}