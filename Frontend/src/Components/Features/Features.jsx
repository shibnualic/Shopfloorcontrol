import React from 'react'
import { Link } from 'react-router-dom'
import './Features.css'

const Features = () => {
    return (
        <div>
            <section id="features">
                <div class="features-all">
                    <h2>Features</h2>
                    <div class="feature-grid">
                        <div class="feature">
                            <Link style={{ textDecoration: 'none' }} to='/orderdashboard'><h3>Order Dashboard</h3></Link>
                            <p>Get an overview of your Pending Orders.</p>
                        </div>
                        <div class="feature">
                            <Link style={{ textDecoration: 'none' }} to='/inventorydashboard'><h3>Inventory Dashboard</h3></Link>
                            <p>Track and manage your stock levels.</p>
                        </div>
                        <div class="feature">
                            <Link style={{ textDecoration: 'none' }} to='/addorder'><h3>New Order</h3></Link>
                            <p>Add New order for production</p>
                        </div>
                        <div class="feature">
                            <Link style={{ textDecoration: 'none' }} to='/programdashboard'><h3>Program dashboard</h3></Link>
                            <p>Get an overview of your Programs</p>
                        </div>
                        <div class="feature">
                            <Link style={{ textDecoration: 'none' }} to='/viewbop'><h3>Bill of Materials</h3></Link>
                            <p>View Bill of Materials for each product</p>
                        </div>
                        <div class="feature">
                            <Link style={{ textDecoration: 'none' }} to='/printcutsheet'><h3>Cut sheet</h3></Link>
                            <p>Print cut sheet with program details for each order</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Features
