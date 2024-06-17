import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';
import { URL } from '../URL';

const Profile = () => {
   const [user, setUser] = useState(null);
   const navigate = useNavigate();
   useEffect(() => {
      const fetchUserProfile = async () => {
         try {
            const tokenValue = localStorage.getItem('token');
            if (tokenValue) {
               const response = await axios.get(`${URL}/api/user/profile`, {
                  headers: {
                     Authorization: `Bearer ${tokenValue}`
                  }
               });
               setUser(response.data.user);
            }
         } catch (error) {
            console.error('Error fetching user profile:', error);
         }
      };

      fetchUserProfile();
   }, []);

   const handleLogout = async () => {
      try {
         localStorage.removeItem('token');
         setUser(null);
         navigate('/')
         window.location.reload();
      } catch (error) {
         console.error('Error logging out:', error);
      }
   };

   return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-t from-[#72ddf5]">
         {user ? (
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
               <h2 className="text-2xl font-bold mb-4">Welcome, {user.username}!</h2>
               <p className="text-lg mb-4">Email: {user.email}</p>
               <p className="text-lg mb-4">Height: {user.height} cm</p>
               <p className="text-lg mb-4">Weight: {user.weight} kg</p>
               <p className="text-lg mb-4">Blood Group: {user.bloodGroup}</p>
               <button className="bg-[#2262ef] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg" onClick={handleLogout}>Logout</button>
            </div>
         ) : (
            <Loading />
         )}
      </div>
   );
};

export default Profile;
