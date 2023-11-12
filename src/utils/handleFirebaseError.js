const handleFirebaseError = (error) => {
    switch (error.code) {
        case 'auth/invalid-email':
            return 'The email address is not valid.';
        case 'auth/user-disabled':
            return 'This user account has been disabled.';
        case 'auth/user-not-found':
            return 'There is no user corresponding to the provided email.';
        case 'auth/wrong-password':
            return 'The password is incorrect.';
        case 'auth/email-already-in-use':
            return 'The email address is already in use by another account.';
        case 'auth/weak-password':
            return 'The password is too weak. Please choose a stronger password.';
        case 'auth/invalid-login-credentials':
            return 'Invalid login credentials. Please try again.';
        case 'auth/too-many-requests':
            return 'Too Many Requests from this IP try again later';
        default:
            return 'An error occurred. Please try again.';
    }
}

export default handleFirebaseError


