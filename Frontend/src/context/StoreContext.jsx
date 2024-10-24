/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios"


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000"

    const [token,setToken] = useState("");

    const [food_list,setFoodList] = useState([])


    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));

        if (token) {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
        
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const newCount = (prev[itemId] || 1) - 1; // Default to 1 to prevent negative count
            if (newCount <= 0) {
                // eslint-disable-next-line no-unused-vars
                const { [itemId]: removedItem, ...rest } = prev; // Remove item from cart if count is 0
                return rest;
            }
            return { ...prev, [itemId]: newCount };
        });
        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
        }
    };

    const getTotalCartAmount = ( ) => {
        let totalAmount = 0;
        for( const item in cartItems ){
            if  (cartItems[item] > 0){
                let itemInfo = food_list.find((product)=>product._id === item);
                totalAmount += itemInfo.price* cartItems[item];

            }
        }
        return totalAmount;
            
    }

    const fetchFoodList = async ()=>{
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data)
    }

    const loadCartData = async (token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData);
    }

    useEffect( ()=>{
        async function loadData() {
            await fetchFoodList();
            console.log("foodlist display")
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
                
            }   
        } 

        loadData();
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
