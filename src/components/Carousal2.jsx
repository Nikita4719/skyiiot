import React, { useEffect, useState } from "react";
import api from "./api";
import { ROOT_URL } from "./api";
import "../carousel.scss";
import cbg from "../assets/cbg.png";

const Carousel = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/everywhere-slide");
        setItems(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(nextClick, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextClick = () => {
    setItems((prev) => {
      const newArr = [...prev];
      const first = newArr.shift(); // first remove
      newArr.push(first); // last me add
      return newArr;
    });
  };
  const prevClick = () => {
    setItems((prev) => {
      const newArr = [...prev];
      const last = newArr.pop();
      newArr.unshift(last);
      return newArr;
    });
  };

  return (
    <div className="carousel-container mb-4">
      <div
        className="carousel-bg pt-4 pb-5"
        style={{ backgroundImage: `url(${cbg})` }}
      >
        <h2 className="carousel-heading mb-4">
          SKY IIOT IS Everywhere
        </h2>

        <div className="carousel__wrap">
          <button className="carousel__btn" onClick={prevClick}>‹</button>

          <div className="carousel__container">
            {loading ? (
              <div className="loader-wrap">
                <div className="loader"></div>
              </div>
            ) : (
              <ul
                className="carousel__slide-list"
              >
                {items.map((item, i) => (
                  <li
                    className="carousel__slide-item"
                    key={item.id || i}
                  >
                    <div className="carousel-card">
                      <img
                        src={`${ROOT_URL}/${item.image}`}
                        alt=""
                        className="carousel-card-img"
                      />

                      <div className="carousel-card-body">
                        <div className="card-text">
                          <h4 dangerouslySetInnerHTML={{ __html: item.heading }} />
                          <p dangerouslySetInnerHTML={{ __html: item.paragraph }} />
                        </div>

                        <div className="card-action bg-primary">
                          <button className="arrow-btn">↗</button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button className="carousel__btn" onClick={nextClick}>›</button>
        </div>

       
      </div>
    </div>
  );
};

export default Carousel;