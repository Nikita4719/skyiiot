import about from "../assets/about.png";
import iot from "../assets/iot.png";
import { useState, useEffect } from "react";
import api from "./api";
import { ROOT_URL } from "./api";

export default function About() {
  const [imageData, setImageData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/image");
        setImageData(res.data[0]); 
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
                About SkyIIOT
              </h2>
              <p className="text-muted">
                At SkyIIOT, we create intelligent, scalable Industrial Internet of Things (IIoT) solutions that help industries optimize operations, reduce downtime, and gain real-time visibility. Our end-to-end platform connects machines, data, and people—turning insight into action and enabling smarter, faster, and more sustainable decisions. Whether you're managing utilities, industrial assets, or smart city infrastructure, SkyIIOT empowers you to thrive in a connected world.
              </p>
            </div>

            <div className="col-md-6 text-center text-md-end">
              <img
                src={about}
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