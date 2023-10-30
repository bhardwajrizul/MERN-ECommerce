import ReactDOM from "react-dom"
const Modal = () => {
    return ReactDOM.createPortal(
        <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
                <h3 className="font-bold font-h-b text-3xl mb-6">Update your details</h3>
                <hr />
                <form onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="user-name" className="font-t-b text-xl my-3 mr-4">Name</label>
                    <input id="user-name" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded my-3" />
                    <label htmlFor="user-phone" className="font-t-b text-xl my-3 mr-4">Phone</label>
                    <input id="user-phone" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs rounded my-3" />
                    
                    <button className="btn btn-dark rounded w-full">Update Details</button>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>,
        document.querySelector('.modal-container')
    )
}

export default Modal