import React from 'react'
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom"
//componenets:
import Header from './components/Header'
import Display from './components/Display'
import Footer from './components/Footer'
import Upload from './components/Upload'
import Home from './components/Home'
//modules:
import { parse } from './modules/dataParse'
import store from './store.js'





//const data = store.getState().data

//const parsedData = parse(data)
//console.log(parsedData)


const App = () => {

 


  return (
      <Router >
        <div className="flex flex-col w-screen h-screen">
          <div className="flex-none">
            <Header />
          </div>
        
          <div className="flex h-full place-content-center">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/upload" element={<Upload />}/>
            <Route path="/data" element={<Display />}/>           
          </Routes>
          </div>
        
          <div className="flex-none">
           <Footer />
          </div>
        </div>
      </Router>
  )
}



export default App

