function validator(type, ...args) {
    let data = args[0]
    // console.log(data)
    if (type == 'login') {
        if (!data.email.trim()) {
            return new Error('Enter Proper Email!')
        }
        if (!data.password.trim()) {
            return new Error('Enter a password!')
        }
    } else if (type == 'signup') {
        if (!data.email.trim()) {
            return new Error('Enter Proper Email!')
        }
        if (!data.password.trim()) {
            return new Error('Enter a password!')
        } else if (data.userName.trim().length < 2) {
            return new Error('Enter a proper name');
        } else if (data.password != data.confirmPassword) {
            return new Error('Passwords don\'t match!')
        }
    }
}

export default validator