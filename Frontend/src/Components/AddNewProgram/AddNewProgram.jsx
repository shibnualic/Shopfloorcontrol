import React, { useState, useContext } from 'react'
import './AddNewProgram.css'
import { shopFloorContext } from '../../Context/ShopFloorContext'


const AddNewProgram = () => {

    const { inventory_items, allProgram, setIsFunctionExecuted } = useContext(shopFloorContext);

    const [programDetails, setProgramDetails] = useState({
        program_name: '',
        machine: '',
        raw_material: '',
        qtyOfMaterial: '',
        unitsPerProgram: '',
    })

    const raw_material = inventory_items.filter(item => item.category === "Steel")

    const changeHandler = (e) => {
        setProgramDetails({
            ...programDetails, [e.target.name]: e.target.value
        })
    }

    const addProgram = async () => {
        const index = allProgram.findIndex(item => item.program_name === programDetails.program_name);

        if (index !== -1) {
            alert("Program name already exist")
        } else {
            await fetch('https://shopfloorcontrolbackend.onrender.com/addprogram', {
                method: 'POST',
                headers: {
                    Accept: "application.json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(programDetails)
            }).then((resp) => resp.json()).then((data) => {
                if (data.success) {
                    alert("Program added")
                } else {
                    alert("failed")
                }
            })
            setProgramDetails({
                program_name: '',
                machine: '',
                raw_material: '',
                qtyOfMaterial: '',
                unitsPerProgram: '',
            })
            setIsFunctionExecuted(true)

        }


    }


    return (
        <div className='addnewprogram'>

            <div className='addnewprogram-itemfield'>
                <p>Program name</p>
                <input value={programDetails.program_name} onChange={changeHandler} type="text" name='program_name' placeholder='Type here' />
            </div>
            <div className='addnewprogram-itemfield'>
                <p>Machine</p>
                <input value={programDetails.machine} onChange={changeHandler} type='text' name='machine' placeholder='Type here' />
            </div>
            <div className='addnewprogram-itemfield'>
                <p>Raw Material</p>
                <select value={programDetails.raw_material} onChange={changeHandler} name='raw_material' >
                    <option value="" >Select a Material to add</option>
                    {raw_material.map((part, index) => (
                        <option key={index} value={part.item_name}>
                            {part.item_name}
                        </option>
                    ))}
                </select>
            </div>
            <div className='addnewprogram-itemfield'>
                <p>Quantity</p>
                <input value={programDetails.qtyOfMaterial} onChange={changeHandler} type='text' name='qtyOfMaterial' placeholder='Type here' />
            </div>
            <div className='addnewprogram-itemfield'>
                <p>Units Per Program</p>
                <input value={programDetails.unitsPerProgram} onChange={changeHandler} type='text' name='unitsPerProgram' placeholder='Type here' />
            </div>

            <button onClick={addProgram} className='addnewprogram-btn'>ADD</button>
        </div>
    )

}
export default AddNewProgram