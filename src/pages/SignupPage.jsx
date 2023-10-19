import Panel from "../components/Panel"
import StyleSpan from "../components/StyleSpan"
import {FiLogIn} from 'react-icons/fi'


const input = `border border-black rounded-md block px-3 py-2 w-full `

export default function SignupPage() {
    return (
        <Panel className="flex justify-center bg-base-100 my-6">
            <Panel className="flex flex-col w-1/3 px-10 py-20 rounded-lg shadow-2xl my-4">
                <h1 className='flex flex-row text-4xl font-h-b text-center items-center justify-center'>
                    <StyleSpan>Signup</StyleSpan>&nbsp;for an account
                </h1>
                <form className="flex flex-col gap-5 pt-12">
                    <label className="font-t text-md" htmlFor="name">Full Name
                        <input placeholder="Elon Musk" type="text" className={input}/>
                    </label>
                    <label className="font-t text-md" htmlFor="email">Email
                        <input placeholder="elon@spacex.com" type="email" className={input} />
                    </label>
                    <label className="font-t text-md" htmlFor="password">Password
                        <input placeholder="********" type="password" className={input}/>
                    </label>
                    <button onClick={e => e.preventDefault()} className="btn rounded mt-10  ">
                        SIGNUP
                        <FiLogIn className="text-xl" />
                    </button>
                </form>
            </Panel>
        </Panel>
    )
}