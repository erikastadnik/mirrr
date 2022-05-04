import { useNavigate } from "react-router-dom"
import { uploadData } from '../reducers/dataReducer'
import store from '../store'
import Button from './Button'
import addToChrome from '../assets/Instructions-01.png'
import dropDown from '../assets/Instructions-02.png'




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

  const ref = "https://chrome.google.com/webstore/detail/export-chrome-history/dihloblpkeiddiaojbagoecedbfpifdj?hl=en"

  const textSpacing = "py-2"

  return (
      <div className="w-full">
        <div className="flex">
          <p className="basis-1/2 text-xs text-text px-10 py-20">In order for mirr'r to visualize your data, you need to upload it here. It is extremely secure as no data that you upload ever leaves your browser and is removed upon refresh of the page. Your information won't be stored anywhere and you will be able to see the visualization only until you refresh the page. Only you can see the visualization.</p>
          <div className="basis-1/2"></div>
        </div>
        <div className="flex">
        <div className="basis-1/2 px-10 flex flex-col text-text">
            <div id="text">
                <p className="text-xl py-10">5 quick steps to get your data</p>
                <p className={textSpacing}>1. Go  <a href={ref} target="_blank" className="underline underline-offset-1 text-selection">here</a> to download a plug in for easy personal data access.</p>
                <p className={textSpacing}>2. Add the plug-in to your chrome browser.</p>
                <p className={textSpacing}>3. An icon will appear in the top right of you tab. Click on the icon.</p>
                <p className={textSpacing}>4. Choose how far back you want to see data from and click on "JSON" from the drop-down menu. Make sure to choose "JSON" as no other file will work.</p>
                <p className={textSpacing}>5. The file will immediately download. Upload it below.</p>
            </div>
            <form onSubmit={onSubmit} className="py-20 flex flex-col">
                <div>
                  <input onChange={onChange} type="file" accept=".json" className="block w-full text-sm text-text 
                  file:h-60 file:w-96 file:px-4 file:rounded-xl file:border-2 file:border-dashed file:border-selection file:text-sm file:font-semibold file:bg-white file:text-light_text hover:file:bg-fill"
                  />
                </div>
                <div className="py-10">
                  <Button onClick={onSubmit} text="Upload"/>
                </div>
            </form>
        </div>
          <div className="basis-1/2 flex flex-col">
            <img className="px-36" src={addToChrome} alt="Add to chrome" />
            <img className="px-36" src={dropDown} alt="Download the JSON file" />
          </div>
        </div>        
      </div>      
  )

}

export default Upload