import { Categoria } from "./Categoria";

export class Producto {

    public codProducto: number;
    public categoriaProducto: Categoria;
    public nombreProducto: string;
    public descripcionProducto: string;
    public cantidadProducto: number;
    public valorProducto: number;
    public fechaProducto: Date;
    public fotoProducto: string;
    public base64Producto: string;

    public codCategoria?: number;

    constructor(cod: number, cat: Categoria, nom: string, des: string, cant: number, val: number, fec: Date, foto: string, base: string) {
        this.codProducto = cod;
        this.categoriaProducto = cat;
        this.nombreProducto = nom;
        this.descripcionProducto = des;
        this.cantidadProducto = cant
        this.valorProducto = val;
        this.fechaProducto = fec;
        this.fotoProducto = foto;
        this.base64Producto = base;
    }


}