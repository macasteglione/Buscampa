import {useForm} from "react-hook-form";
import {createCampamento, deleteCampamento, editCampamento, getCampamento} from "../api/campamento.api.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";

export function CampamentoFormPage() {
    const {register, handleSubmit, formState: {errors}, setValue} = useForm()
    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit(async data => {
        if (params.id)
            await editCampamento(params.id, data)
        else
            await createCampamento(data)

        navigate("/campamento")
    })

    useEffect(() => {
        async function loadCampamento() {
            if (params.id) {
                const {
                    data: {
                        nombre,
                        iglesia,
                        precio,
                        descripcion,
                        fechaDesde,
                        fechaHasta
                    }
                } = await getCampamento(params.id)
                setValue('nombre', nombre)
                setValue('iglesia', iglesia)
                setValue('precio', precio)
                setValue('descripcion', descripcion)
                setValue('fechaDesde', fechaDesde)
                setValue('fechaHasta', fechaHasta)
            }
        }

        loadCampamento()
    }, [params.id, setValue])

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Nombre" {...register("nombre", {required: true})} />
                {errors.nombre && <span>Este dato es requerido</span>}

                <input type="text" placeholder="Iglesia" {...register("iglesia", {required: true})} />
                {errors.iglesia && <span>Este dato es requerido</span>}

                <input type="number" placeholder="Precio" {...register("precio", {required: true})} />
                {errors.precio && <span>Este dato es requerido</span>}

                <textarea rows={10} placeholder="Descripcion" {...register("descripcion")}></textarea>

                <input type="date" placeholder="Fecha Desde" {...register("fechaDesde", {required: true})} />
                {errors.fechaDesde && <span>Este dato es requerido</span>}

                <input type="date" placeholder="Fecha Hasta" {...register("fechaHasta", {required: true})} />
                {errors.fechaHasta && <span>Este dato es requerido</span>}

                <button type="submit">Guardar</button>
            </form>

            {params.id && <button onClick={async () => {
                const accepted = window.confirm("Quieres eliminarlo?");
                if (accepted) {
                    await deleteCampamento(params.id)
                    navigate("/campamento")
                }
            }}>Delete</button>}
        </div>
    );
}