import React, { useEffect, useState, useRef } from 'react';
import "./style5.css";
import "./responsive5.css";
import { useDispatch } from 'react-redux';
import { setheight } from '../../redux/slice/heightSlice';


export default function Final() {
    const dispatch = useDispatch();

    const [menuActive, setMenuActive] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const accordionRefs = useRef([]);
    const navheight = useRef(null)


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1199) {
                setMenuActive(false);
            }
        };


        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
       dispatch(setheight(navheight.current.clientHeight))
      })

    const toggleMenu = () => {

        closeAllAccordions();

        setMenuActive(!menuActive);
        document.body.classList.toggle('hidden', !menuActive);
    };

    const closeMenu = () => {
        setMenuActive(false);
        document.body.classList.remove('hidden');
    };

    const handleScroll = () => {

        
        if (window.scrollY >= 100) {
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const closeAllAccordions = () => {
        accordionRefs.current.forEach((accordion) => {
            if (accordion) {
                accordion.children[0].querySelector('button').classList.add('collapsed');
                accordion.children[1].classList.remove('show');

            }
        });
    };
    return (
        <div>
            <section className="top-5" ref={navheight}>
                <header className="header-area">
                    <div className={`header-main-area ${isSticky ? 'is-sticky' : ''}`}>
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="header-main">
                                        <div className="header-element logo">
                                            <a href="">
                                                <img src="https://razzybabystudio.com/assets/img/logo-white.png" alt="logo-image" className="img-fluid" />
                                            </a>
                                        </div>

                                        <div className="menu-area">
                                            <div className="header-element header-menu">
                                                <div className="top-menu">
                                                    <div className="header-element megamenu-content">
                                                        <div className="mainwrap">
                                                            <ul className="main-menu">

                                                                <li className="menu-link">
                                                                    <a href="#" className="link-title">
                                                                        <span className="sp-link-title">Home</span>
                                                                    </a>
                                                                </li>
                                                                <li className="menu-link parent">
                                                                    <a href="#" className="link-title" >
                                                                        <span className="sp-link-title">Service</span>
                                                                        <i className="fa fa-angle-down"></i>
                                                                    </a>
                                                                    <ul className={`dropdown-submenu mega-menu ${menuActive ? 'active' : ''}`}>







                                                                        <li className="megamenu-li parent">
                                                                            <h2 className="sublink-title">Studio</h2>
                                                                            <a href="#collapse-top-sub-mega-menu"
                                                                                data-bs-toggle="collapse"
                                                                                className="sublink-title sublink-title-lg">
                                                                                <span></span>
                                                                                <i className="fa fa-angle-down"></i>
                                                                            </a>
                                                                            <ul className="dropdown-supmenu collapse"
                                                                                id="collapse-top-sub-mega-menu">
                                                                                <li className="supmenu-li"><a href="#">Maternity Photoshoot</a></li>
                                                                                <li className="supmenu-li"><a href="#">Newborn Photography</a></li>
                                                                                <li className="supmenu-li"><a href="#">Toddler Photoshoot</a></li>
                                                                                <li className="supmenu-li"><a href="#">Family Portraits</a></li>
                                                                                <li className="supmenu-li"><a href="#">Cake Smash</a></li>
                                                                                <li className="supmenu-li"><a href="#">Birthday Events</a></li>
                                                                            </ul>
                                                                        </li>


                                                                        <li className="megamenu-li parent">
                                                                            <h2 className="sublink-title">Event</h2>
                                                                            <a href="#collapse-top-fruits-menu"
                                                                                data-bs-toggle="collapse"
                                                                                className="sublink-title sublink-title-lg">
                                                                                <span></span>
                                                                                <i className="fa fa-angle-down"></i>
                                                                            </a>
                                                                            <ul className="dropdown-supmenu collapse"
                                                                                id="collapse-top-fruits-menu">
                                                                                <li className="supmenu-li"><a href="#">Maternity Photoshoot</a></li>
                                                                                <li className="supmenu-li"><a href="#">Newborn Photography</a></li>
                                                                                <li className="supmenu-li"><a href="#">Toddler Photoshoot</a></li>
                                                                                <li className="supmenu-li"><a href="#">Family Portraits</a></li>
                                                                                <li className="supmenu-li"><a href="#">Cake Smash</a></li>
                                                                                <li className="supmenu-li"><a href="#">Birthday Events</a></li>
                                                                            </ul>
                                                                        </li>
                                                                        <li className="megamenu-li parent">
                                                                            <h2 className="sublink-title">Photograpy</h2>
                                                                            <a href="#collapse-top-banana-menu"
                                                                                data-bs-toggle="collapse"
                                                                                className="sublink-title sublink-title-lg">
                                                                                <span></span>
                                                                                <i className="fa fa-angle-down"></i>
                                                                            </a>
                                                                            <ul className="dropdown-supmenu collapse"
                                                                                id="collapse-top-banana-menu">
                                                                                <li className="supmenu-li"><a href="#">Maternity Photoshoot</a></li>
                                                                                <li className="supmenu-li"><a href="#">Newborn Photography</a></li>
                                                                                <li className="supmenu-li"><a href="#">Toddler Photoshoot</a></li>
                                                                                <li className="supmenu-li"><a href="#">Family Portraits</a></li>
                                                                                <li className="supmenu-li"><a href="#">Cake Smash</a></li>
                                                                                <li className="supmenu-li"><a href="#">Birthday Events</a></li>
                                                                            </ul>
                                                                        </li>


                                                                    </ul>
                                                                </li>
                                                                <li className="menu-link">
                                                                    <a href="#" className="link-title">
                                                                        <span className="sp-link-title">Blog</span>
                                                                    </a>
                                                                </li>


                                                                <li className="menu-link">
                                                                    <a href="#" className="link-title">
                                                                        <span className="sp-link-title">About Us</span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="header-element right-block-box">
                                            <ul className="shop-element align-items-center">
                                                <li className="side-wrap nav-toggler">
                                                    <button className="navbar-toggler" type="button" onClick={toggleMenu}>
                                                        <span className="line"></span>
                                                    </button>
                                                </li>



                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </section>

            <div className="header-bottom-area">
                <div className={menuActive ? `main-menu-area active` : `main-menu-area`}>
                    <div className="main-navigation navbar-expand-xl">

                        <div className='mobile-logo'>
                            <img src="https://kisslead.com/assets/images/logo/logo.png" />
                        </div>

                        <div className="box-header menu-close">
                            <button className="close-box" type="button" onClick={closeMenu}>
                                <i className="fa-solid fa-arrow-left"></i>
                            </button>
                        </div>
                        <div className="navbar-collapse" id="navbarContent">
                            <div className="megamenu-content">
                                <div className="mainwrap">



                                    <div className="accordion">
                                        <div className="accordion-item"   >
                                            <h2 className="accordion-header">
                                                <a href="#" className='mobile-menu-link'>
                                                    <button className="accordion-button collapsed custom-acord" type="button">
                                                     Home
                                                    </button>
                                                    </a>
                                            </h2>
                                        </div>
                                    </div>

                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item" ref={el => accordionRefs.current[0] = el}  >
                                            <h2 className="accordion-header" id="headingOne">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                                    Service

                                                </button>
                                            </h2>
                                            <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                <div className="accordion-body">

                                                    <div className="accordion" id="sub-accordionExample">
                                                        <div className="accordion-item" ref={el => accordionRefs.current[1] = el} >
                                                            <h2 className="accordion-header" id="sub-headingOne">
                                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#sub-collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                                                    Studio
                                                                </button>
                                                            </h2>
                                                            <div id="sub-collapseOne" className="accordion-collapse collapse " aria-labelledby="sub-headingOne" data-bs-parent="#sub-accordionExample">
                                                                <div className="accordion-body sub-menu-body">
                                                                    <ul >
                                                                        <li className="supmenu-li"><a href="#">Maternity Photoshoot</a></li>
                                                                        <li className="supmenu-li"><a href="#">Newborn Photography</a></li>
                                                                        <li className="supmenu-li"><a href="#">Toddler Photoshoot</a></li>
                                                                        <li className="supmenu-li"><a href="#">Family Portraits</a></li>
                                                                        <li className="supmenu-li"><a href="#">Cake Smash</a></li>
                                                                        <li className="supmenu-li"><a href="#">Birthday Events</a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="accordion-item" ref={el => accordionRefs.current[2] = el} >
                                                            <h2 className="accordion-header" id="sub-headingTwo">
                                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#sub-collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                    Event
                                                                </button>
                                                            </h2>
                                                            <div id="sub-collapseTwo" className="accordion-collapse collapse " aria-labelledby="sub-headingTwo" data-bs-parent="#sub-accordionExample">
                                                                <div className="accordion-body sub-menu-body">
                                                                    <ul >
                                                                        <li className="supmenu-li"><a href="#">Maternity Photoshoot</a></li>
                                                                        <li className="supmenu-li"><a href="#">Newborn Photography</a></li>
                                                                        <li className="supmenu-li"><a href="#">Toddler Photoshoot</a></li>
                                                                        <li className="supmenu-li"><a href="#">Family Portraits</a></li>
                                                                        <li className="supmenu-li"><a href="#">Cake Smash</a></li>
                                                                        <li className="supmenu-li"><a href="#">Birthday Events</a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div className="accordion-item" ref={el => accordionRefs.current[3] = el} >
                                                            <h2 className="accordion-header" id="sub-headingThree">
                                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#sub-collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                    Photograpy
                                                                </button>
                                                            </h2>
                                                            <div id="sub-collapseThree" className="accordion-collapse collapse " aria-labelledby="sub-headingThree" data-bs-parent="#sub-accordionExample">
                                                                <div className="accordion-body sub-menu-body">
                                                                    <ul >
                                                                        <li className="supmenu-li"><a href="#">Maternity Photoshoot</a></li>
                                                                        <li className="supmenu-li"><a href="#">Newborn Photography</a></li>
                                                                        <li className="supmenu-li"><a href="#">Toddler Photoshoot</a></li>
                                                                        <li className="supmenu-li"><a href="#">Family Portraits</a></li>
                                                                        <li className="supmenu-li"><a href="#">Cake Smash</a></li>
                                                                        <li className="supmenu-li"><a href="#">Birthday Events</a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="accordion">
                                        <div className="accordion-item"   >
                                            <h2 className="accordion-header">
                                                <a href="#" className='mobile-menu-link'>
                                                    <button className="accordion-button collapsed custom-acord" type="button">
                                                    Blog
                                                    </button>
                                                    </a>
                                            </h2>
                                        </div>
                                    </div>


                                    <div className="accordion">
                                        <div className="accordion-item"   >
                                            <h2 className="accordion-header">
                                                <a href="#" className='mobile-menu-link'>
                                                    <button className="accordion-button collapsed custom-acord" type="button">
                                                    About Us
                                                    </button>
                                                    </a>
                                            </h2>
                                        </div>
                                    </div>




                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
