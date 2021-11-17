import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/authReducer";
import { notesReducer } from "../reducers/notesReducer";
import { uiReducer } from "../reducers/uiReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


// La función combineReducers devuelve un objeto cuyos valores 
// son diferentes funciones reductoras en una única 
// función reductora que puedes enviar a createStore.

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer,

})


//El store contiene todo el árbol de estado de tu aplicación. 
// La única forma de cambiar el estado que contiene es 
// despachando (enviando) una acción.

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
    
)