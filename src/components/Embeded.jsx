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

function Embeded() {
    const [services, setServices] = useState([]);
    const [services_category, setServices_category] = useState([]);

    useEffect(() => {

        api.get("/services")
            .then(res => {
                setServices(res.data);
                console.log(res.data);
            })

        api.get("/services-category")
            .then(res => {
                setServices_category(res.data);
            })

    }, []);


    return (

        <section className="embeded mt-4">
            <div className="container">


                <div className="row">
                    <div className="col-md-6">
                        <div className="section-box mb-5">

                            {/* <h5 className="text-skyiiot">{services.heading}</h5>
                            <h4>{services.paragraph1}</h4>
                            <p className="text-muted">{services.paragraph2}</p> */}

                            <div className="row mt-3 text-center">

                                {services.map(section => (

                                    <div className="section-box mb-5" key={section.id}>

                                        <h5 className=" text-start text-skyiiot">{section.title}</h5>

                                        <h3 className="text-start ">{section.heading}</h3>

                                        <p className="text-start text-muted">{section.paragraph}</p>

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

                                ))}

                            </div>
                        </div>

                        {/* <div className="section-box mb-5">
                            <h5 className="text-skyiiot">{networkData.heading}</h5>
                            <h4>{networkData.paragraph1}</h4>
                            <p className="text-muted">{networkData.paragraph2}</p>

                            <div className="row mt-3">

                                <div className="col-6 col-md-3 text-center mb-4">
                                    <div className="feature-img-wrapper">
                                        <Link to={`/details/5`}>
                                            {networkData?.image1 && (
                                                <img
                                                    src={`${ROOT_URL}/${networkData.image1}`}
                                                    alt="img5"
                                                    className="feature-img"
                                                />
                                            )}
                                        </Link>
                                        <p className="feature-title">Plug-and-Play</p>
                                    </div>
                                </div>

                                <div className="col-6 col-md-3 text-center mb-4">
                                    <div className="feature-img-wrapper">
                                        <Link to={`/details/6`}>
                                            {networkData?.image2 && (
                                                <img
                                                    src={`${ROOT_URL}/${networkData.image2}`}
                                                    alt="img6"
                                                    className="feature-img"
                                                />
                                            )}
                                        </Link>
                                        <p className="feature-title">Multi-Network</p>
                                    </div>
                                </div>

                                <div className="col-6 col-md-3 text-center mb-4">
                                    <div className="feature-img-wrapper">
                                        <Link to={`/details/7`}>
                                            {networkData?.image3 && (
                                                <img
                                                    src={`${ROOT_URL}/${networkData.image3}`}
                                                    alt="img7"
                                                    className="feature-img"
                                                />
                                            )}
                                        </Link>
                                        <p className="feature-title">End-to-End-Security</p>
                                    </div>
                                </div>

                                <div className="col-6 col-md-3 text-center mb-4">
                                    <div className="feature-img-wrapper">
                                        <Link to={`/details/8`}>
                                            {networkData?.image4 && (
                                                <img
                                                    src={`${ROOT_URL}/${networkData.image4}`}
                                                    alt="img8"
                                                    className="feature-img"
                                                />
                                            )}
                                        </Link>
                                        <p className="feature-title">Signal Optimization</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="section-box mb-5">
                            <h5 className="text-skyiiot">{cloudData.heading}</h5>
                            <h4>{cloudData.paragraph1}</h4>
                            <p className="text-muted">{cloudData.paragraph2}</p>

                            <div className="row mt-3">

                                <div className="col-6 col-md-3 text-center mb-4">
                                    <div className="feature-img-wrapper">
                                        <Link to={`/details/9`} className="text-decoration-none text-dark">
                                            <img src={cloudData?.image1 ? `${ROOT_URL}/${cloudData.image1}` : "null"} alt="img9" className="feature-img" />
                                        </Link>
                                        <p className="feature-title">Real-Time Data</p>
                                    </div>
                                </div>
                                <div className="col-6 col-md-3 text-center mb-4">
                                    <div className="feature-img-wrapper">
                                        <Link to={`/details/10`} className="text-decoration-none text-dark">
                                            <img src={cloudData?.image2 ? `${ROOT_URL}/${cloudData.image2}` : "null"} alt="img10" className="feature-img" />
                                        </Link>
                                        <p className="feature-title">Edge-to-Cloud</p>
                                    </div>
                                </div>
                                <div className="col-6 col-md-3 text-center mb-4">
                                    <div className="feature-img-wrapper">
                                        <Link to={`/details/11`} className="text-decoration-none text-dark">
                                            <img src={cloudData?.image3 ? `${ROOT_URL}/${cloudData.image3}` : "null"} alt="img11" className="feature-img" />
                                        </Link>
                                        <p className="feature-title">Secure & Compliant</p>
                                    </div>
                                </div>
                                <div className="col-6 col-md-3 text-center mb-4">
                                    <div className="feature-img-wrapper">
                                        <Link to={`/details/12`} className="text-decoration-none text-dark">
                                            <img src={cloudData?.image4 ? `${ROOT_URL}/${cloudData.image4}` : "null"} alt="img12" className="feature-img" />
                                        </Link>
                                        <p className="feature-title">Open APIs</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="section-box mb-5">
                            <h5 className="text-skyiiot">{managementData.heading}</h5>
                            <h4>{managementData.paragraph1}</h4>
                            <p className="text-muted">{managementData.paragraph2}</p>
                            <div className="row mt-3">

                                <div className="col-6 col-md-3 text-center mb-4">
                                    <div className="feature-img-wrapper">
                                        <Link to={`/details/13`} className="text-decoration-none text-dark">
                                            <img src={managementData?.image1 ? `${ROOT_URL}/${managementData.image1}` : "null"} alt="img13" className="feature-img" />
                                        </Link>
                                        <p className="feature-title">Fleet Dashboard</p>
                                    </div>
                                </div>
                                <div className="col-6 col-md-3 text-center mb-4">
                                    <div className="feature-img-wrapper">
                                        <Link to={`/details/14`} className="text-decoration-none text-dark">
                                            <img src={managementData?.image2 ? `${ROOT_URL}/${managementData.image2}` : "null"} alt="img14" className="feature-img" />
                                        </Link>
                                        <p className="feature-title">Remote Config</p>
                                    </div>
                                </div>

                                <div className="col-6 col-md-3 text-center mb-4">
                                    <div className="feature-img-wrapper">
                                        <Link to={`/details/15`} className="text-decoration-none text-dark">
                                            <img src={managementData?.image3 ? `${ROOT_URL}/${managementData.image3}` : "null"} alt="img15" className="feature-img" />
                                        </Link>
                                        <p className="feature-title">Live Monitoring</p>
                                    </div>
                                </div>
                                <div className="col-6 col-md-3 text-center mb-4">
                                    <div className="feature-img-wrapper">
                                        <Link to={`/details/16`} className="text-decoration-none text-dark">
                                            <img src={managementData?.image4 ? `${ROOT_URL}/${managementData.image4}` : "null"} alt="img16" className="feature-img" />
                                        </Link>
                                        <p className="feature-title">Access & Roles</p>
                                    </div>
                                </div>

                            </div>
                        </div> */}
                    </div>

                    {/* <div className="col-md-6 sticky-video text-center">
                        {sections[0]?.image && (
                            <video
                                className="feature-video"
                                autoPlay
                                muted
                                loop
                                playsInline
                            >
                                <source
                                    src={`${ROOT_URL}/${sections[0].image}`}
                                    type="video/mp4"
                                />
                            </video>
                        )}
                    </div> */}

                    <div className="col-md-6 sticky-video text-center">

                        {services
                            .filter(section => section.image)
                            .map(section => (

                                <img
                                    key={section.id}
                                    src={`${ROOT_URL}/${section.image}`}
                                    className="feature-video"
                                    alt={section.title}
                                />

                            ))}

                    </div>
                </div>
            </div>
        </section >
    );
}

export default Embeded;
