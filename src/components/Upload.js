import { useNavigate } from "react-router-dom"
import { uploadData } from '../reducers/dataReducer'
import store from '../store'
import Button from './Button'




const Upload = () => {

  console.log()

  const navigate = useNavigate() 

  const onSubmit = (event) => {
    const hasData = store.getState().data
    event.preventDefault()
    if (hasData) {
      navigate('/data')
    } else {
      console.log('error')
    }

  }

  const onChange = (event) => {
    const content = event.target.files[0]
    const fileReader = new FileReader()
    fileReader.readAsText(content)
    fileReader.onload = (e) => {
      const contents = e.target.result
      const obj = JSON.parse(contents)
      store.dispatch(uploadData(obj))
    }
  }

  

  return (
      <div className="h-full w-full flex">
        <div className="basis-1/2 p-10  flex flex-col justify-around text-text">
          <p className="text-xs">In order for mirr'r to visualize your data, you need to upload it here. It is extremely secure as no data that you upload ever leaves your browser and is removed upon refresh of the page. Your information won't be stored anywhere and you will be able to see the visualization only until you refresh the page. Only you can see the visualization.</p>
          <p className="text-xl">How to get your data</p>
          <div className="flex">
            <p>1. Go  </p>
            <a href="https://chrome.google.com/webstore/detail/export-chrome-history/dihloblpkeiddiaojbagoecedbfpifdj?hl=en" target="_blank" className="underline underline-offset-1 text-selection px-2">here</a>
            <p>to download a plug in for easy personal data access.</p>
          </div> 
            <p>2. Add the plug-in to your chrome browser.</p>
            <p>3. An icon will appear in the top right of you tab. Click on the icon.</p>
            <p>4. Choose how far back you want to see data from and click on "JSON" from the drop-down menu. Make sure to choose "JSON" as no other file will work.</p>
            <p>5. The file will immediately download. Upload it on the right.</p>
        </div>
        <form onSubmit={onSubmit} className="basis-1/2 h-full flex flex-col justify-around items-center">
          <div>
            <input onChange={onChange} type="file" accept=".json" className="block w-full text-sm text-text 
            file:h-60 file:w-96 file:px-4 file:rounded-xl file:border-2 file:border-dashed file:border-selection file:text-sm file:font-semibold file:bg-white file:text-light_text hover:file:bg-fill"
            />
          </div>
          <Button onClick={onSubmit} text="Upload"/>

        </form>
      </div>
  )

}

export default Upload