import { Routes, Route } from "react-router-dom"
import { Inicio } from "../components/contenedor/Inicio"
import { Error } from "../components/contenedor/Error"
import { ListarProducto } from "../components/producto/ListarProducto"
import { AdministrarProducto } from "../components/producto/AdministrarProducto"
import { ActualizarProducto } from "../components/producto/ActualizarProducto"

export const Ruteo = () => {

    return (
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="*" element={<Error />} />


            <Route path="/list" element={<ListarProducto />} />
            <Route path="/admin" element={<AdministrarProducto />} />
            <Route path="/update/:codigo" element={<ActualizarProducto />} />

        </Routes>
    )

}