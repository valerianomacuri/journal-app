import { getAuth, onAuthStateChanged } from '@firebase/auth';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { login } from '../actions/auth';
import { startLoadingNotes } from '../actions/notes';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
    const dispatch = useDispatch()

    const [checking, setChecking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        onAuthStateChanged(getAuth(), async(user) => {
            if(user?.uid) {
                dispatch(login(user.uid, user.displayName))
                setIsLoggedIn(true)
                dispatch(startLoadingNotes(user.uid))
            } else {
                setIsLoggedIn(false)
            }

            setChecking(false)
        })
    }, [ dispatch, setChecking ])

    if(checking) {
        return (
            <h1>Cargando...</h1>
        )
    }
    return (
        <Router>
            <Switch>
                <PublicRoute 
                    path="/auth"
                    isAuthenticated={ isLoggedIn }
                    component={ AuthRouter }
                />
                <PrivateRoute
                    exact
                    path="/"
                    isAuthenticated={ isLoggedIn }
                    component={ JournalScreen }

                />
                <Redirect to="/" />
            </Switch>
        </Router>
    )
}