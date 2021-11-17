import React, { useEffect } from 'react'

export const JournalEntries = ({ children }) => {
    useEffect(() => {
        console.log('Me vuelvo a renderizar')
    })
    return (
        <div className="journal__entries">
            { children }
        </div>
    )
}