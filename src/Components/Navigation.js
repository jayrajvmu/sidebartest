import React, {useState} from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import './Navigation.css';
import bannerImg from '../img/banner-image.jpg'
const Navigation = () => {
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  const handleMouseEnter = () => {
    setShowMegaMenu(true);
  };

  const handleMouseLeave = () => {
    setShowMegaMenu(false);
  };

  return (
<nav className="navbar navbar-expand-md navbar-light bg-dark navbar-dark shadow">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Bootstrap 5 <span className="badge bg-primary">Mega Menu</span></a>

        <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-content">
          <div className="hamburger-toggle">
            <div className="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </button>

        <div className="collapse navbar-collapse" id="navbar-content">
          <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>


            <li className="nav-item dropdown mobileshow">
              <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" data-bs-auto-close="outside">Multilevel</a>
              <ul className="dropdown-menu shadow">
                <li><a className="dropdown-item" href="#">Gallery</a></li>
                <li><a className="dropdown-item" href="blog.html">Blog</a></li>
                <li className="dropstart">
                  <a href="#" className="dropdown-item dropdown-toggle" data-bs-toggle="dropdown">Submenu Left</a>
                  <ul className="dropdown-menu shadow">
                    <li><a className="dropdown-item" href=""> Third level 1</a></li>
                    <li><a className="dropdown-item" href=""> Third level 2</a></li>
                    <li><a className="dropdown-item" href=""> Third level 3</a></li>
                    <li><a className="dropdown-item" href=""> Third level 4</a></li>
                    <li><a className="dropdown-item" href=""> Third level 5</a></li>
                  </ul>
                </li>
                <li className="dropend">
                  <a href="#" className="dropdown-item dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside">Submenu Right</a>
                  <ul className="dropdown-menu shadow">
                    <li><a className="dropdown-item" href=""> Second level 1</a></li>
                    <li><a className="dropdown-item" href=""> Second level 2</a></li>
                    <li><a className="dropdown-item" href=""> Second level 3</a></li>
                    <li className="dropend">
                      <a href="#" className="dropdown-item dropdown-toggle" data-bs-toggle="dropdown">Let's go deeper!</a>
                      <ul className="dropdown-menu dropdown-submenu shadow">
                        <li><a className="dropdown-item" href=""> Third level 1</a></li>
                        <li><a className="dropdown-item" href=""> Third level 2</a></li>
                        <li><a className="dropdown-item" href=""> Third level 3</a></li>
                        <li><a className="dropdown-item" href=""> Third level 4</a></li>
                        <li><a className="dropdown-item" href=""> Third level 5</a></li>
                      </ul>
                    </li>
                    <li><a className="dropdown-item" href=""> Third level 5</a></li>
                  </ul>
                </li>
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>

            {/* <li className="nav-item dropdown dropdown-mega position-static mobileoff">
              <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" data-bs-auto-close="outside">Megamenu</a>
              <div className="dropdown-menu shadow">
                <div className="mega-content px-4">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12 col-sm-4 col-md-3 py-4">
                        <h5>Pages</h5>
                        <div className="list-group">
                          <a className="list-group-item" href="#">Accomodations</a>
                          <a className="list-group-item" href="#">Terms & Conditions</a>
                          <a className="list-group-item" href="#">Privacy</a>
                        </div>
                      </div>
                      <div className="col-12 col-sm-4 col-md-3 py-4">
                        <h5>Card</h5>
                        <div className="card">
                    <img src={bannerImg} className="img-fluid" alt="image"/>
                    <div className="card-body">
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                  </div>
                      </div>
                      <div className="col-12 col-sm-4 col-md-3 py-4">
                        <h5>About CodeHim</h5>
                          <p><b>CodeHim</b> is one of the BEST developer websites that provide web designers and developers with a simple way to preview and download a variety of free code & scripts.</p>
                      </div>
                      <div className="col-12 col-sm-12 col-md-3 py-4">
                        <h5>Damn, so many</h5>
                        <div className="list-group">
                          <a className="list-group-item" href="#">Accomodations</a>
                          <a className="list-group-item" href="#">Terms & Conditions</a>
                          <a className="list-group-item" href="#">Privacy</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li> */}

           <li
              className="nav-item dropdown dropdown-mega position-static mobileoff"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <a className="nav-link dropdown-toggle" href="#" data-bs-auto-close="outside">
                Megamenu
              </a>
              {showMegaMenu && (
                <div className="dropdown-menu shadow">
                  <div className="mega-content px-4">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-12 col-sm-4 col-md-3 py-4">
                          <h5>Pages</h5>
                          <div className="list-group">
                            <a className="list-group-item" href="#">Accommodations</a>
                            <a className="list-group-item" href="#">Terms & Conditions</a>
                            <a className="list-group-item" href="#">Privacy</a>
                          </div>
                        </div>
                        <div className="col-12 col-sm-4 col-md-3 py-4">
                          <h5>Card</h5>
                          <div className="card">
                            <img src="https://via.placeholder.com/150" className="img-fluid" alt="Card" />
                            <div className="card-body">
                              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-4 col-md-3 py-4">
                          <h5>About CodeHim</h5>
                          <p><b>CodeHim</b> is one of the BEST developer websites that provide web designers and developers with a simple way to preview and download a variety of free code & scripts.</p>
                        </div>
                        <div className="col-12 col-sm-12 col-md-3 py-4">
                          <h5>Damn, so many</h5>
                          <div className="list-group">
                            <a className="list-group-item" href="#">Accommodations</a>
                            <a className="list-group-item" href="#">Terms & Conditions</a>
                            <a className="list-group-item" href="#">Privacy</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
            </li>
          </ul>
          <form className="d-flex ms-auto">
              <div className="input-group">
                  <input className="form-control border-0 mr-2" type="search" placeholder="Search" aria-label="Search"/>
                  <button className="btn btn-primary border-0" type="submit">Search</button>
              </div>
          </form>
        </div>
      </div>
</nav>
  );
};

export default Navigation;
