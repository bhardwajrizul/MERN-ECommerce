import ReactDOM from 'react-dom';
import { useState } from 'react';


const Modal = ({ updateUser, token, uidParam, userPhone, userName }) => {

    const [name, setName] = useState(userName || '');
    const [phoneNumber, setPhoneNumber] = useState(userPhone || '');
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    // console.log(error)

    const handleUpdateUser = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setError('Enter Proper Name!')
            return;
        }
        if (!phoneNumber.trim().match(/^[6-9]\d{9}$/)) {
            setError('Enter Proper Mobile Number!')
            return;
        }
        setError(false)
        setIsUpdating(true);
        try {
            await updateUser({
                uid: uidParam,
                updateData: {
                    phoneNumber,
                    name
                },
                token
            }).unwrap()
                .then(() => setSuccess(true))
        } catch {
            // console.error(err.data.errors)
            setError('Enter Valid Data')
        } finally {
            setIsUpdating(false);
        }
    };

    let content;

    if (isUpdating) {
        content = (
            <div className='flex items-center justify-center h-40'>
                <span className="loading loading-dots loading-lg text-error"></span>
            </div>
        )
    }
    if (success) {
        content = <p className="text-center text-green-700">Data Updated Successfully</p>
    }
    if (!isUpdating && !success) {
        content = (
            <form onSubmit={handleUpdateUser}>
                <label htmlFor="user-name" className="font-t-b text-xl my-3 mr-4">Name</label>
                <input id="user-name" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded my-3" />
                <label htmlFor="user-phone" className="font-t-b text-xl my-3 mr-4">Phone</label>
                <input id="user-phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded my-3" />
                <button type="submit" className="btn btn-dark rounded w-full">Update Details</button>
            </form>
        )
    }

    return ReactDOM.createPortal(
        <dialog id="my_modal_user_details" className="modal">
            <div className="modal-box">
                <h3 className="font-h-b text-3xl mb-6">
                    {isUpdating ? 'Updating your details...' : 'Update your details'}
                </h3>
                <hr />
                {error && <p className="text-center text-red-700">{`Update Failed: ${error}`}</p>}
                {content}
            </div>
            {
                !isUpdating &&
                <form method="dialog" className="modal-backdrop">
                    <button>Close</button>
                </form>
            }
        </dialog>,
        document.querySelector('.modal-container') // Consider appending the modal directly to body or to a dedicated modal root div
    );
};

export default Modal;
