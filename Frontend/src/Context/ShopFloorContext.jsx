import React, { createContext, useState, useEffect } from "react";


export const shopFloorContext = createContext();



const ShopContextProvider = (props) => {

    const [inventory_items, setInventory_item] = useState([]);
    const [allProgram, setAllProgram] = useState([]);
    const [allProduct, setAllProduct] = useState([]);
    const [allOrder, setAllOrder] = useState([]);
    const [isFunctionExecuted, setIsFunctionExecuted] = useState(false);

    useEffect(() => {
        fetch('https://shopfloorcontrolbackend.onrender.com/allinventory', {
            method: 'GET'
        }).then((response) => response.json()).then((data) => {
            setInventory_item(data);
        })
        fetch('https://shopfloorcontrolbackend.onrender.com/allprogram', {
            method: 'GET'
        }).then((response) => response.json()).then((data) => {
            setAllProgram(data);
        })
        fetch('https://shopfloorcontrolbackend.onrender.com/allproduct', {
            method: 'GET'
        }).then((response) => response.json()).then((data) => {
            setAllProduct(data);
        })
        fetch('https://shopfloorcontrolbackend.onrender.com/allorder', {
            method: 'GET'
        }).then((response) => response.json()).then((data) => {
            setAllOrder(data);
        })
        setIsFunctionExecuted(false);

    }, [isFunctionExecuted]);


    const contextValue = { inventory_items, allProgram, allProduct, allOrder, setIsFunctionExecuted };


    return (<shopFloorContext.Provider value={contextValue}>
        {props.children}

    </shopFloorContext.Provider>);
};

export default ShopContextProvider;