import { useState, useEffect } from "react";
import StyleSpan from "./StyleSpan";
import UserAvatar from "./User/components/Avatar";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaUserCircle, FaTshirt } from 'react-icons/fa'
import { AiFillHeart, AiOutlineSearch } from 'react-icons/ai'
import { GiHealthNormal } from 'react-icons/gi'
import { BsFillCartFill, BsCaretRightFill, BsFillPhoneFill } from 'react-icons/bs'
import { BiSearch } from 'react-icons/bi'
import { useDispatch, useSelector } from "react-redux";
import { resetAll, setDiscount, setGender, setSelectedCategories } from "../store";

/* eslint-disable */
export default function Navbar() {

    const [searchTerm, setSearchTerm] = useState('')

    const { userData: userId, loadingUser } = useSelector((state) => {
        return {
            userData: state.user.userId,
            loadingUser: state.user.loading
        }
    })
    const [form, setForm] = useState('login');
    let location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (location.pathname !== '/login'
            && location.pathname !== '/signup'
            && !userId) {
            setForm('signup');
        }
        else if (location.pathname !== '/login') {
            setForm('signup');
        }
        else if (location.pathname !== '/signup') {
            setForm('login');
        }
    }, [location]);

    // Clear Serach Bar if not on products page
    useEffect(() => {
        if (!location.pathname.includes('/products')) {
            setSearchTerm('')
        }
    }, [location])

    const toggleForm = () => {
        if (form === 'login')
            setForm('signup')
        else
            setForm('login')
    }

    const handleClothesMen = () => {
        dispatch(resetAll())
        dispatch(setSelectedCategories('Fashion'))
        dispatch(setGender('Male'))
        setSearchTerm('')
    }
    const handleClothesWomen = () => {
        dispatch(resetAll())
        dispatch(setSelectedCategories('Fashion'))
        dispatch(setGender('Female'))
        setSearchTerm('')

    }

    const handleTodaysOffer = () => {
        dispatch(resetAll())
        setSearchTerm('')

    }

    const handleB_H = () => {
        dispatch(resetAll())
        dispatch(setSelectedCategories('Beauty & Health'))
        setSearchTerm('')

    }

    const handleElectronics = () => {
        dispatch(resetAll())
        dispatch(setSelectedCategories('Electronics'))
        setSearchTerm('')

    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        <div className="navbar bg-base-100 rounded relative z-10">
            <div className="navbar-start me-4">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-72">
                        <li className="bg-base-300 rounded-full lg:ms-10 me-1 flex flex-row justify-between flex-nowrap">
                            <input value={searchTerm} onChange={handleSearchChange} className="bg-base-300 text-red-900" />
                            <Link
                                to={searchTerm.trim() ? `/products?query=${searchTerm}` : `/products`}
                                className="flex items-center justify-center">
                                <AiOutlineSearch className="text-xl fill-red-500" />
                            </Link>
                        </li>

                        <li tabIndex={0}>
                            <details>
                                <summary className="pe-0">Clothing
                                    <FaTshirt className="ms-[-5px] fill-gray-700 text-lg" />
                                </summary>
                                <ul className="p-2">
                                    <li><Link onClick={handleClothesMen} to='/products'>Men</Link></li>
                                    <li><Link onClick={handleClothesWomen} to='/products'>Women</Link></li>
                                </ul>
                            </details>

                        </li>
                        <li>
                            <Link
                                onClick={handleElectronics}
                                to='/products'>Electronics
                                <BsFillPhoneFill className="mb-1 text-sm ms-[-5px] fill-gray-700" />
                            </Link>
                        </li>
                        <li>
                            <Link className="flex flex-row items-center justify-start" onClick={handleB_H} to='/products'>
                                Beauty
                                <GiHealthNormal className="mx-[-5px] text-xs mb-0.5 fill-red-700" />
                                Health
                            </Link>
                        </li>
                        <li>
                            <Link onClick={handleTodaysOffer} to='/products'>
                                Explore More
                                <BsCaretRightFill className="ms-[-5px] mb-0.5 fill-pink-500" />
                            </Link>
                        </li>

                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost me-2 normal-case sm:hidden lg:flex lg:text-2xl text-xl font-h-b flex-wrap rounded hover:bg-transparent">MERN<StyleSpan className='lg:text-2xl text-xl'>Ecommerce</StyleSpan> </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 flex items-center">
                    <li className="bg-base-300 rounded-full ms-14 flex flex-row justify-between">
                        <input value={searchTerm} onChange={handleSearchChange} className="bg-base-300 text-red-900" />
                        <Link
                            to={searchTerm.trim() ? `/products?query=${searchTerm}` : `/products`}
                            className="flex items-center justify-center">
                            <AiOutlineSearch className="text-xl fill-red-500" />
                        </Link>
                    </li>

                    <li tabIndex={0} className="p-0">
                        <details>
                            <summary className="pe-0">Clothing
                                <FaTshirt className="ms-[-5px] fill-gray-700 text-lg" />
                            </summary>
                            <ul className="p-2">
                                <li><Link onClick={handleClothesMen} to='/products'>Men</Link></li>
                                <li><Link onClick={handleClothesWomen} to='/products'>Women</Link></li>
                            </ul>
                        </details>

                    </li>
                    <li>
                        <Link
                            onClick={handleElectronics}
                            to='/products'>Electronics
                            <BsFillPhoneFill className="mb-1 text-sm ms-[-5px] fill-gray-700" />
                        </Link>
                    </li>
                    <li>
                        <Link className="flex flex-row items-center justify-center" onClick={handleB_H} to='/products'>
                            Beauty
                            <GiHealthNormal className="mx-[-5px] text-xs mb-0.5 fill-red-700" />
                            Health
                        </Link>
                    </li>
                    <li>
                        <Link onClick={handleTodaysOffer} to='/products'>
                            Explore More
                            <BsCaretRightFill className="ms-[-5px] mb-0.5 fill-pink-500" />
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                {
                    loadingUser &&
                    <Link className="btn rounded">
                        <span className="loading loading-spinner text-error"></span>
                    </Link>

                }
                {
                    userId && !loadingUser &&
                    <>
                        <Link to={`/user/${userId}/wishlist`}>
                            <AiFillHeart className="text-4xl lg:mr-8 mr-2 fill-red-400 hover:fill-red-700 transition" />
                        </Link>
                        <Link to={`/user/${userId}/cart`}>
                            <BsFillCartFill className="text-3xl lg:mr-8 mr-2 fill-blue-400 hover:fill-pink-700 transition" />
                        </Link>
                        <Link to={`/user/${userId}`}>
                            <FaUserCircle className="text-4xl lg:mr-4 mr-0" />
                        </Link>
                    </>
                }
                {form === 'login' && !userId && !loadingUser && <Link onClick={toggleForm} className="btn rounded" to='/signup'>Signup <FaUserCircle className="text-xl mb-[2px]" /> </Link>}
                {form === 'signup' && !userId && !loadingUser && <Link onClick={toggleForm} className="btn rounded" to='/login'>Login <FaUserCircle className="text-xl mb-[2px]" /> </Link>}
            </div>
        </div>
    )
}