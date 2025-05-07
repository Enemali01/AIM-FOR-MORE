import React from 'react'

const Details = () => {
  return (
    <>
    <section>
        <div className='px-4'>
          <div className='mx-auto  rounded-md  px-2 py-2'>
            <div className='card container py-2 px-3'>
            <form>
            <div>
                <label 
                 htmlFor='Address'
                 className='text-sm font-medium text-gray-700'
                 >
                 Address
                  </label>
                <input 
                  type='text'
                  placeholder='Address'
                  name='name'
                  className='mt-1 w-full p-2 border rounded-md'
                  required
                />
                </div>
                <div>
                <label 
                 htmlFor='Addition Address'
                 className='text-sm font-medium text-gray-700'
                 >
                 Addition Address 
                  </label>
                <input 
                  type='text'
                  placeholder='Addition Address e.g Landmark'
                  name='address'
                  className='mt-1 w-full p-2 border rounded-md'
                  required
                />
                </div>
                <div>
                <label 
                 htmlFor='Addition Address'
                 className='text-sm font-medium text-gray-700'
                 >
                 Additional Phone number (Optional)
                  </label>
                <input 
                  type='tel'
                  placeholder='+234-0000-000-000'
                  name='phone'
                  className='mt-1 w-full p-2 border rounded-md'
                  required
                />
                </div>
            </form>
            </div>
          </div>
        </div>
    </section>
  </>
  )
}

export default Details