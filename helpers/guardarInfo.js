const fs = require('fs');
const archivo = './db/data.json';

const guardarDB = (datos) => {
    fs.writeFileSync(archivo, JSON.stringify(datos));
}

const leerDB = () => {
    if (!fs.existsSync(archivo)) {
        return null;
    }

    const datos = fs.readFileSync(archivo, { encoding: 'utf-8' });
    return (JSON.parse(datos));
}

module.exports = { guardarDB, leerDB };