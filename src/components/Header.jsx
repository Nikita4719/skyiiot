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
    <header className="fixed-top w-100" style={{ zIndex: "2000" }}>
      {loading ? (
        <div className="bg-white d-flex justify-content-center align-items-center" style={{ height: "80px" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className={isHome ? "mx-auto px-2 px-md-0" : "mx-auto"} style={{ maxWidth: isHome ? "1140px" : "100%", margin: "0 auto" }}>

          {/* TOP INFO BAR */}
          <div className="d-flex flex-column flex-sm-row px-4 gap-2 gap-sm-4 text-white py-2 position-relative" // Slightly larger top bar (py-2)
            style={{
              backgroundColor: "rgba(23, 1, 44, 1)",
              borderBottomLeftRadius: isHome ? "12px" : "0",
              borderBottomRightRadius: isHome ? "12px" : "0",
              zIndex: "1050",
              fontSize: "0.85rem", // Balanced font size
              marginBottom: "-5px"
            }}>
            <div className="d-flex gap-4 fw-medium">
              <span>{headerTop?.phone}</span>
              <span>{headerTop?.email}</span>
            </div>
            <div className="d-flex gap-4 ms-sm-auto align-items-center">
              {[
                { link: headerTop?.facebook_link, icon: <FaFacebookF />, hover: "#2563eb" },
                { link: headerTop?.twitter_link, icon: <FaTwitter />, hover: "#38bdf8" },
                { link: headerTop?.linkedin_link, icon: <FaLinkedinIn />, hover: "#2563eb" },
                { link: headerTop?.youtube_link, icon: <FaYoutube />, hover: "#dc2626" }
              ].map((social, idx) => social.link && (
                <a
                  key={idx}
                  href={social.link}
                  className="text-white social-hover-icon"
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: "1rem" }}
                  onMouseOver={(e) => e.currentTarget.style.color = social.hover}
                  onMouseOut={(e) => e.currentTarget.style.color = "white"}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* NAVBAR */}
          <nav className="d-flex align-items-center justify-content-between position-relative px-4 pt-2 pb-3 navbar-premium-gradient" // Reduced top padding (pt-2)
            style={{ zIndex: "1040", backdropFilter: "blur(12px)" }}>

            <NavLink to="/" className="d-inline-block">
              <img
                src={`${ROOT_URL}/${navbarLogo?.logo}`}
                alt={navbarLogo?.logo_text}
                className="img-fluid"
                style={{ height: "auto", maxHeight: "52px" }} // Larger logo for better visibility
              />
            </NavLink>

            {/* DESKTOP MENU */}
            <ul className="d-none d-md-flex align-items-center mb-0 list-unstyled ms-auto mx-4 gap-5 fw-medium"> {/* Increased gap to gap-5 */}
              {navbarMenu.filter(item => item.id !== 4).map(item => (
                <li key={item.id}>
                  <NavLink
                    to={item.link}
                    className={({ isActive }) =>
                      `nav-link-premium ${isActive ? "active-nav-premium" : ""}`
                    }
                    style={{ fontSize: "1.05rem" }} // Slightly larger font
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="d-flex gap-4 align-items-center">
              <NavLink to="/contact" className="d-none d-sm-inline-block btn-contact-gradient">
                WORK WITH US
              </NavLink>

              {/* MOBILE BUTTON */}
              <button
                className="d-md-none border-0 bg-transparent fs-2 text-dark"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                ☰
              </button>
            </div>

            {/* MOBILE MENU */}
            <div className={`d-md-none position-absolute top-100 start-0 end-0 mt-3 mx-4 bg-white rounded-4 shadow-xl overflow-hidden transition-all duration-500`}
              style={{ maxHeight: menuOpen ? "500px" : "0", visibility: menuOpen ? "visible" : "hidden", transition: "all 0.5s ease" }}>
              <ul className="d-flex flex-column list-unstyled text-center mb-0 fw-medium">
                {navbarMenu.map(item => (
                  <li key={item.id} className="border-bottom">
                    <NavLink
                      to={item.link}
                      className={item.id === 4 ? "btn-contact-gradient my-3 mx-auto" : "d-block py-3 text-dark text-decoration-none"}
                      onClick={() => setMenuOpen(false)}
                      style={{ transition: "0.3s" }}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
// to={
//                             item.link === "/system-details"
//                               ? `/system-details/${item.id}`   // yaha ID add hogi
//                               : item.link                     // baki normal
//                           }