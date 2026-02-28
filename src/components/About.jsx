import about from "../assets/about.png";
import iot from "../assets/iot.png";
import { useState, useEffect } from "react";
import api from "./api";
import { ROOT_URL } from "./api";

export default function About() {
  const [imageData, setImageData] = useState({});
const [aboutusData, setAboutusData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/image");
        const aboutusRes = await api.get("/about");
        setImageData(res.data[0]); 
        setAboutusData(aboutusRes.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <section id="about" className="py-5">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-md-6">
              <h2 className="fw-bold text-center text-md-start mb-3">
                {aboutusData.heading}
              </h2>
              <p className="text-muted">{aboutusData.paragraph}</p>
            </div>

            <div className="col-md-6 text-center text-md-end">
              <img
                src={aboutusData?.image2 ? `${ROOT_URL}/${aboutusData.image2}` : "null"}
                className="img-fluid rounded"
                alt="About SkyIIOT"
                style={{ maxWidth: "90%" }}
              />
            </div>

          </div>
        </div>
      </section>

      <section className="container mt-5 text-white bg-dark py-5">
        <div className="row align-items-center">
          <div className="col-md-5 items-center">
            <h5 className="fw-bold text-center text-md-center mb-3">
              {imageData?.heading}
            </h5>
            <p className="text-center">
              {imageData?.paragraph}
            </p>
          </div>

          <div className="col-md-6 text-center ">
            <img
              src={imageData?.image ? `${ROOT_URL}/${imageData.image}` : "null"}
              className="img-fluid rounded"
              alt="About SkyIIOT"
              style={{ maxWidth: "80%" }}
            />
          </div>
        </div>

      </section >
    </div >
  );
}