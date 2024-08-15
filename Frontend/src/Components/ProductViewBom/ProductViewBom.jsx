import React from 'react'
import './ProductViewBom.css'

const ProductViewBom = (props) => {

    return (
        <div className="table">
            <div className="table-header">
                <div className="header__item">Id</div>
                <div className="header__item">Name</div>
                <div className="header__item">Quantity</div>
            </div>
            <div className="table-content">

                {props.productBom.bom.map((item) => {
                    return (<div key={item.componentId} className='table-row'>
                        <div className="table-data">{item.componentId}</div>
                        <div className="table-data">{item.componentName}</div>
                        <div className="table-data">{item.quantity}</div>
                    </div>);
                })}

            </div>
        </div>
    )
}

export default ProductViewBom