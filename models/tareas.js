const Tarea = require('./tarea');

class Tareas {

    constructor() {
        this._listado = {};
    }


    get listadoTareas() {
        const listTareas = [];
        Object.keys(this._listado).forEach((key) => {
            listTareas.push(this._listado[key]);
        })
        return listTareas;
    }


    cargarTareas(tareas = []) {
        tareas.forEach((tarea) => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }


    listadoCompleto() {
        let salida = '\n';
        let i = 1;
        this.listadoTareas.forEach((tarea) => {
            salida += `${i}. `.green + `${tarea.description} :: `;
            if (tarea.completadoEn) {
                salida += `Completada en ${tarea.completadoEn}\n`.green;
            } else {
                salida += `Pendiente\n`.red;
            }
            i++;
        });
        console.log(salida);
    }


    listarPendientesCompletadas(completadas = true) {
        let salida = '\n';
        let i = 1;
        if (completadas) {
            this.listadoTareas.forEach((tarea) => {
                if (tarea.completadoEn) {
                    salida += `${i}. `.green + `${tarea.description} :: ` + `Completada en ${tarea.completadoEn}\n`.green;
                    i++;
                }
            });
        } else {
            this.listadoTareas.forEach((tarea) => {
                if (!tarea.completadoEn) {
                    salida += `${i}. `.green + `${tarea.description}\n`;
                    i++;
                }
            });
        }
        console.log(salida);
    }


    completarTarea(identificador) {
        if (this._listado[identificador]) {
            this._listado[identificador].completadoEn = '12345';
        }
    }


    borrarTarea(identificador) {
        if (this._listado[identificador]) {
            delete this._listado[identificador];
        }
    }


    modificarTareas(array_tareas) {
        array_tareas.forEach((identificador) => {
            if (!this._listado[identificador].completadoEn) {
                this._listado[identificador].completadoEn = new Date().toISOString();
            }
        });

        this.listadoTareas.forEach((tarea) => {
            if (!array_tareas.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }

}


module.exports = Tareas;