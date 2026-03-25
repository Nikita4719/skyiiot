import about from "../assets/about.png";
import iot from "../assets/iot.png";
import { useState, useEffect } from "react";
import api from "./api";
import { ROOT_URL } from "./api";
import { useRef } from "react";

export default function About() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
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
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();

      if (rect.top < window.innerHeight - 100 && !isVisible) {
        setIsVisible(true);
      }
    };

    handleScroll(); // 🔥 THIS LINE FIXES INITIAL LOAD ISSUE

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
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
            <div className="container-fluid" style={{ maxWidth: "1150px", margin: "0 auto", padding: "0 15px" }}>
              <div className="row align-items-center g-4">
                <div className="col-md-6">
                  <h2 className="fw-bold text-start text-md-start mb-3 mobile-heading "
                    dangerouslySetInnerHTML={{
                      __html: aboutusData.heading
                    }}>
                  </h2>
                  <p className="text-black text-justify about-text mobile-para" dangerouslySetInnerHTML={{
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

          <section
            className="relative w-full overflow-hidden reveal-section bg-image-section"
            ref={sectionRef}
            style={{
              backgroundImage: imageData?.bgimage
                ? `url(${ROOT_URL}/${imageData.bgimage})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
          >

            <div className="container py-4 mb-3 mt-3">

              <div className="row justify-content-center align-items-center g-5">

                {/* TEXT */}
                <div className={`col-12 col-md-5 animate-left ${isVisible ? "show" : ""}`}>
                  <h2
                    className="fw-bold mb-3 mobile-heading text-white"
                    dangerouslySetInnerHTML={{
                      __html: imageData?.heading
                    }}
                  ></h2>

                  <p
                    className="about-text mobile-para text-white"
                    dangerouslySetInnerHTML={{
                      __html: imageData?.paragraph
                    }}
                  ></p>
                </div>

                {/* IMAGE */}
                <div className={`col-12 col-md-5 animate-right ${isVisible ? "show" : ""}`}>
                  <img
                    src={imageData?.image ? `${ROOT_URL}/${imageData.image}` : ""}
                    className="w-100 d-block"
                    alt="About"
                  />
                </div>

              </div>

            </div>
          </section>
        </>
      )}
    </div >
  );
}