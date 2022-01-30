import { types } from "../../types/types";

describe('Pruebas con nuestros tipos', () => {
  test("debe de tener estos tipos", () => {

    expect(types).toEqual({
        login:          '[Auth] Login',
        logout:         '[Auth] Logout',
    
        uiSetError:     '[UI] Set Error',
        uiRemoveError:  '[UI] Remove Error',
    
        uiStartLogin:   '[UI] Start Login',
        uiFinishLogin:  '[UI] Finish Login',
    
        notesAddNew:    '[Notes] New note',
        notesActive:    '[Notes] Set active note',
        notesLoad:      '[Notes] Load notes',
        notesUpdated:   '[Notes] Updated note',
        notesFileUrl:   '[Notes] Updated image url',
        notesDelete:    '[Notes] Delete note',
        notesLogoutCleaning:    '[Notes] Logout Cleaning'
    })
  })
});
