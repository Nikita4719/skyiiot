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
                    </div>


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
