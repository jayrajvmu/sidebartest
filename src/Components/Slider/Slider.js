import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "./Slider.css";
import { useDispatch, useSelector } from 'react-redux';
import { hide } from '@popperjs/core';


function Slider() {

  // const navHeight = useSelector((state) => state.navheight);
  const [navHeight, setNavHeight] = useState(0);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // useEffect(() => {
  //   const updateNavHeight = () => {
  //     const navbar = document.querySelector('.top-5');
  //     if (navbar) {
  //       setNavHeight(navbar.offsetHeight);
  //     }
  //   };
  //   updateNavHeight();
  //   window.addEventListener('resize', updateNavHeight);
  //   return () => window.removeEventListener('resize', updateNavHeight);
  // }, []);

  
  return (

    // <div className='slider-wrap'>
    // <Carousel activeIndex={index} onSelect={handleSelect}>
    //   <Carousel.Item>
    //     <img src='https://razzybabystudio.com/admin/dashboard/uploads/65cc751629dae.jpg' text="First slide" className='image-slider'  style={{ height: `calc(100vh - ${navHeight}px)` }} />
    //     <Carousel.Caption>
    //       <h3>First slide label</h3>
    //       <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    //     </Carousel.Caption>
    //   </Carousel.Item>
    //   <Carousel.Item>
    //   <img src='https://razzybabystudio.com/admin/dashboard/uploads/65cc7554a9f16.jpg' text="First slide" className='image-slider'  style={{ height: `calc(100vh - ${navHeight}px)` }} />
    //   <Carousel.Caption>
    //       <h3>Second slide label</h3>
    //       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    //     </Carousel.Caption>
    //   </Carousel.Item>
    //   <Carousel.Item>
    //   <img src='https://razzybabystudio.com/admin/dashboard/uploads/65cc76ac3f773.jpg' text="First slide" className='image-slider'  style={{ height: `calc(100vh - ${navHeight}px)` }} />
    //   <Carousel.Caption>
    //       <h3>Third slide label</h3>
    //       <p>
    //         Praesent commodo cursus magna, vel scelerisque nisl consectetur.
    //       </p>
    //     </Carousel.Caption>
    //   </Carousel.Item>
    // </Carousel>
    // </div>

    
    <div className='slider-wrap'>
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img src='https://razzybabystudio.com/admin/dashboard/uploads/65cc751629dae.jpg' text="First slide" className='image-slider'  />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src='https://razzybabystudio.com/admin/dashboard/uploads/65cc7554a9f16.jpg' text="First slide" className='image-slider' />
      <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src='https://razzybabystudio.com/admin/dashboard/uploads/65cc76ac3f773.jpg' text="First slide" className='image-slider'  />
      <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default Slider;