import { Link } from "react-router-dom"
import React from 'react'
import store from '../store'
import { uploadData } from '../reducers/dataReducer'

const Header = () => {

  const handleClear = () => {
    store.dispatch(uploadData(null))
    console.log(store.getState().data)

  }
  
  return (
    <div className="max-w-10xl mx-auto px-0">
      <div className="border-b-2 border-fill divide-slate-800 py-3 px-10 bg-white items-center flex justify-between content-center ">
          <Link to="/mirrr/" onClick={handleClear} className="text-2xl font-bold font-sans text-text">mirr'r</Link> 
      </div>
    </div>
  )

  
}



export default Header