import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types"


describe('authReducer', () => {
    let initialState = {}
    test('debe retornar el estado inicial', () => {
        expect(authReducer(initialState, {})).toEqual(initialState)
    })

    

    test('debe de realizar el login', () => {

        const action = {
            type: types.login,
            payload: {
                uid: 'abc',
                displayName: 'Leonardo Valeriano'
            }
        } 
        expect(authReducer(initialState, action)).toEqual({
            uid: 'abc',
            name: 'Leonardo Valeriano'
        })
    })

    test('debe de realizar el logout', () => {
        const initState = {
            uid: 'abc',
            name: 'Leonardo Valeriano'
        }
        const action = {
            type: types.logout
        } 
        const state = authReducer(initState, action)

        expect( state ).toEqual({})
    })
    
    test('no debe hacer cambios', () => {
        const initState = {
            uid: 'abc',
            name: 'Leonardo Valeriano'
        }
        const action = {
            type: 'kndkknindsovi'
        } 
        const state = authReducer(initState, action)

        expect( state ).toEqual(initState)
    })
})
