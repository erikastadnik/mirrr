import { useNavigate } from "react-router-dom"
import Chart from './Chart'
import Button from './Button'
import background from '../assets/Video1.mp4'

const Home = () => {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/upload')
  }

  return (
      <div className="flex flex-col justify-center items-center"> 
         <video className="p-5 object-cover w-full h-full blur-sm" src={background} autoPlay loop muted />     
          <div className="absolute drop-shadow-2xl">
              <Button onClick={handleClick} text="Visualize my data"/>
          </div>          
      </div>    
  )

}

export default Home