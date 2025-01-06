import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import {CampamentoPage} from "./pages/CampamentoPage.tsx";
import {CampamentoFormPage} from "./pages/CampamentoFormPage.tsx";
import {Navigation} from "./components/Navigation/Navigation.tsx";

function App() {
    return (
        <BrowserRouter>
            <Navigation/>
            <Routes>
                <Route path="/" element={<Navigate to="/campamento"/>}/>
                <Route path="/campamento" element={<CampamentoPage/>}/>
                <Route path="/campamento-create" element={<CampamentoFormPage/>}/>
                <Route path="/campamento/:id" element={<CampamentoFormPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;