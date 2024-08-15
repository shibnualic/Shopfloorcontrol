import React, { useState, useContext } from 'react'
import './EditProgram.css'
import { shopFloorContext } from '../../Context/ShopFloorContext'

const EditProgram = () => {

    const { setIsFunctionExecuted } = useContext(shopFloorContext);

    const [programToBeEdited, setProgramToBeEdited] = useState({
        program_id_name: '',
        program_id: '',
        program_name: '',
        machine: '',
        raw_material: '',
        qtyOfMaterial: '',
        unitsPerProgram: '',
    });

    const changeHandler = (e) => {
        setProgramToBeEdited({
            ...programToBeEdited, [e.target.name]: e.target.value
        })
    }

    const findProgram = async () => {
        await fetch('http://localhost:4000/findprogram', {
            method: 'POST',
            headers: {
                Accept: "application.json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(programToBeEdited)
        }).then((resp) => resp.json()).then((data) => {

            if (data.success) {
                console.log(data.item)
                setProgramToBeEdited(data.item)
            } else {
                alert("program doesn't exist")
                setProgramToBeEdited({
                    program_id_name: '',
                    program_id: '',
                    program_name: '',
                    machine: '',
                    raw_material: '',
                    qtyOfMaterial: '',
                    unitsPerProgram: '',
                })
            }
        })
    }

    const editProgram = async () => {
        await fetch('http://localhost:4000/editprogram', {
            method: 'POST',
            headers: {
                Accept: "application.json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(programToBeEdited)
        }).then((resp) => resp.json()).then((data) => {

            if (data.success) {
                alert("Program details updated")
            }
        })
        setProgramToBeEdited({
            program_id_name: '',
            program_id: '',
            program_name: '',
            machine: '',
            raw_material: '',
            qtyOfMaterial: '',
            unitsPerProgram: '',
        })
        setIsFunctionExecuted(true);

    }

    const removeProgram = async () => {
        await fetch('http://localhost:4000/removeprogram', {
            method: 'POST',
            headers: {
                Accept: "application.json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(programToBeEdited)
        }).then((resp) => resp.json()).then((data) => {

            if (data.success) {
                alert("Program details removed")
            }
        })
        setProgramToBeEdited({
            program_id_name: '',
            program_id: '',
            program_name: '',
            machine: '',
            raw_material: '',
            qtyOfMaterial: '',
            unitsPerProgram: '',
        })
        setIsFunctionExecuted(true);
    }


    return (
        <div className='edit-program'>
            <div className='edit-program-itemfield'>
                <p>Program ID or Program Name</p>
                <input value={programToBeEdited.program_id_name} onChange={changeHandler} type="text" name='program_id_name' placeholder='Type here' />
                <button onClick={findProgram} className='edit-program-btn'>Find</button>
            </div>
            <div className='edit-program-details'>
                <div className='edit-program-itemfield'>
                    <p>ItemID</p>
                    <input readOnly={true} value={programToBeEdited.program_id} type='text' name='program_id' placeholder='Type here' />
                </div>
                <div className='edit-program-itemfield'>
                    <p>Item name</p>
                    <input readOnly={true} value={programToBeEdited.program_name} type='text' name='program_name' placeholder='Type here' />
                </div>
                <div className='edit-program-itemfield'>
                    <p>Machine</p>
                    <input value={programToBeEdited.machine} onChange={changeHandler} type='text' name='machine' placeholder='Type here' />
                </div>
                <div className='edit-program-itemfield'>
                    <p>Raw Material</p>
                    <input value={programToBeEdited.raw_material} onChange={changeHandler} type='text' name='raw_material' placeholder='Type here' />
                </div>
                <div className='edit-program-itemfield'>
                    <p>Quantity of Material</p>
                    <input value={programToBeEdited.qtyOfMaterial} onChange={changeHandler} type='text' name='qtyOfMaterial' placeholder='Type here' />
                </div>
                <div className='edit-program-itemfield'>
                    <p>Units Per Program</p>
                    <input value={programToBeEdited.unitsPerProgram} onChange={changeHandler} type='text' name='unitsPerProgram' placeholder='Type here' />
                </div>

            </div>


            <button onClick={editProgram} className='edit-program-btn'>Apply Changes</button>
            <button onClick={removeProgram} className='edit-program-btn'>Remove this Item</button>
        </div>
    )
}

export default EditProgram