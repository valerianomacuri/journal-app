import cloudinary from 'cloudinary'
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({ 
    cloud_name: 'valerianomacuri', 
    api_key: '397966893247638', 
    api_secret: 'xInHs3pU8hJfliPbNwT9SZFM624',
    secure: true
  });

describe('Pruebas en fileUpload', () => {
    
    test('debe de cargar un archivo y retornar el URL', async() => {


        const resp = await fetch('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Udemy_logo.svg/245px-Udemy_logo.svg.png')
        const blob = await resp.blob()

        const file = new File([blob], 'foto.png')
        const url = await fileUpload( file )

        expect( typeof url ).toBe("string")

        //Borrar imagen por id
        const segments = url.split('/')
        const imageId = segments[ segments.length - 1 ].replace('.png', '')
        await cloudinary.v2.api.delete_resources(`${imageId}`, {}, ()=> {
            console.log('Done')
        })
    })

    test('debe de retornar un error', async() => {

        const file = new File([], 'foto.png')
        const url = await fileUpload( file )

        expect( url ).toBe(null)
    })
})
