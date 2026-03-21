import React from "react";
import embededImg2 from "../assets/embeded2.png";
import { useEffect, useState } from "react";
import api from "./api";
import { ROOT_URL } from "./api";

function Embeded2() {
    const [suppotredData, setSupportedData] = useState({});
    const [offerData, setOfferData] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const networkdres = await api.get("/supported-content");
                const offerdres = await api.get("/offer");
                setSupportedData(networkdres.data[0]);
                setOfferData(offerdres.data[0]);
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
        <section className="embeded2">
            <div className="container mb-4">
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
                        <div className="loader"></div>
                    </div>
                ) : (
                    <>
                        <div className="row align-items-center mb-5">
                            <div className="col-md-6 text-center">
                                <img
                                    src={suppotredData?.image1 ? `${ROOT_URL}/${suppotredData.image1}` : "null"}
                                    alt="Embedded"
                                    className="img-fluid rounded"
                                />
                            </div>

                            <div className="col-md-6">
                                <h4 className="text-skyiiot mobile-heading" style={{ color: "#00A3B2" }} dangerouslySetInnerHTML={{
                                    __html: suppotredData.heading
                                }}></h4>
                                <h1 className="fw-bold mobile-heading"
                                    dangerouslySetInnerHTML={{
                                        __html: suppotredData.paragraph1
                                    }}>
                                </h1>
                                <p className=" text-dark mt-3 justify-text mobile-para "
                                    dangerouslySetInnerHTML={{
                                        __html: suppotredData.paragraph2
                                    }}>
                                </p>

                                <div className="row mt-3">
                                    <div className="col-6 d-flex align-items-center">
                                        <i className="bi bi-box-seam text-info fs-4 me-2"></i>
                                        <span className="fw-medium text-skyiiot mobile-para" style={{ color: "#00A3B2" }}>
                                            Development kits
                                        </span>
                                    </div>

                                    <div className="col-6 d-flex align-items-center">
                                        <i className="bi bi-hdd-network text-info fs-4 me-2"></i>
                                        <span className="fw-medium text-skyiiot mobile-para" style={{ color: "#00A3B2" }}>
                                            Gateways
                                        </span>
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-6 d-flex align-items-center">
                                        <i className="bi bi-cpu text-info fs-4 me-2"></i>
                                        <span className="fw-medium mobile-para" style={{ color: "#00A3B2" }}>
                                            System-on-Modules (SoMs)
                                        </span>
                                    </div>

                                    <div className="col-6 d-flex align-items-center">
                                        <i className="bi bi-pc-display text-info fs-4 me-2"></i>
                                        <span className="fw-medium text-skyiiot mobile-para" style={{ color: "#00A3B2" }}>
                                            Single-board computers (SBCs)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row g-5 align-items-start">
                            <div className="col-lg-6">
                                <span className="text-uppercase text-muted small fw-medium mobile-para"
                                    dangerouslySetInnerHTML={{
                                        __html: offerData.title
                                    }}>
                                </span>

                                <h3 className="mt-3 fw-bold mobile-heading"
                                    dangerouslySetInnerHTML={{
                                        __html: offerData.heading1
                                    }}>
                                </h3>

                                <div className="row mt-4 g-4">
                                    <div className="col-sm-6">
                                        <img src={offerData?.image1 ? `${ROOT_URL}/${offerData.image1}` : "null"} alt="smart" className="offer-small-img" />
                                        <h5 className="fw-bold"dangerouslySetInnerHTML={{
                                                    __html:offerData.heading2}}></h5>
                                        <p className="text-muted small mt-2 mobile-para"
                                            dangerouslySetInnerHTML={{
                                                __html: offerData.paragraph1
                                            }}>
                                        </p>
                                    </div>

                                    <div className="col-sm-6">
                                        <img src={offerData?.image2 ? `${ROOT_URL}/${offerData.image2}` : "null"} alt="smart" className="offer-small-img" />
                                        <h5 className="fw-bold"dangerouslySetInnerHTML={{
                                                    __html:offerData.heading3}}></h5>
                                        <p className="text-muted small mt-2 mobile-para"
                                            dangerouslySetInnerHTML={{
                                                __html: offerData.paragraph2
                                            }}>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="d-flex align-items-start border-bottom pb-4 mb-4">
                                    <span className="fw-bold fs-5 me-3"></span>
                                    <div>
                                        <h5 className="fw-bold" dangerouslySetInnerHTML={{
                                            __html: offerData.heading4
                                        }}></h5>
                                        <p className="text-muted small mobile-para"
                                            dangerouslySetInnerHTML={{
                                                __html: offerData.paragraph3
                                            }}>
                                        </p>
                                    </div>
                                </div>

                                <div className="d-flex align-items-start">
                                    <span className="fw-bold fs-5 me-3"></span>
                                    <div>
                                        <h5 className="fw-bold" dangerouslySetInnerHTML={{
                                            __html: offerData.heading5
                                        }}></h5>
                                        <p className="text-muted small mobile-para"
                                            dangerouslySetInnerHTML={{
                                                __html: offerData.paragraph4
                                            }}>
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

export default Embeded2;
