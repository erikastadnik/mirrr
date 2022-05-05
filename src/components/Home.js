import { useNavigate } from "react-router-dom"
import Chart from './Chart'
import Button from './Button'
import HomeBubbles from './HomeBubbles'

const Home = () => {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/upload')
  }

   

  return (
      <div className="flex flex-col justify-center items-center"> 
             <HomeBubbles/>
          <div className="absolute drop-shadow-2xl">
              <Button onClick={handleClick} text="Visualize my search history"/>
          </div>          
      </div>  
    
      
  )

}

export default Home