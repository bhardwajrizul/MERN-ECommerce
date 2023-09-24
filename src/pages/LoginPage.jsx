import Panel from "../components/Panel"
import StyleSpan from "../components/StyleSpan"

export default function LoginPage() {
    return (
        <div className="flex justify-center">
            <Panel className="flex flex-col w-1/3 px-10 py-28">
                <StyleSpan>Login</StyleSpan>
                <form className="flex flex-col gap-5 pt-16">
                    <label htmlFor="email">Email:
                        <input type="email" name="EmailId" id="0" className="border border-black block rounded-md w-full px-3 py-2" />
                    </label>
                    <label htmlFor="password">Password:
                        <input type="password" name="Password" id="1" className="border border-black block rounded-md w-full px-3 py-2" />
                    </label>
                    <button onClick={e => e.preventDefault()} className="btn rounded mt-5">LOGIN</button>
                </form>
            </Panel>
        </div>
    )
}