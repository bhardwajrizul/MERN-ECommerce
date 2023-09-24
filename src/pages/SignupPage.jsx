import Panel from "../components/Panel"
import StyleSpan from "../components/StyleSpan"

const input = `border border-black rounded-md block px-3 py-2 w-full `

export default function SignupPage() {
    return (
        <div className="flex justify-center">
            <Panel className="flex flex-col w-1/3 px-10 py-20">
                <StyleSpan>SignUp</StyleSpan>
                <form className="flex flex-col gap-5 pt-12">
                    <label htmlFor="name">Name:
                        <input type="text" className={input}/>
                    </label>
                    <label htmlFor="email">Email:
                        <input type="email" className={input} />
                    </label>
                    <label htmlFor="password">Password:
                        <input type="password" className={input}/>
                    </label>
                    <button onClick={e => e.preventDefault()} className="btn rounded mt-5">SIGNUP</button>
                </form>
            </Panel>
        </div>
    )
}