import { useNavigate } from "react-router-dom"
import { uploadData } from '../reducers/dataReducer'
import store from '../store'
import Button from './Button'
import {useState} from 'react'
import addToChrome from '../assets/Instructions-01.png'
import dropDown from '../assets/Instructions-02.png'
import pin from '../assets/Instructions-03.png'




const Upload = () => {

  console.log()

  const navigate = useNavigate() 

  const borderNoError = "block w-full text-sm text-text file:h-60 file:w-96 file:px-4 file:rounded-xl file:border-2 file:border-dashed file:border-selection file:text-sm file:font-semibold file:bg-white file:text-light_text hover:file:bg-fill"
  const borderError = "block w-full text-sm text-text file:h-60 file:w-96 file:px-4 file:rounded-xl file:border-10 file:border-dashed file:border-selection file:text-sm file:font-semibold file:bg-rose-100/50 file:text-light_text hover:file:bg-fill"
  const [border, setBorder] = useState(borderNoError)

  const onSubmit = (event) => {
    const hasData = store.getState().data
    event.preventDefault()
    if (hasData) {
      navigate('/mirrr/data')
    } else {
      console.log('error')
      setBorder(borderError)
      setTimeout(() => {
        setBorder(borderNoError)
      }, 5000)
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

  const textSpacing = "py-4"

  // <img className="w-36 p-10" src={addToChrome} alt="Add to chrome" />
  //             <img className="w-36 p-10" src={pin} alt="Add to chrome" />
  //             <img className="w-35 p-10" src={dropDown} alt="Download the JSON file" />

  return (
      <div className="flex w-full">

        <div className="basis-1/4"></div>

        <div className="basis-1/2 px-10 flex flex-col text-text">
            <div id="text">
                <p  className="basis-1/2 text-xs text-text py-10">For mirr'r to visualize your data, you need to upload it here. It is incredibly secure as no data you upload ever leaves your browser. Refreshing the page will entirely remove the data from the app. Mirr'r won't store your information anywhere. You will be able to see the visualization only until you refresh the page. Only you can see the visualization.</p>
                <p className="text-xl py-10">5 quick steps to get your data</p>
                <p className="py-2 text-sm">Note: this app only works with a Google Chrome browser.</p>
                <p className={textSpacing}>1. Go  <a href={ref} target="_blank" className="underline underline-offset-1 text-selection">here</a> to download a plug-in for easy personal data access.</p>
                <p className={textSpacing}>2. Add the plug-in to your Google Chrome browser.</p>
                <p className={textSpacing}>3. An icon will appear in the top right of your tab. Click on the icon. If you only see the puzzle icon, click on the puzzle and choose "Export Chrome History" from the drop-down menu.</p>
                <p className={textSpacing}>4. Choose how far back you want to see data from and click on "JSON" from the drop-down menu. Make sure to choose "JSON" as no other file will work.</p>
                <p className={textSpacing}>5. The file will immediately download. Once it has been downloaded, upload it below.</p>
            </div>
            <div className="flex w-full">
              
            </div>
            <form onSubmit={onSubmit} className="py-20 flex flex-col">
                <div>
                  <input onChange={onChange} type="file" accept=".json" className={border}
                  />
                </div>
                <div className="py-10 ">
                  <Button onClick={onSubmit} text="Upload"/>
                </div>
            </form>
        </div>

        <div className="basis-1/4"></div>
            
      </div>      
  )

}

export default Upload

