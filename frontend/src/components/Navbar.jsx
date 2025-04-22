import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { SpriteAnimator, useSelect } from '@react-three/drei'
import { SparkleIcon } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../services/authServices'
import { FaUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'models', href: '/models', current: false },
  { name: 'Upload', href: '/upload', current: false },
  { name: 'View', href: '/model/view', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

  const [logout,{isLoading}]=useLogoutMutation();
  const {isAuthenticated,user}=useSelector((state) => state.authReducer);
  // console.log(isAuthenticated,user);
  const navigate = useNavigate()
  return (
    <Disclosure as="nav" className="">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          
          <div className="flex flex-1 items-center justify-center sm:justify-start">
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
            3D Viewer
          </Link>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item,index) => (
                  <NavLink
                    to={item.href}
                    key={index}
                  
                    aria-current={item.current ? 'page' : undefined}
                    className={({isActive})=>classNames(
                      isActive ? 'bg-slate-800/50 outline-1 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
         
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>

            {/* Profile dropdown */}
        <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                 {isAuthenticated? <span
                    className="size-8 bg-slate-400 center rounded-full"
                  >
                    {user?.firstName?.charAt(0).toUpperCase() || "user"}
                  </span>:<FaUserCircle className='text-2xl text-slate-400'/>}
                </MenuButton>
              </div>
              {isAuthenticated?<MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white  shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in overflow-hidden"
              >

                <MenuItem>
                  <button
                  onClick={()=>logout()}
                    className="block cursor-pointer  px-4 py-2 h-full text-sm text-gray-800 bg-blue-200 w-full data-focus:bg-gray-500 data-focus:text-gray-100 data-focus:outline-hidden"
                  >
                    Sign out
                  </button>
                </MenuItem>
              </MenuItems>:
               <MenuItems
               transition
               className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white  shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in text-start overflow-hidden p-1"
             >
   
               <MenuItem className="text-start">
                 <button
                 onClick={()=>navigate("user/login")}
                   className="block rounded-md cursor-pointer  px-4 py-2 h-full text-sm text-gray-800 mb-1 bg-blue-200 w-full data-focus:bg-gray-500 data-focus:text-gray-100 data-focus:outline-hidden"
                 >
                   Login
                 </button>
               </MenuItem>
               <MenuItem>
                 <button
                 onClick={()=>navigate("user/register")}
                   className="block text-start cursor-pointer rounded-md   px-4 py-2 h-full text-sm text-gray-800 bg-blue-200 w-full data-focus:bg-gray-500 data-focus:text-gray-100 data-focus:outline-hidden"
                 >
                   Register
                 </button>
               </MenuItem>
             </MenuItems>}
              
            </Menu>
            
          
           
            
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={'a'}
              // href={item.href}
              onClick={()=>navigate(item.href)}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
