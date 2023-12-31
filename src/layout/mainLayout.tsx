/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { BsPerson } from 'react-icons/bs'
import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition, Disclosure } from '@headlessui/react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { BiBox, BiCross, BiHome, BiMenu } from 'react-icons/bi'
import { signOutFirebase } from '../utils/firebase'
import { type IAppContextModel, useAppContext } from '../context/app.context'
import { Alert } from '@material-tailwind/react'

const classNames = (...classes: any[]): string => {
  return classes.filter(Boolean).join(' ')
}

interface Props {
  children?: React.ReactNode
}

const MainLayout: React.FC<Props> = ({ children }: Props) => {
  const { setCurrentUser, setErrorApp, errorApp }: IAppContextModel = useAppContext()
  const navigate = useNavigate()

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSignOut = (): void => {
    void signOutFirebase()
    setCurrentUser({
      userId: '',
      userEmail: '',
      userName: '',
      userIsAuth: false,
      userProfilePicture: '',
      userPhoneNumber: ''
    })
    navigate('/login')
  }

  const dashboard = { name: 'Dashboard', icon: BiHome, href: '/' }
  const stockMenu = { name: 'Stok Obat', icon: BiBox, href: '/stock' }
  const myProfile = { name: 'My Profile', icon: BsPerson, href: '/my-profile' }

  const NAVIGATIONS_LIST = [dashboard, stockMenu, myProfile]

  const [navigationActive, setNavigationActive] = useState('Dashboard')

  const renderListNavigation = NAVIGATIONS_LIST.map((item: any) => {
    return (
      <>
        {!item.children && (
          <div
            key={item.name}
            onClick={() => {
              setNavigationActive(item.name)
            }}
          >
            <NavLink
              style={({ isActive }) =>
                isActive ? { backgroundColor: '#f3f3f3' } : undefined
              }
              to={item.href}
            >
              <a
                className={classNames(
                  navigationActive === item.name
                    ? 'text-blue-500'
                    : 'text-gray-600 hover:bg-gray-200 hover:text-gray-500',
                  'group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-2xl'
                )}
              >
                <item.icon
                  className={classNames(
                    navigationActive === item.name
                      ? 'text-blue-500'
                      : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 flex-shrink-0 h-6 w-6'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </a>
            </NavLink>
          </div>
        )}

        {Boolean(item.children) && (
          <Disclosure
            as="div"
            key={item.name}
            className="space-y-1"
            defaultOpen={item.current}
          >
            {({ open }) => {
              return (
                <>
                  <Disclosure.Button
                    className={classNames(
                      navigationActive === item.name
                        ? 'text-blue-500'
                        : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900',
                      'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-300'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        navigationActive === item.name
                          ? 'text-blue-500'
                          : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 flex-shrink-0 h-6 w-6 '
                      )}
                      aria-hidden="true"
                    />
                    <span className="flex-1">{item.name}</span>
                    <svg
                      className={classNames(
                        open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                        'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150'
                      )}
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                    </svg>
                  </Disclosure.Button>
                  <Disclosure.Panel className="space-y-1">
                    {item?.children?.map((subItem: any, index: number) => (
                      <NavLink
                        key={index}
                        to={subItem.href}
                        onClick={() => {
                          setNavigationActive(item.name)
                        }}
                      >
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          className={`group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium text-gray-600 rounded-2xl hover:text-gray-900 hover:bg-gray-200 ${
                            subItem.active ? 'text-gray-900  bg-gray-200' : ''
                          }`}
                        >
                          {subItem.name}
                        </a>
                      </NavLink>
                    ))}
                  </Disclosure.Panel>
                </>
              )
            }}
          </Disclosure>
        )}
      </>
    )
  })

  const renderMobileMenu = (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex z-40 md:hidden"
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => {
                    setSidebarOpen(false)
                  }}
                >
                  <span className="sr-only">Close sidebar</span>
                  <BiCross className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
            <div className="mt-5 flex-1 h-0 overflow-y-auto scrollbar-hide">
              <nav className="px-2 space-y-1">{renderListNavigation}</nav>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )

  const renderDesktopMenu = (
    <div className="h-screen flex overflow-hidden bg-white">
      <div className="hidden bg-white md:flex md:flex-shrink-0">
        <div
          className={
            'w-56 sm:block relative h-screen duration-100 border-r border-gray-200 px-3'
          }
        >
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
            <h1 className="text-md text-gray-700">
              <span className="font-extrabold text-2xl text-blue-500 mx-1">
                Stok Obat
              </span>
            </h1>
            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 space-y-1">{renderListNavigation}</nav>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="relative bg-white shadow-sm z-10 flex-shrink-0 flex h-16">
          <button
            type="button"
            className="px-4 md:hidden border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 "
            onClick={() => {
              setSidebarOpen(true)
            }}
          >
            <BiMenu className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 px-2 flex flex-row-reverse">
            <div className="ml-4 sm:mr-10 flex items-center">
              <Menu as="div" className="mx-3 relative">
                <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <BsPerson className="text-2xl mx-1 text-gray-500 cursor-pointer hover:bg-gray-200 rounded-full" />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-2xl shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <button
                      type="submit"
                      onClick={handleSignOut}
                      className="block px-4 py-2 text-sm text-gray-700"
                    >
                      Logout
                    </button>

                    <Link
                      className="block px-4 py-2 text-sm text-gray-700"
                      to={'/my-profile'}
                    >
                      My profile
                    </Link>
                  </Menu.Items>
                </Transition>
              </Menu>
              <label htmlFor="" className="text-gray-500 font-md">
                admin
              </label>
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-gray-100">
          <div className="px-2 py-2 md:py-6 md:px-6 m-0">{children}</div>

          {errorApp.isError && (
            <Alert
              open={true}
              color="red"
              className="absolute z-index-20 right-5 bottom-5 w-96"
              onClose={() => {
                setErrorApp({ isError: false, message: '' })
              }}
              animate={{
                mount: { y: 0 },
                unmount: { y: 100 }
              }}
            >
              {errorApp.message || 'Error! terjadi kendala'}
            </Alert>
          )}
        </main>
      </div>
    </div>
  )

  return (
    <>
      {renderDesktopMenu}
      {renderMobileMenu}
    </>
  )
}

export default MainLayout
