import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import About from '../Components/About.jsx';
import Contact from '../Components/Contact.jsx';
import Home from '../Components/Home.jsx';
import Services from '../Components/Services.jsx';
import Webgi3D from '../Components/Webgi3D.jsx';
import useScreenSize from '../hooks/useScreenSize.jsx';

const HomePage = () => {
  const screenSize = useScreenSize();
  const [loading, setLoading] = useState(true);
  const [toastId, setToastId] = useState(null);

  // Handler to be called when Webgi3D is fully loaded
  const handleWebgiLoaded = () => setLoading(false);

  useEffect(() => {
    if (loading && !toastId) {
      const id = toast.info('Loading 3D scene, please wait...', { autoClose: false, toastId: 'webgi-loading' });
      setToastId(id);
    } else if (!loading && toastId) {
      toast.dismiss('webgi-loading');
      setToastId(null);
    }
  }, [loading, toastId]);

  return (
    <>
      {/* No loader overlay, just toast */}
      {screenSize.width > 600 && window.screen.width > 600 && (
        <Webgi3D onLoaded={handleWebgiLoaded} />
      )}
      <Home />
      <About />
      <Services />
      <Contact />
    </>
  );
};

export default HomePage;