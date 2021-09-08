export const signUpErrors = (err) => {
    let errors = { email: '', password: '' }

    if (err.message.includes("email")) errors.email = 'Email incorrect'

    if (err.message.includes("password")) errors.email = 'Le mot de passe doit comporter au minimum 8 caractères'

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
        errors.email = 'Cet email est dejà pris'

    return errors

}

export const signInErrors = err => {
    let errors = { email: '', password: '' }

    if (err.message.includes("email")) errors.email = 'Email incorrect'

    if (err.message.includes("password")) errors.password = 'Password incorrect'

    errors = { email: "Mail Inconnu", password: "Password Inconnu" }
    return errors
}