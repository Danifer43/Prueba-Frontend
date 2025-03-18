import { useState, ChangeEvent } from "react"

export const useFormulario = <T extends Object>(objInicial: T) => {
    
    const [objeto, setObjeto] = useState(objInicial);
    const dobleEnlace = ({ target }: ChangeEvent<any>) => {
        const { name, value } = target;

        setObjeto({
            ...objeto,
            [name]: value
        });
    }

    return{
        objeto,
        dobleEnlace,
        ...objeto
    }
}