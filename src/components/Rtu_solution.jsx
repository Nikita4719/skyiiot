import rtubg from "../assets/rtubg.png"
import { Link } from "react-router-dom";
import rs1 from "../assets/rs1.png";
export default function Rtu_solution() {

  return (
    <div>
      <section className="bg-light">
        <div>
          <img
            src={rtubg}
            alt="Transform Monitoring Banner"
            className="w-100"
            style={{ height: "350px", objectFit: "cover" }}
          />
        </div>
      </section>


      <section className="py-5">
        <div className="container">
          <div className="row g-5 align-items-center">


            <div className="col-lg-6 text-center">
              <img
                src={rs1}
                alt="RTU Based Solutions"
                className="img-fluid rounded-4 shadow-sm"
                style={{ maxHeight: "450px", objectFit: "cover" }}
              />
            </div>
            <div className="col-lg-6">
              <h2 className="fw-bold mb-3">
                RTU Based Solutions
              </h2>

              <hr />
              <div className="mt-4">
                <h5 className="fw-semibold mb-3">Product Details</h5>

                <div className="mb-2">
                  <strong>Model No:</strong> SKYIoT1002
                </div>

                <div className="mb-2">
                  <strong>Screen Size:</strong> No Screen
                </div>

                <div className="mb-2">
                  <strong>Use:</strong> Automotive
                </div>
              </div>
              <div className="mt-4">
                <Link
                  to="/contact"
                  className="btn btn-primary rounded-pill px-4"
                >
                  Start Order Request
                </Link>
              </div>
              <div className="mt-4 border-top pt-4 small text-muted">
                <p><strong>Shipping Cost:</strong> To be negotiated</p>
                <p><strong>Payment Methods:</strong> Visa, MasterCard, UPI</p>
                <p>
                  <strong>Secure Payments:</strong> Every payment you make is protected.
                </p>
                <p>
                  <strong>Refund Policy:</strong> Claim a refund if your order doesn’t ship or arrives damaged.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="fw-bold text-dark mb-5">
            Product Specifications
          </h2><div className="row g-4">
            <div className="col-lg-6">
              <div className="card shadow-sm border-0 h-100 border-start border-4 border-primary">
                <div className="card-body">
                  <h5 className="fw-semibold mb-3">System</h5>
                  <ul className="list-unstyled small text-muted">
                    <li><strong>Controller:</strong> ARM Cortex M1, 512KB Flash, 32KB SRAM</li>
                    <li><strong>Flash:</strong> 64MB Offline Data Log</li>
                    <li><strong>EEPROM:</strong> 512KB</li>
                    <li><strong>RTC:</strong> External with Battery Backup</li>
                    <li><strong>Watchdog:</strong> Internal</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card shadow-sm border-0 h-100 border-start border-4 border-info">
                <div className="card-body">
                  <h5 className="fw-semibold mb-3">I/O Ports</h5>
                  <ul className="list-unstyled small text-muted">
                    <li><strong>Power Supply:</strong> 12-24V with Reverse Protection</li>
                    <li><strong>Analog Input:</strong> 6 Channel (4-20mA / 0-10V)</li>
                    <li><strong>Resolution:</strong> 12-bit, 1000 SPS</li>
                    <li><strong>Relay Output:</strong> 6 Channel, 5A Max</li>
                    <li><strong>Digital Input:</strong> 6 Channel Isolated</li>
                    <li><strong>LED Indication:</strong> GSM, Heart Beat, Server</li>
                    <li><strong>Display:</strong> 16*2 LCD</li>
                    <li><strong>RS485:</strong> Isolated, 1 Channel</li>
                    <li><strong>USB:</strong> Mini USB for PC Configuration</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card shadow-sm border-0 h-100 border-start border-4 border-success">
                <div className="card-body">
                  <h5 className="fw-semibold mb-3">Modem</h5>
                  <ul className="list-unstyled small text-muted">
                    <li><strong>Technology:</strong> 4G LTE</li>
                    <li><strong>SIM Slot:</strong> Micro SIM</li>
                    <li><strong>Antenna Connector:</strong> SMA Angular</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card shadow-sm border-0 h-100 border-start border-4 border-warning">
                <div className="card-body">
                  <h5 className="fw-semibold mb-3">Communication Protocols</h5>
                  <ul className="list-unstyled small text-muted">
                    <li>Transparent Modbus RTU</li>
                    <li>Modbus RTU Polling</li>
                    <li>Modbus RTU over TCP</li>
                    <li>Modbus RTU Slave</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card shadow-sm border-0 h-100 border-start border-4 border-danger">
                <div className="card-body">
                  <h5 className="fw-semibold mb-3">Export Protocols</h5>
                  <ul className="list-unstyled small text-muted">
                    <li>TCP</li>
                    <li>HTTP(S)</li>
                    <li>MQTT(S)</li>
                    <li>FTP</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card shadow-sm border-0 h-100 border-start border-4 border-secondary">
                <div className="card-body">
                  <h5 className="fw-semibold mb-3">Mechanical</h5>
                  <ul className="list-unstyled small text-muted">
                    <li>Casing: ABS Enclosure</li>
                    <li>Protection: IP20 (Indoor)</li>
                    <li>Dimensions: 70mm * 130mm * 60mm</li>
                    <li>Installation: DIN Rail Mount</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card shadow-sm border-0 h-100 border-start border-4 border-success">
                <div className="card-body">
                  <h5 className="fw-semibold mb-3">Environmental</h5>
                  <ul className="list-unstyled small text-muted">
                    <li>ABS Casing</li>
                    <li>IP20</li>
                    <li>Indoor Use</li>
                    <li>DIN Rail Mount</li>
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