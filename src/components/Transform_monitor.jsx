import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "./api";
import { ROOT_URL } from "./api";
import tmbg from "../assets/tmbg.png";
import tms from "../assets/tms.png";
import sol1 from "../assets/sol1.png";

export default function TransformMonitor() {
  const { id } = useParams(); // get dynamic id from URL
  const [selectedImage, setSelectedImage] = useState(sol1);
  const [solution_sub_cat, setSolution_sub_cat] = useState(null);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const res = await api.get("/solution-sub-cat");

  // console.log(res.data);
  //         // Convert id to number to match API data
  //         const filteredData = res.data.find(
  //           (item) => item.solutionCatId === Number(id)
  //         );
  //         setSolution_sub_cat(filteredData);

  //         // Set first image as default if available
  //         if (filteredData?.image2?.length > 0) {
  //           setSelectedImage(`${ROOT_URL}/${filteredData.image2[0]}`);
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     fetchData();
  //   }, [id]); // refetch when id changes

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/solution-sub-cat");

        const filteredData = res.data.find(
          (item) => item.solutionCatId === Number(id)
        );

        //  If no data found
        if (!filteredData) return;

        //  Convert image2 string into array
        if (filteredData.image2) {
          filteredData.image2 = JSON.parse(filteredData.image2);
        } else {
          filteredData.image2 = [];
        }

        setSolution_sub_cat(filteredData);
        if (filteredData.image2.length > 0) {
          setSelectedImage(`${ROOT_URL}/${filteredData.image2[0]}`);
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  if (!solution_sub_cat) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div>
      <h1 className="text-center my-4">Details for Item {id}</h1>


      <section>
        <img
          src={tmbg}
          alt="Transform Monitoring Banner"
          className="w-100"
          style={{ height: "350px", objectFit: "cover" }}
        />
      </section>

      {/* Main Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4 align-items-stretch">

            {/* Left Column - Images */}
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
                  {solution_sub_cat?.image2?.map((img, index) => (
                    <img
                      key={index}
                      src={`${ROOT_URL}/${img}`}
                      alt={`thumb-${index}`}
                      onClick={() => setSelectedImage(`${ROOT_URL}/${img}`)}
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

            {/* Right Column - Details */}
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm h-100 p-4">
                <h3 className="fw-bold mb-3">{solution_sub_cat.title}</h3>
                <hr />
                <p>{solution_sub_cat.para1}</p>

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

      {/* Additional Banner */}
      <section className="mb-5">
        <img
          src={tms}
          alt="Transform Monitoring Banner"
          className="w-100"
          style={{ height: "350px", objectFit: "cover" }}
        />
      </section>

      {/* System Components Section */}
      <section className="container py-5">
        <div className="border-bottom d-flex gap-4 mb-4">
          <button className="btn p-0 border-0 border-bottom border-2 border-primary text-primary fw-semibold">
            System Components & Architecture
          </button>
        </div>

        <h6 className="fw-semibold text-secondary">Basic Info.</h6>

        <div className="row mt-4 g-4">

          {/* Card 1 */}
          <div className="col-lg-6">
            <div className="p-4 border rounded">
              <h5 className="fw-semibold">System Architecture</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: solution_sub_cat?.input1 || "",
                }}
              />
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-lg-6">
            <div className="p-4 border rounded">
              <h5 className="fw-semibold">Functional Capabilities</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: solution_sub_cat?.input2 || "",
                }}
              />
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-lg-6">
            <div className="p-4 border rounded">
              <h5 className="fw-semibold">Core Modules</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: solution_sub_cat?.input3 || "",
                }}
              />
            </div>
          </div>

          {/* Card 4 */}
          <div className="col-lg-6">
            <div className="p-4 border rounded">
              <h5 className="fw-semibold">Integration Support</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: solution_sub_cat?.input4 || "",
                }}
              />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}