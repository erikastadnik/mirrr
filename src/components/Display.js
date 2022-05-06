import React, {useState} from 'react'
import { useNavigate, Navigate} from "react-router-dom"
import store from '../store'
import { uploadData } from '../reducers/dataReducer'
import Chart from './Chart'
import { parse } from '../modules/dataParse'
import Button from './Button'
//import axios from 'axios'




const Display = () => {
 

  
  const [data, setData] = useState(store.getState().data)

  const navigate = useNavigate()

  const handleClear = () => {
    store.dispatch(uploadData(null))
    navigate('/mirrr')

  }

  // axios
  //     .get(store.getState().data)
  //     .then(response => {
  //       console.log(response)
  //     })

  

  console.log(data)

  

  

  if (data) {

    const parsedData = parse(data)
    return(
      <div className="flex w-full">
        <div className="flex basis-5/6 "> 
          <Chart />
        </div>
        <div className="flex flex-col justify-between basis-1/6 p-6">
          <div className="h-96 text-light_text hover:text-text text-xs w-full overflow-hidden hover:overflow-auto font-mono ">
            {parsedData.map(x => <p key={parsedData.indexOf(x)}>{x[0]}: {x[1]}</p>)}
          </div>
          <div className="p-20">
             <Button onClick={handleClear} text="Clear"/>
          </div>
        </div>
      </div>
    )
  } else {
    return <Navigate to="/mirrr/nodata"/>
  }

   
  
}


export default Display