import React, { useState, useContext } from 'react'
import './AddNewInventoryPart.css'
import { shopFloorContext } from '../../Context/ShopFloorContext'


const AddNewInventoryPart = () => {

    const { inventory_items, setIsFunctionExecuted } = useContext(shopFloorContext);

    const [inventoryPartDetails, setInventoryPartDetails] = useState({
        item_name: '',
        category: '',
        prefered_vendor: '',
        stock: '',
        price: '',
    })



    const changeHandler = (e) => {
        setInventoryPartDetails({
            ...inventoryPartDetails, [e.target.name]: e.target.value
        })
    }

    const addInventoryPart = async () => {
        const index = inventory_items.findIndex(item => item.item_name === inventoryPartDetails.item_name);

        if (index !== -1) {
            alert("Inventory part already exist")
        } else {
            await fetch('https://shopfloorcontrolbackend.onrender.com/addinventory', {
                method: 'POST',
                headers: {
                    Accept: "application.json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inventoryPartDetails)
            }).then((resp) => resp.json()).then((data) => {
                if (data.success) {
                    alert("inventory part added")
                } else {
                    alert("failed")
                }
            })
            setInventoryPartDetails({
                item_name: '',
                category: '',
                prefered_vendor: '',
                stock: '',
                price: '',
            })
            setIsFunctionExecuted(true)

        }


    }


    return (
        <div className='addnewinventorypart'>

            <div className='addnewinventorypart-itemfield'>
                <p>Item name</p>
                <input value={inventoryPartDetails.item_name} onChange={changeHandler} type="text" name='item_name' placeholder='Type here' />
            </div>
            <div className='addnewinventorypart-itemfield'>
                <p>Category</p>
                <input value={inventoryPartDetails.category} onChange={changeHandler} type='text' name='category' placeholder='Type here' />
            </div>
            <div className='addnewinventorypart-itemfield'>
                <p>Prefered Vendor</p>
                <input value={inventoryPartDetails.prefered_vendor} onChange={changeHandler} type='text' name='prefered_vendor' placeholder='Type here' />
            </div>
            <div className='addnewinventorypart-itemfield'>
                <p>Stock</p>
                <input value={inventoryPartDetails.stock} onChange={changeHandler} type='text' name='stock' placeholder='Type here' />
            </div>
            <div className='addnewinventorypart-itemfield'>
                <p>Price</p>
                <input value={inventoryPartDetails.price} onChange={changeHandler} type='text' name='price' placeholder='Type here' />
            </div>

            <button onClick={addInventoryPart} className='addnewinventorypart-btn'>ADD</button>
        </div>
    )

}
export default AddNewInventoryPart