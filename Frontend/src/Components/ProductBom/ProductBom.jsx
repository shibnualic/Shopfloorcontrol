import React, { useState } from 'react'
import './ProductBom.css'
// import remove_icon from '../../Assets/remove-icon.png'

const ProductBom = (props) => {

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
                <div className="header__item">Quantity</div>
                <div className="header__item">Action</div>
            </div>
            <div className="table-content">

                {props.productBom.bom.map((item) => {
                    return (<div key={item.componentId} onClick={() => { handleRowClick(item.componentId) }} className={item.componentId === selectedRow ? 'selected table-row' : 'table-row'}>
                        <div className="table-data">{item.componentId}</div>
                        <div className="table-data">{item.componentName}</div>
                        <div className="table-data">{item.quantity}</div>
                        <div className="table-data">  {item.componentId === selectedRow && (
                            <button onClick={() => { handleRemove(item.componentId) }}>Remove</button>
                        )}</div>
                    </div>);
                })}

            </div>
        </div>
    )
}

export default ProductBom