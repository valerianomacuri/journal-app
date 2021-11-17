export const fileUpload = async(file) => {
    const cludUrl = `	https://api.cloudinary.com/v1_1/valerianomacuri/upload`
    const formData = new FormData()
    formData.append('upload_preset', 'journal-app')
    formData.append('file', file)
    try {
        const resp = await fetch( cludUrl, {
            method: 'POST',
            body: formData,
        })

        if( resp.ok ) {
            const cloudResp = await resp.json()
            return cloudResp.secure_url
        }
    } catch(err) {
        throw err
        }
}