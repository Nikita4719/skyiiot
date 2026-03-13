import React, { useState, useEffect } from "react";
import api from "./api";
import { ROOT_URL } from "./api";
export default function Testimonial() {
  const [testimonialData, setTestimonialData] = useState([]);
  const [index, setIndex] = useState(0);
  const [smarterData, setSmarterData] = useState([]);
  const [poweredData, setPoweredData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/testimonials");
        const smarterres = await api.get("/smarter");
        const poweredres = await api.get("/ai-powered");
        setTestimonialData(res.data);
        setSmarterData(smarterres.data[0]);
        setPoweredData(poweredres.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (testimonialData.length === 0) {
    return (
      <section className="py-5 text-center">
        <h5>Loading Testimonials...</h5>
      </section>
    );
  }

  const testimonial = testimonialData[index];
  const nextSlide = () => {
    console.log("Next clicked");
    setIndex((prevIndex) =>
      prevIndex === testimonialData.length - 1 ? 0 : prevIndex + 1
    );
  };
  const prevSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? testimonialData.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <section className="testimonial-section py-4 bg-white">
        <div className="container">
          <div className="testimonial-wrapper position-relative p-4 p-md-5">

            <div className="testimonial-label">
              <span className="icon-circle">👍</span>
              Testimonial
            </div>

            <div className="row align-items-center g-4">

              <div className="col-md-6 text-center text-md-start">
                <img
                  src={`${ROOT_URL}/${testimonial.image1}`}
                  alt={testimonial.heading}
                  className="img-fluid main-img"
                />
              </div>

              <div className="col-md-6">
                <div className="quote-mark">“</div>

                <p className="testimonial-text">
                  {testimonial.para2}
                </p>

                <h5 className="fw-bold text-dark mb-1">
                  {testimonial.heading}
                </h5>

                <p className="text-muted small">
                  {testimonial.para1}
                </p>
              </div>
            </div>

            <div className="side-image left-image d-none d-lg-flex">
              <img
                src={`${ROOT_URL}/${testimonial.image2}`}
                alt="Side"
                className="img-fluid"
              />
            </div>

            <div className="side-image right-image d-none d-lg-flex">
              <img
                src={`${ROOT_URL}/${testimonial.image3}`}
                alt="Side"
                className="img-fluid"
              />
            </div>

            <div className="testimonial-buttons d-flex justify-content-between mt-4 mt-md-5">
              <button
                className="btn btn-primary px-4"
                onClick={prevSlide}
              >
                ← Previous
              </button>

              <button
                className="btn btn-primary px-4"
                onClick={nextSlide}
              >
                Next →
              </button>
            </div>

            <div className="background-text d-none d-md-block">
              Testimonials
            </div>

          </div>
        </div>
      </section>

      <section className="automation-section py-5 bg-light">
        <div className="container">
          <div className="row align-items-start g-5">

            <div className="col-lg-6">
              <div className="video-wrapper">
                <video
                  src={smarterData?.media ? `${ROOT_URL}/${smarterData.media}` : "null"}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-100"
                />
              </div>
            </div>

            <div className="col-lg-6">
              <h2 className="text-2xl sm:text-3xl font-semibold text-black mb-4">
                {smarterData?.heading}
              </h2>

              <p className="text-muted mb-4">{smarterData?.para}</p>

            </div>

          </div>
        </div>
      </section>

      <section className="automation-section py-2 bg-light">
        <div className="container">
          <div className="row align-items-start g-5">
            <div className="col-lg-6">
              <h2 className="text-2xl sm:text-3xl font-semibold text-black mb-4">{poweredData.heading1}</h2>
              <h6 className="text-black fw-semibold fs-6 mt-4">
                {poweredData.heading2}
              </h6>

              <p className="text-muted mb-2">{poweredData.paragraph1}</p>


              <h6 className="text-black fw-semibold fs-6 mt-4">
                {poweredData.heading3}
              </h6>
              <p className="text-muted mb-2">{poweredData.paragraph2}</p>
              {/* <ul className="automation-list text-start ps-0">
                                <li className="mb-2">
                                    Edge AI Processing - Analyze and act at the edge to reduce latency.
                                </li>
                                <li className="mb-2">
                                    Event-Based Triggers - Automate actions when specific conditions are met.
                                </li>
                                <li className="mb-2">
                                    Predictive Intelligence - Anticipate failures and optimize performance.
                                </li>
                                <li className="mb-2">
                                    Cloud & Edge Sync - Seamlessly synchronize data across your ecosystem.
                                </li>

                            </ul> */}

            </div>

            <div className="col-lg-6">
              <div className="video-wrapper">
                <video
                  src={poweredData?.media ? `${ROOT_URL}/${poweredData.media}` : "null"}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-100"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}