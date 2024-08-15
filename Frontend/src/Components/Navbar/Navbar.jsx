import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './Navbar.css';

const Navbar = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState({
        inventoryManagment: false,
        productManagment: false,
        bom: false,
        programManagment: false,
        productionControl: false
    });

    const toggleDropdown = (menu) => {
        setIsDropdownOpen((prevState) => ({
            ...prevState,
            [menu]: !prevState[menu],
        }));
    };

    return (

        <div class="navbar">

            <h1>Shopfloor Control</h1>

            <ul>
                <Link to='/' style={{ textDecoration: 'none' }}><li className="navbar-item "><a href="#inventory">Home</a></li></Link>

                <li className="navbar-item " onMouseEnter={() => toggleDropdown('inventoryManagment')}
                    onMouseLeave={() => toggleDropdown('inventoryManagment')}>
                    <a href="#inventory">Inventory Management</a>
                    {isDropdownOpen.inventoryManagment && (
                        <ul className="dropdown-menu">
                            <Link className="dropdown-link" to='/inventorydashboard'><li>Inventory Dashboard</li></Link>
                            <Link className="dropdown-link" to='/addnewinventorypart'><li>Add new inventory part</li></Link>
                            <Link className="dropdown-link" to='/editinventory'><li>Edit Inventory part details</li></Link>
                        </ul>
                    )}
                </li>
                <li className='navbar-item' onMouseEnter={() => toggleDropdown('productManagment')}
                    onMouseLeave={() => toggleDropdown('productManagment')}>
                    <a href="#inventory">Product Management</a>
                    {isDropdownOpen.productManagment && (
                        <ul className="dropdown-menu">
                            <Link className="dropdown-link" to='/addproduct'><li>Add New Product</li></Link>
                            <Link className="dropdown-link" to='/editproduct'><li>Edit product details</li></Link>
                        </ul>
                    )}

                </li>
                <li className='navbar-item' onMouseEnter={() => toggleDropdown('bom')}
                    onMouseLeave={() => toggleDropdown('bom')}>
                    <a href="#inventory">Bill of Materials</a>
                    {isDropdownOpen.bom && (
                        <ul className="dropdown-menu">
                            <Link className="dropdown-link" to='/viewbom'><li>View Bill of Material</li></Link>
                            <Link className="dropdown-link" to='/addbom'><li>Add/Edit bill of material</li></Link>
                        </ul>
                    )}

                </li>
                <li className='navbar-item' onMouseEnter={() => toggleDropdown('programManagment')}
                    onMouseLeave={() => toggleDropdown('programManagment')}>
                    <a href="#inventory">Program Management</a>
                    {isDropdownOpen.programManagment && (
                        <ul className="dropdown-menu">
                            <Link className="dropdown-link" to='/programdashboard'><li>Program Dashboard</li></Link>
                            <Link className="dropdown-link" to='/addnewprogram'><li>Add New Program</li></Link>
                            <Link className="dropdown-link" to='/editprogram'><li>Edit Program Details</li></Link>
                            <Link className="dropdown-link" to='/viewbop'><li>View Bill of Program</li></Link>
                            <Link className="dropdown-link" to='/addbop'><li>Add/Edit Bill of Program</li></Link>
                        </ul>
                    )}

                </li>
                <li className='navbar-item' onMouseEnter={() => toggleDropdown('productionControl')}
                    onMouseLeave={() => toggleDropdown('productionControl')}>
                    <a href="#inventory">Production Control</a>
                    {isDropdownOpen.productionControl && (
                        <ul className="dropdown-menu">
                            <Link className="dropdown-link" to='/orderdashboard'><li>Master Schedule</li></Link>
                            <Link className="dropdown-link" to='/addorder'><li>Add New Order</li></Link>
                            <Link className="dropdown-link" to='/editorder'><li>Edit Order</li></Link>
                            <Link className="dropdown-link" to='/printcutsheet'><li>Print cut sheet/release work order</li></Link>
                        </ul>
                    )}

                </li>
                {/* <Link to='/'><button className='navbar-btn'>Logout</button></Link> */}

            </ul>

        </div >
    )
};

export default Navbar;
