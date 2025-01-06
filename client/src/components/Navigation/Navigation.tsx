import {Link} from "react-router-dom";

export function Navigation() {
    return (
        <div>
            <Link to="/campamento">
                <h1>
                    Buscampa
                </h1>
            </Link>
            <Link to="/campamento-create">Crear Campamento</Link>
        </div>
    );
}
