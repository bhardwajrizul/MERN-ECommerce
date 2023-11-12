import Label from "./Label"
import UserAddress from "./UserAddress"

function UserData({userEmail, userId, userName, userPhone, userAddress}) {
    return (
        <>
            <Label title='Name'>
                <span className="font-t text-sm text-gray-700">{userName}</span>
            </Label>
            <Label title='Email'>
                <span className="font-t text-sm text-gray-700">{userEmail}</span>
            </Label>
            <Label title='Userid'>
                <span className="font-t text-sm text-gray-700">{userId}</span>
            </Label>
            <Label title='Phone'>
                <span className="font-t text-sm text-gray-700">{`${userPhone}`}</span>
            </Label>
            <UserAddress userAddress={userAddress} />
        </>
    )
}

export default UserData