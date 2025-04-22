import React,{ useState ,useEffect} from 'react'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useVerifyQuery } from './services/authServices';
const NotFoundPage=React.lazy(()=>import('./components/NotFoundPage'));
const Navbar=React.lazy(()=>import('./components/Navbar'));
const Login = React.lazy(() => import('./pages/AuthPages').then(module => ({ default: module.LoginForm })));
const Registration =React.lazy(() => import('./pages/AuthPages').then(module => ({ default: module.RegistrationForm })));
// import Upload from './pages/Upload';
const Upload = React.lazy(() => import('./pages/Upload'));
const Home =React.lazy(()=>import('./pages/Home'));


import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const ModelViewPage=React.lazy(()=>import('./pages/ModelViewPage'));
const ProtectedRouteList=[{path:"/upload"}]

const ProtectedRoute = ({ allowedRoles ,children},) => {
  // const { isAuthenticated, role } = getUser();
  const { isAuthenticated, role } = useSelector(state=>state.authReducer);
  // const verifyUser=useVerifyQuery();
  const { data, refetch } = useVerifyQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: false,
  })
  
  const navigate=useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
 useEffect(() => {
   
  if(isAuthenticated){
    location.pathname=="/user/login" && navigate("");
    // navigate(-1);
  //   // navigate(`/user/login`,);
  }
  if(!isAuthenticated){

    ProtectedRouteList.find((item)=>item.path==location.pathname) && navigate("/user/login");
    // location.pathname!=="/user/login" && navigate("/user/login");
    // navigate(`/user/login`);
  }
  
  console.log(data?.isAuthenticated,location.pathname,data);
  return () => {

  }
}, [isAuthenticated])
// const { pathname } = useLocation();

useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' }); // or remove behavior for instant scroll
}, [location?.pathname]);




  // if (!allowedRoles.includes(role)) {
  //   return <Navigate to="/" replace />;
  // }

  return (
    children
  );
};

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white"> 
    <Navbar/>
    <Outlet/>
    <ToastContainer
position="bottom-center"
// containerId="mobile"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
limit={1}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
// theme="light"
/>
    </div>
  )
}

export function RoutesProvider() {

  // const loaction=useLocation();
      const router=createBrowserRouter([{
        path:"",
        element:<ProtectedRoute><Layout/></ProtectedRoute>,
        children:[
       
          {
            path:"",
            element:<Home/>
          },{
            path:"/upload",
            element:<ProtectedRoute><Upload/></ProtectedRoute>
          },
          {
            path:"/user/login",
            element:<Login/>
          },
          {
            path:"/user/register",
            element:<Registration/>
          },
          {
            path:"/model/view",
            element:<ModelViewPage/>

          },
          {
            path:"*",
            element:<NotFoundPage/>
          }
      
        
        ]
      
      }])

   return  <RouterProvider router={router}  fallbackElement={<p>Loading...</p>}/>

    }


