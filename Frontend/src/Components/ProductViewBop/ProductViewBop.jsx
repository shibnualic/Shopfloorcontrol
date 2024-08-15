import React from 'react'
import './ProductViewBop.css'

const ProductViewBop = (props) => {

    return (
        <div className="table">
            <div className="table-header">
                <div className="header__item">Program Id</div>
                <div className="header__item">Program Name</div>
            </div>
            <div className="table-content">
                {props.productBop.bop.map((item) => {
                    return (<div key={item.program_id} className='table-row'>
                        <div className="table-data">{item.program_id}</div>
                        <div className="table-data">{item.program_name}</div>
                    </div>);
                })}
            </div>
        </div>
    )
}

export default ProductViewBop