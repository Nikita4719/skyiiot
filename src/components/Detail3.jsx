import d3 from "../assets/d3.png";

export default function Detail3() {
  return (
    <div>
<section className="w-100 overflow-hidden">
        <div className="bg-white py-3 px-3 px-sm-4 px-lg-5 w-100">
          <div className="container">
            <div className="row g-4 align-items-center text-center text-lg-start">
              
              <div className="col-lg-6">
                <div className="mb-4">
                  <h1 className="text-dark fw-bold display-6">Adaptive algorithm-</h1>
                  <p className="text-muted mt-3">
                   smart device that learn, adapt, and optimize in real time.
                  </p>
                </div>

                <div className="mb-3">
                  <h2 className="fw-semibold text-dark mt-3">What It Is</h2>
                  <p className="text-muted mt-2">
                    Adaptive Algorithms enable your IoT devices to learn from changing conditions and user behaviours. Instead of static rules, your systems continuously refine how they operate improving accuracy, efficiency, and performance over time.
                  </p>
                </div>

                <div className="mb-3">
                  <h2 className="fw-semibold text-dark mt-3">How It Works</h2>
                  <ul>
                   <li>Data Collection: Devices gather real-time operational data — temperature, vibration, energy usage, etc.</li> 
                   <li>Learning Patterns: Built-in machine learning models analyse the data to detect trends, anomalies, or inefficiencies.</li>
                   <li>Auto-Optimization: Devices adjust parameters automatically — for example, adjusting power usage during peak hours or fine-tuning machinery for optimal throughput.</li>
                   <li>Continuous Improvement: The system refines its model with new data, becoming smarter the longer it runs.</li>
                  </ul>
                </div>

                <div className="mb-3">
                  <h2 className="fw-semibold text-dark mt-3">Use Case</h2>
                  <p className="text-muted mt-2">
                    A manufacturing facility uses adaptive algorithms in its HVAC and motor control systems. When environmental conditions shift (like heatwaves or machinery overload), the system learns to optimize cooling and motor speed lowering energy waste and avoiding costly downtime.
                  </p>
                </div>

                <div className="mb-3">
                  <h2 className="fw-semibold text-dark mt-3">Business Benefits</h2>
                  <ul>
                    <li>Reduce energy costs with self-adjusting operations</li>
                    <li>Extend equipment life through predictive adjustments</li>
                    <li>Increase uptime with auto-corrections before faults occur</li>
                    <li>Minimize manual interventions, freeing up your team’s time</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <img
                  src={d3}
                  alt="Edge Analytics Frame"
                  className="img-fluid w-100 rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

       <section className="w-100 overflow-hidden">

        
        <div className="bg-light py-4">
          <div className="container">
            <div className="row g-4 align-items-start">
           
              <div className="col-lg-6">
                <h2 className="text-primary mb-4">With SkylIoT You get:</h2>

                <div className="row g-4">
                 
                  <div className="col-12 col-sm-6">
                    <div className="mb-3">
                      <span
                        className="d-inline-flex align-items-center justify-content-center rounded-circle bg-dark text-white fw-bold"
                        style={{ width: "56px", height: "56px" }}
                      >
                        SaaS
                      </span>
                    </div>
                    <h5 className="fw-semibold mb-2">IoT Platform-as-a-Service</h5>
                    <p className="text-muted small">
                      A unified, end-to-end IoT Platform-as-a-Service that seamlessly integrates
                      software, hardware, and connectivity to deliver intelligent, scalable,
                      and reliable IoT solutions.
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="col-12 col-sm-6">
                    <div className="mb-3">
                      <span
                        className="d-inline-flex align-items-center justify-content-center rounded-circle bg-dark text-white"
                        style={{ width: "56px", height: "56px", fontSize: "1.2rem" }}
                      >
                        ⚙
                      </span>
                    </div>
                    <h5 className="fw-semibold mb-2">Custom Software & Hardware</h5>
                    <p className="text-muted small">
                      Flexible and pre-configured software and hardware designed to accelerate
                      your IoT deployment, easily adaptable to meet your specific business needs
                      and use cases.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="bg-secondary p-4 shadow-lg rounded">
                  <h6 className="bg-primary text-white px-3 py-1 rounded-pill d-inline-block mb-3">
                    Contact Details
                  </h6>
                  <form className="d-grid gap-3">
                    <input type="email" placeholder="*Work Email" className="form-control" />
                    <div className="row g-2">
                      <div className="col">
                        <input type="text" placeholder="First Name" className="form-control" />
                      </div>
                      <div className="col">
                        <input type="text" placeholder="Last Name" className="form-control" />
                      </div>
                    </div>
                    <div className="row g-2">
                      <div className="col">
                        <input type="text" placeholder="*Company Name" className="form-control" />
                      </div>
                      <div className="col">
                        <select className="form-select text-muted">
                          <option>HQ Country</option>
                          <option>India</option>
                          <option>USA</option>
                          <option>UK</option>
                        </select>
                      </div>
                    </div>
                    <input type="text" placeholder="Phone Number" className="form-control" />
                    <select className="form-select text-muted">
                      <option>*Nature Of Inquiry</option>
                      <option>Sales</option>
                      <option>Support</option>
                      <option>Partnership</option>
                    </select>
                    <button type="submit" className="btn btn-primary rounded-pill">
                      Submit Inquiry
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    
  );
}
