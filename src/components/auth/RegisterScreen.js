import React from 'react'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { setError, removeError  } from '../../actions/ui'
import { startRegisterWithEmailPasswordName } from '../../actions/auth'

export const RegisterScreen = () => {

    const dispatch = useDispatch()

    const { msgError } = useSelector(state => state.ui)

    const [formValues, handleInputChange] = useForm({
        name: 'Leonardo',
        email: 'leo@gmail.com',
        password: '123456',
        password2: '123456'
    })


    const { name, email, password, password2} = formValues

    const handleRegister = (e) => {
        e.preventDefault()
        
        if( isFormValid() ) {
            dispatch( startRegisterWithEmailPasswordName(email, password, name))
        }
    }

    const isFormValid = () => {
        if( name.trim().length === 0 ) {
            dispatch(setError('Name is required'))

            return false
        }else if( !validator.isEmail(email) ) {
            dispatch(setError('Email is not valid'))
            return false
        } else if(password !== password2 || password.length < 5) {
            dispatch(setError('El password no es igual o no tiene mas de 6 caracteres'))
            return false
        }

        dispatch( removeError() )
        return true
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>
            <form 
                onSubmit={ handleRegister }
                className="animate__animated animate__fadeIn animate__faster"
            >

                {
                    msgError && 
                    (
                        <div className="auth__alert-error">
                            { msgError }
                        </div>
                    )
                }

                <input
                    text="text"
                    placeholder="name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChange }
                />
                <input
                    text="text"
                    placeholder="email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />
                <input
                    text="password"
                    placeholder="password"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChange }
                />
                <input
                    text="password"
                    placeholder="confirm"
                    name="password2"
                    className="auth__input"
                    value={ password2 }
                    onChange={ handleInputChange }
                />

                <button
                    className="btn btn-primary btn-block mb-5"
                    type="submit"
                >
                    Register
                </button>

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>
            </form>
        </>
    )
}
