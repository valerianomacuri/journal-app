import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NoteScreen } from '../notes/NoteScreen'
import { JournalEntries } from './JournalEntries'
import { JournalEntry } from './JournalEntry'
import { NothingSelected } from './NothingSelected'
import { SideBar } from './SideBar'

export const JournalScreen = () => {
    const { active, notes } = useSelector(state => state.notes)
    useEffect(() => {
        console.log('Me vuelvo a renderizar')
    })
    return (
            <div 
                className="journal__main-content animate__animated animate__fadeIn animate__faster"
            >
                <SideBar>
                    <JournalEntries>
                        {
                            notes.map( note => (
                                <JournalEntry 
                                    key={note.id}
                                    { ...note } 
                                />
                            ))
                        }
                    </JournalEntries>
                </SideBar>

                <main>
                    {
                        ( active )
                        ?   <NoteScreen />
                        :   <NothingSelected />
                    }
                </main>
            </div>
    )
}
