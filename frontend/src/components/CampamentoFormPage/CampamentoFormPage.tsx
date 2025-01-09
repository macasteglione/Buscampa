import {useForm} from "react-hook-form";
import {createCampamento, deleteCampamento, editCampamento, getCampamento} from "../../api/campamento.api.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import "./CampamentoFormPage.css"

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
        <div className="form-container">
            <form onSubmit={onSubmit}>
                <input className="form-field" type="text"
                       placeholder="Nombre" {...register("nombre", {required: true})} />
                {errors.nombre && <span>Este dato es requerido</span>}

                <input className="form-field" type="text"
                       placeholder="Iglesia" {...register("iglesia", {required: true})} />
                {errors.iglesia && <span>Este dato es requerido</span>}

                <input className="form-field" type="number"
                       placeholder="Precio" {...register("precio", {required: true})} />
                {errors.precio && <span>Este dato es requerido</span>}

                <textarea className="form-field" rows={10}
                          placeholder="Descripcion" {...register("descripcion")}></textarea>

                <input className="form-date-field" type="date"
                       placeholder="Fecha Desde" {...register("fechaDesde", {required: true})} />
                {errors.fechaDesde && <span>Este dato es requerido</span>}

                <input className="form-date-field" type="date"
                       placeholder="Fecha Hasta" {...register("fechaHasta", {required: true})} />
                {errors.fechaHasta && <span>Este dato es requerido</span>}

                <button className="form-button" type="submit">Guardar</button>
            </form>

            {params.id && <div className="btn-borrar">
                <button className="btn-borrar-form" onClick={async () => {
                    const accepted = window.confirm("Quieres eliminarlo?");
                    if (accepted) {
                        await deleteCampamento(params.id)
                        navigate("/campamento")
                    }
                }}>Delete
                </button>
            </div>}
        </div>
    );
}