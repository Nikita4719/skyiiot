import { FaFacebookF, FaYoutube, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import "./index.css";
import { useState } from "react";


export default function Contact() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });

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

 
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Form Data:", formData);

      localStorage.setItem("contactData", JSON.stringify(formData));

      alert("Form submitted successfully!");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: ""
      });

      setErrors({});
    }
  };

  return (
    <section className="contact-section">
      <div className="container py-5">
        <div className="row g-5 align-items-center">

    
          <div className="col-lg-5 contact-left">
            <h2 className="fw-bold mb-4">Let's Connect With Us</h2>
            <p className="mb-4">
              We would love to hear from you. Send us your queries and our team will respond shortly.
            </p>

            <div className="mb-4">
              <h6 className="fw-semibold">Call Us</h6>
              <p>+91 9266752831</p>
            </div>

            <div className="mb-4">
              <h6 className="fw-semibold">Email</h6>
              <p>info@skylabstech.com</p>
            </div>

            <div className="mb-4">
              <h6 className="fw-semibold">Office</h6>
              <p className="small">
                A-62, DDA Shed, Okhla Phase 2 (110020) <br />
                B-37, Sector 2 Noida (201301)
              </p>
            </div>

            <div className="d-flex gap-3 mt-4 social-icons">
              <a href="#" className="bg-primary text-white"><FaFacebookF /></a>
              <a href="#" className="bg-danger text-white"><FaYoutube /></a>
              <a href="#" className="bg-info text-white"><FaTwitter /></a>
              <a href="#" className="bg-primary text-white"><FaLinkedinIn /></a>
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
                      Send Request
                    </button>
                  </div>

                </div>
              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}