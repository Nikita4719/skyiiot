import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "./api";
import { ROOT_URL } from "./api";
export default function Header() {
  const [loading, setLoading] = useState(true);
  const [headerTop, setHeaderTop] = useState(null);
  const [navbarLogo, setNavbarLogo] = useState(null);
  const [navbarMenu, setNavbarMenu] = useState([]);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = location.pathname === "/";
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [headerRes, logoRes, menuRes] = await Promise.all([
          api.get("/header-top"),
          api.get("/navbar-logo"),
          api.get("/navbar-menu"),
        ]);

        setHeaderTop(headerRes.data);
        setNavbarLogo(logoRes.data);
        setNavbarMenu(menuRes.data);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <header className={isHome ? "header floating-header" : "header normal-header"}>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "80px" }}>
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="header-wrapper">
            <div className="top-menu py-1 bg-black bg-opacity-75 text-white">
             <div className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-center px-3">
                <div className="top-contact">
                  <span>{headerTop?.phone}</span>
                  <span className="d-none d-md-inline">|</span>
                  <span>{headerTop?.email}</span>
                </div>
                <div className="d-flex gap-2 flex-wrap justify-content-center">
                  {headerTop?.facebook_link && (
                    <a href={headerTop.facebook_link} className="social-icon" target="_blank" rel="noreferrer">
                      <FaFacebookF />
                    </a>
                  )}
                  {headerTop?.twitter_link && (
                    <a href={headerTop.twitter_link} className="social-icon" target="_blank" rel="noreferrer">
                      <FaTwitter />
                    </a>
                  )}
                  {headerTop?.linkedin_link && (
                    <a href={headerTop.linkedin_link} className="social-icon" target="_blank" rel="noreferrer">
                      <FaLinkedinIn />
                    </a>
                  )}
                  {headerTop?.youtube_link && (
                    <a href={headerTop.youtube_link} className="social-icon youtube-icon" target="_blank" rel="noreferrer">
                      <FaYoutube />
                    </a>
                  )}
                </div>

              </div>
            </div>


            <nav className="navbar navbar-expand-lg navbar-light navbar-gradient">
              <div className="container-fluid d-flex align-items-center justify-content-between px-3">
                <a className='navbar-brand' href='/'>
                  <img
                    src={`${ROOT_URL}/${navbarLogo?.logo}`}
                    alt={navbarLogo?.logo_text}
                    className="img-fluid navbar-logo"
                  />
                </a>

                <button
                  className="navbar-toggler custom-toggler"
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <span className="bar"></span>
                  <span className="bar"></span>
                  <span className="bar"></span>
                </button>

                <div className={`navbar-collapse justify-content-end ${menuOpen ? "show" : "collapse"}`}>
                  <ul className="navbar-nav ms-auto">
                    {navbarMenu.map(item => (
                      <li key={item.id} className='nav-item fw-semibold'>
                        <NavLink
                          to={item.link}
                          onClick={() => setMenuOpen(false)}
                          className={({ isActive }) =>
                            item.id === 4
                              ? "btn btn-light rounded-pill px-3 px-md-4 mt-2 mt-lg-0"
                              : isActive
                                ? "nav-link active-nav"
                                : "nav-link"
                          }
                        >
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </>
      )
      }
    </header >
  );
}
