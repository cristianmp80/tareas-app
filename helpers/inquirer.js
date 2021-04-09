const inquirer = require('inquirer');
const colors = require('colors');

const menu_options = [{
    type: 'list',
    name: 'opcion',
    message: 'Seleccione una opcion: ',
    choices: [
        { value: '1', name: `${'1.'.green} Crear tarea.` },
        { value: '2', name: `${'2.'.green} Listar tareas.` },
        { value: '3', name: `${'3.'.green} Listar tareas completadas.` },
        { value: '4', name: `${'4.'.green} Listar tareas pendientes.` },
        { value: '5', name: `${'5.'.green} Completar tarea(s).` },
        { value: '6', name: `${'6.'.green} Borrar tarea.` },
        { value: '0', name: `${'0.'.green} Salir.` }
    ]
}];

const menu = async() => {
    console.clear();
    console.log('========================='.cyan);
    console.log('      MENU DE TAREAS     ');
    console.log('=========================\n'.cyan);
    const opt = await inquirer.prompt(menu_options);
    return opt.opcion;
}

const pausa = async() => {
    const question = [{
        type: 'input',
        name: 'enter',
        message: `\nPresione ${'ENTER'.green} para continuar...`
    }]
    await inquirer.prompt(question);
}

const leer_input = async(mensaje) => {
    const question = [{
        type: 'input',
        name: 'respuesta',
        message: mensaje,
        validate(value) {
            if (value.length === 0) {
                return 'Por favor, ingrese un valor';
            }
            return true;
        }
    }];
    const respuesta = await inquirer.prompt(question);
    return respuesta.respuesta;
}


const confirmar = async(pregunta) => {
    const question = [{
        type: 'confirm',
        name: 'confirmacion',
        message: pregunta,
    }];
    const respuesta = await inquirer.prompt(question);
    return respuesta.confirmacion;
}


const mostrar_tareas_borrar = async(tareas) => {
    let i = 0;
    const choices = tareas.map((tarea) => {
        i++
        return { value: tarea.id, name: `${i}. `.green + tarea.description };
    });
    choices.push({ value: '0', name: '0. '.green + 'CANCELAR' });

    const tareas_list = [{
        type: 'list',
        name: 'tarea_id',
        message: 'Seleccione una tarea: ',
        choices: choices
    }];

    const seleccion = await inquirer.prompt(tareas_list);
    return seleccion.tarea_id;
}


const mostrar_tareas_checklist = async(tareas) => {
    let i = 0;
    const choices = tareas.map((tarea) => {
        i++
        return {
            value: tarea.id,
            name: `${i}. `.green + tarea.description,
            checked: (tarea.completadoEn) ? true : false
        };
    });

    const tareas_checklist = [{
        type: 'checkbox',
        name: 'tareas_id',
        message: 'Seleccione tarea(s): ',
        choices: choices
    }];

    const seleccion = await inquirer.prompt(tareas_checklist);
    return seleccion.tareas_id;
}



module.exports = { menu, pausa, leer_input, mostrar_tareas_borrar, mostrar_tareas_checklist, confirmar };