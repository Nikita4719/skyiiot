

import { useEffect, useState } from "react";
import api from "./api";
import { useParams } from "react-router-dom";
import { ROOT_URL } from "./api";
import d1 from "../assets/d1.png";

export default function Detail1() {
  const [detail, setDetail] = useState(null);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    api.get("/services-sub-cat")
      .then(res => {
        // console.log("All data:", res.data);
        const found = res.data.find(item => item.services_category_id == id); // <-- correct filter
        console.log("Selected detail:", found);
        setDetail(found);
      })
      .catch(err => console.log(err));
  }, [id]);
  if (!detail) return <p>Loading...</p>;
  return (
    <div>

      <section className="w-100 overflow-hidden">
        <div className="bg-white py-3 px-3 px-sm-4 px-lg-5 w-100">
          <div className="container">
            <div className="row g-4 align-items-center text-center text-lg-start">

              <div className="col-lg-6">
                <div className="mb-4">
                  <h1 className="text-skyiiot fw-bold display-6 mobile-heading" dangerouslySetInnerHTML={{
                    __html: detail?.title
                  }}></h1>
                  <p
                    className=" mt-3 mobile-para" style={{
                      textAlign: "justify",
                    }}
                    dangerouslySetInnerHTML={{ __html: detail?.description }}
                  ></p>
                </div>


              </div>
              <div className="col-lg-6" style={{ marginTop: "-80px" }}>
                <img
                  src={`${ROOT_URL}/${detail?.image}`}
                  alt="Edge Analytics Frame"
                  className="img-fluid w-100 rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="position-relative">

        {/* Background Image */}
        <img
          src={`${ROOT_URL}/${detail?.imagebg}`}
          alt="Background"
          className="w-100 bg-img"
        />

        {/* Content + Form Wrapper */}
        <div className="bg-light py-4">
          <div className="container">
            <div className="row g-4 align-items-start">

              {/* LEFT CONTENT */}
              <div className="col-lg-6">
                <h2
                  className="text-skyiiot mb-4 mobile-heading"
                  dangerouslySetInnerHTML={{ __html: detail?.subheading }}
                ></h2>

                <div className="row g-4">
                  <div className="col-12 col-sm-6">
                    <div className="mb-3">
                      <span
                        className="circle-icon"
                        dangerouslySetInnerHTML={{ __html: detail?.subspan1 }}
                      ></span>
                    </div>
                    <p
                      className="text-muted small mobile-para"
                      dangerouslySetInnerHTML={{ __html: detail?.subtitle_para1 }}
                    ></p>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="mb-3">
                      <span
                        className="circle-icon"
                        dangerouslySetInnerHTML={{ __html: detail?.subspan2 }}
                      ></span>
                    </div>
                    <p
                      className="text-muted small mobile-para"
                      dangerouslySetInnerHTML={{ __html: detail?.subtitle_para2 }}
                    ></p>
                  </div>
                </div>
              </div>

              {/* FORM (NOW IN GRID - NOT ABSOLUTE) */}
              <div className="col-lg-6">
                <div className="contact-form-box shadow-lg rounded">
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
