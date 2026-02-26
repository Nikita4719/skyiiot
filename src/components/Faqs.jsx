
import { useState, useEffect } from "react";
import api from "./api";
import { ROOT_URL } from "./api";
export default function Faqs() {
  const [faqsData, setFaqsData] = useState([]);
  const [faqscmsData, setFaqscmsData] = useState([]);
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
            <div className="bg-white shadow rounded-4 p-4 p-md-5">
              <h4 className="text-center fw-semibold">
                We are here to help!
              </h4>
              <p className="text-center text-muted small mb-4">
                Send your question or request to our experts.
              </p>

              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      rows="4"
                      className="form-control"
                      placeholder="Write your message here..."
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 rounded-pill"
                    >
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
