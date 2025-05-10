import React from 'react'
import {useCart} from 'react-use-cart'

const apiUrl = 'https://aim-for-more-server.onrender.com'
const Details = () => {
  const {isEmpty,items, totalUniqueItems, totalItems, removeItem, cartTotal} = useCart()
  if(isEmpty) return <p className='text-center'>Your cart is Empty</p>
  return (
    <>
    <section>
        <div className='px-4 container card'>
          <div className=' rounded-md  px-3 py-3'>
            <div className='py-2 px-3'>
              <p>Your Total Products are: {totalUniqueItems}
              </p>
              {items.map((item)=>(
                <div key={item.id}>
                  <div >
                    <img
                  src={`${apiUrl}/images/${item.file}`}
                  className='w-10 object-fit h-10 rounded-3xl hover:scale-110 transition-all item-center justify-center'/>
                  </div>
                  <p>Unit Price: {item.price}</p>
                  <p>Quantity : {item.quantity}</p>
                  <p>Toatl Items Price : {item.itemTotal}</p>                 
                </div>
              ))}
               <span className='text-2xl'>Grand Total: N{cartTotal}</span>
            </div>
          </div>
        </div>
    </section>
  </>
  )
}

export default Details