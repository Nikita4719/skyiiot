import { useState } from "react";

export default function Faqs() {
  const faqs = [
    {
      question: "What is SkyIIoT?",
      answer:
        "SkyIIoT is an Industrial Internet of Things (IIoT) platform that provides smart, scalable, and real-time solutions for industries, utilities, and smart cities.",
    },
    {
      question: "What industries do you serve?",
      answer:
        "We serve manufacturing, utilities, energy, agriculture, infrastructure, smart cities, and industrial automation sectors.",
    },
    {
      question: "Is SkyIIoT compatible with existing systems?",
      answer:
        "Yes, SkyIIoT supports seamless integration with PLCs, sensors, SCADA, and legacy systems.",
    },
    {
      question: "How secure is the platform?",
      answer:
        "The platform uses encrypted communication, role-based access, and secure cloud infrastructure.",
    },
    {
      question: "Do you offer cloud and mobile access?",
      answer:
        "Yes, the platform supports cloud dashboards and mobile access for real-time monitoring.",
    },
    {
      question: "What is the Transformer Monitoring System (TMS)?",
      answer:
        "TMS is a smart monitoring solution that tracks transformer health, performance, and predictive alerts in real time.",
    },
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center fw-bold mb-5">
          Frequently Asked Questions
        </h2>

        <div className="row g-5">
          <div className="col-md-6">
            <div className="accordion" id="faqAccordion">
              {faqs.map((faq, index) => (
                <div className="accordion-item mb-3 border rounded-3" key={index}>
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                    >
                      {faq.question}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body text-muted">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
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
