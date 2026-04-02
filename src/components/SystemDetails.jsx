import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
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
export default function SystemDetails() {
  return (
    <div>

      {/* Header */}
      <section
        className="pt-5 text-center position-relative"
        style={{ marginTop: "100px", zIndex: 2 }}
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