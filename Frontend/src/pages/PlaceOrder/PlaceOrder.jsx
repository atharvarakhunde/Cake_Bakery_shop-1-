// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    // Prevent order if cart is empty
    if (getTotalCartAmount() === 0) {
      alert("Your cart is empty. Please add some items before proceeding.");
      return;
    }

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item }; // Avoid modifying the original object
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      let response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
      console.log(response)
      console.log(response.data.success);
      
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        console.error("Order placement failed:", response.data.error);
        alert("There was an issue placing your order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  const navigate = useNavigate();

  useEffect(()=>{
    if (!token) {
      navigate('/cart')
    }
    else if (getTotalCartAmount===0) {
      navigate('/cart')
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name="firstName" onChange={onChangehandler} value={data.firstName} placeholder="First Name" type="text" />
          <input required name="lastName" onChange={onChangehandler} value={data.lastName} placeholder="Last Name" type="text" />
        </div>
        <input required name="email" onChange={onChangehandler} value={data.email} placeholder="Email Address" type="email" />
        <input required name="street" onChange={onChangehandler} value={data.street} placeholder="Street" type="text" />
        <div className="multi-fields">
          <input required name="city" onChange={onChangehandler} value={data.city} placeholder="City" type="text" />
          <input required name="state" onChange={onChangehandler} value={data.state} placeholder="State" type="text" />
        </div>
        <div className="multi-fields">
          <input required name="zipcode" onChange={onChangehandler} value={data.zipcode} placeholder="Zip Code" type="text" />
          <input required name="country" onChange={onChangehandler} value={data.country} placeholder="Country" type="text" />
        </div>
        <input required name="phone" onChange={onChangehandler} value={data.phone} type="text" placeholder="Phone" />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="card-total-details">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <div className="card-total-details">
              <p>Delivery Fees</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="card-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
            </div>
          </div>
          <button type="submit" className="cart-btn">
            Proceed to payment
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
