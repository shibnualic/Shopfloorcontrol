import React, { useState, useContext } from 'react'
import './EditInventory.css'
import { shopFloorContext } from '../../Context/ShopFloorContext'

const EditInventory = () => {

    const { setIsFunctionExecuted } = useContext(shopFloorContext);

    const [itemToBeEdited, setItemToBeEdited] = useState({
        item_id_name: '',
        item_id: '',
        item_name: '',
        category: '',
        prefered_vendor: '',
        stock: '',
        price: '',
    });

    const changeHandler = (e) => {
        setItemToBeEdited({
            ...itemToBeEdited, [e.target.name]: e.target.value
        })
    }

    const findItem = async () => {
        await fetch('http://localhost:4000/findinventory', {
            method: 'POST',
            headers: {
                Accept: "application.json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemToBeEdited)
        }).then((resp) => resp.json()).then((data) => {

            if (data.success) {
                console.log(data.item)
                setItemToBeEdited(data.item)
            } else {
                alert("inventory part doesn't exist")
                setItemToBeEdited({
                    item_id_name: '',
                    item_id: '',
                    item_name: '',
                    category: '',
                    prefered_vendor: '',
                    stock: '',
                    price: '',
                })
            }
        })
    }

    const editItem = async () => {
        await fetch('http://localhost:4000/editinventory', {
            method: 'POST',
            headers: {
                Accept: "application.json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemToBeEdited)
        }).then((resp) => resp.json()).then((data) => {

            if (data.success) {
                alert("Inventory part details updated")
            }
        })
        setItemToBeEdited({
            item_id_name: '',
            item_id: '',
            item_name: '',
            category: '',
            prefered_vendor: '',
            stock: '',
            price: '',
        })
        setIsFunctionExecuted(true);

    }

    const removeItem = async () => {
        await fetch('http://localhost:4000/removeinventory', {
            method: 'POST',
            headers: {
                Accept: "application.json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemToBeEdited)
        }).then((resp) => resp.json()).then((data) => {

            if (data.success) {
                alert("Inventory part details removed")
            }
        })
        setItemToBeEdited({
            item_id_name: '',
            item_id: '',
            item_name: '',
            category: '',
            prefered_vendor: '',
            stock: '',
            price: '',
        })
        setIsFunctionExecuted(true);
    }


    return (
        <div className='edit-inventory'>
            <div className='edit-inventory-itemfield'>
                <p>ItemID or Itemname</p>
                <input value={itemToBeEdited.item_id_name} onChange={changeHandler} type="text" name='item_id_name' placeholder='Type here' />
                <button onClick={findItem} className='edit-inventory-btn'>Find</button>
            </div>
            <div className='edit-inventory-details'>
                <div className='edit-inventory-itemfield'>
                    <p>ItemID</p>
                    <input readOnly={true} value={itemToBeEdited.item_id} type='text' name='item_id' placeholder='Type here' />
                </div>
                <div className='edit-inventory-itemfield'>
                    <p>Item name</p>
                    <input readOnly={true} value={itemToBeEdited.item_name} type='text' name='item_name' placeholder='Type here' />
                </div>
                <div className='edit-inventory-itemfield'>
                    <p>Category</p>
                    <input value={itemToBeEdited.category} onChange={changeHandler} type='text' name='category' placeholder='Type here' />
                </div>
                <div className='edit-inventory-itemfield'>
                    <p>Prefered Vendor</p>
                    <input value={itemToBeEdited.prefered_vendor} onChange={changeHandler} type='text' name='prefered_vendor' placeholder='Type here' />
                </div>
                <div className='edit-inventory-itemfield'>
                    <p>Stock</p>
                    <input value={itemToBeEdited.stock} onChange={changeHandler} type='text' name='stock' placeholder='Type here' />
                </div>
                <div className='edit-inventory-itemfield'>
                    <p>Price</p>
                    <input value={itemToBeEdited.price} onChange={changeHandler} type='text' name='price' placeholder='Type here' />
                </div>

            </div>


            <button onClick={editItem} className='edit-inventory-btn'>Apply Changes</button>
            <button onClick={removeItem} className='edit-inventory-btn'>Remove this Item</button>
        </div>
    )
}

export default EditInventory