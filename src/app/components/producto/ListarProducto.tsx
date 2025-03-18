import { useState } from "react"
import { Producto } from "../../models/Producto"
import { ARREGLO_PRODUCTO } from "../../mocks/Producto-moks";
import { Button, Card } from "react-bootstrap";
import '../../../assets/css/ProductCard.css'
export const ListarProducto = () => {

    const [arregloProductos] = useState<Producto[]>(ARREGLO_PRODUCTO);

    return (
        <div className="container">
            <div className="row justify-content-center">
                {
                    arregloProductos.map((objProducto: Producto) => (
                        <div className="col-md-4">
                            <Card className="product-card">
                                <Card.Img className="product-image" variant="top" src={objProducto.base64Producto} alt={objProducto.fotoProducto} />
                                <Card.Body>                    
                                    <strong className="mb-1 text-body-secondary">{objProducto.categoriaProducto.nombreCategoria}</strong> 
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>                                     
                                        <Card.Title>{objProducto.nombreProducto}</Card.Title>        
                                        <div className="mb-1 text-body-secondary">{objProducto.fechaProducto.toLocaleDateString()}</div> 
                                    </div>    
                                    <Card.Text>{objProducto.descripcionProducto}</Card.Text>                                        
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>  
                                        <div className="price">${objProducto.valorProducto}</div>                                        
                                        <Button variant="success">Agregar a carrito</Button>
                                    </div>    
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                }
            </div>
        </div>

        
    )
}