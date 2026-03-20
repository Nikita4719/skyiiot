import { useState, useEffect } from "react";
import api from "./api";
import { ROOT_URL } from "./api";
export default function Team() {
    const [loading, setLoading] = useState(true);
    const [teamData, setTeamData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const teamres = await api.get("/our-team");
                setTeamData(teamres.data);
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (teamData.length === 0) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % teamData.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [teamData]);

    return (
        <div>
            {loading ? (

                <div className="d-flex justify-content-center align-items-center" style={{ height: "80px" }}>
                    <div className="loader"></div>
                </div>
            ) : (
                <section className="team-section py-0 gap-0">
                    <div className="container">
                        <div className="row align-items-center g-1 ">
                            <h1 className=" fw-bold text-center mt-3"> Our Team</h1>
                            <div className="col-lg-6 team-details">
                                <h1 dangerouslySetInnerHTML={{
                                    __html: teamData[activeIndex]?.heading
                                }}></h1>
                                <h2 dangerouslySetInnerHTML={{
                                    __html: teamData[activeIndex]?.paragraph
                                }}></h2>
                                {/* <p></p> */}
                            </div>

                            <div className="col-lg-6 text-center">
                                <div className="image-stack">
                                    {teamData.map((member, index) => (
                                        <img
                                            key={index}
                                            src={`${ROOT_URL}/${member.image}`}
                                            alt={member.name}
                                            className={`team-img ${index === activeIndex ? "active" : ""
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
