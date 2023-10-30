import { useSelector } from "react-redux";
import Panel from "../components/Panel";
import Label from "../components/User/components/Label";
import { useNavigate, useParams } from "react-router-dom";
import StyleSpan from "../components/StyleSpan";
import UserAvatar from "../components/User/components/Avatar";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import Button from "../components/Button";
import Modal from "../components/User/components/Modal";
import ModalAddress from "../components/User/components/ModalAddress";
import { useState } from "react";

function ProfilePage() {
    const [logOutLoading, setLogOutLoading] = useState(false)
    const navigate = useNavigate();
    const uidParam = useParams().uid


    const { userId, loading, userEmail } = useSelector((state) => {
        return {
            userId: state.user.userId,
            userEmail: state.user.userEmail,
            loading: state.user.loading
        }
    })

    const handleLogOut = (e) => {
        e.preventDefault()
        setLogOutLoading(true)
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                setLogOutLoading(false)
                navigate('/login')
            })
            .catch((error) => {
                // An error happened.
                console.error("Error signing out:", error);
            });
    }

    let content;
    console.log(userId, uidParam)

    if (loading) {
        content = <span className="loading loading-spinner text-error loading-lg"></span>
    } else if (!loading && userId && userId === uidParam) {
        content = (
            <div className="flex flex-row bg-base-100 px-10 py-8 mx-10 rounded-lg w-full">
                <div>
                    <UserAvatar />
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row flex-wrap items-start justify-center content-start bg-white ml-10 my-4 p-4">
                        <Label title='Name'>
                            <span className="font-t text-sm text-gray-700">{`Rizul Bhardwaj`}</span>
                        </Label>
                        <Label title='Email'>
                            <span className="font-t text-sm text-gray-700">{userEmail}</span>
                        </Label>
                        <Label title='Userid'>
                            <span className="font-t text-sm text-gray-700">{userId}</span>
                        </Label>
                        <Label title='Phone'>
                            <span className="font-t text-sm text-gray-700">{`${'Not Provided'}`}</span>
                        </Label>
                        <Label classname='flex-col pb-4 w-full h-72 overflow-hidden overflow-y-scroll' contentClass='flex flex-col w-full' title='Address'>
                            <div className="flex flex-row justify-center items-center w-full mb-4">
                                <label className="font-t-b mr-10" htmlFor="">Address 1</label>
                                <div className="font-t text-sm text-gray-700 w-96 h-24 bg-base-300 mx-2 text-center p-2">{`${'Not Provided'}`}</div>
                            </div>
                            <div className="flex flex-row justify-center items-center w-full mb-4">
                                <label className="font-t-b mr-10" htmlFor="">Address 2</label>
                                <div className="font-t text-sm text-gray-700 w-96 h-24 bg-base-300 mx-2 text-center p-2">{`${'Not Provided'}`}</div>
                            </div>
                            <div className="flex flex-row justify-center items-center w-full mb-4">
                                <label className="font-t-b mr-10" htmlFor="">Address 3</label>
                                <div className="font-t text-sm text-gray-700 w-96 h-24 bg-base-300 mx-2 text-center p-2">{`${'Not Provided'}`}</div>
                            </div>
                        </Label>
                    </div>
                    <div className="items-center justify-center flex flex-row flex-wrap">
                        <button className="mr-3 btn rounded btn-dark" onClick={() => document.getElementById('my_modal_2').showModal()}>Update Details</button>
                        <Modal />
                        <button className="mr-3 btn rounded btn-dark" onClick={() => document.getElementById('my_modal_3').showModal()}>Add Address</button>
                        <ModalAddress />
                        <button className='mr-3 btn rounded btn-dark'>Show Orders</button>
                    </div>
                </div>

            </div>
        )
    }

    return (
        <Panel className='py-8 flex flex-col items-center justify-center'>
            <h1 className="text-center font-h-b text-4xl">
                <StyleSpan>Manage</StyleSpan> Your Profile
            </h1>
            <div className="flex flex-row flex-wrap mt-10 justify-center w-full">
                <div className="w-full flex items-center justify-center">
                    {content}
                </div>
            </div>
            <button onClick={handleLogOut} className="btn btn-rounded text-center mt-10">
                {
                    logOutLoading
                        ? <span className="loading loading-spinner text-error mx-auto mt-4"></span>
                        : `Logout`
                }
            </button>
        </Panel>
    )
}

export default ProfilePage