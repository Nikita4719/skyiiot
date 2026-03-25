import React from "react";
import embededImg from "../assets/embeded.png";
import { Link } from "react-router-dom";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import img5 from "../assets/img5.png";
import img6 from "../assets/img6.png";
import img7 from "../assets/img7.png";
import img8 from "../assets/img8.png";
import img9 from "../assets/img9.png";
import img10 from "../assets/img10.png";
import img11 from "../assets/img11.png";
import img12 from "../assets/img12.png";
import img13 from "../assets/img13.png";
import img14 from "../assets/img14.png";
import img15 from "../assets/img15.png";
import img16 from "../assets/img16.png";
import { useState, useEffect } from "react";
import api from "./api";
import { ROOT_URL } from "./api";
import { useRef } from "react";

function Embeded() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [services, setServices] = useState([]);
    const [services_category, setServices_category] = useState([]);
    const [loading, setLoading] = useState(true);
    const sectionRefs = useRef([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const [servicesRes, categoryRes] = await Promise.all([
                    api.get("/services"),
                    api.get("/services-category")

                ]);

                setServices(servicesRes.data);
                setServices_category(categoryRes.data);

            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = sectionRefs.current.findIndex(
                            (el) => el === entry.target
                        );
                        setActiveIndex(index);
                    }
                });
            },
            {
                threshold: 0.6,
            }
        );

        sectionRefs.current.forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => {
            sectionRefs.current.forEach((section) => {
                if (section) observer.unobserve(section);
            });
        };
    }, [services]);

    return (

        <section className="embeded mt-5">
            <div className="container">
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
                        <p>Loading...</p>
                    </div>
                ) : (

                    <div className="row">
                        <div className="col-md-6">
                            <div className="section-box mb-5">
                                <div className="row mt-3 text-center">

                                    {services.map((section, index) => {
                                        console.log(section.heading);
                                        return (
                                            <div className="col-12" key={section.id}>
                                                <div
                                                    className="section-box mb-5"
                                                    key={section.id}
                                                    ref={(el) => (sectionRefs.current[index] = el)}
                                                >

                                                    <h5 className=" text-start text-skyiiot mobile-heading" style={{ color: "#00A3B2" }}
                                                        dangerouslySetInnerHTML={{
                                                            __html: section.title
                                                        }}></h5>

                                                    <h3
                                                        className="text-start service-heading"
                                                        dangerouslySetInnerHTML={{
                                                            __html: section.heading
                                                        }}
                                                    ></h3>

                                                    <p className="text-start text-black mobile-para " dangerouslySetInnerHTML={{
                                                        __html: section.paragraph
                                                    }}></p>

                                                    <div className="row mt-3 text-center">

                                                        {services_category
                                                            .filter(icon => icon.service_id === section.id)
                                                            .map(icon => (

                                                                <div className="col-6 col-md-3 mb-4" key={icon.id}>

                                                                    <div className="feature-img-wrapper">

                                                                        <Link to={`/details/${icon.id}`}>

                                                                            <img
                                                                                src={`${ROOT_URL}/${icon.icon}`}
                                                                                alt={icon.link}
                                                                                className="feature-img"
                                                                            />

                                                                        </Link>

                                                                    </div>

                                                                    <p className="feature-title">{icon.link}</p>

                                                                </div>

                                                            ))}

                                                    </div>

                                                </div>
                                            </div>
                                        )})}

                                </div>
                            </div>
                        </div>


                        <div className="col-md-6 sticky-video text-center mt-5"
                            style={{ marginBottom: "12rem" }}>
                            <div className="position-relative w-100 h-100">

                                {services
                                    .filter(section => section.image)
                                    .map((section, index) => (
                                        <img
                                            key={section.id}
                                            src={`${ROOT_URL}/${section.image}`}
                                            alt={section.title}
                                            className={`stack-img ${activeIndex === index ? "active" : ""}`}
                                        />
                                    ))}

                            </div>
                        </div>
                    </div>
                )}
            </div>

        </section >
    );
}

export default Embeded;
