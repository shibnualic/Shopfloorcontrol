import React, { createContext, useState, useEffect } from "react";


export const shopFloorContext = createContext();



const ShopContextProvider = (props) => {

    const [inventory_items, setInventory_item] = useState([]);
    const [allProgram, setAllProgram] = useState([]);
    const [allProduct, setAllProduct] = useState([]);
    const [allOrder, setAllOrder] = useState([]);
    const [isFunctionExecuted, setIsFunctionExecuted] = useState(false);

    useEffect(() => {
        fetch('http://localhost:4000/allinventory', {
            method: 'GET'
        }).then((response) => response.json()).then((data) => {
            setInventory_item(data);
        })
        fetch('http://localhost:4000/allprogram', {
            method: 'GET'
        }).then((response) => response.json()).then((data) => {
            setAllProgram(data);
        })
        fetch('http://localhost:4000/allproduct', {
            method: 'GET'
        }).then((response) => response.json()).then((data) => {
            setAllProduct(data);
        })
        fetch('http://localhost:4000/allorder', {
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