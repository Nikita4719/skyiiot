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
      <section className="testimonial-section py-4 mt-4 bg-white">
        <div className="container">
          <div className="testimonial-wrapper position-relative p-4 p-md-5">

            {/* <div className="testimonial-label mt-4">
              <span className="icon-circle">👍</span>
              Testimonial
            </div> */}

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

                <p className="testimonial-text mobile-para para2-center"
                  dangerouslySetInnerHTML={{
                    __html: testimonial.para2
                  }}>
                </p>

                <h5 className="fw-bold text-dark mb-1 mobile-heading"
                  dangerouslySetInnerHTML={{
                    __html: testimonial.heading
                  }}>
                </h5>

                <p
                  className="testimonial-text justify-text align-item-center mobile-para para1-shift"
                  dangerouslySetInnerHTML={{
                    __html: testimonial.para1
                  }}>
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

            <div className="testimonial-buttons d-flex justify-content-between">
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

      <section className="automation-section py-4 py-lg-5 bg-white">
        <div className="container">
          <div className="row gx-lg-5 gy-5 align-items-center">

            <div className="col-lg-6">
              <div className="video-wrapper w-100 shadow-sm rounded-4 overflow-hidden">
                <video
                  src={smarterData?.media ? `${ROOT_URL}/${smarterData.media}` : "null"}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-100 h-auto"
                />
              </div>
            </div>

            <div className="col-lg-6 ps-lg-5">
              <div className="automation-content text-center text-lg-start" style={{ margin: "0 auto", maxWidth: "100%" }}>
                <div style={{ maxWidth: "580px", marginLeft: "auto", marginRight: "auto" }} className="mx-lg-0">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4 leading-tight"
                    dangerouslySetInnerHTML={{
                      __html: smarterData?.heading
                    }}>
                  </h2>

                  <p className="text-slate-600 mb-4 text-base md:text-lg"
                    dangerouslySetInnerHTML={{ __html: smarterData?.para }}></p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="automation-section py-4 py-lg-5 bg-white">
        <div className="container">
          <div className="row gx-lg-5 gy-5 align-items-center">
            
            <div className="col-lg-6 order-2 order-lg-1 pe-lg-5">
              <div className="automation-content text-center text-lg-start">
                <div style={{ maxWidth: "580px", marginLeft: "auto", marginRight: "auto" }} className="mx-lg-0">
                  <h2
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4 leading-tight"
                    dangerouslySetInnerHTML={{ __html: poweredData?.heading1 }}
                  ></h2>
                  <h4
                    className="text-lg md:text-xl font-semibold text-sky-600 mb-4"
                    dangerouslySetInnerHTML={{ __html: poweredData.heading2 }}
                  ></h4>

                  <p className="text-slate-600 mb-4 text-base md:text-lg"
                    dangerouslySetInnerHTML={{ __html: poweredData.paragraph1 }}></p>


                  <h4
                    className="text-lg md:text-xl font-semibold text-sky-600 mb-4"
                    dangerouslySetInnerHTML={{ __html: poweredData.heading3 }}
                  ></h4>
                  <p className="text-slate-600 mb-4 text-base md:text-lg"
                    dangerouslySetInnerHTML={{ __html: poweredData?.paragraph2 }}
                  ></p>
                </div>
              </div>
            </div>

            <div className="col-lg-6 order-1 order-lg-2">
              <div className="video-wrapper w-100 shadow-sm rounded-4 overflow-hidden">
                <video
                  src={poweredData?.media ? `${ROOT_URL}/${poweredData.media}` : "null"}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-100 h-auto"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

    </div >
  );
}