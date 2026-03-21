import React, { useEffect, useState } from "react";
import api from "./api";
import { ROOT_URL } from "./api";

export default function Hero() {
    const [loading, setLoading] = useState(true);
    const [slideData, setSlideData] = useState({});
    const [what_section, setWhat_section] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const heroRes = await api.get("/slides");
                const serviceRes = await api.get("/what-section");

                setSlideData(heroRes.data[0]);
                setWhat_section(serviceRes.data);
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "80px" }}>
                    <div className="loader"></div>
                </div>
            ) : (
                <>

                    <section style={{ position: "relative", width: "100%", minHeight: "60vh" }}>

                        <video style={{ zIndex: 1, objectFit: "cover" }}
                            className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
                            src={slideData?.media ? `${ROOT_URL}/${slideData.media}` : "null"}
                            autoPlay
                            muted
                            loop
                            playsInline
                        // style={{ zIndex: 1 }}
                        />

                        <div
                            className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"
                            style={{ zIndex: 2 }}
                        ></div>

                    </section>

                    <section className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px" }}>
                        <div className="row">
                            <h1
                                className="text-center fw-bold mt-4 mobile-h1"
                                dangerouslySetInnerHTML={{
                                    __html: slideData.title
                                }}
                            ></h1>
                            {what_section.map((item, index) => (
                                <div className="col-lg col-md-4 col-12 mt-3" key={item.id || index}>
                                    <div className="p-3 text-center">

                                        <div
                                            className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 bg-light hover-circle-${index + 1}`}
                                            style={{ width: "100px", height: "100px", transition: "0.3s" }}
                                        >
                                            {item.image && (
                                                <img
                                                    src={`${ROOT_URL}/${item.image}`}
                                                    alt={item.title}
                                                    className="img-fluid"

                                                />
                                            )}
                                        </div>

                                        <h6
  className="fw-bold mobile-h6"
  dangerouslySetInnerHTML={{
    __html: item.title
  }}
></h6>

<p
  className="text-muted mobile-para"
  dangerouslySetInnerHTML={{
    __html: item.description
  }}
></p>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}