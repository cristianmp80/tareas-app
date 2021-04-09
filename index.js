const colors = require('colors');
const { menu, pausa, leer_input, mostrar_tareas_borrar, mostrar_tareas_checklist, confirmar } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const { guardarDB, leerDB } = require('./helpers/guardarInfo');


const main = async() => {
    const tareas = new Tareas();
    const array_tareas = leerDB();
    if (array_tareas) {
        tareas.cargarTareas(array_tareas);
    }
    let option = '';
    do {
        option = await menu();
        switch (option) {
            case '1':
                const descripcion = await leer_input('Descripción de la tarea: ');
                tareas.crearTarea(descripcion);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const tareas_id = await mostrar_tareas_checklist(tareas.listadoTareas);
                tareas.modificarTareas(tareas_id);
                console.log("Tarea(s) modificada(s)!".bgGreen);
                break;
            case '6':
                const tarea_id = await mostrar_tareas_borrar(tareas.listadoTareas);
                if (tarea_id !== '0') {
                    const ok = await confirmar('Desea borrar la tarea??? ');
                    if (ok) {
                        tareas.borrarTarea(tarea_id);
                        console.log("Tarea borrada!".bgRed);
                    }
                }
                break;
        }
        if (option !== '0') {
            await pausa();
        }
    } while (option !== '0');
    guardarDB(tareas.listadoTareas);
}

main();