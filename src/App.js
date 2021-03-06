import React, {useState} from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, HashRouter
} from "react-router-dom"
//componenets:
import Header from './components/Header'
import Display from './components/Display'
import Footer from './components/Footer'
import Upload from './components/Upload'
import Home from './components/Home'
import NoData from './components/NoData'
//modules:
import { parse } from './modules/dataParse'
import store from './store.js'






//const data = store.getState().data

//const parsedData = parse(data)
//console.log(parsedData)


const App = () => {

  


  return (
      <HashRouter >
        <div className="flex flex-col w-screen h-screen">
          <div className="flex-none">
            <Header />
          </div>
          
          <div className="flex h-full place-content-center">
          <Routes>
            <Route path="mirrr/" element={<Home />}/>
            <Route path="mirrr/upload" element={<Upload />}/>
            
            <Route path="mirrr/data" element={<Display />}/> 
            <Route path="*" element={<NoData />} />
                                
          </Routes>
          </div>
          
        
          <div className="fixed inset-x-0 bottom-0">
           <Footer />
          </div>
        </div>
      </HashRouter>
  )
}



export default App

