export default function Contact() {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Contact Us</h1>
                    <div className="mb-5 text-xl">
                        Contact through linked in or visit my website for more contact details.
                        <div className="flex flex-col p-4">
                            <a className="text-blue-400 mx-1 underline mb-4" target="_blank" href="https://www.linkedin.com/in/rizul/">
                                LinkedIn
                            </a>
                            <a className="text-blue-400 mx-1 underline" target="_blank" href="https://rizul.in/">
                                Visit Website
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}