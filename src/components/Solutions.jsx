import bgsol from "../assets/bgsol.png";
import sol1 from "../assets/sol1.png";
import sol2 from "../assets/sol2.png";
import sol3 from "../assets/sol3.png";
import sol4 from "../assets/sol4.png";
import sol5 from "../assets/sol5.png";
import sol6 from "../assets/sol6.png";
import sol7 from "../assets/sol7.jpg";
import sol8 from "../assets/sol8.jpg";

import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Solutions() {
  return (
    <div>
      <section className="py-0 bg-light">
        <div className="mb-5">
          <img
            src={bgsol}
            alt="background img"
            className="img-fluid w-100"
            style={{ height: "300px", objectFit: "cover" }}
          />
        </div>

        <div className="container text-center">
          <div className="row g-4">
            <div className="col-md-3">
              <div className="card border-0 shadow rounded-4 overflow-hidden h-100">
                <div className="position-relative">
                  <img
                    src={sol1}
                    alt="solution"
                    className="w-100"
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <span className="position-absolute top-0 start-50 translate-middle-x mt-2 badge text-primary">
                    NEW
                  </span>
                </div>
                <div className="card-body d-flex flex-column text-start">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h4 className="fw-semibold mb-0">
                      Transforming Monitoring System
                    </h4>
                    <FaHeart className="text-danger flex-shrink-0" size={18} />

                  </div>
                  <div className="mt-auto d-flex gap-1">
                    <Link
                      to="/transform-monitor"
                      className="btn btn-outline-primary w-50 rounded-pill"
                    >
                      View Details
                    </Link>

                    <Link to="/contact" className="btn btn-primary rounded-pill">
                      Start Order
                    </Link>
                  </div>

                </div>
              </div>
            </div>


            <div className="col-md-3">
              <div className="card border-0 shadow rounded-4 overflow-hidden h-100">
                <div className="position-relative">
                  <img
                    src={sol2}
                    alt="solution"
                    className="w-100"
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <span className="position-absolute top-0 start-50 translate-middle-x mt-2 badge text-primary">
                    NEW
                  </span>
                </div>
                <div className="card-body d-flex flex-column text-start">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h4 className="fw-semibold mb-0">
                      Pump House Automation System
                    </h4>
                    <FaHeart className="text-danger flex-shrink-0" size={18} />

                  </div>
                  <div className="mt-auto d-flex gap-1">
                    <Link
                      to="/pump-automate"
                      className="btn btn-outline-primary w-50 rounded-pill"
                    >
                      View Details
                    </Link>
                    <Link to="/contact" className="btn btn-primary rounded-pill">
                      Start Order
                    </Link>
                  </div>

                </div>
              </div>
            </div>


            <div className="col-md-3">
              <div className="card border-0 shadow rounded-4 overflow-hidden h-100">
                <div className="position-relative">
                  <img
                    src={sol3}
                    alt="solution"
                    className="w-100"
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <span className="position-absolute top-0 start-50 translate-middle-x mt-2 badge text-primary">
                    NEW
                  </span>
                </div>
                <div className="card-body d-flex flex-column text-start">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h4 className="fw-semibold mb-0">
                      Street Light Monitoring System
                    </h4>
                    <FaHeart className="text-danger flex-shrink-0" size={18} />

                  </div>
                  <div className="mt-auto d-flex gap-1">
                    <Link
                      to="/light-monitor"
                      className="btn btn-outline-primary w-50 rounded-pill"
                    >
                      View Details
                    </Link>
                    <Link to="/contact" className="btn btn-primary rounded-pill">
                      Start Order
                    </Link>
                  </div>

                </div>
              </div>
            </div>


            <div className="col-md-3">
              <div className="card border-0 shadow rounded-4 overflow-hidden h-100">
                <div className="position-relative">
                  <img
                    src={sol4}
                    alt="solution"
                    className="w-100"
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <span className="position-absolute top-0 start-50 translate-middle-x mt-2 badge text-primary">
                    NEW
                  </span>
                </div>
                <div className="card-body d-flex flex-column text-start">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h4 className="fw-semibold mb-0">
                      RTU Based Solutuins
                    </h4>
                    <FaHeart className="text-danger flex-shrink-0" size={18} />

                  </div>
                  <div className="mt-auto d-flex gap-1">
                    <Link
                      to="/rtu-solution"
                      className="btn btn-outline-primary w-50 rounded-pill"
                    >
                      View Details
                    </Link>
                    <Link to="/contact" className="btn btn-primary rounded-pill">
                      Start Order
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-2 bg-light">
        <div className="container">
          <div className="row g-4">

            <div className="col-md-6">
              <img
                src={sol5}
                alt="sol5"
                className="img-fluid "
              />
            </div>

            <div className="col-md-6">
              <img
                src={sol6}
                alt="sol6"
                className="img-fluid w-100 rounded-4"
              />
            </div>

            <div className="col-md-6">
              <img
                src={sol7}
                alt="sol7"
                className="img-fluid w-100 rounded-4"
              />
            </div>

            <div className="col-md-6">
              <img
                src={sol8}
                alt="sol8"
                className="img-fluid w-100 rounded-4"
              />
            </div>

          </div>
        </div>
      </section>


    </div>
  );
}
