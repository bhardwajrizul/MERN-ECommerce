import Panel from "../components/Panel"
import StyleSpan from "../components/StyleSpan"
import { FiLogIn } from 'react-icons/fi'
import { useEffect, useState } from "react"
import { auth } from "../../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import handleFirebaseError from "../utils/handleFirebaseError"

import { useSelector, useDispatch } from "react-redux"

import { resetForm, setEmail, setPassword } from "../store"
import validator from "../utils/validator"
import { useNavigate, useParams } from "react-router-dom"

export default function LoginPage() {
    const [loading, setLoading] = useState(false)
    // const [showLoginBtn, setShowLoginBtn] = useState(true)
    const [err, setErr] = useState('');

    const naviagte = useNavigate()

    const { email, password, userId, token } = useSelector((state) => {
        return {
            email: state.form.email,
            password: state.form.password,
            userId: state.user.userId,
            token: state.user.token
        }
    })
    const dispatch = useDispatch()

    // onAuthStateChanged will update userId and token state 
    // when signInWithEmailAndPassword is called
    useEffect(() => {
        if (userId && token && !loading) {
            naviagte(`/user/${userId}`)
        }
    }, [userId, token, loading])


    const handleEmailChange = (e) => {
        dispatch(setEmail(e.target.value))
    }
    const handlePasswordChange = (e) => {
        dispatch(setPassword(e.target.value))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErr('');
        let error = validator('login', { email, password })
        if (error?.message) {
            setErr(error.message)
            return;
        }

        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // onAuthStateChanged event will update state of userId and token
                // using useEffect we naviagte to profile when state is updated
                dispatch(resetForm())
            })
            .catch((error) => {
                const friendlyError = handleFirebaseError(error)
                setErr(friendlyError)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <Panel className="flex justify-center my-4 bg-base-100">
            <Panel className="flex flex-col lg:w-1/3 px-10 py-20 rounded-lg shadow-2xl my-4">
                <h1 className='flex flex-row text-4xl font-h-b text-center items-center justify-center'>
                    <StyleSpan>Login</StyleSpan>&nbsp;to your account
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 pt-14">
                    <label className="font-t text-md" htmlFor="email">Email
                        <input placeholder="elon@spacex.com" type="email" name="EmailId" id="0" value={email} onChange={handleEmailChange} className="border border-black block rounded-md w-full px-3 py-2" />
                    </label>
                    <label className="font-t text-md" htmlFor="password">Password
                        <input placeholder="********" type="password" name="Password" id="1" value={password} onChange={handlePasswordChange} className="border border-black block rounded-md w-full px-3 py-2" />
                    </label>
                    {err &&
                        <label className="font-t text-md text-red-500">
                            {err}
                        </label>
                    }
                    {
                        loading
                            ? <span className="loading loading-spinner text-error mx-auto mt-4"></span>
                            : <button type='submit' className="btn rounded">
                                LOGIN
                                <FiLogIn className="text-xl" />
                            </button>
                    }
                </form>
            </Panel>
        </Panel>
    )
}