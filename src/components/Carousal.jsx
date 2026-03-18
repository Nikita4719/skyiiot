import React, { useState, useEffect } from "react";
import cbg from "../assets/cbg.png";
import api from "./api";
import { ROOT_URL } from "./api";

function Carousel() {
    const [everywhereData, setEverywhereData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    // const [transition, setTransition] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get("/everywhere-slide");
                setEverywhereData(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        if (activeIndex >= everywhereData.length) {
            setTimeout(() => {
                setActiveIndex(0);
            }, 600);
        }
    }, [activeIndex, everywhereData.length]);

    const nextSlide = () => {
        if (activeIndex === everywhereData.length - 1) {
            setActiveIndex(0);
        } else {
            setActiveIndex(activeIndex + 1);
        }
    };

    const prevSlide = () => {
        if (activeIndex === 0) {
            setActiveIndex(everywhereData.length - 1);
        } else {
            setActiveIndex(activeIndex - 1);
        }
    };



    return (
        <div
            className="carousel-wrapper"
            style={{ backgroundImage: `url(${cbg})`, height: "85vh" }}
        >
            <h2 className="carousel-heading text-white text-center fw-bold">
                SKY IIOT IS Everywhere
            </h2>

            <div className="carousel-container">
                <button className="nav-btn" onClick={prevSlide}>
                    ‹
                </button>

                <div
                    className="carousel-track"
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                    {everywhereData.map((item, index) => {

                        return (
                            <div
                                key={index}
                                className="carousel-card"
                            >
                                <img
                                    src={`${ROOT_URL}/${item.image}`}
                                    alt={item.heading}
                                    className="carousel-img"
                                />
                                <div className="card-content">
                                    <div className="text-content">
                                        <h5>{item.heading}</h5>
                                        <p>{item.paragraph}</p>
                                    </div>
                                    <button className="arrow-btn">↗</button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <button className="nav-btn" onClick={nextSlide}>
                    ›
                </button>
            </div>
        </div>
    );
}

export default Carousel;