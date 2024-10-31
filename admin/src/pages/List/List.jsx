// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import "./list.css"
import axios from "axios"
import { toast } from "react-toastify"

const List = () => {
  const url = "https://cake-bakery-shop-1-backend.onrender.com"
  const [list, setList] = useState([]);

  // Fetch list of food items
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        // Reverse the list array here
        setList(response.data.data.reverse());
      } else {
        toast.error("Error fetching food list");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error connecting to server");
    }
  }

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    if (response.data.success) {
      toast.success(response.data.message);
      await fetchList();
    } else {
      toast.error("Error");
    }
  }

  // useEffect to call fetchList on component mount
  useEffect(() => {
    fetchList();
  }, []); // Empty dependency array means it will run once after initial render

  return (
    <div className='list'>
      <p className='list-main-title'>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format titles">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/` + item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>
            <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List;
