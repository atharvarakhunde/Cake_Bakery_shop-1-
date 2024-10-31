// eslint-disable-next-line no-unused-vars
import React from 'react'
import "./Orders.css"
import axios from 'axios'
import { useState, useEffect } from 'react'
import { toast } from "react-toastify"
import { assets } from '../../assets/admin_assets/assets'

const Orders = () => {
  const url = "https://cake-bakery-shop-1-backend.onrender.com";

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        // Reverse the order array to display in reverse order
        setOrders(response.data.data.reverse());
        console.log(response.data.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Error fetching data");
      console.error(error);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value
      });
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating status");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='Order'>
      <h3>Order Page</h3>
      <div className="orderlist">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className='order-items'>
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <div>
                <p>{order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "Date not available"}</p>
                <p className="order-item-food">
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name} x {item.quantity}{idx !== order.items.length - 1 && ", "}
                    </span>
                  ))}
                </p>
                <p className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                </div>
                <p className="order-item-phone">
                  {order.address.phone}
                </p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>${order.amount}</p>
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status} >
                <option className='status-info' value="Food Processing">Food Processing</option>
                <option className='status-info' value="Out for delivery">Out for delivery</option>
                <option className='status-info' value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        ) : (
          <p>No orders available</p>
        )}
      </div>
    </div>
  )
}

export default Orders;
