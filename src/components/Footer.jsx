import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
            <nav className="grid lg:grid-flow-col gap-4">
                <Link to={'/aboutus'} className="link link-hover text-xl font-h">| About us |</Link>
                <Link to={'/contact'} className="link link-hover text-xl font-h">| Contact |</Link>
                <Link to={'/products'} className="link link-hover text-xl font-h">| Shop More! |</Link>
                <Link to={'/products/new'} className="link link-hover text-xl font-h">| Add Products |</Link>
                <Link to={'/terms-and-conditions'} className="link link-hover text-xl font-h">| Terms & Conditions |</Link>

            </nav>
            <nav className="my-[-20px]">
                <div className="grid grid-flow-col gap-1 ">
                    <a className="hover:opacity-70 mx-2" target="_blank" href="https://www.linkedin.com/in/rizul/">
                        <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" id="linkedin"><path d="M32.728 38.651H6.531c-3.459 0-6.273-2.808-6.273-6.26V6.26C.258 2.808 3.072 0 6.531 0h26.197C36.186 0 39 2.808 39 6.26v26.132c0 3.452-2.814 6.259-6.272 6.259Zm-19.379-6.698h.008V15.281H8.17v16.672h5.178ZM10.76 13.004a2.998 2.998 0 0 0 3.002-3.002A3.008 3.008 0 0 0 10.76 7a3.003 3.003 0 0 0-3.002 3.002 3.003 3.003 0 0 0 3.002 3.002Zm21.998 18.95v-9.14c0-4.491-.975-7.946-6.215-7.946-2.519 0-4.21 1.38-4.905 2.69h-.07v-2.277h-4.967v16.672h5.178v-8.25c0-2.176.413-4.281 3.11-4.281 2.652 0 2.691 2.488 2.691 4.421v8.11h5.178Z"></path></svg>
                    </a>
                    <a className="hover:opacity-70 mx-2" target="_blank" href="https://github.com/bhardwajrizul/MERN-Ecommerce">
                        <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 16 16" id="github"><path d="M7.999 0C3.582 0 0 3.596 0 8.032a8.031 8.031 0 0 0 5.472 7.621c.4.074.546-.174.546-.387 0-.191-.007-.696-.011-1.366-2.225.485-2.695-1.077-2.695-1.077-.363-.928-.888-1.175-.888-1.175-.727-.498.054-.488.054-.488.803.057 1.225.828 1.225.828.714 1.227 1.873.873 2.329.667.072-.519.279-.873.508-1.074-1.776-.203-3.644-.892-3.644-3.969 0-.877.312-1.594.824-2.156-.083-.203-.357-1.02.078-2.125 0 0 .672-.216 2.2.823a7.633 7.633 0 0 1 2.003-.27 7.65 7.65 0 0 1 2.003.271c1.527-1.039 2.198-.823 2.198-.823.436 1.106.162 1.922.08 2.125.513.562.822 1.279.822 2.156 0 3.085-1.87 3.764-3.652 3.963.287.248.543.738.543 1.487 0 1.074-.01 1.94-.01 2.203 0 .215.144.465.55.386A8.032 8.032 0 0 0 16 8.032C16 3.596 12.418 0 7.999 0z"></path></svg>
                    </a>
                </div>

            </nav>
            <aside>
                <p>Copyright © 2023 - All right reserved by MERN-Ecommerce</p>
                <p>Created by -
                    {/* Rizul, Madhav and Sneha */}
                    <a className="text-blue-400 mx-1 underline" target="_blank" href="https://www.linkedin.com/in/rizul/">Rizul</a>
                </p>

            </aside>
        </footer>
    )
}