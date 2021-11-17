import React, { useEffect } from 'react'
import moment from 'moment'
import { activeNote } from '../../actions/notes'
import { useDispatch } from 'react-redux'

export const JournalEntry = ({title, body, date, url, id}) => {
    const dispatch = useDispatch()
    const noteDate = moment(date)
    const handleEntryClick = () => {
        dispatch(
            activeNote(id, {
                id, title, date, body, url
            })
        )
    }
    useEffect(() => {
        console.log('Me vuelvo a renderizar')
    })
    return (
        <div 
            className="journal__entry animate__animated animate__fadeIn animate__faster"
            onClick={ handleEntryClick }
        >
            {
                url &&
                <div 
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: 'url(https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v535batch2-mynt-43.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=9f602de67a347b7c50ef8eeac3835189)',
                        backgroundPosition: 'center'
                    }}
                >

                </div>
            }
            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    { title }
                </p>
                <p className="journal__entry-content">
                    { body }
                </p>
            </div>
            <div className="journal__entry-date-box">
                <span>{ noteDate.format('dddd') }</span>
                <h4>{ noteDate.format('Do') }</h4> 
            </div>
        </div>
    )
}
