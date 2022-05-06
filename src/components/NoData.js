import { useNavigate } from "react-router-dom"
import Button from './Button'





const NoData = ({hasData}) => {


  const navigate = useNavigate()
  

  const handleUpload = () => {
    navigate('/mirrr/upload')
  }


  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-light_text font-mono text-sm p-20">no data</p>
      <Button onClick={handleUpload} text="Upload again"/>
    </div>
  )
}

export default NoData