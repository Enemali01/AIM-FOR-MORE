import React, { useEffect, useState } from 'react'
import classes from './search.module.css'

export default function Search() {
  const [term, setTerm] = useState('');
  

  const search =  async () => {
  }
  return (
    <>
    <div className={classes.container}>
      
    <input type='text' 
    placeholder='Search for Products' 
    onChange={e => setTerm(e.target.value)} 
    onKeyUp ={e => e.key === 'Enter' && search()}
    value={term}
    />
    <button onClick={search}>Search</button>
  </div>

    </>
  )
}
