import about from "../assets/about.png";
import iot from "../assets/iot.png";
import { useState, useEffect } from "react";
import api from "./api";
import { ROOT_URL } from "./api";

export default function About() {
  const [loading, setLoading] = useState(true);
  const [imageData, setImageData] = useState({});
  const [aboutusData, setAboutusData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/image");
        const aboutusRes = await api.get("/about");
        setImageData(res.data[0]);
        setAboutusData(aboutusRes.data[0]);
      } catch (error) {
        console.log(error);
      }
      finally {
        setLoading(false);
      };
    };

    fetchData();
  }, []);
  return (
    <div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <section id="about" className="py-1">
            <div className="container" style={{ maxWidth: "1150px", margin: "0 auto", padding: "0 15px" }}>
              <div className="row align-items-center g-4">
                <div className="col-md-6">
                  <h2 className="fw-bold text-center text-md-start mb-3"
                    dangerouslySetInnerHTML={{
                      __html: aboutusData.heading
                    }}>
                  </h2>
                  <p className="text-muted" dangerouslySetInnerHTML={{
                    __html: aboutusData.paragraph
                  }}></p>
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

          <section className="container-fluid mt-3 text-white bg-dark py-5">
            <div className="row align-items-center mt-4 mb-4 g-0">
              <div className="col-md-2"></div>
              <div className="col-md-4 text-end">
                <h2 className="fw-bold text-start mb-3"
                  dangerouslySetInnerHTML={{
                    __html: imageData?.heading
                  }}>
                </h2>

                <p className="text-start fs-5"
                  dangerouslySetInnerHTML={{
                    __html: imageData?.paragraph
                  }}>
                </p>
              </div>

              <div className="col-md-5 text-center ">
                <img
                  src={imageData?.image ? `${ROOT_URL}/${imageData.image}` : "null"}
                  className="img-fluid rounded"
                  alt="About SkyIIOT"
                  style={{ maxWidth: "80%" }}
                />
              </div>
              <div className="col-md-1"></div>
            </div>

          </section >
        </>
      )}
    </div >
  );
}