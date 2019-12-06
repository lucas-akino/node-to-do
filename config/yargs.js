const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Describe la tarea por hacer'
};

const completado = {
    alias: 'c',
    default: true,
    desc: 'Indica si la tarea esta completa'
};

const filtrar = {
    alias: 'f',
    default: false
};

const argv = require('yargs')
    .command('crear', 'Crea una nota para hacer', {
        descripcion
    })
    .command('listar', 'Muestra todas las tareas por hacer', {
        filtrar
    })
    .command('actualizar', 'Actualiza las notas por hacer', {
        descripcion,
        completado
    })
    .command('borrar', 'Borra el elemento indicado', {
        descripcion
    })
    .help()
    .argv;


module.exports = {
    argv
};
