import { useEffect, useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import api from "./api";
import { ROOT_URL } from "./api";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
export default function Footer() {
    const [footer, setFooter] = useState([]);
    const [loading, setLoading] = useState(true);
    const [qrCodes, setQrCodes] = useState([]);
    const qrNames = [
        "WeChat",
        "Alibaba",
        "WhatsApp (Sales)",
        "WhatsApp (Support)"
    ];
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const res = await api.get("/footer");
                setFooter(res.data);
                // console.log("QR DATA:", qrCodes);
                if (res.data?.qr_code) {
                    setQrCodes(JSON.parse(res.data.qr_code));
                }

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    const solutions = footer?.content ? footer.content.split(",") : [];
    return (
        <footer className="custom-footer  pt-5 pb-3">
            <div className="container-fluid">
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "150px" }}>
                        <div className="loader"></div>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <a>
                                <img
                                    src={`${ROOT_URL}/uploads/qrcodes/${footer?.logo}`}
                                    alt="SkyIIOT Logo"
                                    className="footer-logo"
                                />
                            </a>

                            <div className="d-flex align-items-center mt-3 mb-2 contact-item">
                                <div className="icon-circle">
                                    <FaPhoneAlt className="text-dark" />
                                </div>
                                <span className="text-white contact-text" dangerouslySetInnerHTML={{ __html: footer?.contact_phone }}></span>
                            </div>

                            <div className="d-flex align-items-center mb-2 contact-item">
                                <div className="icon-circle">
                                    <FaEnvelope className="text-dark" />
                                </div>
                                <span className="text-white contact-text" dangerouslySetInnerHTML={{ __html: footer?.contact_email }}></span>
                            </div>

                            <div className="d-flex align-items-center mb-1 contact-item">
                                <div className="icon-circle">
                                    <FaMapMarkerAlt className="text-dark" />
                                </div>
                                <span className="text-white contact-text" dangerouslySetInnerHTML={{ __html: footer?.address }}></span>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4">
                            <h6 className="footer-title" dangerouslySetInnerHTML={{
                                __html: footer?.title
                            }}></h6>
                            <ul className="list-unstyled">
                                {footer?.links?.map((item, i) => (
                                    <li key={i} className="mb-3">
                                        <NavLink
                                            to={item.link || "#"}
                                            className={({ isActive }) =>
                                                `footer-link ${isActive ? "active" : ""}`}
                                            onClick={() =>
                                                window.scrollTo({ top: 0, behavior: "smooth" })
                                            }
                                        >
                                            {item.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>


                        <div className="col-md-4 mb-3">
                            <div className="row g-2">
                                {qrCodes.map((qr, i) => (
                                    <div className="col-6 text-center mb-3" key={i}>
                                        <div className="bg-white p-1 rounded shadow d-inline-block">
                                            <img
                                                src={`${ROOT_URL}/uploads/qrcodes/${qr}`}
                                                alt={`QR ${i + 1}`}
                                                className="qr-img"
                                            />
                                        </div>
                                        <div className="mt-1">
                                            <small className="text-white">{qrNames[i] || "QR Code"}</small>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                <hr className="footer-line" />

                <div className="text-center small">
                    © 2026 Skyiiot. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}