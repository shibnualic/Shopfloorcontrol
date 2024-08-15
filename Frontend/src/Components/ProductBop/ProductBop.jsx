import React, { useState } from 'react'
import './ProductBop.css'
// import remove_icon from '../../Assets/remove-icon.png'

const ProductBop = (props) => {

    const [selectedRow, setSelectedRow] = useState(null)

    const handleRowClick = (id) => {
        setSelectedRow(id === selectedRow ? null : id);
    };

    const handleRemove = (id) => {
        props.handleRemove(id)
        setSelectedRow(null);
    };

    return (
        <div className="table">
            <div className="table-header">
                <div className="header__item">Id</div>
                <div className="header__item">Name</div>
                <div className="header__item">Action</div>
            </div>
            <div className="table-content">

                {props.productBop.bop.map((item) => {
                    return (<div key={item.program_id} onClick={() => { handleRowClick(item.program_id) }} className={item.program_id === selectedRow ? 'selected table-row' : 'table-row'}>
                        <div className="table-data">{item.program_id}</div>
                        <div className="table-data">{item.program_name}</div>
                        <div className="table-data">  {item.program_id === selectedRow && (
                            <button onClick={() => { handleRemove(item.program_id) }}>Remove</button>
                        )}</div>
                    </div>);
                })}

            </div>
        </div>
    )
}

export default ProductBop