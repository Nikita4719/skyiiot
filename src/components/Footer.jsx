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

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const res = await api.get("/footer");
                setFooter(res.data);

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
                            <a >
                                <img src={`${ROOT_URL}/uploads/qrcodes/${footer?.logo}`} alt='SkyIIOT Logo' width="190" height="50" />
                            </a>

                            <div className="d-flex align-items-center mt-3 mb-2">
                                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3"
                                    style={{ width: "40px", height: "40px" }}>
                                    <FaPhoneAlt className="text-dark" />
                                </div>
                                <span className="text-white">{footer?.contact_phone}</span>
                            </div>

                            <div className="d-flex align-items-center mb-2">
                                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3"
                                    style={{ width: "40px", height: "40px" }}>
                                    <FaEnvelope className="text-dark" />
                                </div>
                                <span className="text-white">{footer?.contact_email}</span>
                            </div>

                            <div className="d-flex align-items-center mb-1">
                                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3"
                                    style={{ width: "40px", height: "40px" }}>
                                    <FaMapMarkerAlt className="text-dark" />
                                </div>
                                <span className="text-white">{footer?.address}</span>
                            </div>


                        </div>

                        <div className="col-md-4 mb-4">
                            <h6 className="footer-title">{footer?.title}</h6>
                            <ul className="list-unstyled">
                                {footer?.links?.map((item, i) => (
                                    <li key={i} className="mb-2">
                                        <NavLink
                                            to={item.link || "#"}
                                            className={({ isActive }) => (isActive ? "active" : "")}
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


                        <div className="col-md-4 mb-4">
                            <div className="col-md-12">

                                <div className="row g-6">
                                    {qrCodes.map((qr, i) => (

                                        <div className="col-6 text-center mb-4" key={i}>

                                            <div className="bg-white p-2 rounded shadow d-inline-block">

                                                <img
                                                    src={`${ROOT_URL}/uploads/qrcodes/${qr}`}
                                                    alt={`QR ${i + 1}`}
                                                    style={{ width: "90px" }}
                                                />

                                            </div>

                                        </div>

                                    ))}

                                </div>

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