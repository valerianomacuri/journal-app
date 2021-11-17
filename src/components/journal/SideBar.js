import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth'
import { startNewNote } from '../../actions/notes'

export const SideBar = ( { children } ) => {
    const dispatch = useDispatch()
    const { name } = useSelector(state => state.auth)

    const handleLogout = () => {
        dispatch(startLogout())
        console.log('start Logout')
    }
    const handleAddNew = () => {
        dispatch(startNewNote())
    }
    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar">
                <h3>
                    <i className="far fa-moon"></i>
                    <span>{ name }</span>
                </h3>
                <button 
                    className="btn" 
                    onClick={ handleLogout }
                >
                    <i className="fas fa-sign-out-alt fa-2x"></i>
                </button>

                
            </div>
            <div 
                className="journal__new-entry"
                onClick={ handleAddNew }
            >
                <i className="far fa-calendar-plus fa-5x"></i>
                <p>
                    New entry
                </p>
            </div>
            { children }
        </aside>
    )
}
