import { useSelector } from "react-redux";
import Panel from "../components/Panel";
import Label from "../components/User/components/Label";
import { useNavigate, useParams, Link } from "react-router-dom";
import StyleSpan from "../components/StyleSpan";
import UserAvatar from "../components/User/components/Avatar";
import UserAddress from "../components/User/components/UserAddress";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { getAuth } from "firebase/auth";
import Button from "../components/Button";
import Modal from "../components/User/components/Modal";
import ModalAddress from "../components/User/components/ModalAddress";
import { useEffect, useState } from "react";
import { useGetUserQuery, useUpdateUserDataMutation } from "../store";
import UserData from "../components/User/components/UserData";
import Skeleton from "../components/Skeleton";

function ProfilePage() {
    const [logOutLoading, setLogOutLoading] = useState(false)
    const navigate = useNavigate();
    const uidParam = useParams().uid


    const { userId, loading, token } = useSelector((state) => {
        return {
            userId: state.user.userId,
            loading: state.user.loading,
            token: state.user.token,
        }
    })

    const {
        data,
        error,
        isLoading,
        isFetching
    } = useGetUserQuery(
        { uid: uidParam, token: token },
        {
            skip: !userId || !token
        }
    );

    const [updateUser] = useUpdateUserDataMutation();

    const handleLogOut = (e) => {
        e.preventDefault()
        setLogOutLoading(true)
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                navigate('/login')
                setLogOutLoading(false)
            })
            .catch((error) => {
                // An error happened.
                console.error("Error signing out:", error);
            });
    }
    let content;
    if (error) {
        console.error(error)
        content = (
            <div className="flex flex-col items-start justify-start">
                <h1 className="mx-auto my-10 px-6 py-4 rounded bg-red-400">{`Something Went Wrong!`}</h1>
                <h1 className="mx-auto my-10 px-6 py-4 rounded bg-red-400">{`Status : ${error.originalStatus}`}</h1>
            </div>
        )
    } 
    else if (!loading && !isLoading && !isFetching && userId === uidParam && token && data) {
        content = (
            <div className="flex flex-row flex-wrap bg-base-100 px-10 py-8 mx-10 rounded-lg w-full">
                <div className="lg:w-1/3">
                    <UserAvatar />
                </div>
                <div className="flex flex-col w-full lg:w-2/3">
                    <div className="flex flex-row flex-wrap items-start justify-center content-start bg-white lg:ml-10 lg:my-4 p-4">
                        <UserData
                            userName={data?.name || "Not Provided"}
                            userEmail={data?.email || "Not Provided"}
                            userId={data?.firebaseUID || "Not Provided"}
                            userAddress={data?.address || "Not Provided"}
                            userPhone={data?.phoneNumber || "Not Provided"}
                        />
                    </div>
                    <div className="items-center justify-center flex flex-row flex-wrap">
                        <button className="mr-3 my-1 btn rounded btn-dark update-details" onClick={() => document.getElementById('my_modal_user_details').showModal()}>Update Details</button>
                        <Modal
                            userName={data?.name}
                            userPhone={data?.phoneNumber}
                            updateUser={updateUser}
                            token={token}
                            uidParam={uidParam}
                        />
                        <button className="mr-3 my-1 btn rounded btn-dark update-address" onClick={() => document.getElementById('my_modal_address').showModal()}>Update Address</button>
                        <ModalAddress
                            userAddress={data?.address}
                            token={token}
                            uidParam={uidParam}
                            updateUser={updateUser}
                        />
                        <Link to={`/user/${userId}/orders`}>
                            <button className='mr-3 my-1 btn rounded btn-dark'>Show Orders</button>
                        </Link>
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
                    {
                        isFetching && <Skeleton times={1} className='w-full mx-14 h-96' />
                    }
                    {!isFetching && content}
                </div>
            </div>
            {
                data && !isFetching &&
                <button onClick={handleLogOut} className="btn btn-rounded text-center mt-10">
                    {
                        logOutLoading
                            ? <span className="loading loading-spinner text-error mx-auto mt-4"></span>
                            : `Logout`
                    }
                </button>
            }
            {
                !userId &&
                !token &&
                <div className="alert alert-error p-10 mb-10 w-96 flex flex-col">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-20 w-20" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span className="font-t-b text-2xl text-gray-800">You are not logged in!</span>
                    <span className="font-t text-xl text-white">Login to Manage your profile!</span>

                </div>
            }
        </Panel>
    )
}

export default ProfilePage