function validateLoginInfo(values) {
    let errors = {}
    if (!values.username.trim()) {
        errors.username = "Username required!"
    }
    if (!values.password) {
        errors.password = "Password required!"
    } else if (values.password.length < 6) {
        errors.password = "Password must be longer than 6 characters!"
    }
    return errors;
}

export default function validateRegisterInfo(values) {
    let errors = {};

    if (!values.username.trim()) {
        errors.username = "Username required!"
    }
    if (!values.email) {
        errors.email = "Email required!"
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email address is not valid!"
    }
    if (!values.password) {
        errors.password = "Password required!"
    } else if (values.password.length < 6) {
        errors.password = "Password must be longer than 6 characters!"
    }
    if (!values.repassword) {
        errors.repassword = "You must repeat your password!"
    } else if (values.repassword !== values.password) {
        errors.repassword = "The passwords don't match!"
    }

    return errors;
}
export const validateLogin = validateLoginInfo;