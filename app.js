const argv = require('./config/yargs').argv;
const { crear, getListado, actualizar, borrar } = require('./por-hacer/por-hacer');
const colors = require('colors');

let comando = argv._[0];


switch (comando) {
    case 'crear':
        let tarea = crear(argv.descripcion);
        console.log(`\n${
            colors.gray(tarea.creacion)
            }\nDescripcion: ${
            colors.yellow(tarea.descripcion)
            }.\nCompletado: ${
            colors.red(tarea.completado)
            }.`);
        break;
    case 'listar':

        let listado = getListado(argv.filtrar === 'true');

        if (listado.length != 0) {
            for (let tarea of listado) {
                console.log(`\n========== Por hacer ===========`.green);

                console.log(colors.gray(tarea.creacion));

                console.log(`  ${tarea.descripcion}`.yellow);

                if (tarea.completado != true) {
                    console.log('  Estado: ' , 'Incompleto!!'.red);
                } else {
                    console.log('  Estado: ' , 'Completado!!'.cyan);
                }

                console.log('================================'.green);
            }
        } else {
            console.log('No hay notas que listar'.yellow);
        }
        break;
    case 'actualizar':
        let actualizado = actualizar(argv.descripcion,argv.completado == 'true');
        console.log(actualizado);
        break;
    case 'borrar':
        let borrado = borrar(argv.descripcion);
        console.log(borrado);
        break;
    default:
        console.log('el comando ingresado no es valido');
}


