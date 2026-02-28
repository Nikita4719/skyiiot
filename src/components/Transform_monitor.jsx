import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "./api";
import { ROOT_URL } from "./api";
import tmbg from "../assets/tmbg.png";
import tms from "../assets/tms.png";
import sol1 from "../assets/sol1.png";

export default function TransformMonitor() {
  const { id } = useParams(); // get dynamic id from URL
  const [selectedImage, setSelectedImage] = useState(sol1);
  const [solution_sub_cat, setSolution_sub_cat] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await api.get("/solution-sub-cat");

// console.log(res.data);
//         // Convert id to number to match API data
//         const filteredData = res.data.find(
//           (item) => item.solutionCatId === Number(id)
//         );
//         setSolution_sub_cat(filteredData);

//         // Set first image as default if available
//         if (filteredData?.image2?.length > 0) {
//           setSelectedImage(`${ROOT_URL}/${filteredData.image2[0]}`);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, [id]); // refetch when id changes

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await api.get("/solution-sub-cat");

      const filteredData = res.data.find(
        (item) => item.solutionCatId === Number(id)
      );

      //  If no data found
      if (!filteredData) return;

      //  Convert image2 string into array
      if (filteredData.image2) {
        filteredData.image2 = JSON.parse(filteredData.image2);
      } else {
        filteredData.image2 = [];
      }

      setSolution_sub_cat(filteredData);
      if (filteredData.image2.length > 0) {
        setSelectedImage(`${ROOT_URL}/${filteredData.image2[0]}`);
      }

    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
}, [id]);

  if (!solution_sub_cat) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div>
      <h1 className="text-center my-4">Details for Item {id}</h1>


      <section>
        <img
          src={tmbg}
          alt="Transform Monitoring Banner"
          className="w-100"
          style={{ height: "350px", objectFit: "cover" }}
        />
      </section>

      {/* Main Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4 align-items-stretch">

            {/* Left Column - Images */}
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
                      alt={`thumb-${index}`}
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

            {/* Right Column - Details */}
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm h-100 p-4">
                <h3 className="fw-bold mb-3">{solution_sub_cat.title}</h3>
                <hr />
                <p>{solution_sub_cat.para1}</p>

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

      {/* Additional Banner */}
      <section className="mb-5">
        <img
          src={tms}
          alt="Transform Monitoring Banner"
          className="w-100"
          style={{ height: "350px", objectFit: "cover" }}
        />
      </section>

      {/* System Components Section */}
      <section className="container py-5">
        <div className="border-bottom d-flex gap-4 mb-4">
          <button className="btn p-0 border-0 border-bottom border-2 border-primary text-primary fw-semibold">
            System Components & Architecture
          </button>
        </div>

        <h6 className="fw-semibold text-secondary">Basic Info.</h6>

        <div className="row mt-4 g-4">

          {/* Left Column - Tables & Features */}
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

          {/* Right Column - Core Modules */}
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