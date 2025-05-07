
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import About from '../Pages/About'
import Login from '../Pages/Login/Login'
import Register from '../Pages/Register/Register'
import Dashboard from '../Pages/Admin/Dashboard'
import Post from '../Pages/Blog/Post'
import CreateAdminPost from '../Pages/Blog/createAdminPost'
import BlogDashboard from '../Pages/Blog/BlogDashboard'
import Profile from '../Pages/Profile/ProfilePage'
import EditProfile from '../Pages/Profile/EditProfile'
import Cart from '../Pages/Cart/Cart'
import PrivateRoutes from '../utils/PrivateRoutes'
import RoleBasedRoute from '../utils/RoleBasedRoute'
import AdminSummary from '../Pages/Admin/AdminSummary'
import Category from '../Components/Category/Category'
import AddCategory from '../Components/Category/AddCategory'
import EditPost from '../Pages/Blog/EditPost'
import EditCategory from '../Components/Category/EditCategory'
import Product from '../Components/Product/Product'
import AddProducts from '../Components/Product/AddProducts'
import EditProduct from '../Components/Product/EditProduct'
import Users from '../Components/UsersPage/Users'
import UserList from '../Components/UsersPage/UserList'
import View from '../Components/UsersPage/View'
import Thumbnails from '../Pages/Thumbnails/Thumbnails'
import ViewBlog from '../Pages/Blog/ViewBlog'
import ViewProduct from '../Pages/Thumbnails/ViewProduct'
import Checkout from '../Components/Checkout/Checkout'
import Unauthorized from '../Pages/Unauthorised/Unathorised'
import UserOrders from '../Pages/Orders/UserOrders'
import UserOrderSummary from '../Pages/Orders/UserOrderSummary'
import AdminOrderList from '../Pages/Orders/AdminOrderList'
import ProductCategory from '../Pages/Category/ProductCategory'
import Navbar from '../Components/Navbar/Navbar'
import Shop from '../Pages/Shop/Shop'
import Contact from '../Pages/Contact/Contact'
import Message from '../Pages/Message/Message'
import SearchPage from '../Pages/Search/SearchPage'






function AppRoutes() {
  return (


    <Routes>
      {/* <Route path='/' element={<Navigate to='/'/>}/> */}
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/blog' element={<Post />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/product' element={<Shop />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/thumbnails' element={<Thumbnails/>} />
      <Route path='/search' element={<SearchPage/>} />
      <Route path='/blog/:id' element={<ViewBlog/>}/>
      <Route path='/product/:id' element={<ViewProduct/>}/>
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/category/:id" element={<ProductCategory />} />


      <Route path='/profile' element={
        <PrivateRoutes>
          <Profile />
        </PrivateRoutes>
      } />
      <Route path='/profile/:id' element={
        <PrivateRoutes>
          <RoleBasedRoute requiredRole={['user']}>
          <EditProfile />
          </RoleBasedRoute>
        </PrivateRoutes>
      } />
        <Route path='/checkout' element={
        <PrivateRoutes>
          <RoleBasedRoute requiredRole={['user']}>
          <Checkout />
          </RoleBasedRoute>
        </PrivateRoutes>
      } />
      
      <Route path='/orders' element={
        <PrivateRoutes>
          <RoleBasedRoute requiredRole={['user']}>
          <UserOrders />
          </RoleBasedRoute>
        </PrivateRoutes>
      } />

    <Route path='/order-summary' element={
        <PrivateRoutes>
          <RoleBasedRoute requiredRole={['user']}>
          <UserOrderSummary />
          </RoleBasedRoute>
        </PrivateRoutes>
      } />


      {/* <Route path='/dashboard' element={
        <PrivateRoutes>
          <RoleBasedRoute requiredRole={['admin']}>
            <Dashboard />
          </RoleBasedRoute>
        </PrivateRoutes>

      }>
      
        <Route index element={<AdminSummary />}  requiredRole={['admin']}/>
        
        <Route path='/dashboard/blog' element={< BlogDashboard/>}/>
        <Route path='/dashboard/create/post' element={<CreateAdminPost />} />
        <Route path='/dashboard/post/:id' element={<EditPost />} />
        <Route path='/dashboard/category' element={<Category />}></Route>
        <Route path='/dashboard/category/add-category' element={<AddCategory />}></Route>
        <Route path='/dashboard/edit-category/:id' element={<EditCategory />}></Route>
        <Route path='/dashboard/edit-category/:id' element={<EditCategory />}></Route>
        <Route path='/dashboard/product' element={<Product />}></Route>
        <Route path='/dashboard/product/edit-product/:id' element={<EditProduct />}></Route>
        <Route path='/dashboard/product/add-products' element={<AddProducts />}></Route>
        <Route path='/dashboard/users-list' element={<UserList/>}
        ></Route>
         <Route path='/dashboard/users-list/add-admin' element={<Users/>}></Route>
         <Route path='/dashboard/admin/view/:id' element={<View/>}></Route>
         
      </Route>
 */}

<Route path='/dashboard' element={
  <PrivateRoutes>
    <RoleBasedRoute requiredRole={['admin']}>
      <Dashboard />
    </RoleBasedRoute>
  </PrivateRoutes>
}>
  <Route index element={
    <RoleBasedRoute requiredRole={['admin']}>
      <AdminSummary />
    </RoleBasedRoute>
  } />
  
  <Route path='blog' element={
    <RoleBasedRoute requiredRole={['admin']}>
      <BlogDashboard />
    </RoleBasedRoute>
  } />
  
  <Route path='create/post' element={
    <RoleBasedRoute requiredRole={['admin']}>
      <CreateAdminPost />
    </RoleBasedRoute>
  } />

  <Route path='post/:id' element={
    <RoleBasedRoute requiredRole={['admin']}>
      <EditPost />
    </RoleBasedRoute>
  } />

  <Route path='category' element={
    <RoleBasedRoute requiredRole={['admin']}>
      <Category />
    </RoleBasedRoute>
  } />
  
  <Route path='category/add-category' element={
    <RoleBasedRoute requiredRole={['admin']}>
      <AddCategory />
    </RoleBasedRoute>
  } />

  <Route path='edit-category/:id' element={
    <RoleBasedRoute requiredRole={['admin']}>
      <EditCategory />
    </RoleBasedRoute>
  } />

  <Route path='product' element={
    <RoleBasedRoute requiredRole={['admin']}>
      <Product />
    </RoleBasedRoute>
  } />
  
  <Route path='product/add-products' element={
    <RoleBasedRoute requiredRole={['admin']}>
      <AddProducts />
    </RoleBasedRoute>
  } />
  
  <Route path='product/edit-product/:id' element={
    <RoleBasedRoute requiredRole={['admin']}>
      <EditProduct />
    </RoleBasedRoute>
  } />

  <Route path='users-list' element={
    <RoleBasedRoute requiredRole={['admin']}>
      <UserList />
    </RoleBasedRoute>
  } />
  
  <Route path='users-list/add-admin' element={
    <RoleBasedRoute requiredRole={['admin']}>
      <Users />
    </RoleBasedRoute>
  } />
  
  <Route path='admin/view/:id' element={
    <RoleBasedRoute requiredRole={['admin']}>
      <View />
    </RoleBasedRoute>
  } />

<Route path='admin/order-list' element={
    <RoleBasedRoute requiredRole={['admin']}>
      <AdminOrderList />
    </RoleBasedRoute>
  } />

<Route path='message' element={
    <RoleBasedRoute requiredRole={['admin']}>
      <Message />
    </RoleBasedRoute>
  } />
  


</Route>



      {/* <Route path='/admin/create' 
        element={
            <PrivateRoutes>
              <RoleBasedRoute requiredRole={['admin']}>
              <CreateAdminPost/>
              </RoleBasedRoute>
            </PrivateRoutes>
          
        }
      /> */}
    </Routes>
  )
}

export default AppRoutes