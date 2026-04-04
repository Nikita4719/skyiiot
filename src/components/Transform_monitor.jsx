import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "./api";
import { ROOT_URL } from "./api";
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

const productData = {
  functionalCapabilities: [
    {
      title: "24/7 Real-Time Monitoring",
      desc: "Track temperature, load current, voltage, oil level, moisture, and vibration continuously.",
      icon: Activity
    },
    {
      title: "Multi-Channel Alerts",
      desc: "Get configurable alerts through SMS, Email, and Mobile App notifications.",
      icon: BellRing
    },
    {
      title: "Asset Tagging & Dashboards",
      desc: "Organize transformer assets with transformer-level dashboards and visibility.",
      icon: Cpu
    },
    {
      title: "Fault Event Logging",
      desc: "Maintain historical records, event logs, and archived operational data.",
      icon: Database
    },
    {
      title: "AI Predictive Maintenance",
      desc: "Use AI-driven analytics to predict faults before failure occurs.",
      icon: BrainCircuit
    },
    {
      title: "Offline Data Buffering",
      desc: "Ensure data continuity during communication downtime or network loss.",
      icon: WifiOff
    }
  ]
};
const componentsData = [
  {
    title: "Smart Sensor Nodes",
    desc: "Monitor temperature, oil level, current, moisture, and vibration inside an IP65 enclosure.",
    icon: Thermometer
  },
  {
    title: "IoT Gateway",
    desc: "Sends encrypted data via 4G/GSM with retry logic and OTA update capability.",
    icon: Router
  },
  {
    title: "Energy Meter Interface",
    desc: "Detects phase imbalance, overload, and power factor anomalies.",
    icon: BarChart3
  },
  {
    title: "Dashboard & Mobile App",
    desc: "Provides centralized monitoring, trend analysis, and report generation.",
    icon: MonitorSmartphone
  },
  {
    title: "Alert Engine",
    desc: "Supports configurable alerts through multiple communication channels.",
    icon: Siren
  },
  {
    title: "Integration Layer",
    desc: "SCADA / ERP ready with Modbus, MQTT, and REST API support.",
    icon: PlugZap
  },
  {
    title: "Offline Data Buffer",
    desc: "Stores data locally during network downtime and syncs later.",
    icon: HardDrive
  },
  {
    title: "Battery Backup Unit",
    desc: "Ensures uninterrupted operation during power failures.",
    icon: BatteryCharging
  },
  {
    title: "Surge Protection Unit",
    desc: "Protects system components from lightning and voltage spikes.",
    icon: ShieldAlert
  }
];


export default function TransformMonitor({ solutions }) {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [solution_sub_cat, setSolution_sub_cat] = useState(null);
  const [navbarMenu, setNavbarMenu] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/solution-sub-cat");
        const filteredData = res.data.find(
          (item) => item.solutionCatId === Number(id)
        );

        if (!filteredData) return;

        // Convert image2 from string to array if necessary
        if (filteredData.image2) {
          filteredData.image2 = JSON.parse(filteredData.image2);
        } else {
          filteredData.image2 = [];
        }

        setSolution_sub_cat(filteredData);

        // Set first thumbnail as default selected image
        if (filteredData.image2.length > 0) {
          setSelectedImage(`${ROOT_URL}/${filteredData.image2[0]}`);
        } else if (filteredData.image1) {
          setSelectedImage(`${ROOT_URL}/${filteredData.image1}`);
        }
        const menuRes = await api.get("/navbar-menu");
        setNavbarMenu(menuRes.data);

      }
      catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  if (!solution_sub_cat)
    return <p className="text-center mt-5">Loading...</p>;
  const contactItem = navbarMenu.find(item => item.id === 4);


  return (
    <div>
      {/* Dynamic TransformMonitor Content */}
      {solution_sub_cat ? (
        <div>
          {/* Top Banner */}
          {solution_sub_cat.image1 && (
            <section className="top-bannerr pt-4">
              <img src={`${ROOT_URL}/${solution_sub_cat.image1}`} alt="Banner" />
            </section>
          )}

          {/* Main Section */}
          <section className="py-5 bg-white">
            <div className="custom-wrapper">
              <div className="row g-4 align-items-start">

                {/* Left Column */}
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

                  {/* Thumbnails */}
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

                {/* Right Column */}
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

          {/* Optional Chart Banner */}
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
      {/* Header */}
      <section
        className="pt-1 text-center position-relative"
        style={{ marginTop: "50px", zIndex: 2 }}
      >
        <p className="fw-semibold text-uppercase text-primary small mb-2">
          Functional Capabilities
        </p>

        <h2 className="fw-bold display-5 text-dark">
          Smart Monitoring Features Built for Reliability
        </h2>
      </section>

      {/* Cards */}
      <section className="py-5">
        <Container>
          <Row className="g-4">
            {productData.functionalCapabilities.map((item, index) => {
              const Icon = item.icon;

              return (
                <Col key={index} xs={12} md={6} xl={4}>
                  <Card className="h-100 shadow border-0 rounded-4 card-hover">
                    <Card.Body>

                      <div className="icon-box mb-4">
                        <Icon size={28} />
                      </div>

                      <Card.Title className="fw-semibold fs-4 mb-3">
                        {item.title}
                      </Card.Title>

                      <Card.Text className="text-muted">
                        {item.desc}
                      </Card.Text>

                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      <section className="mb-5 pt-5 text-center">
        <p className="fw-semibold text-uppercase text-primary small mb-2">
          System Components & Architecture
        </p>

        <h2 className="fw-bold display-5 text-dark">
          Structured for Industrial Deployment
        </h2>
      </section>

      <Container className="py-5">

        {/* Table Wrapper */}
        <div className="border rounded-4 shadow-sm overflow-hidden">

          {/* Header */}
          <Row className="bg-light fw-semibold px-3 py-3 border-bottom">
            <Col md={4}>Component</Col>
            <Col md={8}>Description</Col>
          </Row>

          {/* Rows */}
          {componentsData.map((item, index) => {
            const Icon = item.icon;

            return (
              <Row
                key={index}
                className="align-items-center px-3 py-4 border-bottom table-row-hover"
              >
                {/* Left Side */}
                <Col md={4} className="d-flex align-items-center gap-3 fw-semibold">

                  <div className="icon-box">
                    <Icon size={20} />
                  </div>

                  {item.title}
                </Col>

                {/* Right Side */}
                <Col md={8} className="text-muted">
                  {item.desc}
                </Col>
              </Row>
            );
          })}
        </div>
      </Container>

    </div>
  );
}