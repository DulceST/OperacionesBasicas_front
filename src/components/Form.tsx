import { operaciones } from "../data/operaciones"

export default function Form() {
    return (
        <form className="space-y-5 bg-white shadow p-10 rounded-lg">
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="operaciones" className="font-bold">
                    Selecciona una operacion:
                </label>
                <select className="border border-slate-300 p-2 rounded-lg w-full bg-white" id="operaciones">
                    {operaciones.map(Operaciones => (
                        <option
                            key={Operaciones.id}
                            value={Operaciones.id}
                        >
                            {Operaciones.name}

                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="numeros" className="font-bold"> Numeros:</label>
                <input
                    id="numeros"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Ej. 1,70,90,45" />
            </div>

            <input
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer"
                value='Realizar calculo'
            />
        </form>
    )
}

//Category = Operaciones