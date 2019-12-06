const fs = require('fs');
const colors = require('colors');



let listadoPorHacer = [];

const saveDB = () => {
    
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('NO se puedo guardar', err);
    });

}

const getTime = () => {

    let date = new Date();

    let min = date.getMinutes(); 

    min = min.toString();

    if (min.length == 1) {
        min = `0${min}`;
    }

    return `${
        date.getHours()
        }:${
        min
        } ${
        date.getDate()
        }/${
        date.getMonth()
        }/${
        date.getUTCFullYear()
    }`;
}

const cargarDB = () => {

    try {
        
        listadoPorHacer = require('../db/data.json');
        
    } catch (error) {
        
        listadoPorHacer = [];

    }


}



const crear = (descripcion) => {

    cargarDB();

    

    let porHacer = {
        creacion: getTime(),
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    saveDB();

    return porHacer;

}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        listadoPorHacer[index].creacion = `${getTime()} (¡Actualizado!)`;
        saveDB();
        return 'Actualizado!!'.green;
    } else {
        return 'No se ha podido actualizar!!'.red;
    }

}

const borrar = (descripcion) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer.splice(index,1);
        saveDB();
        return 'Borrado!!'.yellow;
    } else {
        return 'No se ha podido borrar!!'.red;
    }

}

const getListado = (filtro = false) => {
    cargarDB();
    
    if (filtro == true) {
        
        let filtrado = listadoPorHacer.filter(tarea => 
            tarea.completado === filtro)

        listadoPorHacer = filtrado;

        return listadoPorHacer;

    } else {
        return listadoPorHacer;
    }

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
};
