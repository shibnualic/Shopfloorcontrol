import React, { useState, useContext } from 'react'
import './EditProduct.css'
import { shopFloorContext } from '../../Context/ShopFloorContext'

const EditProduct = () => {

    const { setIsFunctionExecuted } = useContext(shopFloorContext);

    const [itemToBeEdited, setItemToBeEdited] = useState({
        product_id_name: '',
        product_id: '',
        product_name: '',
        category: '',
        version: '',
    });

    const changeHandler = (e) => {
        setItemToBeEdited({
            ...itemToBeEdited, [e.target.name]: e.target.value
        })
    }

    const findItem = async () => {
        await fetch('http://localhost:4000/findproduct', {
            method: 'POST',
            headers: {
                Accept: "application.json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemToBeEdited)
        }).then((resp) => resp.json()).then((data) => {

            if (data.success) {
                setItemToBeEdited(data.item)
            } else {
                alert("product part doesn't exist")
                setItemToBeEdited({
                    product_id_name: '',
                    product_id: '',
                    product_name: '',
                    category: '',
                    version: '',
                })
            }
        })
    }

    const editItem = async () => {
        await fetch('http://localhost:4000/editproduct', {
            method: 'POST',
            headers: {
                Accept: "application.json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemToBeEdited)
        }).then((resp) => resp.json()).then((data) => {

            if (data.success) {
                alert("product part details updated")
            }
        })
        setItemToBeEdited({
            product_id_name: '',
            product_id: '',
            product_name: '',
            category: '',
            version: '',
        })
        setIsFunctionExecuted(true);

    }

    const removeItem = async () => {
        await fetch('http://localhost:4000/removeproduct', {
            method: 'POST',
            headers: {
                Accept: "application.json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemToBeEdited)
        }).then((resp) => resp.json()).then((data) => {

            if (data.success) {
                alert("product part details removed")
            }
        })
        setItemToBeEdited({
            product_id_name: '',
            product_id: '',
            product_name: '',
            category: '',
            version: '',
        })
        setIsFunctionExecuted(true);
    }


    return (
        <div className='edit-product'>
            <div className='edit-product-itemfield'>
                <p>ProductID or Productname</p>
                <input value={itemToBeEdited.product_id_name} onChange={changeHandler} type="text" name='product_id_name' placeholder='Type here' />
                <button onClick={findItem} className='edit-product-btn'>Find</button>
            </div>
            <div className='edit-product-details'>
                <div className='edit-product-itemfield'>
                    <p>ItemID</p>
                    <input readOnly={true} value={itemToBeEdited.product_id} type='text' name='product_id' placeholder='Type here' />
                </div>
                <div className='edit-product-itemfield'>
                    <p>Item name</p>
                    <input readOnly={true} value={itemToBeEdited.product_name} type='text' name='product_name' placeholder='Type here' />
                </div>
                <div className='edit-product-itemfield'>
                    <p>Category</p>
                    <input value={itemToBeEdited.category} onChange={changeHandler} type='text' name='category' placeholder='Type here' />
                </div>
                <div className='edit-product-itemfield'>
                    <p>Prefered Vendor</p>
                    <input value={itemToBeEdited.version} onChange={changeHandler} type='text' name='version' placeholder='Type here' />
                </div>

            </div>

            <button onClick={editItem} className='edit-product-btn'>Apply Changes</button>
            <button onClick={removeItem} className='edit-product-btn'>Remove this Item</button>
        </div>
    )
}

export default EditProduct