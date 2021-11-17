import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase/firebase-config"

export const loadNotes = async( uid ) => {
    const notes = []
    const querySnapshot = await getDocs(collection(db, `${ uid }/journal/notes`));
        querySnapshot.forEach((doc) => {
        
            notes.push({
                id: doc.id,
                ...doc.data()
            })
        });
    
    console.log(notes)
    return notes
}
