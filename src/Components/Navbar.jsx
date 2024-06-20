import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useScreenSize from '../hooks/useScreenSize';
import logo from '../utils/logo.png';
import { Offcanvas } from 'react-bootstrap';
import { useState,useEffect } from 'react';
const Navbar = () => {
   const { state, dispatch } = useAuth();
   const location = useLocation();
   const navigate = useNavigate();
   const [isHomePage, setIsHomePage] = useState(true);
   const [isOpen, setIsOpen] = useState(false);
   const screenSize = useScreenSize();

   useEffect(() => {
      if (screenSize.width > 768) {
         setIsOpen(false);
      }
   }, [screenSize.width]);

   useEffect(() => {
      setIsHomePage(location.pathname === '/');
   }, [location]);

   const openNav = () => setIsOpen(true);
   const closeNav = () => setIsOpen(false);

   const handleHome = () => navigate('/');
   const handleLogin = () => navigate('/login');
   const handleProfile = () => navigate('/profile');

   return (
      <>
         <div id="navbar" className='fixed top-0 w-screen flex content-between justify-between items-center bg-[#22c9ef] z-50'>
            <div className="flex items-center m-2">
               <img src={logo} alt="Aayuga" height='50px' width='50px' className='ml-12 mr-3' />
               <button onClick={handleHome} className='mx-2 text-3xl font-black'>Aayuga</button>
            </div>
            {screenSize.width > 1200 ? (
               <div className='flex items-center m-2'>
                  <ul className='flex items-center mr-12'>
                     {isHomePage && <>
                        <button className='mx-4 text-xl font-semibold' onClick={() => document.getElementById('home').scrollIntoView({ behavior: 'smooth' })}>Home</button>
                        <button className='mx-4 text-xl font-semibold' onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>About</button>
                        <button className='mx-4 text-xl font-semibold' onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}>Services</button>
                        <button className='mx-4 text-xl font-semibold' onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Contact</button>
                     </>}
                     {
                        (location.pathname === '/profile') ? <button className='mx-4 text-xl font-semibold' onClick={()=>navigate('/')}>Go to Home</button>:<></>
                     }
                     {state.isLoggedIn ? (
                        <li className='mx-4 text-xl font-semibold'>
                           <button onClick={handleProfile} className='font-bold'>{state.user.username}</button>
                        </li>
                     ) : (
                        <li className='mx-4 text-xl font-semibold'>
                           <button onClick={handleLogin} className='font-bold py-2 px-4 border-1 border-black rounded-lg'>Login</button>
                        </li>
                     )}
                  </ul>
               </div>
            ) : (
               <button className='list-button' onClick={openNav}><div className='text-xl mr-4'>&#9776;</div></button>
            )}
         </div>
         <Offcanvas show={isOpen} onHide={closeNav} className='bg-gradient-to-t from-[#72ddf5]'>
            <Offcanvas.Header className='bg-[#22c9ef] w-auto p-3 rounded-xl m-2'>
               <Offcanvas.Title className=''>Menu</Offcanvas.Title>
               <button className=" text-[20px] bg-red-700 w-[30px] rounded-lg" onClick={closeNav}>&times;</button>
            </Offcanvas.Header>
            <ul className='flex-col items-center mr-12 py-2'>
               {isHomePage && <>
                  <li><button className='mx-4 my-1 text-xl font-semibold w-full bg-[#2262ef] rounded-lg' onClick={() => document.getElementById('home').scrollIntoView({ behavior: 'smooth' })}>Home</button></li>
                  <li><button className='mx-4 my-1 text-xl font-semibold w-full bg-[#2262ef] rounded-lg' onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>About</button></li>
                  <li><button className='mx-4 my-1 text-xl font-semibold w-full bg-[#2262ef] rounded-lg' onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}>Services</button></li>
                  <li><button className='mx-4 my-1 text-xl font-semibold w-full bg-[#2262ef] rounded-lg' onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Contact</button></li>
               </>}
               {(location.pathname === '/profile') ? <button className='mx-4 my-1 text-xl font-semibold w-full bg-[#2262ef] rounded-lg' onClick={() => navigate('/')}>Go to Home</button>:<></>}
               {state.isLoggedIn ? (
                  <li className=''>
                     <button onClick={handleProfile} className='font-bold m-4 py-2 px-4 border-1 border-black w-full rounded-lg bg-[#22c9ef]'>{state.user.username}</button>
                  </li>
               ) : (
                  <li className=''>
                     <button onClick={handleLogin} className='font-bold m-4 py-2 px-4 border-1 border-black w-full rounded-lg bg-[#22c9ef]'>Login</button>
                  </li>
               )}
            </ul>
         </Offcanvas>
      </>
   );
};

export default Navbar;
