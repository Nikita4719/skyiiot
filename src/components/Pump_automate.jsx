import { useState, useEffect } from "react";
import ppbg from "../assets/ppbg.png";
import { Link } from "react-router-dom";
import pps from "../assets/pps.png";
import api from "./api";
import { ROOT_URL } from "./api";

export default function Pump_automate() {
  const [selectedImage, setSelectedImage] = useState("");
  const [solution_sub_cat, setSolution_sub_cat] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/solution-sub-cat");
        setSolution_sub_cat(res.data);

        const filtered = res.data.find(
          (item) => item.solutionCatId === 2
        );

        setSolution_sub_cat(filtered);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  // const filtered = res.data.find(
  //   (item) => item.solutionCatId === 2
  // );

  setSolution_sub_cat(filtered);

  return (
    <div>
      {/* Top Banner */}
      <section>
        <img
          src={ppbg}
          alt="Pump Banner"
          className="w-100"
          style={{ height: "350px", objectFit: "cover" }}
        />
      </section>

      {/* Product Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4 align-items-stretch">

            {/* Left Side - Images */}
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm h-100 p-4">

                <div className="text-center mb-4">
                  <img
                    src={selectedImage}
                    alt="Product"
                    className="img-fluid rounded-3"
                    style={{ maxHeight: "350px", objectFit: "cover" }}
                  />
                </div>

                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  {solution_sub_cat[0]?.image2?.map((img, index) => (
                    <img
                      key={index}
                      src={`${ROOT_URL}/${img}`}
                      alt="thumb"
                      onClick={() =>
                        setSelectedImage(`${ROOT_URL}/${img}`)
                      }
                      className="img-thumbnail"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>

              </div>
            </div>

            {/* Right Side - Details */}
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm h-100 p-4">

                <h3 className="fw-bold mb-3">
                  {solution_sub_cat[0]?.title}
                </h3>

                <hr />

                <p>{solution_sub_cat[0]?.para1}</p>

                <hr />

                <div className="mt-auto pt-3">
                  <Link to="/contact">
                    <button className="btn btn-primary rounded-pill px-4">
                      Start Order Request
                    </button>
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom Banner */}
      <section className="mb-5">
        <img
          src={pps}
          alt="Pump Banner"
          className="w-100"
          style={{ height: "350px", objectFit: "cover" }}
        />
      </section>

    </div>
  );
}