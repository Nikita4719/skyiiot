import React, { useEffect, useState } from "react";
import api from "./api";
import { ROOT_URL } from "./api";

export default function Hero() {

    const [slideData, setSlideData] = useState({});
    const [what_section, setWhat_section] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const heroRes = await api.get("/slides");
                const serviceRes = await api.get("/what-section");

               setSlideData(heroRes.data[0]);
                setWhat_section(serviceRes.data);
              } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
           
            <section className="position-relative" style={{ height: "65vh" }}>

                <video
                    className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
                    src={slideData?.media ? `${ROOT_URL}/${slideData.media}` : "null"}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ zIndex: 1 }}
                />

                <div
                    className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"
                    style={{ zIndex: 2 }}
                ></div>
            
            </section>

            <section className="row">
                <h1 className="text-center fw-bold">{slideData.title}</h1>
                {what_section.map((item, index) => (
                    <div className="col-lg col-md-4 col-6 mb-4" key={item.id || index}>
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
                                        style={{ width: "55px" }}
                                    />
                                )}
                            </div>

                            <h6 className="fw-bold">{item.title}</h6>
                            <p className="text-muted small">{item.description}</p>

                        </div>
                    </div>
                ))}
            </section>
        </>
    );
}