import React, { useState, useContext } from 'react'
import './AddOrder.css'
import { shopFloorContext } from '../../Context/ShopFloorContext'


const AddOrder = () => {

    const { allProduct, setIsFunctionExecuted } = useContext(shopFloorContext);

    const [orderDetails, setOrderDetails] = useState({
        order_unit: '',
        quantity: '',
        po_number: '',
        customer_name: '',
    })



    const changeHandler = (e) => {
        setOrderDetails({
            ...orderDetails, [e.target.name]: e.target.value
        })
    }

    const addOrder = async () => {

        await fetch('https://shopfloorcontrolbackend.onrender.com/addorder', {
            method: 'POST',
            headers: {
                Accept: "application.json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDetails)
        }).then((resp) => resp.json()).then((data) => {
            if (data.success) {
                alert("Order added")
            } else {
                alert("failed")
            }
        })
        setOrderDetails({
            order_unit: '',
            quantity: '',
            po_number: '',
            customer_name: ''
        })
        setIsFunctionExecuted(true)

    }


    return (
        <div className='addorder'>

            <div className='addorder-itemfield'>
                <p>Product</p>
                <select value={orderDetails.order_unit} onChange={changeHandler} name='order_unit' className=''>
                    <option value="">Select a product</option>
                    {allProduct.map((product, index) => (
                        <option key={index} value={product.product_name}>
                            {product.product_name}
                        </option>
                    ))}
                </select>
            </div>
            <div className='addorder-itemfield'>
                <p>Quantity</p>
                <input value={orderDetails.quantity} onChange={changeHandler} type='text' name='quantity' placeholder='Type here' />
            </div>
            <div className='addorder-itemfield'>
                <p>PO Number</p>
                <input value={orderDetails.po_number} onChange={changeHandler} type='text' name='po_number' placeholder='Type here' />
            </div>
            <div className='addorder-itemfield'>
                <p>Customer Name</p>
                <input value={orderDetails.customer_name} onChange={changeHandler} type='text' name='customer_name' placeholder='Type here' />
            </div>

            <button onClick={addOrder} className='addorder-btn'>ADD</button>
        </div>
    )

}
export default AddOrder