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
                <section className="container-fluid mt-2 px-3 px-md-4 px-lg-5">
                    <h1 className="text-center fw-bold mb-5">
                        Our Team
                    </h1>

                    <div className="row row-custom-gap">
                        {teamData.map((member, index) => (
                            <div key={index} className="col-12 col-sm-6 col-lg-4">

                                <div className="team-card text-center position-relative">

                                    {/* Card Background */}
                                    <div className="card shadow border-0 pt-3 pb-2"></div>

                                    {/* Content */}
                                    <div className="team-content text-center">
                                        <div className="img-wrapper">
                                            <img
                                                src={`${ROOT_URL}/${member.image}`}
                                                alt={member.name}
                                                // className={`team-img rounded-circle shadow`} 
                                                className="team-img rounded-circle shadow team-bounce"
                                            />
                                        </div>


                                        <div className="team-info">
                                            <h1 className=" text-black " dangerouslySetInnerHTML={{
                                                    __html: member.heading,
                                                }}></h1>

                                            <p
                                                className="text-black"
                                                dangerouslySetInnerHTML={{
                                                    __html: member.paragraph
                                                }}
                                            ></p>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
