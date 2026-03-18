import React from "react";
import embededImg2 from "../assets/embeded2.png";
import { useEffect, useState } from "react";
import api from "./api";
import { ROOT_URL } from "./api";

function Embeded2() {
    const [suppotredData, setSupportedData] = useState({});
    const [offerData, setOfferData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const networkdres = await api.get("/supported-content");
                const offerdres = await api.get("/offer");
                setSupportedData(networkdres.data[0]);
                setOfferData(offerdres.data[0]);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
    return (
        <section className="embeded2">
            <div className="container mb-4">
                <div className="row align-items-center mb-5">
                    <div className="col-md-6 text-center">
                        <img
                            src={suppotredData?.image1 ? `${ROOT_URL}/${suppotredData.image1}` : "null"}
                            alt="Embedded"
                            className="img-fluid rounded"
                        />
                    </div>

                    <div className="col-md-6">
                        <h4 className="text-skyiiot">{suppotredData.heading}</h4>
                        <h1 className="fw-bold">
                            {suppotredData.paragraph1}
                        </h1>
                        <p className=" text-dark mt-3 justify-text ">
                            {suppotredData.paragraph2}
                        </p>

                        <div className="row mt-3">
                            <div className="col-6 d-flex align-items-center">
                                <i className="bi bi-box-seam text-info fs-4 me-2"></i>
                                <span className="fw-medium text-skyiiot">
                                    Development kits
                                </span>
                            </div>

                            <div className="col-6 d-flex align-items-center">
                                <i className="bi bi-hdd-network text-info fs-4 me-2"></i>
                                <span className="fw-medium text-skyiiot">
                                    Gateways
                                </span>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-6 d-flex align-items-center">
                                <i className="bi bi-cpu text-info fs-4 me-2"></i>
                                <span className="fw-medium text-skyiiot">
                                    System-on-Modules (SoMs)
                                </span>
                            </div>

                            <div className="col-6 d-flex align-items-center">
                                <i className="bi bi-pc-display text-info fs-4 me-2"></i>
                                <span className="fw-medium text-skyiiot">
                                    Single-board computers (SBCs)
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-5 align-items-start">
                    <div className="col-lg-6">
                        <span className="text-uppercase text-muted small fw-medium">
                            {offerData.title}
                        </span>

                        <h3 className="mt-3 fw-bold">
                            {offerData.heading1}
                        </h3>

                        <div className="row mt-4 g-4">
                            <div className="col-sm-6">
                                <img src={offerData?.image1 ? `${ROOT_URL}/${offerData.image1}` : "null"} alt="smart" className="offer-small-img" />
                                <h5 className="fw-bold">{offerData.heading2}</h5>
                                <p className="text-muted small mt-2">
                                    {offerData.paragraph1}
                                </p>
                            </div>

                            <div className="col-sm-6">
                                <img src={offerData?.image2 ? `${ROOT_URL}/${offerData.image2}` : "null"} alt="smart" className="offer-small-img" />
                                <h5 className="fw-bold">{offerData.heading3}</h5>
                                <p className="text-muted small mt-2">
                                    {offerData.paragraph2}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="d-flex align-items-start border-bottom pb-4 mb-4">
                            <span className="fw-bold fs-5 me-3"></span>
                            <div>
                                <h5 className="fw-bold">{offerData.heading4}</h5>
                                <p className="text-muted small">
                                    {offerData.paragraph3}
                                </p>
                            </div>
                        </div>

                        <div className="d-flex align-items-start">
                            <span className="fw-bold fs-5 me-3"></span>
                            <div>
                                <h5 className="fw-bold">{offerData.heading5}</h5>
                                <p className="text-muted small">
                                    {offerData.paragraph4}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}

export default Embeded2;
