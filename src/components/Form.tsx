import axios from 'axios';
import React, { FormEvent, useState } from 'react';

type ResultType = {
    Media?: number;
    Mediana?: number;
    Moda?: number;
    Varianza?: number;
    "Desviación Estándar"?: number;
    Rango?: number;
} | null;

function Form() {
    const [operacion, setOperacion] = useState<string>('');
    const [numeros, setNumeros] = useState<string>('');
    const [resultado, setResultado] = useState<ResultType>(null);
    const [error, setError] = useState<string | null>(null);

    const URL_BASE = 'https://xzipyxumj3.execute-api.us-east-1.amazonaws.com';
    const ENDPOINTS: { [key: string]: string } = {
        media: '/media',
        mediana: '/mediana',
        moda: '/moda',
        varianza: '/varianza',
        desviacionEstandar: '/desviacion-estandar',
        rango: '/rango',
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const endpoint = ENDPOINTS[operacion];
            if (!endpoint) {
                throw new Error('Operación no válida.');
            }

            const response = await axios.post(`${URL_BASE}${endpoint}`, {
                numeros: numeros.split(',').map(Number),
            });
            setResultado(response.data);
            setError(null);
        } catch (error) {
            console.error('Hubo un error al procesar la solicitud:', error);
            setError('Hubo un error al procesar la solicitud.');
            setResultado(null);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5 bg-white shadow p-10 rounded-lg">
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="operacion" className="font-bold">
                    Selecciona una operación:
                </label>
                <select
                    id="operacion"
                    value={operacion}
                    onChange={(e) => setOperacion(e.target.value)}
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                >
                    <option value="">Selecciona una operación</option>
                    <option value="media">Media</option>
                    <option value="mediana">Mediana</option>
                    <option value="moda">Moda</option>
                    <option value="varianza">Varianza</option>
                    <option value="desviacionEstandar">Desviación Estándar</option>
                    <option value="rango">Rango</option>
                </select>
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="numeros" className="font-bold">Números:</label>
                <input
                    id="numeros"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Ej. 1,70,90,45"
                    value={numeros}
                    onChange={(e) => setNumeros(e.target.value)}
                />
            </div>

            <button className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer" type="submit">
                Realizar cálculo
            </button>

            {error && <p>Error: {error}</p>}
            {resultado && <p>Resultado: {JSON.stringify(resultado)}</p>}
        </form>
    );
}

export default Form;
