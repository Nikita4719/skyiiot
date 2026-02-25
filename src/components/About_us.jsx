import aboutus1 from "../assets/aboutus1.png";
import about from "../assets/about.png";
import abtus2 from "../assets/abtus2.jpg";
import abtus3 from "../assets/abtus3.avif";
import { useEffect, useState } from "react";
import api from "./api";
import { ROOT_URL } from "./api";
export default function About_us() {

  const [aboutusData, setAboutusData] = useState({});
  const [about_benifit, setAbout_benifit] = useState({});
  const [about_enterprise, setAbout_enterprise] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const aboutusRes = await api.get("/about");
        const about_enterpriseRes = await api.get("/aboutusenterprise");
        const about_benifitRes = await api.get("/aboutusbenefits");
        setAboutusData(aboutusRes.data[0]);
        setAbout_benifit(about_benifitRes.data[0]);
        setAbout_enterprise(about_enterpriseRes.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <section id="about_us" className="py-0">


        <div className="mb-5">
          <img src={aboutusData?.image1 ? `${ROOT_URL}/${aboutusData.image1}` : "null"} alt="aboutimg" className="img-fluid w-100" />
        </div>

        <div className="container">


          <div className="row align-items-center mb-5">
            <div className="col-md-6">
              <h3 className="fw-bold mb-3">{aboutusData.heading}</h3>
              <p>{aboutusData.paragraph}</p>
            </div>

            <div className="col-md-6 text-center">
              <img src={aboutusData?.image2 ? `${ROOT_URL}/${aboutusData.image2}` : "null"} alt="about" className="img-fluid rounded shadow" />
            </div>
          </div>


          <div className="row align-items-center">


            <div className="col-md-6">
              <div className="d-flex justify-content-center gap-4">
                <img
                  src={about_enterprise?.image1 ? `${ROOT_URL}/${about_enterprise.image1}` : "null"}
                  alt="abtus2"
                  className="rounded shadow"
                  style={{
                    height: "250px",
                    width: "45%",
                    objectFit: "cover"
                  }}
                />

                <img
                  src={about_enterprise?.image2 ? `${ROOT_URL}/${about_enterprise.image2}` : "null"}
                  alt="abtus3"
                  className="rounded shadow mt-4"
                  style={{
                    height: "200px",
                    width: "45%",
                    objectFit: "cover"
                  }}
                />
              </div>
            </div>


            <div className="col-md-6">
              <h3 className="fw-bold mb-3">{about_enterprise.heading}</h3>
              <p>{about_enterprise.paragraph}</p>
            </div>

          </div>

        </div>
      </section>

      <section className="py-5">
        <div className="container">

          <h2 className="fw-bold mb-5 text-center">Our Focus</h2>

          <div className="row align-items-center"> 
            
            <div className="col-lg-6">
              <div className="row g-4">

                <div className="col-md-6">
                  <div className="p-4 bg-white rounded-4 shadow-sm h-100 focus-card">
                    <h2 className="fw-bold text-success">{about_benifit.heading1}</h2>
                    <h5 className="fw-semibold mt-3">{about_benifit.heading2}</h5>
                    <p className="text-muted small mt-2">{about_benifit.paragraph1}</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-4 bg-white rounded-4 shadow-sm h-100 focus-card">
                    <h2 className="fw-bold text-success">{about_benifit.heading3}</h2>
                    <h5 className="fw-semibold mt-3">{about_benifit.heading4}</h5>
                    <p className="text-muted small mt-2">{about_benifit.paragraph2}</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-4 bg-white rounded-4 shadow-sm h-100 focus-card">
                    <h2 className="fw-bold text-success">{about_benifit.heading5}</h2>
                    <h5 className="fw-semibold mt-3">{about_benifit.heading6}</h5>
                    <p className="text-muted small mt-2">{about_benifit.paragraph3}</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-4 bg-white rounded-4 shadow-sm h-100 focus-card">
                    <h2 className="fw-bold text-success">{about_benifit.heading7}</h2>
                    <h5 className="fw-semibold mt-3">{about_benifit.heading8}</h5>
                    <p className="text-muted small mt-2">{about_benifit.paragraph4}</p>
                  </div>
                </div>

              </div>
            </div>

           
            <div className="col-md-6">
              <div className="d-flex justify-content-center gap-4">
                <img
                  src={about_benifit?.image1 ? `${ROOT_URL}/${about_benifit.image1}` : "null"}
                  alt="abtus2"
                  className="rounded shadow"
                  style={{
                    height: "550px",
                    width: "50%",
                    objectFit: "cover"
                  }}
                />

                <img
                  src={about_benifit?.image2 ? `${ROOT_URL}/${about_benifit.image2}` : "null"}
                  alt="abtus3"
                  className="rounded shadow mt-4"
                  style={{
                    height: "450px",
                    width: "50%",
                    objectFit: "cover"
                  }}
                />
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
