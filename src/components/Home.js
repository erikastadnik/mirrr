import { useNavigate } from "react-router-dom"
import Chart from './Chart'
import Button from './Button'

const Home = () => {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/upload')
  }

  return (
      <div className="p-24 flex flex-col justify-center items-center">        
          <Button className="" onClick={handleClick} text="Visualize my data"/>          
      </div>
      
  )

}

export default Home