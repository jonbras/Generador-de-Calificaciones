document.addEventListener('DOMContentLoaded', function() {

    function generar(promedio, num) {
        let suma = 0,
            valor, arreglo = []
        do {
            valor = promedio == 70 ? 70 : (promedio == 100 ? 100 : Math.floor(Math.random() * (101 - 70)) + 70);
            arreglo.push(valor);
            suma += valor;
            if (suma > (promedio * num)) {
                suma = 0;
                arreglo = [];
            }
        } while (suma != (promedio * num) || arreglo.length != num);

        return arreglo;
    }

    document.querySelector('#promSemestre').addEventListener('keypress', function(e) {
        let promSemestre = parseFloat(document.querySelector('#promSemestre').value);
        if (e.key == "Enter") {
            if (promSemestre >= 70 && promSemestre <= 100) {
                document.querySelector('.numMaterias').style = "";
            } else {
                document.querySelector('.numMaterias').style = "display:none;";
                document.querySelector('.materias').style = "display:none;";
                swal.fire('Advertencia', 'El promedio debe estar entre 70 y 100 !', 'warning');
            }
        }
    });

    document.querySelector('#numMaterias').addEventListener('keypress', function(e) {
        let numMaterias = document.querySelector('#numMaterias').value;
        if (e.key == "Enter") {
            if (numMaterias > 0) {
                document.querySelector('.materias').style = "";
                let contenedorMaterias = document.querySelector('.materias');
                contenedorMaterias.innerHTML = '';
                for (let iterator = 1; iterator <= numMaterias; iterator++) {
                    let cadena =
                        `<div class="materia">
                            <h2>Materia ${iterator}</h2>
                        
                            <div class="campo">
                            <label for="mat${iterator}Nombre">Nombre:</label>
                            <input type="text" id="mat${iterator}Nombre" value="Materia ${iterator}">
                            </div>

                            <div class="campo">
                            <label for="mat${iterator}Unidades">No. unidades:</label>
                            <input type="number" id="mat${iterator}Unidades">
                            </div>
                        </div>`;

                    contenedorMaterias.innerHTML += cadena;
                }

                contenedorMaterias.innerHTML += `<input type="button" value="Generar Calificaciones" id="btnGenerar">`;

                document.querySelector('#btnGenerar').addEventListener('click', function() {
                    let promSemestre = parseFloat(document.querySelector('#promSemestre').value),
                        numMaterias = document.querySelector('#numMaterias').value,
                        materias = document.querySelectorAll('.materias .materia'),
                        materia_prom_unidad = [],
                        unidadMayor = 0,
                        califMaterias = generar(promSemestre, numMaterias),
                        n = 0,
                        continua = true;
                    for (const materia of materias) {
                        let nombre = materia.children[1].children[1].value;
                        let unidades = parseInt(materia.children[2].children[1].value);
                        if (nombre == "") {
                            materia.children[1].children[1].focus();
                            swal.fire('Advertencia', `En la materia ${n + 1}, el nombre NO debe estar vacio !`, 'warning');
                            continua = false;
                            break;
                        }

                        if (!(unidades > 0) || unidades > 10) {
                            materia.children[2].children[1].focus();
                            swal.fire('Advertencia', `En la materia ${n + 1}, el valor del No. de unidades debe estar entre 1 y 10 !`, 'warning');
                            continua = false;
                            break;
                        }

                        if (unidades > unidadMayor) {
                            unidadMayor = unidades;
                        }
                        materia_prom_unidad.push([nombre, califMaterias[n++], unidades]);
                    }

                    if (continua) {
                        let tabla =
                            `<table id="customers">
                            <tbody>
                            <tr>
                                <th scope="col">Materia</th>`;

                        for (let i = 1; i <= unidadMayor; i++) {
                            tabla += `<th>Unidad ${i}</th>`;
                        }

                        tabla += `<th>Promedio </th>
                            </tr>`;
                        for (const materia of materia_prom_unidad) {
                            tabla += `
                            <tr>
                                <td><b>${materia[0]}</b></td>`;
                            let = calificaciones = generar(materia[1], materia[2]);
                            for (const calif of calificaciones) {
                                tabla += `
                                <td>${calif}</td>`;
                            }
                            for (let num = materia[2]; num < unidadMayor; num++) {
                                tabla += `
                                <td></td>`;
                            }
                            tabla += `<td><b>${materia[1]}</b></td>
                                  </tr>`;
                        }

                        tabla += `<tr>
                                <td colspan="${unidadMayor + 1}"><b>Promedio del semestre:</b></td>
                                <td><b>${promSemestre}</b></td>
                            </tr>`;

                        tabla += `
                            </tbody>
                        </table>`;
                        document.querySelector('.tabla').innerHTML = tabla;
                    }
                });
            } else {
                document.querySelector('.materias').style = "display:none;";
                swal.fire('Advertencia', 'El número de materias debe ser un número positivo !', 'warning');
            }
        }
    });
});