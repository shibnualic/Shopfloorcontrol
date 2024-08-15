import React, { useContext, useState } from 'react'
import { shopFloorContext } from '../../Context/ShopFloorContext'
import './ViewBop.css'
import ProductViewBop from '../ProductViewBop/ProductViewBop'

const ViewBop = () => {

    const { allProduct } = useContext(shopFloorContext);

    const [product, setProduct] = useState("");


    return (
        <div className='view-bop'>

            <div className='view-bop-itemfield'>
                <p>product name</p>
                <select value={product.product_name} onChange={(e) => { e.target.value ? setProduct(allProduct.find(item => item.product_name === e.target.value)) : setProduct('') }} name='productName' className=''>
                    <option value="">Select a product</option>
                    {allProduct.map((product, index) => (
                        <option key={index} value={product.product_name}>
                            {product.product_name}
                        </option>
                    ))}
                </select>
            </div>

            <ProductViewBop productBop={product ? product : {
                bop: [{
                    program_id: "",
                    program_name: "",
                }]
            }} />

        </div>
    )
}

export default ViewBop