

import { useEffect, useState } from "react";
import api from "./api";
import { useParams } from "react-router-dom";
import { ROOT_URL } from "./api";
// import d1 from "../assets/d1.png";

export default function Detail1() {
  const [detail, setDetail] = useState(null);
  const [contactSettings, setContactSettings] = useState({});
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    api.get("/contact-settings");

    api.get("/services-sub-cat")
      .then(res => {
        // console.log("All data:", res.data);
        const found = res.data.find(item => item.services_category_id == id); // <-- correct filter
        console.log("Selected detail:", found);
        setDetail(found);
        setContactSettings(res.data[0]);
      })
      .catch(err => console.log(err));
  }, [id]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;
    let errorMsg = "";

    // 🔥 PHONE HANDLING (fixed)
    if (name === "phone") {
      // only numbers
      updatedValue = value.replace(/[^0-9]/g, "");

      // limit to 10 digits
      if (updatedValue.length > 10) {
        updatedValue = updatedValue.slice(0, 10);
      }

      // validation only when length = 10
      if (updatedValue.length === 10) {
        const phonePattern = /^[6-9]\d{9}$/;
        if (!phonePattern.test(updatedValue)) {
          errorMsg = "Enter valid number";
        }
      } else if (updatedValue.length > 0 && updatedValue.length < 10) {
        errorMsg = "Enter 10 digit number";
      }
    }

    // 🔥 EMAIL HANDLING (improved)
    if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

      if (!updatedValue.trim()) {
        errorMsg = "Email is required";
      } else if (!emailPattern.test(updatedValue.trim())) {
        errorMsg = "Enter valid email";
      }
    }

    // 🔥 UPDATE STATE
    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };


  const validate = () => {
    let newErrors = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phonePattern = /^[6-9]\d{9}$/; // Indian numbers

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(formData.email.trim())) {
      newErrors.email = "Enter valid email (example@gmail.com)";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!phonePattern.test(formData.phone)) {
      newErrors.phone = "Enter valid 10-digit Indian number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        setLoading(true); // 🔥 start loading

        const payload = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        };

        await api.post("/contact-messages", payload);

        alert("✅ Message sent successfully!");

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: ""
        });

        setErrors({});
      } catch (error) {
        console.error(error);
        alert("❌ Something went wrong while sending message");
      } finally {
        setLoading(false); // 🔥 stop loading
      }
    }
  };


  if (!detail) return <p>Loading...</p>;
  return (
    <div>

      <section className="w-100 overflow-hidden">
        <div className="bg-white py-3 px-3 px-sm-4 px-lg-5 w-100">
          <div className="container">
            <div className="row g-4 align-items-center text-center text-lg-start">

              <div className="col-lg-6">
                <div className="mb-4">
                  <h1 className="text-skyiiot fw-bold display-6 mobile-heading" dangerouslySetInnerHTML={{
                    __html: detail?.title
                  }}></h1>
                  <p
                    className=" mt-3 mobile-para" style={{
                      textAlign: "justify",
                    }}
                    dangerouslySetInnerHTML={{ __html: detail?.description }}
                  ></p>
                </div>


              </div>
              <div className="col-lg-6" style={{ marginTop: "-80px" }}>
                <img
                  src={`${ROOT_URL}/${detail?.image}`}
                  alt="Edge Analytics Frame"
                  className="img-fluid w-100 rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="position-relative">

        {/* Background Image */}
        <img
          src={`${ROOT_URL}/${detail?.imagebg}`}
          alt="Background"
          className="w-100 bg-img"
        />

        {/* Content + Form Wrapper */}
        <div className="bg-light py-4">
          <div className="container">
            <div className="row g-4 align-items-start">

              {/* LEFT CONTENT */}
              <div className="col-lg-6">
                <h2
                  className="text-skyiiot mb-4 mobile-heading"
                  dangerouslySetInnerHTML={{ __html: detail?.subheading }}
                ></h2>

                <div className="row g-4">
                  <div className="col-12 col-sm-6">
                    <div className="mb-3">
                      <span
                        className="circle-icon"
                        dangerouslySetInnerHTML={{ __html: detail?.subspan1 }}
                      ></span>
                    </div>
                    <p
                      className="text-muted small mobile-para"
                      dangerouslySetInnerHTML={{ __html: detail?.subtitle_para1 }}
                    ></p>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="mb-3">
                      <span
                        className="circle-icon"
                        dangerouslySetInnerHTML={{ __html: detail?.subspan2 }}
                      ></span>
                    </div>
                    <p
                      className="text-muted small mobile-para"
                      dangerouslySetInnerHTML={{ __html: detail?.subtitle_para2 }}
                    ></p>
                  </div>
                </div>
              </div>

              {/* FORM (NOW IN GRID - NOT ABSOLUTE) */}
              <div className="col-lg-6">
                <div className="contact-form-box shadow-lg rounded">
                  <h6 className="bg-primary text-white px-3 py-1 rounded-pill d-inline-block mb-3">
                    Contact Details
                  </h6>

                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">


                      <div className="col-md-6">
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="First Name"
                        />
                        {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
                      </div>


                      <div className="col-md-6">
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Last Name"
                        />
                        {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
                      </div>


                      <div className="col-md-6">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Email Address"
                        />
                        {errors.email && <small className="text-danger">{errors.email}</small>}
                      </div>


                      <div className="col-md-6">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          maxLength="10"
                          className="form-control"
                          placeholder="Phone Number"
                        />
                        {errors.phone && <small className="text-danger">{errors.phone}</small>}
                      </div>


                      <div className="col-12">
                        <textarea
                          rows="4"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Write your message..."
                        ></textarea>
                        {errors.message && <small className="text-danger">{errors.message}</small>}
                      </div>

                      <div className="col-12">
                        <button
                          type="submit"
                          className="btn contact-btn btn-primary"
                          disabled={loading}
                        >
                          {loading ? "Sending..." : "Send Request"}
                        </button>
                      </div>

                    </div>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
