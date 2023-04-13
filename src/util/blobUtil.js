
export const base64toblob = (base64)=>{
    const arr = base64.split(',')
    if(arr.length>1){
        const mime = arr[0].match(/:(.*?);/)[1]
        let bstr = atob(arr[1]);
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime })
    }else{
        let bstr = atob(arr[0]);
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: 'image/jpg' })

    }


}