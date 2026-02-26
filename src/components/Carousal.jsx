import React, { useState, useEffect } from "react";
import cbg from "../assets/cbg.png";
import api from "./api";
import { ROOT_URL } from "./api";

function Carousel() {
    const [everwhereData, setEverywhereData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const everywhereres = await api.get("/everywhere-slide");
                setEverywhereData(everywhereres.data); 
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    // Auto slide
    useEffect(() => {
        if (everwhereData.length === 0) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % everwhereData.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [everwhereData]);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % everwhereData.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) =>
            prev === 0 ? everwhereData.length - 1 : prev - 1
        );
    };

    return (
        <div
            className="carousel-wrapper"
            style={{ backgroundImage: `url(${cbg})` }}
        >
            <h2 className="carousel-heading text-white text-center fw-bold">
                SKY IIOT IS Everywhere
            </h2>

            <div className="carousel-container">

                <button className="nav-btn" onClick={prevSlide}>‹</button>

                {everwhereData.map((item, index) => {
                    let position = "side";
                    if (index === activeIndex) position = "center";

                    return (
                        <div key={item.id} className={`carousel-card ${position}`}>
                            <img
                                src={`${ROOT_URL}/${item.image}`}
                                alt={item.heading}
                                className="carousel-img"
                            />
                            <div className="bg-white">
                                <h5 className="mt-3 fw-bold  text-black">
                                    {item.heading}
                                </h5>
                                <p className="text-muted  small">
                                    {item.paragraph}
                                </p>
                            </div>
                        </div>
                    );
                })}

                <button className="nav-btn" onClick={nextSlide}>›</button>

            </div>
        </div>
    );
}

export default Carousel;