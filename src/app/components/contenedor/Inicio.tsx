import React from "react";
import { Container, Navbar, Nav, Row, Col, Button, Card } from "react-bootstrap";


export const Inicio = () => {
    return (
        <>
      {/* Hero Section */}
      <Container fluid className="text-center bg-light py-5">
        <h1>Distribución de Frutas y Verduras Frescas</h1>
        <p>Calidad y frescura en cada entrega</p>
        <Button variant="success" size="lg">Ver Productos</Button>
      </Container>

      {/* Productos Destacados */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Nuestros Productos</h2>
        <Row className="g-4">
          {["Manzanas", "Plátanos", "Zanahorias"].map((item, index) => (
            <Col md={4} key={index}>
              <Card>
                <Card.Img variant="top" src={`https://via.placeholder.com/300?text=${item}`} />
                <Card.Body>
                  <Card.Title>{item}</Card.Title>
                  <Card.Text>Frescas y de alta calidad.</Card.Text>
                  <Button variant="success">Más información</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      </>
    )
}