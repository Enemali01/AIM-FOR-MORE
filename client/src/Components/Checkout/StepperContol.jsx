

const StepperContoler = () => {
  return (
    <div className='container flex justify-around mt-4 mb-8'>
      <button className='bg-emerald-700 text-white uppercase py-2 px-4 rounded font-semibold cursor-pointer  hover:bg-emerald-700 hover:text-emerald transistion-200 ease-in-out'
      onClick={()=> {
        setPage((currentPage)=> currentPage +1)}}
      >
        Back
      </button>  
      <button className='bg-emerald-700 text-white uppercase py-2 px-4 rounded font-semibold cursor-pointer border-2 border-emerald-700 hover:bg-emerald-700 hover:text-emerald transistion-200 ease-in-out'>
        Next
      </button>
    </div>
  )
}

export default StepperContoler