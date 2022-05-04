import React from 'react'
import { useNavigate } from "react-router-dom"
import store from '../store'
import { uploadData } from '../reducers/dataReducer'
import Chart from './Chart'
import { parse } from '../modules/dataParse'
import Button from './Button'



const Display = () => {
 
  const data = store.getState().data

  const navigate = useNavigate()

  const handleClear = () => {
    store.dispatch(uploadData(null))
    navigate('/')
  }

  const handleUpload = () => {
      navigate('/upload')
  }

  if (data) {

    const parsedData = parse(data)

    return(
      <div className="flex w-full">
        <div className="flex basis-4/5 p-6 bg-white"> 
          <Chart />
        </div>
        <div className="flex flex-col justify-between basis-1/5 p-6">
          <div className="h-96 text-light_text hover:text-text text-xs w-full overflow-hidden hover:overflow-auto font-mono ">
            {parsedData.map(x => <p key={parsedData.indexOf(x)}>{x[0]}: {x[1]}</p>)}
          </div>
          <div className="">
             <Button onClick={handleClear} text="Clear"/>
          </div>
        </div>
      </div>
    )
  } else {
    console.log("no data")
    return (
      <div className="p-24 h-full flex flex-col justify-around items-center">
        <p className="text-light_text font-sans text-sm font-semibold">No data</p>
             <Button onClick={handleUpload} text="Upload again"/>
      </div>
    )
  }
  
}


export default Display