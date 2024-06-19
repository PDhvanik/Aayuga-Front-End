import React, { useEffect } from 'react';
import About from '../Components/About.jsx';
import Home from '../Components/Home.jsx';
import Services from '../Components/Services.jsx';
import Webgi3D from '../Components/Webgi3D.jsx';
import Contact from '../Components/Contact.jsx';
import useScreenSize from '../hooks/useScreenSize.jsx'
const HomePage = () => {
  const windowSize = useScreenSize();
  return (
    <div className='overflow-x-hidden'>
      {(windowSize.width > 600) ? <Webgi3D /> :<></>}
      <Home />
      <About />
      <Services />
      <Contact />
    </div>
  )
}

export default HomePage