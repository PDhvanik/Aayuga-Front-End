import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { toast } from 'react-toastify';
import remarkGfm from 'remark-gfm';
import { URL } from '../URL';
import { useAuth } from '../context/AuthContext';

// Add custom styles for animations
const modalStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
`;

const History = ({ isChange }) => {
   const [chatHistory, setChatHistory] = useState([]);
   const [error, setError] = useState("");
   const [viewChat, setViewChat] = useState(null);
   const { state } = useAuth();
   const handleView = (chat) => {
      setViewChat(chat);
   }

   const handleCloseView = () => {
      setViewChat(null);
   }
   const handleClear = () => {
      const user = state.user.username
      setChatHistory([]);
      axios.delete(`${URL}/api/history/${user}`).then((response) => {
         if (response.data.status === "error") {
            setError(response.data.message);
            toast.error(response.data.message);
         }
         else {
            toast.success(response.data.message);
         }
      }).catch((error) => {
         setError("Error in deleting chat history!");
         toast.error("Error in deleting chat history!");
      })
   }
   const fetchChatData = () => {
      const user = state.user.username;
      axios.get(`${URL}/api/history/${user}`).then((response) => {
         setChatHistory(response.data.Chat);
         if (response.data.Chat.length === 0) {
            toast.info("No chat history found!");
         }
      }).catch((error) => {
         setChatHistory([]);
         toast.error("Error in fetching chat history!");
      });
   }

   useEffect(() => {
      fetchChatData();
   }, [isChange]);
   return (
      <>
         <style>{modalStyles}</style>
         <div className='lg:w-[30%] bg-[#2262ef] rounded-md lg:mr-5 w-[90%] my-4'>
            <div className='flex justify-between items-center text-xl my-2 mx-3'>
               <p >Clear History</p>
               <button className='' onClick={handleClear}>
                  <i className="ri-delete-bin-line"></i>
               </button>
            </div>
            <div className='bg-gray-100 h-[500px] m-6 rounded-md'>
               <ul>
                  {chatHistory.length === 0 ? (
                     <li className='flex justify-center items-center mx-2 my-4 bg-white rounded-md px-1 py-4 drop-shadow-md'>
                        <p className='text-gray-500'>No chat history available</p>
                     </li>
                  ) : (
                     chatHistory.map((chat, index) => (
                        <li className='flex justify-between items-center mx-2 my-4 bg-white rounded-md px-1 drop-shadow-md' key={index}>
                           <div className='flex justify-center items-center'>
                              <button onClick={() => handleView(chat)} className='bg-[#2262ef] hover:bg-blue-700 text-sm text-white rounded-lg py-1 px-2 h-[30px]'>View</button>
                              <p className='m-2 text-xl'><i className="ri-arrow-right-circle-line"></i></p>
                           </div>
                           <p className='mx-1 text-sm'>{chat.question}</p>
                           <p className='mx-1 text-sm'>{`${chat.date}/${chat.month}/${chat.year}`}</p>
                        </li>
                     ))
                  )}
               </ul>
               {viewChat && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                     <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-fadeIn">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center">
                           <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                 <i className="ri-chat-3-line text-xl text-black"></i>
                              </div>
                              <div>
                                 <h2 className="text-xl font-semibold">Chat Details</h2>
                                 <p className="text-blue-100 text-sm">
                                    {`${viewChat.date}/${viewChat.month}/${viewChat.year}`}
                                 </p>
                              </div>
                           </div>
                           <button
                              onClick={handleCloseView}
                              className="w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200"
                           >
                              <i className="ri-close-line text-xl text-black"></i>
                           </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto">
                           {/* Question Section */}
                           <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-blue-500">
                              <div className="flex items-center space-x-3 mb-3">
                                 <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <i className="ri-question-line text-white text-sm"></i>
                                 </div>
                                 <h3 className="font-semibold text-gray-800 text-lg">Question</h3>
                              </div>
                              <div className="text-gray-700 leading-relaxed">
                                 <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                       p: ({ node, ...props }) => <p className="text-gray-700 mb-2" {...props} />,
                                       strong: ({ node, ...props }) => <strong className="font-bold text-gray-800" {...props} />,
                                       em: ({ node, ...props }) => <em className="italic text-gray-700" {...props} />,
                                       code: ({ node, inline, ...props }) =>
                                          inline ?
                                             <code className="bg-gray-200 px-1 py-0.5 rounded text-xs font-mono" {...props} /> :
                                             <code className="block bg-gray-200 p-2 rounded text-xs font-mono overflow-x-auto mb-2" {...props} />,
                                    }}
                                 >
                                    {viewChat.question}
                                 </ReactMarkdown>
                              </div>
                           </div>

                           {/* Answer Section */}
                           <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-green-500">
                              <div className="flex items-center space-x-3 mb-3">
                                 <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                    <i className="ri-robot-line text-white text-sm"></i>
                                 </div>
                                 <h3 className="font-semibold text-gray-800 text-lg">Answer</h3>
                              </div>
                              <div className="text-gray-700 leading-relaxed">
                                 <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                       h1: ({ node, ...props }) => <h1 className="text-xl font-bold text-gray-800 mb-3" {...props} />,
                                       h2: ({ node, ...props }) => <h2 className="text-lg font-bold text-gray-800 mb-2" {...props} />,
                                       h3: ({ node, ...props }) => <h3 className="text-base font-bold text-gray-800 mb-2" {...props} />,
                                       p: ({ node, ...props }) => <p className="text-gray-700 mb-3 leading-relaxed" {...props} />,
                                       ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-3 space-y-1" {...props} />,
                                       ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-3 space-y-1" {...props} />,
                                       li: ({ node, ...props }) => <li className="text-gray-700 ml-4" {...props} />,
                                       code: ({ node, inline, ...props }) =>
                                          inline ?
                                             <code className="bg-gray-200 px-1 py-0.5 rounded text-sm font-mono" {...props} /> :
                                             <code className="block bg-gray-200 p-3 rounded text-sm font-mono overflow-x-auto mb-3" {...props} />,
                                       pre: ({ node, ...props }) => <pre className="bg-gray-200 p-3 rounded text-sm font-mono overflow-x-auto mb-3" {...props} />,
                                       blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-600 mb-3" {...props} />,
                                       strong: ({ node, ...props }) => <strong className="font-bold text-gray-800" {...props} />,
                                       em: ({ node, ...props }) => <em className="italic text-gray-700" {...props} />,
                                       a: ({ node, ...props }) => <a className="text-blue-600 hover:text-blue-800 underline" {...props} />,
                                       table: ({ node, ...props }) => <table className="border-collapse border border-gray-300 w-full mb-3" {...props} />,
                                       th: ({ node, ...props }) => <th className="border border-gray-300 px-3 py-2 bg-gray-100 font-bold" {...props} />,
                                       td: ({ node, ...props }) => <td className="border border-gray-300 px-3 py-2" {...props} />,
                                    }}
                                 >
                                    {viewChat.answer}
                                 </ReactMarkdown>
                              </div>
                           </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50 px-6 py-4 border-t">
                           <div className="flex justify-between items-center text-sm text-gray-500">
                              <div className="flex items-center space-x-2">
                                 <i className="ri-time-line"></i>
                                 <span>Viewed at {new Date().toLocaleTimeString()}</span>
                              </div>
                              <button
                                 onClick={handleCloseView}
                                 className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors duration-200"
                              >
                                 Close
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               )}
            </div>

         </div>
      </>
   )
}

export default History
