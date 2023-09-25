import Panel from "../components/Panel"
import StyleSpan from "../components/StyleSpan"
import Button from "../components/Button"

export default function LoginPage() {
    return (
        <Panel className="flex justify-center my-4 bg-base-100">
            <Panel className="flex flex-col w-1/3 px-10 py-20 rounded-lg shadow-2xl my-4">
                <h1 className='flex flex-row text-4xl font-h-b text-center items-center justify-center'>
                    <StyleSpan>Login</StyleSpan>&nbsp;to your account
                </h1>
                <form className="flex flex-col gap-5 pt-14">
                    <label className="font-t text-md" htmlFor="email">Email
                        <input placeholder="elon@spacex.com" type="email" name="EmailId" id="0" className="border border-black block rounded-md w-full px-3 py-2" />
                    </label>
                    <label className="font-t text-md" htmlFor="password">Password
                        <input placeholder="********" type="password" name="Password" id="1" className="border border-black block rounded-md w-full px-3 py-2" />
                    </label>
                    <button dark onClick={e => e.preventDefault()} className="btn rounded mt-10">LOGIN</button>
                </form>
            </Panel>
        </Panel>
    )
}