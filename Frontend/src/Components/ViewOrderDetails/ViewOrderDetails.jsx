import React from 'react';
import './ViewOrderDetails.css'; // Assuming you want to add some CSS for styling

const ViewOrderDetails = (props) => {
    // Sample data for the table

    return (
        <div className="table-container">
            <h1>Order Details</h1>
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>Details</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td>Order Id</td>
                        <td>{props.orderDetails.order_id}</td>
                    </tr>
                    <tr >
                        <td>Unit</td>
                        <td>{props.orderDetails.order_unit}</td>
                    </tr>
                    <tr >
                        <td>Quantity</td>
                        <td>{props.orderDetails.quantity}</td>
                    </tr>
                    <tr >
                        <td>Po Number</td>
                        <td>{props.orderDetails.po_number}</td>
                    </tr>
                    <tr >
                        <td>Customer Name</td>
                        <td>{props.orderDetails.customer_name}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ViewOrderDetails;