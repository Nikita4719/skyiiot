import { FaFacebookF, FaYoutube, FaTwitter, FaLinkedinIn } from "react-icons/fa";
// import "./index.css";
import { useState, useEffect } from "react";
import api from "./api";
import { ROOT_URL } from "./api";
import contbg from "../assets/contbg.jpg";
export default function Contact() {
  const [contactSettings, setContactSettings] = useState({});
  const [headerTop, setHeaderTop] = useState(null);
  const [footer, setFooter] = useState([]);
  useEffect(() => {
    const fetchContactSettings = async () => {
      try {
        const res = await api.get("/contact-settings");

        console.log("API DATA:", res.data);
        const headerRes = await api.get("/header-top");
        setHeaderTop(headerRes.data);

        if (res.data.length > 0) {
          setContactSettings(res.data[0]);
        }
        api.get("/footer")
          .then(res => {
            setFooter(res.data);
          })
      }
      catch (err) {
        console.error("Error fetching contact settings:", err);
      }
    };

    fetchContactSettings();
  }, []);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;


    if (name === "phone") {
      const onlyNumbers = value.replace(/[^0-9]/g, "");
      setFormData({ ...formData, phone: onlyNumbers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const validate = () => {
    let newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Enter valid email address";
    }

    if (formData.phone.length !== 10) {
      newErrors.phone = "Phone must be 10 digits";
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

        const payload = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        };

        await api.post(
          "/contact-messages",
          payload
        );

        alert("Message sent successfully!");

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
        alert("Something went wrong while sending message");

      }

    }
  };

  return (
    <div>
      <section
        className="contact-section position-relative"
        style={{
          backgroundImage: contactSettings?.bg_image
            ? `url(${ROOT_URL}/uploads/${contactSettings.bg_image})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="contact-overlay">
          <div className="container py-5">
            <div className="row g-5 align-items-center">


              <div className="col-lg-5 contact-left">
                <h2 className="fw-bold mb-4">Let's Connect With Us</h2>
                <p className="mb-4">
                  We would love to hear from you. Send us your queries and our team will respond shortly.
                </p>

                <div className="mb-4">
                  <h6 className="fw-semibold">Call Us</h6>
                  <p dangerouslySetInnerHTML={{
                    __html: headerTop?.phone
                  }}></p>
                </div>

                <div className="mb-4">
                  <h6 className="fw-semibold">Email</h6>
                  <p dangerouslySetInnerHTML={{
                    __html: headerTop?.email
                  }}></p>
                </div>

                <div className="mb-4">
                  <h6 className="fw-semibold">Office</h6>
                  <p className="small"
                    dangerouslySetInnerHTML={{
                      __html: footer?.address
                    }}>
                  </p>
                </div>

                <div className="d-flex gap-3 mt-4 social-icons">
                  {headerTop?.facebook_link && (
                    <a href={headerTop.facebook_link} className="social-icon bg-primary" target="_blank" rel="noreferrer">
                      <FaFacebookF />
                    </a>
                  )}
                  {headerTop?.twitter_link && (
                    <a href={headerTop.twitter_link} className="social-icon bg-info" target="_blank" rel="noreferrer">
                      <FaTwitter />
                    </a>
                  )}
                  {headerTop?.youtube_link && (
                    <a href={headerTop.youtube_link} className="social-icon bg-danger" target="_blank" rel="noreferrer">
                      <FaYoutube />
                    </a>
                  )}
                  {headerTop?.linkedin_link && (
                    <a href={headerTop.linkedin_link} className="social-icon bg-primary" target="_blank" rel="noreferrer">
                      <FaLinkedinIn />
                    </a>
                  )}
                </div>
              </div>

              <div className="col-lg-7">
                <div className="contact-form-box">

                  <h4 className="text-center mb-3">Send Us a Message</h4>

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
                        <button type="submit" className="btn contact-btn btn-primary">
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

      <section className="map-section">
        <div className="container-fluid mt-5">
          <div className="map-wrapper shadow-lg">
            <iframe
              // src={contactSettings.map_url || ""}
              src={contactSettings.map_url}
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </section>

    </div>
  );
}