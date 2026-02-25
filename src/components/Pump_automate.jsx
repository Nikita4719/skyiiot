import { useState } from "react";
import ppbg from "../assets/ppbg.png"
import pp1 from "../assets/pp1.png";
import pp2 from "../assets/pp2.png";
import pp3 from "../assets/pp3.png";
import pp4 from "../assets/pp4.png";
import pp5 from "../assets/pp5.png";
import { Link } from "react-router-dom";
import pps from "../assets/pps.png";
export default function Pump_automate() {
  const [selectedImage, setSelectedImage] = useState(pp1);
  const thumbnails = [pp2, pp3, pp4, pp5];
  return (
    <div>
      <section className="bg-light">
        <div>
          <img
            src={ppbg}
            alt="Transform Monitoring Banner"
            className="w-100"
            style={{ height: "350px", objectFit: "cover" }}
          />
        </div>

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
                  {thumbnails.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt="thumb"
                      onClick={() => setSelectedImage(img)}
                      className="img-thumbnail"
                      style={{
                        width: "70px",
                        height: "70px",
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

                <h3 className="fw-bold mb-3">
                  Transforming Monitoring System
                </h3>

                <hr />

                <div className="mb-2">
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
                </div>

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
                src={pps}
                alt="Transform Monitoring Banner"
                className="w-100"
                style={{ height: "350px", objectFit: "cover" }}
              />
            </section>
    </div>
  )
}