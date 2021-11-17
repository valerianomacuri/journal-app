import { types } from "../types/types"

const initialState = {
    loading: false,
    msgError: null,
    loading: false,
}

export const uiReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.uiSetError:
            return {
                ...state,
                msgError: action.payload
            }

        case types.uiRemoveError:
            return {
                ...state,
                msgError: null
            }
        case types.uiStartLogin:
            return {
                ...state,
                loading: action.payload
            }
        case types.uiFinishLogin:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}