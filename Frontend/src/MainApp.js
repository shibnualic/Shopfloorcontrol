
import './MainApp.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import InventoryDashboard from './Components/InventoryDashboard/InventoryDashboard';
import AddNewInventoryPart from './Components/AddNewInventoryPart/AddNewInventoryPart';
import EditInventory from './Components/EditInventory/EditInventory';
import ViewBom from './Components/ViewBom/ViewBom';
import AddProduct from './Components/AddProduct/AddProduct';
import AddBom from './Components/AddBom/AddBom';
import EditProduct from './Components/EditProduct/EditProduct';
import ProgramDashboard from './Components/ProgramDashboard/programDashboard';
import AddNewProgram from './Components/AddNewProgram/AddNewProgram';
import EditProgram from './Components/EditProgram/EditProgram';
import AddBop from './Components/AddBop/AddBop';
import AddOrder from './Components/AddOrder/AddOrder';
import OrderDashboard from './Components/OrderDashboard/OrderDashboard';
import EditOrder from './Components/EditOrder/EditOrder';
import PrintCutSheet from './Components/PrintCutSheet/PrintCutSheet';
import ViewBop from './Components/ViewBop/ViewBop';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Features from './Components/Features/Features';
import LoginSignup from './Pages/LoginSignup';


function App() {
    const location = useLocation();
    const noNavAndFooterRoutes = ['/'];
    const showNavAndFooter = !noNavAndFooterRoutes.includes(location.pathname);
    return (
        <div className="MainApp">

<Navbar />
            {/* {showNavAndFooter && <Navbar />} */}
            <Routes>
                {/* <Route path='/' element={<LoginSignup />} /> */}
                <Route path='/' element={<Features />} />
                <Route path='/inventorydashboard' element={<InventoryDashboard />} />
                <Route path='/addnewinventorypart' element={<AddNewInventoryPart />} />
                <Route path='/editinventory' element={<EditInventory />} />
                <Route path='/viewbom' element={<ViewBom />} />
                <Route path='/addproduct' element={<AddProduct />} />
                <Route path='/editproduct' element={<EditProduct />} />
                <Route path='/addbom' element={<AddBom />} />
                <Route path='/programdashboard' element={<ProgramDashboard />} />
                <Route path='/addnewprogram' element={<AddNewProgram />} />
                <Route path='/editprogram' element={<EditProgram />} />
                <Route path='/addbop' element={<AddBop />} />
                <Route path='/addorder' element={<AddOrder />} />
                <Route path='/editorder' element={<EditOrder />} />
                <Route path='/orderdashboard' element={<OrderDashboard />} />
                <Route path='/printcutsheet' element={<PrintCutSheet />} />
                <Route path='/viewbop' element={<ViewBop />} />
            </Routes>
            {/* {showNavAndFooter && <Footer />} */}
            <Footer />

        </div>
    );
}

export default App;
