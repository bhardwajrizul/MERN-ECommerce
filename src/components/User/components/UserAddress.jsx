import Label from "./Label"
const UserAddress = ({userAddress}) => {
    return (
        <Label classname='flex-col pb-4 w-full h-40 overflow-hidden overflow-y-scroll' contentClass='flex flex-col w-full' title='Address'>
            <div className="flex flex-row justify-center items-center w-full mb-4">
                <div className="font-t text-sm text-gray-700 w-96 min-h-24 bg-base-300 mx-2 text-center p-2">{`${userAddress}`}</div>
            </div>
        </Label>
    )
}

export default UserAddress