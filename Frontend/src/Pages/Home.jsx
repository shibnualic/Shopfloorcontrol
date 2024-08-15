import React from 'react'
import './CSS/Home.css'
import { Link } from 'react-router-dom'



const Home = () => {
    return (
        <div>

            <div className='home'>

                <div className='inventory-managment'>
                    <h1>Inventory Managment</h1>
                    <ul>
                        <Link style={{ textDecoration: 'none' }} to='/inventorydashboard'><li>Inventory Dashboard</li></Link>
                        <Link style={{ textDecoration: 'none' }} to='/addnewinventorypart'><li>Add new inventory part</li></Link>
                        <Link style={{ textDecoration: 'none' }} to='/editinventory'><li>Edit Inventory</li></Link>
                    </ul>
                </div>
                <div className='bom'>
                    <h1>Product Managment</h1>
                    <ul>
                        <Link style={{ textDecoration: 'none' }} to='/addproduct'><li>Add New Product</li></Link>
                        <Link style={{ textDecoration: 'none' }} to='/editproduct'><li>Edit product details</li></Link>

                    </ul>
                </div>
                <div className='bom'>
                    <h1>Bill of materials</h1>
                    <ul>
                        <Link style={{ textDecoration: 'none' }} to='/viewbom'><li>View Bill of Material</li></Link>
                        <Link style={{ textDecoration: 'none' }} to='/addbom'><li>Add/Edit bill of material</li></Link>

                    </ul>
                </div>
                <div className='bom'>
                    <h1>Program Managment</h1>
                    <ul>
                        <Link style={{ textDecoration: 'none' }} to='/programdashboard'><li>Program Dashboard</li></Link>
                        <Link style={{ textDecoration: 'none' }} to='/addnewprogram'><li>Add New Program</li></Link>
                        <Link style={{ textDecoration: 'none' }} to='/editprogram'><li>Edit Program Details</li></Link>
                        <Link style={{ textDecoration: 'none' }} to='/viewbop'><li>View Bill of Program</li></Link>
                        <Link style={{ textDecoration: 'none' }} to='/addbop'><li>Add/Edit Bill of Program</li></Link>
                    </ul>
                </div>
                <div className='bom'>
                    <h1>Production Control</h1>
                    <ul>
                        <Link style={{ textDecoration: 'none' }} to='/orderdashboard'><li>Master Schedule</li></Link>
                        <Link style={{ textDecoration: 'none' }} to='/addorder'><li>Add New Order</li></Link>
                        <Link style={{ textDecoration: 'none' }} to='/editorder'><li>Edit Order</li></Link>
                        <Link style={{ textDecoration: 'none' }} to='/printcutsheet'><li>Print cut sheet/release work order</li></Link>
                    </ul>
                </div>

                <div>
                    <Link style={{ textDecoration: 'none' }} to='/'><button className='home-button'>Logout</button></Link>
                </div>
            </div>

        </div>
    )
}

export default Home