import { useNavigate, useParams } from "react-router-dom"
import { ARREGLO_PRODUCTO } from "../../mocks/Producto-moks";
import { useFormulario } from "../../utilities/misHooks/useFormulario";
import { Producto } from "../../models/Producto";
import { useState } from "react";
import noFoto from '../../../assets/images/NoDisponible.png';
import { Categoria } from "../../models/Categoria";
import { ARREGLO_CATEGORIA } from "../../mocks/Categoria-moks";
import { Button, Form, ToastContainer } from "react-bootstrap";
import DatePicker from "react-date-picker";
import { ConvertirBase64 } from "../../utilities/funciones/ConvertirBase64";
import { crearMensaje } from "../../utilities/funciones/MensajeToastify";

type Fecha = Date | any;

export const ActualizarProducto = () => {
    let { codigo } = useParams();
    type fHtml = React.FormEvent<HTMLFormElement>;

    const ProductoSeleccionado = ARREGLO_PRODUCTO.find((objProducto)=> objProducto.codProducto== Number(codigo));

    let {
        nombreProducto,
        descripcionProducto,
        cantidadProducto,
        valorProducto,
        fotoProducto,
        dobleEnlace,
        objeto
        }= useFormulario<Producto>(new Producto(
        ProductoSeleccionado? ProductoSeleccionado.codProducto:0,
        ProductoSeleccionado? ProductoSeleccionado.categoriaProducto: new Categoria(0,""),
        ProductoSeleccionado? ProductoSeleccionado.nombreProducto:"",
        ProductoSeleccionado? ProductoSeleccionado.descripcionProducto:"",
        ProductoSeleccionado? ProductoSeleccionado.cantidadProducto:0,
        ProductoSeleccionado? ProductoSeleccionado.valorProducto:0,
        ProductoSeleccionado? ProductoSeleccionado.fechaProducto: new Date(),
        "",
        ProductoSeleccionado ? ProductoSeleccionado.base64Producto : "" 
));

    

    const [enProceso, setEnProceso]= useState<boolean>(false);
    const [imagenMiniatura, setImagenMiniatura]=useState<string>(ProductoSeleccionado?ProductoSeleccionado.base64Producto:noFoto);
    const [imagenBase64, setImagenBase64] =useState<string>("");

    const[arregloCategorias]=useState<Categoria[]>(ARREGLO_CATEGORIA);
    const[arregloProductos]=useState<Producto[]>(ARREGLO_PRODUCTO);

    const [fechaVencimiento, setFechaVencimiento] = useState<Fecha>(ProductoSeleccionado?
        new Date (ProductoSeleccionado.fechaProducto): new Date());
        const navegacion = useNavigate();
    const [codCategoria, setCodCategoria]= useState<number>(Number(ProductoSeleccionado?.categoriaProducto.codCategoria));

    const enviarFormulario =(formulario:fHtml) =>{
        formulario.preventDefault();
        const objFormulario = formulario.currentTarget;
        if (objFormulario.checkValidity() === false) {
            formulario.preventDefault();
            formulario.stopPropagation();
            setEnProceso(true);
        } else{
            actualizar();
            setEnProceso(false);
            navegacion("/admin");
            crearMensaje("El producto se actualizo", "success")

        }
    }

    const actualizar = () =>{
        let categoriaSeleccionada: Categoria | any =
        arregloCategorias.find((ObjCategoria)=> ObjCategoria.codCategoria === Number(codCategoria));
        objeto.categoriaProducto = categoriaSeleccionada;
        
        for(let i = 0; i < arregloProductos.length; i++){
            const comparar = arregloProductos[i].codProducto;
            if (comparar == ProductoSeleccionado?.codProducto) {
                arregloProductos[i]= new Producto(
                    comparar,
                    categoriaSeleccionada,
                    nombreProducto,
                    descripcionProducto,
                    cantidadProducto,
                    valorProducto,
                    fechaVencimiento,
                    fotoProducto == "" ? ProductoSeleccionado?.fotoProducto : fotoProducto,
                    imagenBase64
                )
                
            }
        }
   
    }

    const cargarImagen = async (e: any) => {
        const archivo = e.target.files;
        const imagen = archivo[0];
        setImagenMiniatura(URL.createObjectURL(imagen));

        dobleEnlace(e);
        const base64 = await ConvertirBase64(imagen);
        setImagenBase64(String(base64));
    }
        
    return (
        <div className="d-flex justify-content-center">
            <div className="cod-mb-6">
                <ToastContainer/>
                <Form validated={enProceso} onSubmit={enviarFormulario}>
                    <div className="card">
                        <div className="card-header">
                            <h3>Formulario PRO</h3>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <Form.Group controlId="nombreProducto">
                                    <Form.Label><span className="rojito">*</span>Nombre Producto</Form.Label>
                                    <Form.Control type="text"
                                        required
                                        name="nombreProducto"
                                        value={nombreProducto}
                                        onChange={dobleEnlace} />
                                </Form.Group>
                            </div>
                            <div className="mb-3">
                                <Form.Group className="mb-3" controlId="codCategoria">
                                    <Form.Label><span className="rojito">*</span>Categoria</Form.Label>
                                    <Form.Select className="form-select"
                                        required
                                        name="codCategoria"
                                        value={codCategoria}
                                        onChange={dobleEnlace}>
                                        <option value={0}>Seleccione la Categoria</option>
                                        {
                                            arregloCategorias.map((objCategoria: Categoria) => (
                                                <option value={objCategoria.codCategoria}>
                                                    {objCategoria.nombreCategoria}
                                                </option>
                                            ))
                                        }

                                    </Form.Select>
                                </Form.Group>
                            </div>

                            <div className="mb-3">
                                <Form.Group controlId="nombreProducto">
                                    <Form.Label><span className="rojito">*</span>Valor</Form.Label>
                                    <Form.Control type="number"
                                        required
                                        name="valorProducto"
                                        value={valorProducto}
                                        onChange={dobleEnlace}
                                    />
                                </Form.Group>
                            </div>
                            <div className="mb-3">
                                <Form.Group controlId="nombreProducto">
                                    <Form.Label><span className="rojito">*</span>Fecha</Form.Label>
                                    <DatePicker className="form-control"
                                        value={fechaVencimiento}
                                        onChange={setFechaVencimiento}
                                    />
                                </Form.Group>
                            </div>
                            <div className="mb-3">
                                <Form.Group controlId="fotoProducto">
                                    <Form.Label> <span className="rojito">*</span> Imagen </Form.Label>
                                    <Form.Control type="file"
                                        
                                        name="fotoProducto"
                                        value={fotoProducto}
                                        onChange={cargarImagen} />
                                </Form.Group>
                            </div>
                            <div className="mb-3">
                                <div className="d-flex justify-content-center">
                                    <img src={imagenMiniatura} alt="fotito" style={{ height: "250px" }} />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <Button variant="primary" type="submit">
                                Registrar
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}