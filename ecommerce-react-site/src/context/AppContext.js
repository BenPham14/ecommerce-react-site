import { useState, createContext, useEffect } from "react";
import { loadProducts } from "../services/api";

const AppContext = createContext();

const getDefaultCart = async () => {
    const response = loadProducts("").then(data => {
        return data;
    }); 
    const products = await response;

    let cart = {};
    for (let i = 1; i < products.length + 1; i++ ) {
        cart[i] = 0; 
    }
    return cart;
};

const AppContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    useEffect(() => {
        getDefaultCart()
            .then(data => setCartItems(data))
    }, [])

    const addToCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1 }))
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1 }))
    };

    const updateCartAmount = (itemId, newAmount) => {
        setCartItems((prev) => ({...prev, [itemId]: newAmount}))
    };

    const contextValue = {cartItems, addToCart, removeFromCart, updateCartAmount}

    console.log(cartItems);
    return <AppContext.Provider value={contextValue}>{props.children}</AppContext.Provider>
};

export { AppContext, AppContextProvider};