import React, { useState, useEffect } from "react";
import api from "./api";
import { ROOT_URL } from "./api";
export default function Testimonial() {
  const [testimonialData, setTestimonialData] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/testimonials");
        setTestimonialData(res.data);
      }catch (error) {
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
    <section className="testimonial-section py-5 bg-white">
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
  );
}