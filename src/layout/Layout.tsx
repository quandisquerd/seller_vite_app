import React, { useState } from 'react'
import { Tabs } from 'antd';
import './layout.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Layout = ({onClick}:any) => {
    const navigate = useNavigate()
    const [click, setClick] = useState<any>(1)
    const onChange = (key: string) => {
        navigate('/')
        if(key=="1"){
            setClick(1)
           
            onClick(1)
        }else{
            setClick(2)
            navigate('/')
            onClick(2)
        }
    };
    const items: any = [
        {
            key: '1',
            label: (
                <>
                    <Link className="flex flex-col items-center" to="/">
                        <i className={`ri-home-line  text-xl ${click == 1 ?`text-red-500`:"" }`}></i>
                        <span className={`mt-[-5px] text-xs ${click == 1 ? `text-red-500` : "" }` }>Home</span>
                    </Link>
                </>
            ),

        },
        {
            key: '2',
            label: (
                <>

                    <div className="flex flex-col items-center">
                        <i className={`ri-restaurant-line text-xl ${click == 2 ? `text-red-500` : "" }`}></i>
                        <span className={`mt-[-5px] text-xs ${click == 2 ? `text-red-500` : "" }`}>ShopeeFood</span>
                    </div>
                </>
            ),

        }
    ];
    return (
        <>
            <header className="fixed top-0 left-0 w-full bg-white shadow-lg  z-10">
                <div className="max-w-screen-xl mx-auto">
                    <div className="navbar-header flex justify-between items-center">
                        <div className="flex">
                            <div className="navbar-brand-box horizontal-logo bg-red-400">
                                <a href="/" className="logo logo-dark">
                                    <span className="logo-sm">
                                        <img src="https://t3.ftcdn.net/jpg/02/41/30/72/360_F_241307210_MjjaJC3SJy2zJZ6B7bKGMRsKQbdwRSze.jpg" alt="" className="h-20" />
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="relative md:hidden">
                                <button type="button" className="flex items-center justify-center rounded-full p-2 bg-gray-100 hover:bg-gray-200" id="page-header-search-dropdown">
                                    <i className="bx bx-search text-2xl"></i>
                                </button>
                                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg hidden" id="dropdown-menu">
                                    <form className="p-3">
                                        <div className="mb-0">
                                            <div className="flex">
                                                <input
                                                    type="text"
                                                    className="w-full border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                                                    placeholder="Search ..."
                                                    aria-label="Recipient's username"
                                                />
                                                <button
                                                    className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
                                                    type="submit"
                                                >
                                                    <i className="mdi mdi-magnify"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="relative">
                                <button type="button" className="flex items-center justify-center w-10 h-10 text-gray-600 bg-transparent rounded-full hover:bg-gray-200 focus:outline-none light-dark-mode" id="header-lang-btn">
                                    <i className="ri-earth-fill text-xl"></i>
                                </button>
                                {/* <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg hidden" id="dropdown-menu">
                                <a href="javascript:void(0);" className="flex items-center px-4 py-2 hover:bg-gray-100" data-lang="en" title="English">
                                    <img src="assets/images/flags/us.svg" alt="user-image" className="w-4 h-4 rounded mr-2"/>
                                        <span className="align-middle">English</span>
                                </a>

                                <a href="javascript:void(0);" className="flex items-center px-4 py-2 hover:bg-gray-100" data-lang="sp" title="Spanish">
                                    <img src="assets/images/flags/spain.svg" alt="user-image" className="w-4 h-4 rounded mr-2"/>
                                        <span className="align-middle">Española</span>
                                </a>

                            </div> */}
                            </div>
                            <div className="relative ms-1">
                                <button type="button" className="flex items-center justify-center w-10 h-10 text-gray-600 bg-transparent rounded-full hover:bg-gray-200 focus:outline-none light-dark-mode" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className='ri-dashboard-line text-xl'></i>
                                </button>
                                {/* <div className="dropdown-menu dropdown-menu-lg p-0 right-0 bg-white shadow-lg rounded-lg">
                                <div className="p-3 border-t-0 border-l-0 border-r-0 border-dashed">
                                    <div className="flex justify-between items-center">
                                        <h6 className="font-semibold text-sm">Web Apps</h6>
                                        <a href="#!" className="text-sm text-info hover:text-blue-500">View All Apps <i className="ri-arrow-right-s-line"></i></a>
                                    </div>
                                </div>

                                <div className="p-2 grid grid-cols-3 gap-2">
                                    <a className="dropdown-icon-item flex flex-col items-center" href="#!">
                                        <img src="assets/images/brands/github.png" alt="Github" className="w-10 h-10"/>
                                            <span className="mt-2 text-xs">GitHub</span>
                                    </a>
                                    <a className="dropdown-icon-item flex flex-col items-center" href="#!">
                                        <img src="assets/images/brands/bitbucket.png" alt="bitbucket" className="w-10 h-10"/>
                                            <span className="mt-2 text-xs">Bitbucket</span>
                                    </a>
                                    <a className="dropdown-icon-item flex flex-col items-center" href="#!">
                                        <img src="assets/images/brands/dribbble.png" alt="dribbble" className="w-10 h-10"/>
                                            <span className="mt-2 text-xs">Dribbble</span>
                                    </a>
                                    <a className="dropdown-icon-item flex flex-col items-center" href="#!">
                                        <img src="assets/images/brands/dropbox.png" alt="dropbox" className="w-10 h-10"/>
                                            <span className="mt-2 text-xs">Dropbox</span>
                                    </a>
                                    <a className="dropdown-icon-item flex flex-col items-center" href="#!">
                                        <img src="assets/images/brands/mail_chimp.png" alt="mail_chimp" className="w-10 h-10"/>
                                            <span className="mt-2 text-xs">Mail Chimp</span>
                                    </a>
                                    <a className="dropdown-icon-item flex flex-col items-center" href="#!">
                                        <img src="assets/images/brands/slack.png" alt="slack" className="w-10 h-10"/>
                                            <span className="mt-2 text-xs">Slack</span>
                                    </a>
                                </div>
                            </div> */}
                            </div>

                            <div className="relative ms-1">
                                <button type="button" className="flex items-center justify-center w-10 h-10 text-gray-600 bg-transparent rounded-full hover:bg-gray-200 focus:outline-none light-dark-mode" id="page-header-cart-dropdown" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false">
                                    <i className=' ri-shopping-bag-line text-xl'></i>
                                    <span className="absolute top-0 right-0  inline-flex items-center justify-center w-4 h-4 text-white bg-red-500 rounded-full text-xs">3<span className="sr-only">unread messages</span></span>
                                </button>

                                {/* <div className="dropdown-menu dropdown-menu-xl p-0 right-0 bg-white shadow-lg rounded-lg max-h-[300px] overflow-y-auto">
                                <div className="p-3 border-t-0 border-l-0 border-r-0 border-dashed">
                                    <div className="flex justify-between items-center">
                                        <h6 className="text-sm font-semibold">My Cart</h6>
                                        <span className="bg-warning-subtle text-warning text-xs px-2 py-1 rounded-md">7 items</span>
                                    </div>
                                </div>

                              
                                <div className="text-center p-4 hidden" id="empty-cart">
                                    <div className="bg-info-subtle text-info rounded-full h-16 w-16 mx-auto flex items-center justify-center">
                                        <i className='bx bx-cart text-4xl'></i>
                                    </div>
                                    <h5 className="my-3 text-lg">Your Cart is Empty!</h5>
                                    <a href="apps-ecommerce-products.html" className="btn btn-success">Shop Now</a>
                                </div>

                           
                                <div className="p-2">
                                    <div className="flex items-center p-2 border-b">
                                        <img src="assets/images/products/img-1.png" className="w-12 h-12 rounded-full bg-gray-100 p-2" alt="user-pic"/>
                                            <div className="ml-3 flex-grow">
                                                <h6 className="text-sm font-medium"><a href="apps-ecommerce-product-details.html" className="text-gray-800 hover:underline">Branded T-Shirts</a></h6>
                                                <p className="text-xs text-gray-500">Quantity: <span>10 x $32</span></p>
                                            </div>
                                            <h5 className="text-sm font-normal">$320</h5>
                                            <button className="ml-3 text-gray-500 hover:text-red-500"><i className="ri-close-fill text-lg"></i></button>
                                    </div>

                                   
                                </div>

                               
                                <div className="p-3 border-t border-dashed">
                                    <div className="flex justify-between items-center pb-3">
                                        <h5 className="text-sm text-gray-500">Total:</h5>
                                        <h5 className="text-sm">$1258.58</h5>
                                    </div>
                                    <a href="apps-ecommerce-checkout.html" className="btn btn-success w-full">Checkout</a>
                                </div>
                            </div> */}
                            </div>
                            <div className="ms-1 header-item hidden sm:flex">
                                <button type="button" className="flex items-center justify-center w-10 h-10 text-gray-600 bg-transparent rounded-full hover:bg-gray-200 focus:outline-none" data-toggle="fullscreen">
                                    <i className=' ri-fullscreen-fill text-xl'></i>
                                </button>
                            </div>

                            <div className="ms-1 header-item hidden sm:flex">
                                <button type="button" className="flex items-center justify-center w-10 h-10 text-gray-600 bg-transparent rounded-full hover:bg-gray-200 focus:outline-none light-dark-mode">
                                    <i className=' ri-moon-line text-xl'></i>
                                </button>
                            </div>
                            <div className="relative ms-1 header-item" id="notificationDropdown">
                                <button type="button" className="flex items-center justify-center w-10 h-10 text-gray-600 bg-transparent rounded-full hover:bg-gray-200 focus:outline-none light-dark-mode" id="page-header-notifications-dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className=' ri-notification-2-line text-xl'></i>
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-white bg-red-500 rounded-full text-xs">3<span className="sr-only">unread messages</span></span>
                                </button>
                                <div className="absolute right-0 z-10 hidden w-80 bg-white rounded-lg shadow-lg dropdown-menu" aria-labelledby="page-header-notifications-dropdown">
                                    <div className="bg-blue-500 rounded-t-lg">
                                        <div className="p-3 flex justify-between">
                                            <h6 className="m-0 text-white text-lg font-semibold">Notifications</h6>
                                            <span className="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-800 bg-gray-200 rounded">4 New</span>
                                        </div>
                                        {/* <ul className="flex border-b border-gray-200" id="notificationItemsTab" role="tablist">
                                        <li className="flex-1">
                                            <a className="block text-center py-2 font-medium text-blue-500 border-b-2 border-blue-500" data-bs-toggle="tab" href="#all-noti-tab" role="tab" aria-selected="true">All (4)</a>
                                        </li>
                                        <li className="flex-1">
                                            <a className="block text-center py-2 text-gray-500 hover:text-blue-500" data-bs-toggle="tab" href="#messages-tab" role="tab" aria-selected="false">Messages</a>
                                        </li>
                                        <li className="flex-1">
                                            <a className="block text-center py-2 text-gray-500 hover:text-blue-500" data-bs-toggle="tab" href="#alerts-tab" role="tab" aria-selected="false">Alerts</a>
                                        </li>
                                    </ul> */}
                                    </div>

                                    {/* <div className="tab-content" id="notificationItemsTabContent">
                                    <div className="tab-pane fade show active py-2 px-2" id="all-noti-tab" role="tabpanel">
                                        <div className="max-h-72 overflow-y-auto pe-2">
                                            <div className="notification-item">
                                                <div className="flex items-start">
                                                    <span className="flex items-center justify-center w-8 h-8 text-info bg-info-subtle rounded-full"><i className="bx bx-badge-check"></i></span>
                                                    <div className="ml-2 flex-grow">
                                                        <h6>Your <b>Elite</b> author Graphic Optimization <span className="text-secondary">reward</span> is ready!</h6>
                                                        <p className="mb-0"><span><i className="mdi mdi-clock-outline"></i> Just 30 sec ago</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="my-3 text-center">
                                                <button type="button" className="px-4 py-2 font-medium text-white bg-green-600 rounded hover:bg-green-700">View All Notifications <i className="ri-arrow-right-line align-middle"></i></button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade py-2 px-2" id="messages-tab" role="tabpanel">
                                        <div className="max-h-72 overflow-y-auto pe-2">
                                            <div className="notification-item">
                                                <div className="flex items-start">
                                                    <img src="assets/images/users/avatar-3.jpg" className="mr-3 rounded-full w-8 h-8" alt="user-pic" />
                                                    <div className="flex-grow">
                                                        <h6>James Lemire</h6>
                                                        <p>We talked about a project on linkedin.</p>
                                                        <p className="mb-0"><span><i className="mdi mdi-clock-outline"></i> 30 min ago</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                </div>
                            </div>

                            <div className="relative header-item topbar-user ml-8 mr-4">
                                <button
                                    type="button"
                                    className="flex justify-center items-center bg-gray-200 p-2 rounded-full w-10 h-10 focus:outline-none"
                                    id="page-header-user-dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <i className="ri-user-line text-xl"></i>
                                </button>
                                {/* <div className="absolute right-0 z-10 hidden bg-white shadow-lg rounded-md w-56 mt-2 dropdown-menu" aria-labelledby="page-header-user-dropdown">
                                <h6 className="px-4 py-2 font-semibold text-gray-700">Welcome Anna!</h6>
                                <a className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100" href="pages-profile.html">
                                    <i className="mdi mdi-account-circle text-muted text-lg mr-2"></i> Profile
                                </a>
                                <a className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100" href="apps-chat.html">
                                    <i className="mdi mdi-message-text-outline text-muted text-lg mr-2"></i> Messages
                                </a>
                                <a className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100" href="apps-tasks-kanban.html">
                                    <i className="mdi mdi-calendar-check-outline text-muted text-lg mr-2"></i> Taskboard
                                </a>
                                <a className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100" href="pages-faqs.html">
                                    <i className="mdi mdi-lifebuoy text-muted text-lg mr-2"></i> Help
                                </a>
                                <div className="border-t border-gray-200"></div>
                                <a className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100" href="pages-profile.html">
                                    <i className="mdi mdi-wallet text-muted text-lg mr-2"></i> Balance: <b>$5971.67</b>
                                </a>
                                <a className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100" href="pages-profile-settings.html">
                                    <span className="bg-green-100 text-green-600 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">New</span>
                                    <i className="mdi mdi-cog-outline text-muted text-lg mr-2"></i> Settings
                                </a>
                                <a className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100" href="auth-lockscreen-basic.html">
                                    <i className="mdi mdi-lock text-muted text-lg mr-2"></i> Lock screen
                                </a>
                                <a className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100" href="auth-logout-basic.html">
                                    <i className="mdi mdi-logout text-muted text-lg mr-2"></i> Logout
                                </a>
                            </div> */}
                            </div>

                        </div>
                    </div>
                </div>
            </header>

            <Outlet  />
            <footer className="fixed bottom-0 left-0 w-full bg-white shadow-lg ">
                <Tabs tabPosition="bottom" defaultActiveKey="1" type="card" items={items} onChange={onChange} className="w-full custom-tabs " />
            </footer>
        </>
    )
}

export default Layout