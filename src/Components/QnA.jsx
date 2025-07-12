import axios from 'axios';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-toastify';
import remarkGfm from 'remark-gfm';
import { URL } from '../URL';
import { useAuth } from '../context/AuthContext';
const QnA = ({ isChange, setIsChange }) => {
   const [question, setQuestion] = useState("");
   const [reply, setReply] = useState("");
   const { state, dispatch } = useAuth();
   const handleChat = async () => {
      try {
         const response = await toast.promise(axios.post(`${URL}/api/chat`, {
            prompt: question,
            username: state.user.username
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
      <div className='bg-[#2262ef] rounded-md lg:w-[70%] w-[90%] m-3'>
         <div className='flex items-center my-3 mx-4  bg-gray-100 rounded-lg'>
            <p className='m-2 w-auto'>Enter your query:</p>
            <input className='w-full rounded-md m-2' type="text" value={question} onChange={(e) => setQuestion(e.target.value)} ></input>
            <button className='mx-3 py-2 px-4 bg-[#2262ef] hover:bg-blue-700 text-white rounded-lg' onClick={handleChat}>Send</button>
         </div>
         <div className='m-6 bg-gray-100 h-[460px] p-4 rounded-md overflow-y-auto'>
            {reply ? (
               <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                     // Custom styling for different markdown elements
                     h1: ({ node, ...props }) => <h1 className="text-2xl font-bold text-gray-800 mb-4" {...props} />,
                     h2: ({ node, ...props }) => <h2 className="text-xl font-bold text-gray-800 mb-3" {...props} />,
                     h3: ({ node, ...props }) => <h3 className="text-lg font-bold text-gray-800 mb-2" {...props} />,
                     p: ({ node, ...props }) => <p className="text-gray-700 mb-3 leading-relaxed" {...props} />,
                     ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-3 space-y-1" {...props} />,
                     ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-3 space-y-1" {...props} />,
                     li: ({ node, ...props }) => <li className="text-gray-700 ml-4" {...props} />,
                     code: ({ node, inline, ...props }) =>
                        inline ?
                           <code className="bg-gray-200 px-1 py-0.5 rounded text-sm font-mono" {...props} /> :
                           <code className="block bg-gray-200 p-3 rounded text-sm font-mono overflow-x-auto" {...props} />,
                     pre: ({ node, ...props }) => <pre className="bg-gray-200 p-3 rounded text-sm font-mono overflow-x-auto mb-3" {...props} />,
                     blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 mb-3" {...props} />,
                     strong: ({ node, ...props }) => <strong className="font-bold text-gray-800" {...props} />,
                     em: ({ node, ...props }) => <em className="italic text-gray-700" {...props} />,
                     a: ({ node, ...props }) => <a className="text-blue-600 hover:text-blue-800 underline" {...props} />,
                     table: ({ node, ...props }) => <table className="border-collapse border border-gray-300 w-full mb-3" {...props} />,
                     th: ({ node, ...props }) => <th className="border border-gray-300 px-3 py-2 bg-gray-100 font-bold" {...props} />,
                     td: ({ node, ...props }) => <td className="border border-gray-300 px-3 py-2" {...props} />,
                  }}
               >
                  {reply}
               </ReactMarkdown>
            ) : (
               <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                     <i className="ri-chat-3-line text-4xl mb-2"></i>
                     <p>Ask me anything about health, yoga, or diet!</p>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}

export default QnA
