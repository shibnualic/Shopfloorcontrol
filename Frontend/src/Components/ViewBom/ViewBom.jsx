import React, { useContext, useState } from 'react'
import './ViewBom.css'
import ProductViewBom from '../ProductViewBom/ProductViewBom'
import { shopFloorContext } from '../../Context/ShopFloorContext'

const ViewBom = () => {
    const { allProduct } = useContext(shopFloorContext);

    const [product, setProduct] = useState("");
    const [productIdName, setProductIdName] = useState("");

    const changeHandler = (e) => {
        setProductIdName(e.target.value);
    }

    const findProduct = () => {
        const productToView = allProduct.find(item => item.product_id === productIdName || item.product_name === productIdName);
        if (productToView) {
            setProduct(productToView)
        } else {
            alert("product doesn't exist")
        }



    }


    return (
        <div className='view-bom'>
            <div className='view-bom-itemfield'>
                <p>ItemID or Itemname</p>
                <input value={productIdName} onChange={changeHandler} type="text" name='productIdName' placeholder='Type here' />
                <button onClick={findProduct} className='view-bom-btn'>Find</button>
            </div>
            <ProductViewBom productBom={product ? product : { bom: [] }} />

        </div>
    )
}

export default ViewBom