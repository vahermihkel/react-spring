import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import MainPage from './pages/global/MainPage'
import SingleProduct from './pages/global/SingleProduct'
import Shops from './pages/global/Shops'
import {ContactUs} from './pages/global/ContactUs'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import AddProduct from './pages/admin/AddProduct'
import AdminHome from './pages/admin/AdminHome'
import EditProduct from './pages/admin/EditProduct'
import ManageProducts from './pages/admin/ManageProducts'
import ManageShops from './pages/admin/ManageShops'
import ManageCategories from './pages/admin/ManageCategories'
import NotFound from './pages/global/NotFound'
import Menu from './components/Menu'
import Cart from './pages/global/Cart'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

function App() {
  const {loggedIn} = useContext(AuthContext);

  return (
    <>
      <Menu />
     
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/product/:id' element={<SingleProduct />} />
        <Route path='/shops' element={<Shops />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        {loggedIn ? <>
          <Route path='/admin' element={<AdminHome />} />
          <Route path='/admin/add-product' element={<AddProduct />} />
          <Route path='/admin/edit-product/:id' element={<EditProduct />} />
          <Route path='/admin/manage-products' element={<ManageProducts />} />
          <Route path='/admin/manage-categories' element={<ManageCategories />} />
          <Route path='/admin/manage-shops' element={<ManageShops />} />
        </> :
        <Route path='/admin/*' element={<Navigate to="/login" />} />
      }
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
