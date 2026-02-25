import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import logo from "../assets/skyiiotlogo.png";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="position-relative w-100 " >


      <div className="top-menu py-2 bg-dark bg-opacity-75 text-white">
        <div className='container-fluid d-flex justify-content-between align-items-center'>
          <small>+91-9266752831 | info@skyiiot.com</small>

          <div className="d-flex gap-2">
            <a href="https://facebook.com"
              className="social-icon">
              <FaFacebookF />
            </a>

            <a href="https://twitter.com"
              className="social-icon">
              <FaTwitter />
            </a>

            <a href="https://linkedin.com"
              className="social-icon">
              <FaLinkedinIn />
            </a>

            <a href="https://youtube.com"
              className="social-icon">
              <FaYoutube />
            </a>
          </div>

        </div>
      </div>


      <nav className='navbar navbar-expand-lg navbar-dark navbar-gradient'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='/'>
            <img src={logo} alt='SkyIIOT Logo' width="150" height="40" />
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
              <li className='nav-item'>
                <Link className="nav-link " to="/">Home</Link>
              </li>
              <li className='nav-item'>
                <Link className="nav-link " to="/about">About Us</Link>
              </li>
              <li className='nav-item'>
                <Link className="nav-link " to="/solutions">Solutions</Link>
              </li>
            </ul>

            <div className='d-flex ms-3'>
              <Link to="/contact" className="btn btn-light rounded-pill px-4">
                Work With Us
              </Link>
            </div>
          </div>
        </div>
      </nav>

    </header>
  );
}
