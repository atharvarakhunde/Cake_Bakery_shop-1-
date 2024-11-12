// eslint-disable-next-line no-unused-vars
import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/frontend_assets/assets'
const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p className='better-expr'>for better Experience <br /> Fresh Bake</p>
        <div className="app-download-platform">
            {/* <img src={assets.play_store} alt="" /> */}
            <a href="Frontend\src\assets\FreshBake.apk" download>
              
            <img  src={assets.app_store}  alt="" />
          
</a>
            
        </div>

    </div>
  )
}

export default AppDownload
