import React, { useEffect, useState } from "react";
import api from "./api";
import { ROOT_URL } from "./api";
import "../carousel.scss";
import cbg from "../assets/cbg.png";
const Carousel = () => {

    const [everywhereData, setEverywhereData] = useState([]);
    const [items, setItems] = useState([]);
    const [activeIdx, setActiveIdx] = useState(0);
    const [isTicking, setIsTicking] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get("/everywhere-slide");

                setEverywhereData(res.data);
                setItems(res.data);

                console.log(res.data);

            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    const sleep = (ms = 0) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    const bigLength = items.length;

    useEffect(() => {
        if (isTicking) sleep(300).then(() => setIsTicking(false));
    }, [isTicking]);

    const prevClick = (jump = 1) => {
        if (!isTicking) {
            setIsTicking(true);

            setItems((prev) => {
                return prev.map((_, i) => prev[(i + jump) % bigLength]);
            });

            setActiveIdx((prev) =>
                prev === 0 ? bigLength - 1 : prev - 1
            );
        }
    };

    const nextClick = (jump = 1) => {
        if (!isTicking) {
            setIsTicking(true);

            setItems((prev) => {
                return prev.map(
                    (_, i) => prev[(i - jump + bigLength) % bigLength]
                );
            });

            setActiveIdx((prev) => (prev + 1) % bigLength);
        }
    };

    const handleDotClick = (idx) => {
        if (idx < activeIdx) prevClick(activeIdx - idx);
        if (idx > activeIdx) nextClick(idx - activeIdx);
    };

    return (
        <div>
            <div
                className="carousel-wrapper"
                style={{ backgroundImage: `url(${cbg})`, height: "85vh" }}
            >
                <h2 className="carousel-heading text-white text-center fw-bold mb-4"
                    style={{ paddingTop: "1rem" }} >
                    SKY IIOT IS Everywhere
                </h2>
                <div className="carousel__wrap">
                    <div className="carousel__inner">

                        <button
                            className="carousel__btn carousel__btn--prev"
                            onClick={() => prevClick()}
                        >
                            ‹
                        </button>

                        <div className="carousel__container">
                            <ul className="carousel__slide-list">

                                {items.map((item, i) => (
                                    <li className="carousel__slide-item">

                                        <img
                                            src={`${ROOT_URL}/${item.image}`}
                                            alt={item.heading}
                                        />

                                        <div className="carousel-card-body">

                                            <div className="card-text">
                                                <h4>{item.heading}</h4>
                                                <p>{item.paragraph}</p>
                                            </div>

                                            <div className="card-arrow">
                                                <button className="arrow-btn">↗</button>
                                            </div>

                                        </div>

                                    </li>
                                ))}

                            </ul>
                        </div>

                        <button
                            className="carousel__btn carousel__btn--next"
                            onClick={() => nextClick()}
                        >
                            ›
                        </button>

                        {/* DOTS */}

                        <div className="carousel__dots">

                            {everywhereData.map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`dot ${activeIdx === idx ? "active" : ""}`}
                                    onClick={() => handleDotClick(idx)}
                                />
                            ))}

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carousel;