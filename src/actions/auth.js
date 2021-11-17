import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from '@firebase/auth';
import Swal from 'sweetalert2'

import { googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types"
import { noteLogout } from './notes';
import { finishLoading, startLoading } from './ui';

// las acciones son funciones que despachan una accion
export const startLoginEmailPassword = (email, password) => {
    // función asincrona falsa
    return (dispatch) => {
        dispatch(startLoading())
        signInWithEmailAndPassword(getAuth(), email, password)
            .then(({ user }) => {
                // estos despachos son sincronos
                dispatch(login(user.uid, user.displayName))
                dispatch(finishLoading())
            })
            .catch( e => {
                console.log(e)
                dispatch( finishLoading() )
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No existe este usuario',
                  })

            })
            
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        createUserWithEmailAndPassword(getAuth(), email, password)
            .then( async({ user }) => {
                await updateProfile( getAuth().currentUser, {
                    displayName: name
                })

                console.log(user)
                
                dispatch(
                    login( user.uid, user.displayName )
                )
            })
            .catch( e => {
                console.log(e)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El usuario ya esta registrado',
                  })
            })
    }
}

export const startGoogleLogin = () => {
    return ( dispatch ) => {
        signInWithPopup(getAuth(), googleAuthProvider)
            .then( ( {user} ) => {
                dispatch(
                    login(user.uid, user.displayName)
                )
            }) 
    }
} 
export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})

export const startLogout = () => {
    return async(dispatch) => {
        await signOut(getAuth())
        
        dispatch( logout() )
        dispatch( noteLogout() )
    }
}

export const logout = () => ({
    type: types.logout,

})