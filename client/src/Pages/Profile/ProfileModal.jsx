import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'


const ProfileModal = () => {
  const [show, setShow] = useState(false)

  const handleShow = () => {
    setShow(true)
  }
  const handleClose = () => {
    setShow(false)
  }
  return (
    <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>
                    <div>
                    <label htmlFor='firstname'
                    className='text-sm font-medium text-gray-700'
                    >Firstname</label>
                    <input
                    type='text'
                    name='firstname'
                       className='mt-1 w-full p-2 mb-3 border border-gray-300 rounded-md'
                    />
                    </div>
                    <div>
                    <label
                    tmlFor='lastname'
                    className='text-sm font-medium text-gray-700'
                    >lastname</label>
                     <input
                    type='text'
                    name='lastname'
                       className='mt-1 w-full p-2 mb-3 border border-gray-300 rounded-md'
                    />
                    </div>
                    <div>
                    <label
                    tmlFor='phone'
                    className='text-sm font-medium text-gray-700'
                    >Phone Number</label> 
                    <input
                    type='text'
                    name='phone'
                       className='mt-1 w-full p-2 mb-3 border border-gray-300 rounded-md'
                    />
                    </div>
                    <div>
                    <label
                    tmlFor='password'
                    className='text-sm font-medium text-gray-700'
                    >Old Password</label> 
                    <input
                    type='password'
                    name='password'
                       className='mt-1 w-full p-2 mb-3 border border-gray-300 rounded-md'
                    />
                    </div>
                    <div>
                    <label
                    tmlFor='password'
                    className='text-sm font-medium text-gray-700'
                    >New Password</label> 
                    <input
                    type='password'
                    name='password'
                       className='mt-1 w-full p-2 mb-3 border border-gray-300 rounded-md'
                    />
                    </div>
                    <div>
                    <label
                    tmlFor='password'
                    className='text-sm font-medium text-gray-700'
                    >Confirm Password</label> 
                    <input
                    type='password'
                    name='password'
                       className='mt-1 w-full p-2 mb-3 border border-gray-300 rounded-md'
                    />
                    </div>

                  </form>
                  <div>
                    <button className='bg-emerald-700 text-white px-3 py-2 w-full rounded'>Save</button>
                  </div>
                </Modal.Body>
              </Modal>
  )
}

export default ProfileModal