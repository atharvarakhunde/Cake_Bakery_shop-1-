// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect } from 'react'
import "./Verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios'

const Verify = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    console.log("hii");
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    console.log(success,orderId);
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifypayment = async ()=>{
        const response = await axios.post(url+"/api/order/verify",{success,orderId});
        if (response.data.success) {
            navigate("/myorders");
        }else
        {
            navigate("/")
        }
    }

    useEffect(()=>{
        verifypayment();
    },[])
    

  return (
    <div className='verify'>
         <div className="combined-spinner">
            <div className="spinner"></div>
        </div>
      
    </div>
  )
}

export default Verify
