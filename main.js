const botonAnadir = document.querySelector(".btn-add");
let lista = document.querySelector("ul");
let botonContenido = document.querySelector("input");
const span = document.querySelectorAll("span");

let numTareas = 0;

document.addEventListener('DOMContentLoaded', function () {
    const tareasAlmacenadas = localStorage.getItem("Tareas");
    let index = 0;    
    if (tareasAlmacenadas) {
        const tareasParseadas = JSON.parse(tareasAlmacenadas);
        tareasParseadas.forEach(tarea => {
            agregarTarea(index, tarea);
            index++;
        });
    }
    esconderTarea();
});

botonAnadir.addEventListener('click', function(event){
    event.preventDefault();
    let tarea = botonContenido.value;
    let repetida = localStorage.getItem('Tareas') !== null ? tareasRepetidas(tarea) : false;
    if(tarea != "" && !repetida){
        const posicion = numTareas;
        agregarTarea(posicion, tarea);
        let arrayTareas = JSON.parse(localStorage.getItem('Tareas')) || [];
        arrayTareas.push(tarea);
        localStorage.setItem('Tareas', JSON.stringify(arrayTareas));
    }
    else if(tarea == ""){
        alert("El apartado tarea no puede estar vacío.");
    }
    else{
        alert("Esta tarea ya está repetida.");
    }
    botonContenido.value = "";
});

function agregarTarea(posicion, tarea) {
    const botonBorrar = '<li id="' + posicion + '"><p class="task-count">' + tarea + '</p><button class="btn-delete">X</button></li>';
    lista.insertAdjacentHTML("beforeend", botonBorrar);
    const li =  document.getElementById(posicion).childNodes[1];
    li.addEventListener("click", borrarTarea)
    conteoTareas(++numTareas);
    esconderTarea();
}

function conteoTareas(numTareas) {
    span[1].textContent = numTareas;
}

function esconderTarea(){
    document.querySelector(".empty").style.display = numTareas === 0 ? "block" : "none";
}

function borrarTarea() {
    this.parentNode.remove();
    const tareasAlmacenadas = localStorage.getItem("Tareas");
    const tareasParseadas = JSON.parse(tareasAlmacenadas) || [];
    const textoTarea = this.previousElementSibling.textContent;
    let posicionTarea = JSON.parse(tareasAlmacenadas).indexOf(textoTarea);
    tareasParseadas.splice(posicionTarea, 1);
    localStorage.setItem("Tareas", JSON.stringify(tareasParseadas));
    conteoTareas(--numTareas);
    esconderTarea();
}

function tareasRepetidas(tareaRepe){
    let tareas = JSON.parse(localStorage.getItem("Tareas"));
    let estaRepetida = tareas.some(tarea => tarea === tareaRepe);
    return estaRepetida;
}
