import ReactDOM from "react-dom"
const ModalAddress = () => {
    return ReactDOM.createPortal(
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                <h3 className="font-bold font-h-b text-3xl mb-6">Add a new address</h3>
                <hr />
                <form onSubmit={(e) => e.preventDefault()} className="flex flex-col">
                    <label htmlFor="user-address" className="font-t-b text-xl mt-3 mr-4">Address</label>
                    <textarea id="user-address" className="textarea textarea-bordered rounded mb-3" placeholder="Address"></textarea>
                    <button className="btn btn-dark rounded">Add Address</button>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>,
        document.querySelector('.modal-container')
    )
}

export default ModalAddress