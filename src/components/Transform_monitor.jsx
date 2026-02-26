
import tmbg from "../assets/tmbg.png";
import sol1 from "../assets/sol1.png";
import sc1 from "../assets/sc1.png";
import sc2 from "../assets/sc2.png";
import sc3 from "../assets/sc3.png";
import sc4 from "../assets/sc4.png";
import { Link } from "react-router-dom";
import tms from "../assets/tms.png";
import { useState, useEffect } from "react";
import api from "./api";
import { ROOT_URL } from "./api";
export default function TransformMonitor() {
  const [selectedImage, setSelectedImage] = useState(sol1);
  const [solution_sub_cat, setSolution_sub_cat] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const solution_sub_catres = await api.get("/solution-sub-cat");

        // 👇 sirf solutionCatId 1 ka data nikalo
        const filteredData = solution_sub_catres.data.find(
          (item) => item.solutionCatId === 1
        );

        setSolution_sub_cat(filteredData);

        // first image auto select
        if (filteredData?.image2?.length > 0) {
          setSelectedImage(`${ROOT_URL}/${filteredData.image2[0]}`);
        }

        // console.log(solution_sub_catres.data);
        // console.log(solution_sub_catres.data[0]?.image2);
        // console.log(ROOT_URL);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>

      <section>
        <img
          src={tmbg}
          alt="Transform Monitoring Banner"
          className="w-100"
          style={{ height: "350px", objectFit: "cover" }}
        />
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4 align-items-stretch">


            <div className="col-lg-6">
              <div className="card border-0 shadow-sm h-100 p-4">

                <div className="text-center mb-4">
                  <img
                    src={selectedImage}
                    alt="Product"
                    className="img-fluid rounded-3"
                    style={{ maxHeight: "350px", objectFit: "cover" }}
                  />
                </div>

                <div className="d-flex justify-content-center gap-3 flex-wrap">

                  {solution_sub_cat?.image2?.map((img, index) => (
                    <img
                      key={index}
                      src={`${ROOT_URL}/${img}`}
                      alt="thumb"
                      onClick={() => setSelectedImage(`${ROOT_URL}/${img}`)}
                      className="img-thumbnail"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>

              </div>
            </div>


            <div className="col-lg-6">
              <div className="card border-0 shadow-sm h-100 p-4">

                <h3 className="fw-bold mb-3">{solution_sub_cat?.title}</h3>

                <hr />
                <p>{solution_sub_cat?.para1}</p>
                {/* <div className="mb-2">
                  <strong>Model No:</strong> SKYIoT1002
                </div>
                <div className="mb-2">
                  <strong>Screen Size:</strong> No Screen
                </div>
                <div className="mb-2">
                  <strong>Use:</strong> Automotive
                </div>

                <hr />

                <div className="mt-3 small text-muted">
                  <p><strong>Shipping Cost:</strong> To be negotiated</p>
                  <p><strong>Payment Methods:</strong> Visa, MasterCard, UPI</p>
                  <p><strong>Secure Payments:</strong> Every payment is protected.</p>
                </div> */}

                <div className="mt-auto pt-3">
                  <Link to="/contact">
                    <button className="btn btn-primary rounded-pill px-4">
                      Start Order Request
                    </button>
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="mb-5">
        <img
          src={tms}
          alt="Transform Monitoring Banner"
          className="w-100"
          style={{ height: "350px", objectFit: "cover" }}
        />
      </section>

      <section className="container py-5">
        <div className="border-bottom d-flex gap-4 mb-4">
          <button className="btn p-0 border-0 border-bottom border-2 border-primary text-primary fw-semibold">
            System Components & Architecture
          </button>
        </div>

        <h6 className="fw-semibold text-secondary">Basic Info.</h6>

        <div className="row mt-4 g-4">


          <div className="col-lg-6">


            <div className="card mb-4">
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Component</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Smart Sensor Nodes</td>
                      <td>Monitor temp, oil level, current, moisture, vibration</td>
                    </tr>
                    <tr>
                      <td>IoT Gateway</td>
                      <td>Encrypted 4G/GSM data transfer with OTA updates</td>
                    </tr>
                    <tr>
                      <td>Energy Meter Interface</td>
                      <td>Detects overload, imbalance & anomalies</td>
                    </tr>
                    <tr>
                      <td>Dashboard & Mobile App</td>
                      <td>Centralized monitoring & reporting</td>
                    </tr>
                    <tr>
                      <td>Alert Engine</td>
                      <td>Configurable multi-channel alerts</td>
                    </tr>
                    <tr>
                      <td>Integration Layer</td>
                      <td>SCADA/ERP ready via API</td>
                    </tr>
                    <tr>
                      <td>Offline Data Buffer</td>
                      <td>Stores data during downtime</td>
                    </tr>
                    <tr>
                      <td>Battery Backup Unit</td>
                      <td>Ensures uptime during power loss</td>
                    </tr>
                    <tr>
                      <td>Surge Protection Unit</td>
                      <td>Lightning & voltage spike protection</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="fw-semibold">Functional Capabilities</h4>
              <hr className="border-primary w-25" />
            </div>

            <div className="row g-4">


              <div className="col-md-6">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="fw-semibold">Smart Sensor Node</h5>
                    <p className="text-muted small">
                      Continuous monitoring of critical transformer parameters.
                    </p>
                    <ul>
                      <li>Temperature monitoring</li>
                      <li>Load current measurement</li>
                      <li>Voltage monitoring</li>
                      <li>Oil level detection</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="fw-semibold">Key Features</h5>
                    <ul>
                      <li>Multi-channel alerts (SMS, Email, App)</li>
                      <li>Asset-level dashboards</li>
                      <li>Fault event logging</li>
                      <li>AI predictive maintenance</li>
                      <li>Offline data buffering</li>
                      <li>SMS / Call notifications</li>
                      <li>Exportable reports (CSV, PDF)</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>

          </div>


          <div className="col-lg-6">

            <div className="card shadow-sm p-4">

              <h5 className="fw-semibold mb-4">Core Modules</h5>

              <div className="d-flex flex-column gap-3">

                <div className="card p-3">
                  <strong>24/7 Real-time Monitoring</strong>
                  <ul className="mb-0">
                    <li>Edge diagnostics</li>
                    <li>Industrial design</li>
                  </ul>
                </div>

                <div className="card p-3">
                  <strong>IoT Gateway (4G / GSM)</strong>
                  <p className="mb-0 text-muted">Secure encrypted communication</p>
                </div>

                <div className="card p-3">
                  <strong>Cloud Hosting & Backup Layer</strong>
                </div>

                <div className="card p-3">
                  <strong>Role-based Web Dashboard</strong>
                  <ul className="mb-0">
                    <li>Analytics</li>
                    <li>User management</li>
                    <li>Alert settings</li>
                  </ul>
                </div>

                <div className="card p-3">
                  <strong>Mobile App (Android / iOS)</strong>
                </div>

                <div className="card p-3">
                  <strong>Add-ons</strong>
                  <ul className="mb-0">
                    <li>Battery backup module</li>
                    <li>Surge protection unit</li>
                    <li>SCADA / ERP API integration</li>
                  </ul>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}