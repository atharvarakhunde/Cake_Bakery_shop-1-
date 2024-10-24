// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import "./Add.css"
import {assets} from "../../assets/admin_assets/assets.js"
import axios from "axios"
import { toast } from 'react-toastify'

const Add = () => {

  const url= "https://cake-bakery-shop-1-backend.onrender.com";
  const [image,setImage] = useState(false);
  const [data,setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"Butter Cake"  

  })

  const onChangeHandler = (event)=>{
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value  }))
  }

  const onSubmitHandler = async (event)=>{
    event.preventDefault();
    const formData = new FormData();
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("price",Number(data.price))
    formData.append("category",data.category)
    formData.append("image",image)

    const response = await  axios.post(`${url}/api/food/add`,formData);
    if(response.data.success){
      setData({
        name:"",
        description:"",
        price:"",
        category:"Butter Cake"  
    
      });
      setImage(false);
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
    }
  }


  return (
    <div className='add' >
      <form className='flex-coloumn'  onSubmit={onSubmitHandler} action="">
        <div className="add-img-upload flex-coloumn">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image? URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])}  type="file" id='image' hidden required />
        </div>
        <div className="add-product-name flex-coloumn">
          <p>Product Name</p>
          <input onChange={onChangeHandler}  value={data.name} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add-product-descrption flex-coloumn">
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write Content Here'></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-coloumn">
            <p>Product Category</p>
            <select onChange={onChangeHandler} value={data.category} name="category" >
              <option value="Butter Cake">Butter Cake</option>
              <option value="Layered Cake">Layered Cake</option>
              <option value="Fruit Cake">Fruit Cake</option>
              <option value="Cheese Cake">Cheese Cake</option>
              <option value="Cup Cake">Cup Cake</option>
              <option value="Theme Cake">Theme Cake</option>
              <option value="Donut">Donut</option>
              <option value="Pastries">Pastries</option>
            </select>
          </div>
          <div className="add-price flex-coloumn">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='₹20' />
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>

      </form>

    </div>
  )
}

export default Add
