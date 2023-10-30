import { useState, useEffect } from "react";
import StyleSpan from "./StyleSpan";
import UserAvatar from "./User/components/Avatar";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux";
import { resetAll, setDiscount, setGender, setSelectedCategories } from "../store";

/* eslint-disable */
export default function Navbar() {
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
    }, [location]);

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
    }
    const handleClothesWomen = () => {
        dispatch(resetAll())
        dispatch(setSelectedCategories('Fashion'))
        dispatch(setGender('Female'))
    }

    const handleTodaysOffer = () => {
        dispatch(resetAll())
        dispatch(setDiscount(40))
    }

    const handleB_H = () => {
        dispatch(resetAll())
        dispatch(setSelectedCategories('Beauty & Health'))
    }

    const handleElectronics = () => {
        dispatch(resetAll())
        dispatch(setSelectedCategories('Electronics'))
    }

    return (
        <div className="navbar bg-base-100 rounded relative z-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Today's Offers</a></li>
                        <li>
                            <a>Clothing</a>
                            <ul className="p-2">
                                <li><a>Men</a></li>
                                <li><a>Women</a></li>

                            </ul>
                        </li>
                        <li><a>Electronics</a></li>
                        <li><a>Kitchen</a></li>

                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-2xl font-h-b flex flex-wrap rounded hover:bg-transparent">MERN<StyleSpan>Ecommerce</StyleSpan> </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link onClick={handleTodaysOffer} to='/products'>Today's Offers</Link></li>
                    <li tabIndex={0}>
                        <details>
                            <summary>Clothing</summary>
                            <ul className="p-2">
                                <li><Link onClick={handleClothesMen} to='/products'>Men</Link></li>
                                <li><Link onClick={handleClothesWomen} to='/products'>Women</Link></li>

                            </ul>
                        </details>
                    </li>
                    <li>
                        <Link
                            onClick={handleElectronics}
                            to='products'>Electronics
                        </Link>
                    </li>
                    <li>
                        <Link onClick={handleB_H} to='products'>Beauty & Health</Link>
                    </li>

                </ul>
            </div>
            <div className="navbar-end">
                {
                    loadingUser &&
                    <Link className="btn rounded">
                        <span className="loading loading-spinner text-error loading-lg"></span> 
                    </Link>
                    
                }
                {
                    userId && !loadingUser && <Link to={`/user/${userId}`}>
                        <FaUserCircle className="text-4xl mr-4" />
                    </Link>
                }
                {form === 'login' && !userId && !loadingUser && <Link onClick={toggleForm} className="btn rounded" to='/signup'>Signup <FaUserCircle className="text-xl mb-[2px]" /> </Link>}
                {form === 'signup' && !userId && !loadingUser && <Link onClick={toggleForm} className="btn rounded" to='/login'>Login <FaUserCircle className="text-xl mb-[2px]" /> </Link>}
            </div>
        </div>
    )
}