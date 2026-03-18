import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import logo from "../assets/skyiiotlogo.png";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "./api";
import { ROOT_URL } from "./api";
export default function Header() {
  const [headerTop, setHeaderTop] = useState(null);
  const [navbarLogo, setNavbarLogo] = useState(null);
  const [navbarMenu, setNavbarMenu] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headerRes = await api.get("/header-top");
        setHeaderTop(headerRes.data);

        const logoRes = await api.get("/navbar-logo");
        setNavbarLogo(logoRes.data);

        const menuRes = await api.get("/navbar-menu");
        setNavbarMenu(menuRes.data);

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  // const contactItem = navbarMenu.find(item => item.name === "Contact");
  return (
    <header className="position-relative w-100 " >


      <div className="top-menu py-2 bg-dark bg-opacity-75 text-white">
        <div className='container-fluid d-flex justify-content-between align-items-center'>
          <small>{headerTop?.phone} {headerTop ? "|" : ""} {headerTop?.email}</small>

          <div className="d-flex gap-2">
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
              <a href={headerTop.youtube_link} className="social-icon" target="_blank" rel="noreferrer">
                <FaYoutube />
              </a>
            )}
          </div>

        </div>
      </div>


      <nav className='navbar navbar-expand-lg navbar-dark navbar-gradient'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='/'>
            <img
              src={`${ROOT_URL}/${navbarLogo?.logo}`}
              alt={navbarLogo?.logo_text}
              width="150"
              height="40"
            />
          </a>

          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav">
            <span className='navba
            r-toggler-icon'></span>
          </button>

          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav ms-auto'>
              {navbarMenu.map(item => (
                <li key={item.id} className='nav-item'>
                  <NavLink
                    to={item.link}
                    className={({ isActive }) =>
                      item.id === 4
                        ? "btn btn-light rounded-pill px-4 ms-3"
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

    </header>
  );
}
