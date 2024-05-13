import StyleSpan from "../components/StyleSpan";

export default function About() {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold inline-block">
                        <p>About</p>
                        <span className="btn btn-ghost normal-case text-3xl font-h-b flex-wrap rounded hover:bg-transparent cursor-default text-gray-900">MERN</span>
                        <StyleSpan className='lg:text-2xl text-xl'>
                            Ecommerce
                        </StyleSpan>
                    </h1>
                    <p className="mb-5 text-xl">
                        MERN Ecommerce is a dummy ecommerce project which was created for learning purposes. More details about this project and how the website works can be found
                        <a className="ms-1 text-blue-600 underline" href="https://github.com/bhardwajrizul/MERN-ECommerce">here</a> on the github repository.
                    </p>
                </div>
            </div>
        </div>
    )
}