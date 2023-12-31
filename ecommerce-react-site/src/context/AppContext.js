import { useState, createContext, useEffect } from "react";
import { loadProducts } from "../services/api";

// {
//     1: [0, ""],
//     2: [0, ""]
// }

const AppContext = createContext();

const response = loadProducts("").then(data => {
    return data;
}); 
const products = await response;

const getDefaultCart = async () => {
    let cart = {};
    for (let i = 1; i < products.length + 1; i++ ) {
        cart[i] = [0, ""]; 
    }
    return cart;
};

const AppContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [finalOrder, setFinalOrder] = useState(getDefaultCart());

    useEffect(() => {
        getDefaultCart()
            .then(data => setCartItems(data))

        getDefaultCart()
            .then(data => setFinalOrder(data))
    }, [])

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item][0] > 0) {
                let itemInfo = products.find((product) => product.id == Number(item));
                totalAmount += cartItems[item][0] * itemInfo.price;
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const item in cartItems) {
            totalItems += cartItems[item][0];
        }
        return totalItems;
    };

    const addToCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: [ prev[itemId][0] + 1, prev[itemId][1] ]}))
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: [ prev[itemId][0] - 1, prev[itemId][1] ]}))
    };

    const updateCartAmount = (itemId, newAmount, newSize) => {
        setCartItems((prev) => ({...prev, [itemId]: [newAmount, newSize]}))
    };

    const clearCart = async () => {
        setCartItems( await getDefaultCart());
    }

    const contextValue = {cartItems, addToCart, removeFromCart, updateCartAmount, getTotalCartAmount, getTotalCartItems, clearCart, finalOrder, setFinalOrder}

    // console.log(cartItems);
    return <AppContext.Provider value={contextValue}>{props.children}</AppContext.Provider>
};

export { AppContext, AppContextProvider};