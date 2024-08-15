import React, { useContext, useState } from 'react'
import ProductBom from '../ProductBom/ProductBom'
import { shopFloorContext } from '../../Context/ShopFloorContext'
import './AddBom.css'

const AddBom = () => {

    const { inventory_items, allProduct, setIsFunctionExecuted } = useContext(shopFloorContext);

    const [productToAddBom, setProductToAddBom] = useState("");

    const [inventoryPartToAdd, setInventoryPartToAdd] = useState({ item_id: "" });

    const [quantity, setQuantity] = useState();

    const [error, setError] = useState('');

    async function addToBom(e) {

        if (!inventoryPartToAdd || !productToAddBom || !quantity) {
            setError('Please fill in all fields.');
        } else {
            setError('');
            const bomPartToAdd = {
                componentId: inventoryPartToAdd.item_id,
                componentName: inventoryPartToAdd.item_name,
                quantity: quantity
            }
            const index = productToAddBom.bom.findIndex(item => item.componentName === inventoryPartToAdd.item_name);

            // If the inventory part exists in the BOM array, update its quantity
            if (index !== -1) {
                productToAddBom.bom[index].quantity = quantity;
            } else {
                productToAddBom.bom.push(bomPartToAdd)
            }


            await fetch('https://shopfloorcontrolbackend.onrender.com/editbom', {
                method: 'POST',
                headers: {
                    Accept: "application.json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productToAddBom)
            }).then((resp) => resp.json()).then((data) => {
                if (data.success) {
                    alert("BOM part added")
                } else {
                    alert("failed")
                }
            })

            setIsFunctionExecuted(true);

        }
    };

    const removeFromBom = async (id) => {

        productToAddBom.bom = productToAddBom.bom.filter(item => item.componentId !== id);

        await fetch('https://shopfloorcontrolbackend.onrender.com/editbom', {
            method: 'POST',
            headers: {
                Accept: "application.json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productToAddBom)
        }).then((resp) => resp.json()).then((data) => {
            if (data.success) {
                alert("item removed from bom")
            } else {
                alert("failed")
            }
        })

        setIsFunctionExecuted(true);
    }





    return (
        <div className='add-bom'>

            <div className='add-bom-itemfield'>
                <p>product name</p>
                <select value={productToAddBom.product_name} onChange={(e) => { e.target.value ? setProductToAddBom(allProduct.find(item => item.product_name === e.target.value)) : setProductToAddBom('') }} name='productName' className=''>
                    <option value="">Select a product</option>
                    {allProduct.map((product, index) => (
                        <option key={index} value={product.product_name}>
                            {product.product_name}
                        </option>
                    ))}
                </select>
            </div>

            <div className='add-bom-itemfield'>
                <p>Inventory Part to Add</p>
                <select value={inventoryPartToAdd.item_name} onChange={(e) => { e.target.value ? setInventoryPartToAdd(inventory_items.find(item => item.item_name === e.target.value)) : setInventoryPartToAdd('') }} name='inventoryItem_name' >
                    <option value="" >Select a part to add</option>
                    {inventory_items.map((part, index) => (
                        <option key={index} value={part.item_name}>
                            {part.item_name}
                        </option>
                    ))}
                </select>
                <p>Quantity</p>
                <input value={quantity} onChange={(e) => { setQuantity(e.target.value) }} type="text" name='qty' placeholder='Type here' />
                <button onClick={addToBom} className='add-bom-btn'>Add to BOM</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ProductBom handleRemove={removeFromBom} productBom={productToAddBom ? productToAddBom : {
                bom: [{
                    componentId: "",
                    componentName: "",
                    quantity: ""
                }]
            }} />

        </div>
    )
}

export default AddBom