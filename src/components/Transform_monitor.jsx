import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "./api";
import { ROOT_URL } from "./api";

export default function TransformMonitor() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [solution_sub_cat, setSolution_sub_cat] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/solution-sub-cat");
        const filteredData = res.data.find(
          (item) => item.solutionCatId === Number(id)
        );

        if (!filteredData) return;

        // Convert image2 from string to array if necessary
        if (filteredData.image2) {
          filteredData.image2 = JSON.parse(filteredData.image2);
        } else {
          filteredData.image2 = [];
        }

        setSolution_sub_cat(filteredData);

        // Set first thumbnail as default selected image
        if (filteredData.image2.length > 0) {
          setSelectedImage(`${ROOT_URL}/${filteredData.image2[0]}`);
        } else if (filteredData.image1) {
          setSelectedImage(`${ROOT_URL}/${filteredData.image1}`);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  if (!solution_sub_cat)
    return <p className="text-center mt-5">Loading...</p>;

  return (
    <div>
      {/* Top Banner */}
      {solution_sub_cat.image1 && (
        <section>
          <img
            src={`${ROOT_URL}/${solution_sub_cat.image1}`}
            alt={solution_sub_cat.para3 || "Banner"}
            className="w-100"
            style={{ height: "350px", objectFit: "cover" }}
          />
        </section>
      )}

      {/* Main Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4 align-items-start">

            {/* Left Column - Main Image */}
            <div className="col-lg-6 d-flex">
              <div className="me-3">
                <img
                  src={selectedImage}
                  alt={solution_sub_cat.heading}
                  className="img-fluid rounded-lg"
                  style={{ maxHeight: "500px", objectFit: "cover" }}
                />
              </div>

              {/* Thumbnails Vertical */}
              <div className="d-flex flex-column gap-3">
                {solution_sub_cat.image2?.map((img, idx) => (
                  <img
                    key={idx}
                    src={`${ROOT_URL}/${img}`}
                    alt={`thumb-${idx}`}
                    onClick={() => setSelectedImage(`${ROOT_URL}/${img}`)}
                    className={`border rounded-lg cursor-pointer ${selectedImage === `${ROOT_URL}/${img}`
                      ? "border-primary"
                      : "border-secondary"
                      }`}
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="col-lg-6">
              <h2 className="fw-bold mb-3">{solution_sub_cat.heading}</h2>

              {/* Product Details */}
              <div className="border-top pt-3 mb-3">
                <div
                  className="text-sm text-muted"
                  dangerouslySetInnerHTML={{
                    __html: solution_sub_cat.description1 || "",
                  }}
                />
              </div>

              {/* Order Button */}
              <div className="mb-3">
                <Link to="/contact">
                  <button className="btn btn-primary px-4 py-2 rounded-pill">
                    Start Order Request
                  </button>
                </Link>
              </div>

              {/* Shipping & Payment Info */}
              <div
                className="border-top pt-3 text-sm text-muted"
                dangerouslySetInnerHTML={{
                  __html: solution_sub_cat.description2 || "",
                }}
              />

              {/* Additional Description */}
              {/* {solution_sub_cat.para4 && (
                <div className="border-top pt-3 mt-3 text-sm text-muted">
                  <h5 className="fw-semibold">Description</h5>
                  {solution_sub_cat.para4
                    .split(". ")
                    .map((line, idx) => (
                      <p key={idx}>{line.trim()}.</p>
                    ))}
                </div>
              )} */}
            </div>
          </div>
        </div>
      </section>

      {/* Optional Secondary Banner */}
      {solution_sub_cat.imagechart && (
        <section className="mb-5">
          <img
            src={`${ROOT_URL}/${solution_sub_cat.imagechart}`}
            alt="Chart Banner"
            className="w-100"
            style={{
              height: "auto",
              maxHeight: "600px",
              objectFit: "contain"
            }}
          />
        </section>
      )}

      {/* System Components Section */}
      <section className="container py-5">
        <div className="border-bottom d-flex gap-4 mb-4">
          <button className="btn p-0 border-0 border-bottom border-2 border-primary text-primary fw-semibold">
            System Components & Architecture
          </button>
        </div>

        <h6 className="fw-semibold text-secondary">Basic Info.</h6>

        <div className="row mt-4 g-4">
          {["para1", "para2", "para3", "para4"].map((key, idx) => (
            <div className="col-lg-6" key={idx}>
              <div className="p-4 border rounded">
                <h5 className="fw-semibold">
                  {["System Architecture", "Functional Capabilities", "Core Modules", "Integration Support"][idx]}
                </h5>
                <div
                  dangerouslySetInnerHTML={{
                    __html: solution_sub_cat[key] || "",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}