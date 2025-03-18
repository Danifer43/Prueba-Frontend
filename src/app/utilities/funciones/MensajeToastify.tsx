import{toast} from "react-toastify";

export const crearMensaje =(textoMensaje:string, tipoMensaje:string)=>{
    switch(tipoMensaje){
        case 'info':
            toast(textoMensaje, {type: 'info', theme:'colored',autoClose: 5000, closeOnClick:true, position:'top-center'})
            break;
        case 'success':
            toast(textoMensaje, {type: 'success', theme:'dark',autoClose: 5000, closeOnClick:true, position:'top-center'})
            break
        case 'error':
            toast(textoMensaje, {type: 'error', theme:'light',autoClose: 5000, closeOnClick:true, position:'top-center'})
            break;
        case 'warning':
            toast(textoMensaje, {type: 'warning', theme:'colored',autoClose: 5000, closeOnClick:true, position:'top-center'})
            break;
        default:
            toast(textoMensaje, {type: 'default', theme:'dart',autoClose: 5000, closeOnClick:true, position:'top-center'})
            break;
    }
}