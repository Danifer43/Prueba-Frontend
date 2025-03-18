export class Categoria {
    public codCategoria: number;
    public nombreCategoria: string;

    constructor(cod: number, nom: string) {
        this.codCategoria = cod;
        this.nombreCategoria = nom;
    }
}