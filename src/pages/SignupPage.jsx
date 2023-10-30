import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { resetForm, setConfirmPassword, setEmail, setName, setPassword, useAddUserMutation } from "../store"

import Panel from "../components/Panel"
import StyleSpan from "../components/StyleSpan"
import { FiLogIn } from 'react-icons/fi'

import { auth } from "../../firebase"
import { getAuth } from 'firebase/auth'
import { createUserWithEmailAndPassword } from "firebase/auth"
import handleFirebaseError from "../utils/handleFirebaseError"
import validator from '../utils/validator'
import { useNavigate, useParams } from "react-router-dom"

const input = `border border-black rounded-md block px-3 py-2 w-full `

export default function SignupPage() {
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState('');
    const navigate = useNavigate()
    const uidParam = useParams().uid;
    const [addUser] = useAddUserMutation();

    const { userName, email, password, confirmPassword, userId } = useSelector((state) => {
        return {
            userName: state.form.name,
            email: state.form.email,
            password: state.form.password,
            confirmPassword: state.form.confirmPassword,
            userId: state.user.userId
        }
    })

    const dispatch = useDispatch();

    useEffect(() => {
        if (userId) {
            navigate(`/user/${userId}`)
        }
    }, [userId])


    const handleNameChange = (e) => {
        dispatch(setName(e.target.value))
    }
    const handleEmailChange = (e) => {
        dispatch(setEmail(e.target.value))
    }
    const handlePasswordChange = (e) => {
        dispatch(setPassword(e.target.value))
    }
    const handleConfirmPasswordChange = (e) => {
        dispatch(setConfirmPassword(e.target.value))
    }


    const handleSignup = (e) => {
        e.preventDefault();
        setErr('');
        let error = validator('signup', { userName, email, password, confirmPassword });
        if (error?.message) {
            setErr(error.message);
            return;
        }
        setLoading(true);

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return getAuth().currentUser.getIdToken(/* forceRefresh */ true)
                    .then(idToken => ({ idToken, user }));
            })
            .then(({ idToken, user }) => {
                dispatch(resetForm());
                // Now you have access to both the idToken and user object
                return addUser({
                    uid: user.uid,
                    email: user.email,
                    name: userName,
                    token: idToken
                });
            })
            .then(({ data, error }) => {
                if (error) throw error;
                // handle success, if needed
                console.error('Unexpected Error!')
            })
            .catch((error) => {
                // Unified error handling
                const friendlyError = handleFirebaseError(error);
                setErr(friendlyError);
            })
            .finally(() => {
                setLoading(false);
            });
    };



    return (
        <Panel className="flex justify-center bg-base-100 my-6">
            <Panel className="flex flex-col w-1/3 px-10 py-20 rounded-lg shadow-2xl my-4">
                <h1 className='flex flex-row text-4xl font-h-b text-center items-center justify-center'>
                    <StyleSpan>Signup</StyleSpan>&nbsp;for an account
                </h1>
                <form onSubmit={handleSignup} className="flex flex-col gap-5 pt-12">
                    <label className="font-t text-md" htmlFor="name">Full Name
                        <input onChange={handleNameChange} value={userName} placeholder="Elon Musk" type="text" className={input} />
                    </label>
                    <label className="font-t text-md" htmlFor="email">Email
                        <input onChange={handleEmailChange} value={email} placeholder="elon@spacex.com" type="email" className={input} />
                    </label>
                    <label className="font-t text-md" htmlFor="password">Password
                        <input onChange={handlePasswordChange} value={password} placeholder="********" type="password" className={input} />
                    </label>
                    <label className="font-t text-md" htmlFor="password">Confirm Password
                        <input onChange={handleConfirmPasswordChange} value={confirmPassword} placeholder="********" type="password" className={input} />
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
                                SIGNUP
                                <FiLogIn className="text-xl" />
                            </button>
                    }
                </form>
            </Panel>
        </Panel>
    )
}