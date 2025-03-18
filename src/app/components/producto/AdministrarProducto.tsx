import { useState } from "react"
import { Producto } from "../../models/Producto"
import { ARREGLO_PRODUCTO } from "../../mocks/Producto-moks"
import { Categoria } from "../../models/Categoria";
import { Button, Col, Container, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { crearMensaje } from "../../utilities/funciones/MensajeToastify";
import { Link, useNavigate } from "react-router-dom";
import { useFormulario } from "../../utilities/misHooks/useFormulario";
import { ARREGLO_CATEGORIA } from "../../mocks/Categoria-moks";
import noFoto from '../../../assets/images/NoDisponible.png';
import DatePicker from "react-date-picker";
import { ConvertirBase64 } from "../../utilities/funciones/ConvertirBase64";

type Fecha = Date | any;

export const AdministrarProducto = () => {
    const [arregloProductos] = useState<Producto[]>(ARREGLO_PRODUCTO);
    const [ProductoSeleccionado, setProductoSeleccionado] = useState<Producto>(
        new Producto(0, new Categoria(0, ""), "", "",0 , 0, new Date(), "", ""));
    /* las variables de la ventana*/
    const [show, setShow] = useState(false);
    const [showAgregar, setShowAgregar] = useState(false);
    const handleClose = () => setShow(false);
    const handleCloseAgregar = () => setShowAgregar(false);
    

    type formHtml = React.FormEvent<HTMLFormElement>;

    let { nombreProducto, descripcionProducto, cantidadProducto, codCategoria, valorProducto, fotoProducto, dobleEnlace, objeto }
        = useFormulario<Producto>(new Producto(0, new Categoria(0, ""), "", "", 0, 0, new Date(), "", ""));
    let [arregloCategorias] = useState<Categoria[]>(ARREGLO_CATEGORIA);
    const [fechaVencimiento, setFechaVencimiento] = useState<Fecha>(new Date());
    const [enProceso, setEnProceso] = useState<boolean>(false);

    const [imagenMiniatura, setImagenMiniatura] = useState(noFoto);
    const [imagenBase64, setImagenBase64] = useState<string>("");

    const navegacion = useNavigate();

    const enviarFormulario = (formulario: formHtml) => {
        formulario.preventDefault();
        let objFormulario = formulario.currentTarget;
        if (objFormulario.checkValidity() == false){
            formulario.preventDefault();
            formulario.stopPropagation();
            setEnProceso(true);
            crearMensaje("Faltan datos para registrar el producto", 'error');
        } else {
            /* Aca vamos a registrar el producto */
            const nuevoCodigo = ARREGLO_PRODUCTO.length + 1;
            objeto.codProducto = nuevoCodigo;
            objeto.base64Producto = imagenBase64;
            objeto.fechaProducto = new Date(fechaVencimiento);
            let categoriaSeleccionada: Categoria | any = arregloCategorias.find((objCategoria) => objCategoria.codCategoria === Number(codCategoria));
            objeto.categoriaProducto = categoriaSeleccionada;

            ARREGLO_PRODUCTO.push(objeto);
            setEnProceso(true);
            crearMensaje("Producto registrado", "Success");
            navegacion("/list");
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

    /*Filtro de cantidad*/
    const [ordenAscendente, setOrdenAscendente] = useState(true);
    const [productosOrdenados, setProductosOrdenados] = useState([...arregloProductos]);

    const ordenarPorCantidad = () => {
        const nuevaLista = [...productosOrdenados].sort((a, b) =>
            ordenAscendente ? a.cantidadProducto - b.cantidadProducto : b.cantidadProducto - a.cantidadProducto
        );
        setProductosOrdenados(nuevaLista);
        setOrdenAscendente(!ordenAscendente);
    };
    /*Filtro de fecha creacion*/
    const [ordenFechaAscendente, setOrdenFechaAscendente] = useState(true);
    const ordenarPorFecha = () => {
        const nuevaLista = [...productosOrdenados].sort((a, b) => {
            const fechaA = new Date(a.fechaProducto);
            const fechaB = new Date(b.fechaProducto);
    
            if (isNaN(fechaA.getTime()) || isNaN(fechaB.getTime())) {
                console.error("Fecha inválida encontrada:", a.fechaProducto, b.fechaProducto);
                return 0; // Evita que se rompa el ordenamiento si hay valores inválidos
            }
    
            return ordenFechaAscendente ? fechaA.getTime() - fechaB.getTime() : fechaB.getTime() - fechaA.getTime();
        });
    
        setProductosOrdenados(nuevaLista);
        setOrdenFechaAscendente(!ordenFechaAscendente);
    };
    /*Filtrar por codigo y nombre*/
    const [filtroCodigo, setFiltroCodigo] = useState("");
    const [filtroNombre, setFiltroNombre] = useState("");
    const productosFiltrados = productosOrdenados.filter((producto) =>
        producto.codProducto.toString().includes(filtroCodigo) &&
        producto.nombreProducto.toLowerCase().includes(filtroNombre.toLowerCase())
    );  
    const eliminarProducto =(codigo: number) =>{
        const limite =arregloProductos.length;
        for (let i= 0; i < limite; i++) {
            if (arregloProductos[i] !== undefined) {
                const comprar = arregloProductos[i].codProducto;
                if (comprar === codigo) {
                    arregloProductos.splice(i,i);
                }
            }
            
        }
        crearMensaje("Producto eliminado", 'success');
        navegacion("/list")
    }
    return (
        <div className="container">
            <div className="d-flex justify-content-between mt-3">
                <h2>Administrar Productos</h2>
                <Button variant="success" onClick={() => setShowAgregar(true)}>Agregar Producto</Button>
            </div>
            <div className="d-flex justify-content-center">
                <div className="col-10 mt-3">
                
                    <Row>
                    <Col><input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Buscar por código"
                        value={filtroCodigo}
                        onChange={(e) => setFiltroCodigo(e.target.value)}/></Col> 
                    <Col><input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por nombre"
                        value={filtroNombre}
                        onChange={(e) => setFiltroNombre(e.target.value)}/></Col>                 
                    <Col><button className="btn btn-info mb-2" onClick={ordenarPorCantidad}>
                        Ordenar por Cantidad {ordenAscendente ? "⬆️" : "⬇️"}
                    </button></Col>
                    <Col><button className="btn btn-secondary mb-2 mx-2" onClick={ordenarPorFecha}>
                        Ordenar por Fecha {ordenFechaAscendente ? "⬆️" : "⬇️"}
                    </button>
                    </Col>
                    </Row>          
            <table className="table table-striped table-hover">
                <thead>
                    <tr className="table-warning" >
                        <th style={{ width: "5%" }}>#</th>
                        <th style={{ width: "20%" }}>Nombre</th>
                        <th style={{ width: "10%" }}>Cantidad</th>
                        <th style={{ width: "20%" }}>Categoria</th>
                        <th style={{ width: "10%" }}>Precio</th>
                        <th style={{ width: "15%" }}>Fecha</th>
                        <th style={{ width: "10%" }}>Foto</th>
                        <th style={{ width: "10%" }}>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {productosFiltrados.map((objProducto) => (
                        <tr key={objProducto.codProducto}>
                            <td>{objProducto.codProducto}</td>
                            <td>{objProducto.nombreProducto}</td>
                            <td>{objProducto.cantidadProducto}</td>
                            <td>{objProducto.categoriaProducto.nombreCategoria}</td>
                            <td>{objProducto.valorProducto}</td>
                            <td>{new Date(objProducto.fechaProducto).toLocaleDateString()}</td>
                            <td>
                                <img src={objProducto.base64Producto} alt="noFoto" style={{ height: "50px" }} />
                            </td>
                            <td className="text-center">
                                <Link to={`/update/${objProducto.codProducto}`}>
                                    <i className="fa fa-edit azulito"></i>
                                </Link>
                                &nbsp;&nbsp;
                                <a href="" onClick={(e) => {
                                    e.preventDefault();
                                    setShow(true);
                                    setProductoSeleccionado(objProducto);
                                }}>
                                    <i className="fa fa-trash rojito fa-6"></i>
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
                    {/* Modal Eliminar */}
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Eliminar Producto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="text-center">
                           ¿ estas seguro de eliminas producto
                           <strong> {ProductoSeleccionado.nombreProducto}</strong>
                           ?
                           <br/>
                           <img src={ProductoSeleccionado.base64Producto} alt="noFoto"
                                style={{ height: "200px"}}/>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="danger" onClick={(e)=>{
                                eliminarProducto(ProductoSeleccionado.codProducto);
                                setShow(false);
                            }}>Eliminar</Button>
                            <Button variant="secundary" onClick={handleClose}>
                                Cancelar
                            </Button>
                            
                        </Modal.Footer>
                    </Modal>
            {/* Modal Agregar */}
            <Modal show={showAgregar} onHide={handleCloseAgregar} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form validated={enProceso} onSubmit={enviarFormulario}>
                        <div className="card-body">
                            <div className="mb-3">
                                <Form.Group controlId="nombreProducto">
                                    <Form.Label><span className="rojito">*</span>Nombre</Form.Label>
                                    <Form.Control type="text"
                                        required
                                        name="nombreProducto"
                                        value={nombreProducto}
                                        onChange={dobleEnlace} />
                                </Form.Group>
                            </div>
                            <div className="mb-3">
                                <Form.Group controlId="descripcionProducto">
                                <InputGroup>
                                    <InputGroup.Text><span className="rojito">*</span>Descripcion</InputGroup.Text>
                                    <Form.Control as="textarea" 
                                       required
                                       name="descripcionProducto"
                                       value={descripcionProducto}
                                       onChange={dobleEnlace}                                     
                                    aria-label="With textarea" />
                                </InputGroup>
                                </Form.Group>
                            </div>
                            <div className="mb-3">
                                <Form.Group controlId="cantidadProducto">
                                    <Form.Label><span className="rojito">*</span>Cantidad</Form.Label>
                                    <Form.Control type="number"
                                        required
                                        name="cantidadProducto"
                                        value={cantidadProducto}
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
                                        required
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
                        <div className="card-footer" style={{display: 'flex', justifyContent: 'center',alignItems: 'center', borderTop: '1px solid #ccc',  paddingTop: '10px'}}>
                            <Button variant="warning" type="submit">
                                Registrar
                            </Button>
                        </div>
                </Form>
                </Modal.Body>
            </Modal>                    
                    
                </div>
            </div>
        </div>
    )
}