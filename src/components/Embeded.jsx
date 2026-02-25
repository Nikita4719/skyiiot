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
    const [embeddedData, setEmbeddedData] = useState({});
    const [networkData, setNetworkData] = useState({});
    const [cloudData, setCloudData] = useState({});
    const [managementData, setManagementData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const embeddedres = await api.get("/embeddedsection");
                const networkres = await api.get("/networksection");
                const cloudres = await api.get("/cloudsection");
                const managementres = await api.get("/managementsection");
                setEmbeddedData(embeddedres.data[0]);
                setNetworkData(networkres.data[0]);
                setCloudData(cloudres.data[0]);
                setManagementData(managementres.data[0]);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (

        <section className="embeded py-5">
            <div className="container">

            
                <div className="row align-items-center mb-5">

                    <div className="col-md-6">

                        <h5 className="text-primary">{embeddedData.heading}</h5>
                        <h4>{embeddedData.paragraph1}</h4>
                        <p className="text-muted">{embeddedData.paragraph2}</p>

                        <div className="row mt-3 text-center">

                            <div className="col-6 col-md-3 mb-4">
                                {embeddedData?.image1 && (
                                    <img
                                        src={`${ROOT_URL}/${embeddedData.image1}`}
                                        alt="Plug-and-Play"
                                        className="feature-img"
                                    />
                                )}
                                <p className="feature-title">Plug-and-Play</p>
                            </div>

                            <div className="col-6 col-md-3 mb-4">
                                {embeddedData?.image2 && (
                                    <img
                                        src={`${ROOT_URL}/${embeddedData.image2}`}
                                        alt="Multi-Network"
                                        className="feature-img"
                                    />
                                )}
                                <p className="feature-title">Multi-Network</p>
                            </div>

                            <div className="col-6 col-md-3 mb-4">
                                {embeddedData?.image3 && (
                                    <img
                                        src={`${ROOT_URL}/${embeddedData.image3}`}
                                        alt="Security"
                                        className="feature-img"
                                    />
                                )}
                                <p className="feature-title">End-to-End Security</p>
                            </div>

                            <div className="col-6 col-md-3 mb-4">
                                {embeddedData?.image4 && (
                                    <img
                                        src={`${ROOT_URL}/${embeddedData.image4}`}
                                        alt="Signal"
                                        className="feature-img"
                                    />
                                )}
                                <p className="feature-title">Signal Optimization</p>
                            </div>

                        </div>
                    </div>


                    {/* RIGHT SIDE - VIDEO */}
                    <div className="col-md-6 text-center">
                        {embeddedData?.video && (
                            <video
                                className="w-100 rounded shadow"
                                autoPlay
                                muted
                                loop
                                playsInline
                                controls
                            >
                                <source
                                    src={`${ROOT_URL}/${embeddedData.video}`}
                                    type="video/mp4"
                                />
                            </video>
                        )}
                    </div>

                </div>

<div className="container">
                <div className="col-md-6 mb-4">
                    <h5 className="text-primary">{networkData.heading}</h5>
                    <h4>{networkData.paragraph1}</h4>
                    <p className="text-muted">{networkData.paragraph2}</p>

                    <div className="row mt-3">

                        <div className="col-6 col-md-3 text-center mb-4">
                            <Link to="/details/5" className="text-decoration-none text-dark">
                                <img src={networkData?.image1 ? `${ROOT_URL}/${networkData.image1}` : "null"} alt="img5" className="feature-img" />
                            </Link>
                            <p className="feature-title">Plug-and-Play</p>
                        </div>

                        <div className="col-6 col-md-3 text-center mb-4">
                            <Link to="/details/6" className="text-decoration-none text-dark">
                                <img src={networkData?.image2 ? `${ROOT_URL}/${networkData.image2}` : "null"} alt="img6" className="feature-img" />
                            </Link>
                            <p className="feature-title">Multi-Network</p>
                        </div>

                        <div className="col-6 col-md-3 text-center mb-4">
                            <Link to="/details/7" className="text-decoration-none text-dark">
                                <img src={networkData?.image3 ? `${ROOT_URL}/${networkData.image3}` : "null"} alt="img7" className="feature-img" />
                            </Link>
                            <p className="feature-title">End-to-End-Security</p>
                        </div>

                        <div className="col-6 col-md-3 text-center mb-4">
                            <Link to="/details/8" className="text-decoration-none text-dark">
                                <img src={networkData?.image4 ? `${ROOT_URL}/${networkData.image4}` : "null"} alt="img8" className="feature-img" />
                            </Link>
                            <p className="feature-title">Signal Otimization</p>
                        </div>

                    </div>


                </div>

                <div className="col-md-6 mb-4">
                    <h5 className="text-primary">{cloudData.heading}</h5>
                    <h4>{cloudData.paragraph1}</h4>
                    <p className="text-muted">{cloudData.paragraph2}</p>

                    <div className="row mt-3">

                        <div className="col-6 col-md-3 text-center mb-4">
                            <Link to="/details/9" className="text-decoration-none text-dark">
                                <img src={cloudData?.image1 ? `${ROOT_URL}/${cloudData.image1}` : "null"} alt="img9" className="feature-img" />
                            </Link>
                            <p className="feature-title">Real-Time Data</p>
                        </div>

                        <div className="col-6 col-md-3 text-center mb-4">
                            <Link to="/details/10" className="text-decoration-none text-dark">
                                <img src={cloudData?.image2 ? `${ROOT_URL}/${cloudData.image2}` : "null"} alt="img10" className="feature-img" />
                            </Link>
                            <p className="feature-title">Edge-to-Cloud</p>
                        </div>

                        <div className="col-6 col-md-3 text-center mb-4">
                            <Link to="/details/11" className="text-decoration-none text-dark">
                                <img src={cloudData?.image3 ? `${ROOT_URL}/${cloudData.image3}` : "null"} alt="img11" className="feature-img" />
                            </Link>
                            <p className="feature-title">Secure & Compliant</p>
                        </div>

                        <div className="col-6 col-md-3 text-center mb-4">
                            <Link to="/details/12" className="text-decoration-none text-dark">
                                <img src={cloudData?.image4 ? `${ROOT_URL}/${cloudData.image4}` : "null"} alt="img12" className="feature-img" />
                            </Link>
                            <p className="feature-title">Open APIs</p>
                        </div>

                    </div>
                </div>

                <div className="col-md-6 mb-4">
                    <h5 className="text-primary">{managementData.heading}</h5>
                    <h4>{managementData.paragraph1}</h4>
                    <p className="text-muted">{managementData.paragraph2}</p>
                    <div className="row mt-3">

                        <div className="col-6 col-md-3 text-center mb-4">
                            <Link to="/details/13" className="text-decoration-none text-dark">
                                <img src={managementData?.image1 ? `${ROOT_URL}/${managementData.image1}` : "null"} alt="img13" className="feature-img" />
                            </Link>
                            <p className="feature-title">Fleet Dashboard</p>
                        </div>

                        <div className="col-6 col-md-3 text-center mb-4">
                            <Link to="/details/14" className="text-decoration-none text-dark">
                                <img src={managementData?.image2 ? `${ROOT_URL}/${managementData.image2}` : "null"} alt="img14" className="feature-img" />
                            </Link>
                            <p className="feature-title">Remote Config</p>
                        </div>

                        <div className="col-6 col-md-3 text-center mb-4">
                            <Link to="/details/15" className="text-decoration-none text-dark">
                                <img src={managementData?.image3 ? `${ROOT_URL}/${managementData.image3}` : "null"} alt="img15" className="feature-img" />
                            </Link>
                            <p className="feature-title">Live Monitoring</p>
                        </div>

                        <div className="col-6 col-md-3 text-center mb-4">
                            <Link to="/details/16" className="text-decoration-none text-dark">
                                <img src={managementData?.image4 ? `${ROOT_URL}/${managementData.image4}` : "null"} alt="img16" className="feature-img" />
                            </Link>
                            <p className="feature-title">Access & Roles</p>
                        </div>

                    </div>
                </div>
            </div>
</div>

                


        </section >
    );
}

export default Embeded;
