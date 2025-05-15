import React, { useContext } from 'react'
// import { CartContext } from '../../Components/Hook/ContextProvider'


const apiUrl ='https://aim-for-more-server.onrender.com'

const CartProduct = ({products}) => {
// const {cart,dispatch} = useContext(CartContext)

// const Increase = (id) =>{
//   const Index = cart.findIndex( p => p.id === id)
//   console.log(Index)
//   if(cart[Index].quantity < 10){
//     dispatch({type: "Increase", id})
//   };
// }
// const Decrease = (id) =>{
//   const Index = cart.findIndex((p) => p.id === id)
//   if(cart[Index].quantity > 1){
//     dispatch({type: "Decrease", id})
//   };
// }
  return (
    <div className='flex  mt-3'>
        <img 
        src={products.file} 
        className='w-10 object-fit h-10 rounded-3xl hover:scale-110 transition-all'
        alt={products.name}
        />
        <div className="ms-4 flex ">
            <p className='font-medium '>{products.name}</p>
            <p className='px-2 font-bold'>{products.price}</p>
            <div className="button px-5 ms-2">
              <button 
              className='rounded-circle px-2  bg-emerald-700 text-white'
            //  onClick={() => Decrease(products.id)}
              >
                <b>-</b></button>
              <button className='px-2'><b>{products.quantity}</b></button>
              <button 
              className='rounded-circle px-2 bg-emerald-700 text-white' 
              // onClick={() => Increase(products.id)}
              ><b>+</b></button>
            </div>
            <button 
            className='rounded-circle px-2 w-6 h-6 bg-red-700 text-white' 
            // onClick={()=>dispatch({type: "Remove", id: products.id})}
            >X</button>
        </div>
    </div>
  )
}

export default CartProduct