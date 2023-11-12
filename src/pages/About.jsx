export default function About() {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">About Us</h1>
                    <p className="mb-5 text-xl">
                        MERN Ecommerce is a dummy ecommerce project which was created for learning purposes.
                        Our amazing team members are
                        <a className="text-blue-400 mx-1 underline" target="_blank" href="https://www.linkedin.com/in/madhavdhingra/">Madhav Dhingra</a>
                        ,
                        <a className="text-blue-400 mx-1 underline" target="_blank" href="https://www.linkedin.com/in/snetis/">Sneha Kumari</a>
                        and myself
                        <a className="text-blue-400 mx-1 underline" target="_blank" href="https://www.linkedin.com/in/rizul/">
                        Rizul Bhardwaj
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}