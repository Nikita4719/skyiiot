
import { useState, useEffect } from "react";
import api from "./api";
import { ROOT_URL } from "./api";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Faqs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [faqsData, setFaqsData] = useState([]);
  const [faqscmsData, setFaqscmsData] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;
    let errorMsg = "";

    // PHONE
    if (name === "phone") {
      updatedValue = value.replace(/[^0-9]/g, "");

      if (updatedValue.length > 10) {
        updatedValue = updatedValue.slice(0, 10);
      }

      if (updatedValue.length === 10) {
        const phonePattern = /^[6-9]\d{9}$/;
        if (!phonePattern.test(updatedValue)) {
          errorMsg = "Enter valid number";
        }
      } else if (updatedValue.length > 0 && updatedValue.length < 10) {
        errorMsg = "Enter 10 digit number";
      }
    }

    // EMAIL
    if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

      if (!updatedValue.trim()) {
        errorMsg = "Email is required";
      } else if (!emailPattern.test(updatedValue.trim())) {
        errorMsg = "Enter valid email";
      }
    }

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
    const phonePattern = /^[6-9]\d{9}$/;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Enter valid email";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone is required";
    } else if (!phonePattern.test(formData.phone)) {
      newErrors.phone = "Enter valid number";
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
        setLoading(true);

        const payload = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        };

        await api.post("/contact-messages", payload);

        alert("Request sent successfully");

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: ""
        });
        setErrors({});
      } catch (error) {
        console.log(error);
        alert("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {

        const faqsres = await api.get("/faqs");
        const faqscmsres = await api.get("/cms-faqs");
        setFaqsData(faqsres.data);
        setFaqscmsData(faqscmsres.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  return (
    <section className="py-2 bg-white">
      <div className="container-fluid px-3 px-md-4 px-lg-5">
        <h1 className="text-center fw-bold mb-5 mobile-heading">
          Frequently Asked Questions
        </h1>

        <div className="row g-5">
          <div className="col-md-6">
            <div className="accordion" id="faqAccordion">
              {faqsData.map((faq, index) => {
                console.log("FAQ ID:", faq.id);
                console.log("CMS DATA:", faqscmsData);
                const matchedAnswer = faqscmsData.find(
                  (item) => item.faq_id === faq.id
                );

                return (
                  <div className="accordion-item mb-3 border rounded-3" key={faq.id}>
                    <h2 className="accordion-header text-black mobile-heading">
                      <button
                        className={`accordion-button mobile-h6 ${index !== 0 ? "collapsed" : ""}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${faq.id}`}
                        dangerouslySetInnerHTML={{
                          __html: faq.title
                        }}
                      ></button>
                    </h2>

                    <div
                      id={`collapse${faq.id}`}
                      className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body text-muted mobile-para">
                        {matchedAnswer ? matchedAnswer.para : "No Answer Available"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* form starts here */}
          <div className="col-md-6">
            <div className="shadow rounded-4 p-4 p-md-5" style={{ backgroundColor: "#F1F5F9" }}>
              <h4 className="text-center fw-semibold mobile-heading">
                We are here to help!
              </h4>
              <p className="text-center text-muted small mb-4 mobile-para">
                Send your question or request to our experts.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="form-control bg-white border rounded-md px-3 py-2"
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
                      className="form-control bg-white border rounded-md px-3 py-2"
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
                      className="form-control bg-white border rounded-md px-3 py-2"
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
                      className="form-control bg-white border rounded-md px-3 py-2"
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
                      className="form-control bg-white border rounded-md px-3 py-2"
                      placeholder="Write your message here..."
                    ></textarea>
                    {errors.message && <small className="text-danger">{errors.message}</small>}
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 rounded-pill py-2"
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
    </section>
  );
}


// const handleSubmit = (e) => {
//   e.preventDefault();
//   // Handle form submission logic here
//   const info = {
//     firstName: document.getElementById("firstName").value,
//     phone: document.getElementById("phone").value,
//   };
//   console.log(info);
// };
// return(
//   <form onSubmit={handleSubmit}>
//     <input type="text" id="firstName" placeholder="First Name" />
//     <input type="text" id="phone" placeholder="Phone Number" />
//     <button type="submit">Submit</button>
//   </form>
// )