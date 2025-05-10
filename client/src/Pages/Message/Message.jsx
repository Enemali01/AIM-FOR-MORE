import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'; 
import {getColumns } from '../../utils/MessageHelper';

const apiUrl = 'https://aim-for-more-server.onrender.com';

const Message = () => {
  const [loading, setLoading] = useState(true)
  const [contacts, setContacts] = useState([])
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [viewedMessages, setViewedMessages] = useState(() => {
    const stored = localStorage.getItem('viewedMessages');
    return stored ? JSON.parse(stored) : [];
  });

  const handleViewMessage = (row) => {
    if (!viewedMessages.includes(row._id)) {
      const updated = [...viewedMessages, row._id];
      setViewedMessages(updated);
      localStorage.setItem('viewedMessages', JSON.stringify(updated));
    }
    setSelectedMessage(row);
    setIsModalOpen(true);
  };
  


const columns = getColumns(handleViewMessage, viewedMessages);

  useEffect(()=>{
    const getAll = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${apiUrl}/api/contact/contact`, {
                    headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                  })
              // if(response.data.message){
              //       let sno = 1 ;
              //       const data = await response.data.contacts.map((contact) => ({
              //         _id:contact._id,
              //         sno: sno++,
              //         userId: contact.userId,
              //         lastname: contact.lastname,
              //         message:contact.message,
              //         action: <MessgaeButton id={contact._id}/>,
              //       }))
                    setContacts(response.data.contacts)
                        
      } catch (error) {
        console.log(error)
      }finally{
        setLoading(false)
      }
     
    }
    getAll();
  },[])
  
  return (
    <>
    {loading ? <div>Loading </div> :
    <div className='overflow-x-auto w-full'>
      <DataTable 
      title='Messages'
      columns={columns} 
      data={contacts}
      pagination
      responsive
      />
      {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
      <h6 className="text-xl font-semibold mb-4">Message from {selectedMessage?.userId.firstname}</h6>
      <p className="text-xl font-semibold mb-4">Email: {selectedMessage?.userId.email}</p>
      <p className="text-xl font-semibold mb-4">Phone:{selectedMessage?.userId.phone}</p>
      <p className="mb-4">{selectedMessage?.message}</p>
      <div className="flex justify-end">
        <button
          onClick={() => setIsModalOpen(false)}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
    
    
  }
  </>
  )
}

export default Message