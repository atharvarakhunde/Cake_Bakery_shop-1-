// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/frontend_assets/assets';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const fetchOrders = async () => {
        setLoading(true);
        setError(null); // Reset error state before fetching
        try {
            const response = await axios.post(url + '/api/order/userorders', {}, { headers: { token } });
            // Reverse the data array here
            setData(response.data.data.reverse());
            console.log(response.data.data);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Failed to fetch orders. Please try again later.');
        } finally {
            setLoading(false); // Stop loading state
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    // Helper function to format items
    const formatItems = (items) => {
        return items.map((item, index) => 
            `${item.name} x${item.quantity}${index === items.length - 1 ? '' : ', '}`
        ).join('');
    };

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            {loading ? (
                <div className="loading">Loading orders...</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                <div className="container">
                    {data.map((order, index) => (
                        <div key={index} className="myorders-order">
                            <img src={assets.parcel_icon} alt="Order Icon" />
                            <p>{formatItems(order.items)}</p>
                            <p>${order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p>{order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "Date not available"}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Track order</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
