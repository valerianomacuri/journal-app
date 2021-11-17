import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { startDeleting, startSaveNote, startUploading } from '../../actions/notes'



export const NotesAppBar = () => {

    const dispatch = useDispatch()
    const { active } = useSelector(state => state.notes)
    const [date, setDate] = useState('')

    const handleSave = () => {
        console.log(active)
        dispatch(startSaveNote(active))
    }

    const handleDelete = () => {
        Swal.fire({
            title: '¿Esta seguro de realizar esta acción?',
            text: "No se podra revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Borrado',
                    'Tu nota ha sido borrada.',
                    'success'
                )
                dispatch(startDeleting(active.id))
            }
        })
    }

    const handlePictureClick = () => {
        document.getElementById('fileSelector').click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            dispatch(startUploading(file))
        }
    }

    const getCurrentDate = useCallback(() => {
        const hoy = moment().format('LLL');
        setDate(hoy)
    }, [])

    useEffect(() => {
        getCurrentDate()
    }, [])
    
    useEffect(() => {
        setInterval(getCurrentDate, 60000)
        return () => {
            clearInterval(getCurrentDate);
        }
    },[ getCurrentDate ])
    
    return (
        <div className="notes__appbar">
            <span>{ date }</span>
            <input 
                id="fileSelector"
                type="file"
                name="file"
                style={{ display: 'none' }}
                onChange={ handleFileChange }
            />

            <div>
                <button
                    className="btn"
                    onClick={ handleDelete }
                >
                    <i className="fas fa-trash fa-2x"></i>
                </button>
                <button 
                    className="btn"
                    onClick={ handlePictureClick }
                >
                    <i className="far fa-images fa-2x"></i>
                </button>
                <button 
                    className="btn"
                    onClick={ handleSave }
                >
                    <i className="far fa-save fa-2x"></i>
                </button>
            </div>

        </div>
    )
}
