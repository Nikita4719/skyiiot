
import { useState, useEffect } from "react";
import api from "./api";
import { ROOT_URL } from "./api";


export default function Faqs() {
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

    if (name === "phone") {
      const numbersOnly = value.replace(/[^0-9]/g, "");
      setFormData({ ...formData, phone: numbersOnly });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      };

      api.post("/contact-messages", payload);

      alert("Request sent successfully");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: ""
      });

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
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
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center fw-bold mb-5">
          Frequently Asked Questions
        </h2>

        <div className="row g-5">
          <div className="col-md-6">
            <div className="accordion" id="faqAccordion">
              {faqsData.map((faq, index) => {
                const matchedAnswer = faqscmsData.find(
                  (item) => item.faq_id === faq.id
                );

                return (
                  <div className="accordion-item mb-3 border rounded-3" key={faq.id}>
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${faq.id}`}
                      >
                        {faq.title}
                      </button>
                    </h2>

                    <div
                      id={`collapse${faq.id}`}
                      className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body text-muted">
                        {matchedAnswer ? matchedAnswer.para : "No Answer Available"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>


          <div className="col-md-6">
           <div className="shadow rounded-4 p-4 p-md-5" style={{ backgroundColor: "#F1F5F9" }}>
  <h4 className="text-center fw-semibold">
    We are here to help!
  </h4>
  <p className="text-center text-muted small mb-4">
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
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-primary w-100 rounded-pill py-2">
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
