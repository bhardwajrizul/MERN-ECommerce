import StyleSpan from "./StyleSpan";

/* eslint-disable */
export default function Navbar() {
    return (
        <div className="navbar bg-base-100 rounded">
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
                                <li><a>Children</a></li>

                            </ul>
                        </li>
                        <li><a>Electronics</a></li>
                        <li><a>Kitchen</a></li>

                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-2xl font-h-b rounded hover:bg-transparent"> MERN<StyleSpan>Ecommerce</StyleSpan> </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Today's Offers</a></li>
                    <li tabIndex={0}>
                        <details>
                            <summary>Clothing</summary>
                            <ul className="p-2">
                                <li><a>Men</a></li>
                                <li><a>Women</a></li>
                                <li><a>Children</a></li>

                            </ul>
                        </details>
                    </li>
                    <li><a>Electronics</a></li>
                    <li><a>Kitchen</a></li>

                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn rounded">Login</a>
            </div>
        </div>
    )
}