import React, { useState, useRef, useContext } from 'react';
import './PrintCutSheet.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { shopFloorContext } from '../../Context/ShopFloorContext'
import ViewOrderDetails from '../ViewOrderDetails/ViewOrderDetails';
import ViewCutSheet from '../ViewCutSheet/ViewCutSheet';

const PrintCutSheet = () => {

    const { allOrder, allProduct, allProgram, inventory_items, setIsFunctionExecuted } = useContext(shopFloorContext);
    const [ordertoPrint, setOrderToPrint] = useState('');
    const [cutDetails, setCutDetails] = useState('');
    const [productToCut, setProductToCut] = useState('');



    const tableRef = useRef();

    const filterDataForProgram = (dataArray, criteriaArray) => {
        return dataArray.filter(item =>
            criteriaArray.some(criteria =>
                item.program_id === criteria.program_id
            )
        );
    };


    const handleChange = (e) => {

        if (e.target.value) {
            setOrderToPrint(allOrder.find(item => item.order_id === e.target.value));
            setOrderToPrint((prevValue) => {
                const product = allProduct.find(item => item.product_name === prevValue.order_unit);
                const bopArray = filterDataForProgram(allProgram, product.bop)
                setCutDetails({
                    bop: bopArray,
                    quantity: prevValue.quantity
                })
                setProductToCut(product);

                return prevValue;
            })

        } else {
            setOrderToPrint('');
            setCutDetails('');
        }
    };

    const releaseWorkOrder = async () => {

        productToCut.bom.map(async (item, index) => {
            const oldStock = (inventory_items.find((obj) => obj.item_id === item.componentId));
            console.log(oldStock);
            console.log(index)
            const inventoryChange = {
                item_id: item.componentId,
                stock: oldStock.stock - ordertoPrint.quantity * item.quantity
            }
            await fetch('https://shopfloorcontrolbackend.onrender.com/editinventory', {
                method: 'POST',
                headers: {
                    Accept: "application.json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inventoryChange)
            })
        })

        await fetch('https://shopfloorcontrolbackend.onrender.com/removeorder', {
            method: 'POST',
            headers: {
                Accept: "application.json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ordertoPrint)
        }).then((resp) => resp.json()).then((data) => {

            if (data.success) {
                alert("Order released and inventory updated")
            }
        })




        setOrderToPrint('');
        setCutDetails('');
        setIsFunctionExecuted(true);
    }

    const generatePdf = () => {
        const doc = new jsPDF();
        const table = tableRef.current;

        doc.text("Table Data", 10, 10);
        doc.autoTable({
            html: table,
            startY: 20,
        });

        doc.save('table.pdf');
    };

    return (
        <div className='print-cutsheet'>
            <div className='print-cutsheet-itemfield'>
                <p>Select Order ID to Print</p>
                <select value={ordertoPrint.order_id} onChange={handleChange} name='' className=''>
                    <option value=''>Select Order Id</option>
                    {allOrder.map((order, index) => (
                        <option key={index} value={order.order_id}>
                            {order.order_id}
                        </option>
                    ))}
                </select>
            </div>
            <div className='print-cutsheet-table'>
                {ordertoPrint ? <ViewOrderDetails orderDetails={ordertoPrint} /> : null}
            </div>
            <div className='print-cutsheet-table'>
                {cutDetails ? <ViewCutSheet inputRef={tableRef} cutDetails={cutDetails} /> : null}
            </div>


            <button className='print-cutsheet-btn' onClick={generatePdf} style={{ marginTop: 20 }}>Download cutsheet</button>
            <button className='print-cutsheet-btn' onClick={releaseWorkOrder} style={{ marginTop: 20 }}>Release Work Order</button>
        </div>
    );
};

export default PrintCutSheet;
