import React from "react";
import { render, screen } from "@testing-library/react";
import Formulario from "../components/Formulario";
import userEvent from "@testing-library/user-event";
import { monedas, criptos } from "../__mocks__/criptomonedas";
import axios from "axios";

const mockAxios = axios;
const guardarMoneda = jest.fn();
const guardarCriptomoneda = jest.fn();

test("<useCriptomonedas />", async () => {
    //consumir datos "falsos"
    mockAxios.get = jest.fn().mockResolvedValue({
        data: criptos
    })

    render(<Formulario
        guardarMoneda={guardarMoneda}
        guardarCriptomoneda={guardarCriptomoneda}
    />)

    // verificar la cantidad de monedas
    const monedasDropdown = screen.getByTestId("select-monedas");
    expect(monedasDropdown.children.length).toEqual(monedas.length + 1);

    //verifica la cantidad de criptos
    const opciones = screen.findAllByTestId("opcion-cripto");
    expect(await opciones).toHaveLength(10);

    expect(mockAxios.get).toHaveBeenCalled();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);

    //Seleccionar bitcoins y USD
    userEvent.selectOptions(screen.getByTestId("select-monedas"), "USD");
    userEvent.selectOptions(screen.getByTestId("select-cripto"), "BTC");

    //submit al formulario
    userEvent.click(screen.getByTestId("submit"));

    //verificar que las funciones se hayan llamado
    expect(guardarMoneda).toHaveBeenCalled();
    expect(guardarMoneda).toHaveBeenCalledTimes(1);

    expect(guardarCriptomoneda).toHaveBeenCalled();
    expect(guardarCriptomoneda).toHaveBeenCalledTimes(1);

});
