import ReactDOM from "react-dom"
import { useState } from "react";
const ModalAddress = ({userAddress, token, updateUser, uidParam}) => {

    const [address, setAddress] = useState(userAddress || '');
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(false);
    // console.log(error)

    const handleUpdateUser = async (e) => {
        e.preventDefault();

        if (address.trim().length < 15) {
            setError('Enter a proper address!')
            return;
        }
        setError(false)
        setIsUpdating(true);
        try {
            await updateUser({
                uid: uidParam,
                updateData: {
                    address
                },
                token
            }).unwrap()
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

    else if (!isUpdating) {
        content = (
            <form onSubmit={handleUpdateUser} className="flex flex-col">
                    <label htmlFor="user-address" className="font-t-b text-xl mt-3 mr-4">Address</label>
                    <textarea value={address} onChange={e => setAddress(e.target.value) } id="user-address" className="textarea textarea-bordered rounded mb-3" placeholder="Address"></textarea>
                    <button className="btn btn-dark rounded">Update Address</button>
            </form>
        )
    }


    return ReactDOM.createPortal(
        <dialog id="my_modal_address" className="modal">
            <div className="modal-box">
                <h3 className="font-h-b text-3xl mb-6">
                    {isUpdating ? 'Adding new address...' : 'Add a new address'}
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
        document.querySelector('.modal-container')
    )
}

export default ModalAddress
