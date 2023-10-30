function validator(type, ...args) {
    let data = args[0]
    console.log(data)
    if (type == 'login') {
        if (!data.email.trim() && !data.password.trim()) {
            return new Error('Enter Proper Data')
        }
    } else if (type == 'signup') {
        if (!data.userName.trim() && !data.email.trim() && !data.password.trim() && !data.confirmPassword.trim()) {
            return new Error('Enter Proper Data')
        } else if (data.userName.trim().length < 2) {
            return new Error('Enter a proper name');
        } else if (data.password != data.confirmPassword) {
            return new Error('Passwords don\'t match!')
        }
    }
}

export default validator