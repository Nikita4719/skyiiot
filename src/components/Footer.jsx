import { useEffect, useState } from "react";
import axios from "axios";
import wechatQR from "../assets/wechat.jpg";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
    const [contacts, setContacts] = useState([]);
    const [solutions, setSolutions] = useState([]);

    const iconMap = {
        phone: <FaPhoneAlt className="text-dark" />,
        email: <FaEnvelope className="text-dark" />,
        location: <FaMapMarkerAlt className="text-dark" />
    };

    useEffect(() => {
        // Fetch contacts
        axios.get("http://localhost:5000/api/contact-messages")
            .then(res => setContacts(res.data))
            .catch(err => console.error(err));

        // Fetch solutions
        axios.get("http://localhost:5000/api/solution-cat")
            .then(res => setSolutions(res.data))
            .catch(err => console.error(err));
    }, []);
    return (
        <footer className="custom-footer text-white pt-5 pb-3">
            <div className="container">
                <div className="row">


                    <div className="col-md-4 mb-4">
                        <a >
                            <img src="/src/assets/skyiiotlogo.png" alt='SkyIIOT Logo' width="170" height="90" />
                        </a>

                        <div className="d-flex align-items-center mb-3">
                            <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3"
                                style={{ width: "40px", height: "40px" }}>
                                <FaPhoneAlt className="text-dark" />
                            </div>
                            <span className="text-white">{contacts[0]?.phone}</span>
                        </div>

                        <div className="d-flex align-items-center mb-3">
                            <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3"
                                style={{ width: "40px", height: "40px" }}>
                                <FaEnvelope className="text-dark" />
                            </div>
                            <span className="text-white">{contacts[0]?.email}</span>
                        </div>

                        <div className="d-flex align-items-center mb-3">
                            <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3"
                                style={{ width: "40px", height: "40px" }}>
                                <FaMapMarkerAlt className="text-dark" />
                            </div>
                            <span className="text-white">B-37, 1st FLOOR, - Sector 2 Noida, 201301</span>
                        </div>


                    </div>




                    <div className="col-md-4 mb-4">
                        <h6 className="footer-title">Solutions</h6>
                        <ul className="list-unstyled">
                            {solutions.map((s, idx) => (
                                <li key={idx}><a href="#">{s.title}</a></li> // adjust field name if your API returns 'name' instead of 'title'
                            ))}
                        </ul>
                    </div>


                    <div className="col-md-4 mb-4">
                        <div className="col-md-12">

                            <div className="row g-6">
                                <div className="col-6 text-center">
                                    <div className="bg-white p-2 rounded shadow d-inline-block">
                                        <img
                                            src={wechatQR}
                                            alt="QR 1"
                                            style={{ width: "90px" }}
                                        />
                                    </div>
                                    <p className="mt-2 small text-light">WeChat</p>
                                </div>
                                <div className="col-6 text-center">
                                    <div className="bg-white p-2 rounded shadow d-inline-block">
                                        <img
                                            src={wechatQR}
                                            alt="QR 1"
                                            style={{ width: "90px" }}
                                        />
                                    </div>
                                    <p className="mt-2 small text-light">Alibaba</p>
                                </div>

                                <div className="col-6 text-center">
                                    <div className="bg-white p-2 rounded shadow d-inline-block">
                                        <img
                                            src={wechatQR}
                                            alt="QR 1"
                                            style={{ width: "90px" }}
                                        />
                                    </div>
                                    <p className="mt-2 small text-light">WhatsApp</p>
                                </div>

                                <div className="col-6 text-center">
                                    <div className="bg-white p-2 rounded shadow d-inline-block">
                                        <img
                                            src={wechatQR}
                                            alt="QR 1"
                                            style={{ width: "90px" }}
                                        />
                                    </div>
                                    <p className="mt-2 small text-light">WhatsApp</p>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

                <hr className="footer-line" />

                <div className="text-center small">
                    © 2026 Skyiiot. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}