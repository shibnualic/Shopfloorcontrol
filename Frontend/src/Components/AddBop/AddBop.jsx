import React, { useContext, useState } from 'react'
import ProductBop from '../ProductBop/ProductBop'
import { shopFloorContext } from '../../Context/ShopFloorContext'
import './AddBop.css'

const AddBop = () => {

    const { allProgram, allProduct, setIsFunctionExecuted } = useContext(shopFloorContext);

    const [productToAddBop, setProductToAddBop] = useState("");

    const [programToAdd, setProgramToAdd] = useState("");


    const [error, setError] = useState('');

    async function addToBop(e) {

        if (!programToAdd || !productToAddBop) {
            setError('Please fill in all fields.');
        } else {
            setError('');
            const bopPartToAdd = {
                program_id: programToAdd.program_id,
                program_name: programToAdd.program_name,
            }
            const index = productToAddBop.bop.findIndex(item => item.program_name === programToAdd.program_name);

            if (index !== -1) {
                alert("program already exist in BOP");
            } else {
                productToAddBop.bop.push(bopPartToAdd);
                await fetch('http://localhost:4000/editbop', {
                    method: 'POST',
                    headers: {
                        Accept: "application.json",
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(productToAddBop)
                }).then((resp) => resp.json()).then((data) => {
                    if (data.success) {
                        alert("Bop part added")
                    } else {
                        alert("failed")
                    }
                })
            }
            setIsFunctionExecuted(true);

        }
    };

    const removeFromBop = async (id) => {

        productToAddBop.bop = productToAddBop.bop.filter(item => item.program_id !== id);

        await fetch('http://localhost:4000/editBop', {
            method: 'POST',
            headers: {
                Accept: "application.json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productToAddBop)
        }).then((resp) => resp.json()).then((data) => {
            if (data.success) {
                alert("item removed from Bop")
            } else {
                alert("failed")
            }
        })

        setIsFunctionExecuted(true);
    }





    return (
        <div className='add-bop'>

            <div className='add-bop-itemfield'>
                <p>product name</p>
                <select value={productToAddBop.product_name} onChange={(e) => { e.target.value ? setProductToAddBop(allProduct.find(item => item.product_name === e.target.value)) : setProductToAddBop('') }} name='productName' className=''>
                    <option value="">Select a product</option>
                    {allProduct.map((product, index) => (
                        <option key={index} value={product.product_name}>
                            {product.product_name}
                        </option>
                    ))}
                </select>
            </div>

            <div className='add-bop-itemfield'>
                <p>Inventory Part to Add</p>
                <select value={programToAdd.program_name} onChange={(e) => { e.target.value ? setProgramToAdd(allProgram.find(item => item.program_name === e.target.value)) : setProgramToAdd('') }} name='program_name' >
                    <option value="" >Select a part to add</option>
                    {allProgram.map((part, index) => (
                        <option key={index} value={part.program_name}>
                            {part.program_name}
                        </option>
                    ))}
                </select>
                <button onClick={addToBop} className='add-bop-btn'>Add to Bop</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ProductBop handleRemove={removeFromBop} productBop={productToAddBop ? productToAddBop : {
                bop: [{
                    program_id: "",
                    program_name: "",
                }]
            }} />

        </div>
    )
}

export default AddBop