import React, { useState, useContext } from 'react'
import './EditOrder.css'
import { shopFloorContext } from '../../Context/ShopFloorContext'

const EditOrder = () => {

    const { setIsFunctionExecuted } = useContext(shopFloorContext);

    const [itemToBeEdited, setItemToBeEdited] = useState({
        order_id: '',
        order_unit: '',
        quantity: '',
        po_number: '',
        customer_name: ''
    });

    const changeHandler = (e) => {
        setItemToBeEdited({
            ...itemToBeEdited, [e.target.name]: e.target.value
        })
    }

    const findItem = async () => {
        await fetch('https://shopfloorcontrolbackend.onrender.com/findorder', {
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
                alert("OrderId doesn't exist")
                setItemToBeEdited({
                    order_id: '',
                    order_unit: '',
                    quantity: '',
                    po_number: '',
                    customer_name: ''
                })
            }
        })
    }

    const editItem = async () => {
        await fetch('https://shopfloorcontrolbackend.onrender.com/editorder', {
            method: 'POST',
            headers: {
                Accept: "application.json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemToBeEdited)
        }).then((resp) => resp.json()).then((data) => {

            if (data.success) {
                alert("Order details updated")
            }
        })
        setItemToBeEdited({
            order_id: '',
            order_unit: '',
            quantity: '',
            po_number: '',
            customer_name: ''
        })
        setIsFunctionExecuted(true);

    }

    const removeItem = async () => {
        await fetch('https://shopfloorcontrolbackend.onrender.com/removeorder', {
            method: 'POST',
            headers: {
                Accept: "application.json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemToBeEdited)
        }).then((resp) => resp.json()).then((data) => {

            if (data.success) {
                alert("Order part details removed")
            }
        })
        setItemToBeEdited({
            order_id: '',
            order_unit: '',
            quantity: '',
            po_number: '',
            customer_name: ''
        })
        setIsFunctionExecuted(true);
    }


    return (
        <div className='edit-order'>
            <div className='edit-order-itemfield'>
                <p>Order Id</p>
                <input value={itemToBeEdited.order_id} onChange={changeHandler} type="text" name='order_id' placeholder='Type here' />
                <button onClick={findItem} className='edit-order-btn'>Find</button>
            </div>
            <div className='edit-order-details'>
                <div className='edit-order-itemfield'>
                    <p>Order Id</p>
                    <input readOnly={true} value={itemToBeEdited.order_id} type='text' name='order_id' placeholder='Type here' />
                </div>
                <div className='edit-order-itemfield'>
                    <p>Order name</p>
                    <input readOnly={true} value={itemToBeEdited.order_unit} type='text' name='order_unit' placeholder='Type here' />
                </div>
                <div className='edit-order-itemfield'>
                    <p>Po number</p>
                    <input value={itemToBeEdited.po_number} onChange={changeHandler} type='text' name='po_number' placeholder='Type here' />
                </div>
                <div className='edit-order-itemfield'>
                    <p>Customer name</p>
                    <input value={itemToBeEdited.customer_name} onChange={changeHandler} type='text' name='customer_name' placeholder='Type here' />
                </div>

            </div>

            <button onClick={editItem} className='edit-order-btn'>Apply Changes</button>
            <button onClick={removeItem} className='edit-order-btn'>Remove this Item</button>
        </div>
    )
}

export default EditOrder