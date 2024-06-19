import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { URL } from '../URL';
const QnA = ({ isChange, setIsChange }) => {
   const [question, setQuestion] = useState("");
   const [reply, setReply] = useState("");

   const handleChat = async () => {
      try {
         const response = await toast.promise(axios.post(`${URL}/api/chat`, {
            prompt: question
         }),
            {
               pending: 'Generating answer...',
               success: 'Answer generated successfully',
               error: 'Service is unavailable at this time try again after some time.'
            });
         setReply(response.data.message);
         setIsChange(!isChange);
      } catch (error) {
      }
   };

   return (
      <div className='QnA-container flex-col bg-[#72ddf5] w-[60vw] py-5 rounded-md'>
         <div className='flex items-center mx-6 bg-gray-100 rounded-lg'>
            <p className='ms-2 w-[200px]'>Enter your query:</p>
            <input className='w-full rounded-md m-2' type="text" value={question} onChange={(e) => setQuestion(e.target.value)} ></input>
            <button className='mx-3 py-2 px-4 bg-[#2262ef] hover:bg-blue-700 text-white rounded-lg' onClick={handleChat}>Send</button>
         </div>
         <div className='object-cover m-6 bg-gray-100 h-[460px] overflow-y-hidden p-4 rounded-md'>
            {reply}
         </div>
      </div>
   )
}

export default QnA
