import {useEffect, useState} from "react";
import {getAllCampamentos} from "../../api/campamento.api.ts";
import {CampamentoCard} from "../CampamentoCard/CampamentoCard.tsx";
import {Campamento} from "../CampamentoCard/Campamento.ts";

export function CampamentoList() {
    const [campamentos, setCampamentos] = useState<Campamento[]>([]);

    useEffect(() => {
        async function loadCampamentos(): Promise<void> {
            const res = await getAllCampamentos()
            setCampamentos(res.data)
        }

        loadCampamentos()
    }, [])

    return (
        <div>
            {campamentos.map(campamento => (
                <CampamentoCard key={campamento.id} campamento={campamento}/>
            ))}
        </div>
    );
}