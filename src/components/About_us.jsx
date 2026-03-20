import { useEffect, useState } from "react";
import api from "./api";
import { ROOT_URL } from "./api";

export default function About_us() {
  const [loading, setLoading] = useState(true);
  const [aboutusData, setAboutusData] = useState({});
  const [about_benifit, setAbout_benifit] = useState({});
  const [about_enterprise, setAbout_enterprise] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const aboutusRes = await api.get("/about");
        const about_enterpriseRes = await api.get("/aboutusenterprise");
        const about_benifitRes = await api.get("/aboutusbenefits");

        setAboutusData(aboutusRes.data[0]);
        setAbout_benifit(about_benifitRes.data[0]);
        setAbout_enterprise(about_enterpriseRes.data[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
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
          {/* HERO IMAGE */}
          <section className="py-0">
            <div className="mb-4">
              <img
                src={aboutusData?.image1 ? `${ROOT_URL}/${aboutusData.image1}` : ""}
                alt="about"
                className="img-fluid w-100"
              />
            </div>

            <div className="container">

              {/* SECTION 1 */}
              <div className="row align-items-center mb-5 g-5">

                <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
                  <h2 className="fw-bold mb-3">{aboutusData.heading}</h2>
                  <p className="text-justify" style={{ lineHeight: "1.6" }}>
                    {aboutusData.paragraph}
                  </p>
                </div>

                <div className="col-12 col-md-6 text-center">
                  <img
                    src={aboutusData?.image2 ? `${ROOT_URL}/${aboutusData.image2}` : ""}
                    alt="about"
                    className="img-fluid rounded shadow w-100"
                    style={{ maxHeight: "300px", objectFit: "cover" }}
                  />
                </div>

              </div>

              {/* SECTION 2 (DOUBLE IMAGE FIXED) */}
              <div className="row align-items-center g-4">

                <div className="col-12 col-md-6">
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <img
                        src={about_enterprise?.image1 ? `${ROOT_URL}/${about_enterprise.image1}` : ""}
                        alt=""
                        className="img-fluid rounded shadow"
                        style={{
                          width: "100%",
                          maxHeight: "250px",
                          objectFit: "cover"
                        }}
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <img
                        src={about_enterprise?.image2 ? `${ROOT_URL}/${about_enterprise.image2}` : ""}
                        alt=""
                        className="img-fluid rounded shadow"
                        style={{
                          width: "100%",
                          maxHeight: "250px",
                          objectFit: "cover"
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <h2 className="fw-bold mb-3">{about_enterprise.heading}</h2>
                  <p style={{ lineHeight: "1.6" }}>
                    {about_enterprise.paragraph}
                  </p>
                </div>

              </div>

            </div>
          </section>

          {/* BENEFITS SECTION */}
          <section className="py-5">
            <div className="container">

              <div className="row align-items-center g-4">

                {/* LEFT CARDS */}
                <div className="col-12 col-lg-6">
                  <div className="row g-4">

                    {[1, 2, 3, 4].map((item, i) => (
                      <div className="col-12 col-md-6" key={i}>
                        <div className="p-4 bg-white rounded-4 shadow-sm h-100 focus-card">
                          <h2 className="fw-bold text-success">
                            {about_benifit[`heading${i * 2 + 1}`]}
                          </h2>
                          <h5 className="fw-semibold mt-3">
                            {about_benifit[`heading${i * 2 + 2}`]}
                          </h5>
                          <p className="text-muted small mt-2">
                            {about_benifit[`paragraph${i + 1}`]}
                          </p>
                        </div>
                      </div>
                    ))}

                  </div>
                </div>

                {/* RIGHT IMAGES */}
                <div className="col-12 col-lg-6">
                  <div className="row g-3">

                    {[
                      [about_benifit?.image1, about_benifit?.image2],
                      [about_benifit?.image3, about_benifit?.image4]
                    ].map((col, index) => (
                      <div className="col-6" key={index}>
                        <div className="d-flex flex-column gap-2">
                          {col.map((img, i) => (
                            <img
                              key={i}
                              src={img ? `${ROOT_URL}/${img}` : ""}
                              alt=""
                              className="img-fluid rounded shadow"
                              style={{
                                height: i === 0 ? "200px" : "150px",
                                objectFit: "cover"
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    ))}

                  </div>
                </div>

              </div>

            </div>
          </section>
        </>
      )}
    </div>
  );
}