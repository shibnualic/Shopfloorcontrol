import React, { useState } from 'react'
import './AddProduct.css'


const AddProduct = () => {

    const [productDetails, setProductDetails] = useState({
        product_name: "",
        category: "",
        version: ""
    })



    const changeHandler = (e) => {
        setProductDetails({
            ...productDetails, [e.target.name]: e.target.value
        })
    }

    const addproduct = async () => {

        await fetch('http://localhost:4000/addproduct', {
            method: 'POST',
            headers: {
                Accept: "application.json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productDetails)
        }).then((resp) => resp.json()).then((data) => {
            if (data.success) {
                alert("product added")
            } else {
                alert("failed")
            }
        })
        setProductDetails({
            product_name: "",
            category: "",
            version: ""
        })
    }


    return (
        <div className='addproduct'>

            <div className='addproduct-itemfield'>
                <p>Product Name</p>
                <input value={productDetails.product_name} onChange={changeHandler} type="text" name='product_name' placeholder='Type here' />
            </div>
            <div className='addproduct-itemfield'>
                <p>Category</p>
                <input value={productDetails.category} onChange={changeHandler} type='text' name='category' placeholder='Type here' />
            </div>
            <div className='addproduct-itemfield'>
                <p>Version</p>
                <input value={productDetails.version} onChange={changeHandler} type='text' name='version' placeholder='Type here' />
            </div>

            <button onClick={addproduct} className='addproduct-btn'>ADD</button>
        </div>
    )

}
export default AddProduct