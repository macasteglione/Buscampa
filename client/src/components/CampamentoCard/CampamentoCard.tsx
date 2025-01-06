import {Campamento} from "./Campamento.ts";
import {useNavigate} from "react-router-dom";

export function CampamentoCard({campamento}: { campamento: Campamento }) {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/campamento/${campamento.id}`)}>
            <h1>{campamento.nombre}</h1>
            <p>{campamento.iglesia}</p>
            <p>{campamento.precio}</p>
            <p>{campamento.descripcion}</p>
            <p>{new Date(campamento.fechaDesde).toLocaleDateString()}</p>
            <p>{new Date(campamento.fechaHasta).toLocaleDateString()}</p>
            <hr/>
        </div>
    );
}