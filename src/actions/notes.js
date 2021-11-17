import { collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import Swal from 'sweetalert2'
import { db } from "../firebase/firebase-config"
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';

export const startNewNote = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }
        const doc = await addDoc(collection(db, `${ uid }/journal/notes`), newNote);
        dispatch( activeNote(doc.id, newNote) )
        dispatch( addNewNote(doc.id, newNote) )
    }
}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note,
    }
})

export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note,
    }
})

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
})

export const startLoadingNotes = (uid) => {
    return async(dispatch) => {
        const notes = await loadNotes(uid)
        dispatch(setNotes(notes))
    }
}

export const startSaveNote = ( note ) => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth

        if ( !note.url ) {
            delete note.url
        }
        const noteToFirestore = { ...note }
        delete noteToFirestore.id

        const newNote = await updateDoc( doc(db, `${ uid }/journal/notes/${note.id}`), noteToFirestore )
        dispatch( refreshNote(note.id, noteToFirestore) )
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tu nota ha sido guardada... ¡Felicidades!',
            showConfirmButton: false,
            timer: 1500
          })
    }
}

export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
})

export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {
        const { active: activeNote } = getState().notes
        Swal.fire({
            title: 'Subiendo...',
            text: 'Porfavor espere',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        })
        const fileUrl = await fileUpload(file)
        console.log(fileUrl)
        activeNote.url = fileUrl
        dispatch(startSaveNote(activeNote))
        Swal.close()
    }
}

export const startDeleting = (id) => {
    return async(dispatch, getState) => {
        const uid = getState().auth.uid
        await deleteDoc(doc(db, `${ uid }/journal/notes/${ id }`))
        dispatch(deleteNote(id))
        
    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id 
})

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
})