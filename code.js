//////////////////////////////////////CALLBACKS///////////////////////////////////////
//una funcion dentro de otra funcion:

                                                           /*
class Persona {
    constructor(nombre,instagram){
        this.nombre = nombre;
        this.instagram = instagram;
    }
};

const data = [
    ["Tomas Leyi","@tomasleyi"],
    ["Pelado Giaco","@Pelado"],
    ["Colo rama","@ramapisani"],
    ["Pagano Facu","@pagano"]
];

const personas = [];

for (let i = 0; i < data.length; i++) {
    personas[i] = new Persona(data[i][0],data[i][1]);
}

const obtenerPersona = (id,cb) => {
    if (personas[id] == undefined) {
        cb("No se ha encontrado la persona");
    } else {
        cb(null,personas[id],id);
    }
}

const obtenerInstagram = (id,cb) =>{
    if (personas[id].instagram == undefined) {
        cb("No se ha encontrado el instagram");
    } else {
        cb(null,personas[id].instagram);
    }
}

obtenerPersona(2,(err,persona,id)=> {
    if (err) console.log(err);
    else {
        console.log(persona.nombre);
        obtenerInstagram(id,(err,instagram)=> {
            if (err) console.log(err);
            else {
                console.log(persona.instagram);
            }
        })
    }
})
                                                               */

////////////////////////////////////////PROMESAS//////////////////////////////////
//Las promesas resuelven el problema de que los callbacks sean poco lejibles y repetitivos.
//Son asincronas, es decir, trabajan en tiempo real.
                                                                /*
let nombre = "pedro";

const promesa = new Promise((resolve,reject)=>{
    if (nombre !== "pedro") reject("Lo siento, el nombre no es pedro");
    else resolve(nombre); 
})

//con .then() accedemos a los datos de resolve, osea cuando sale todo bien.
// Y si sale mal, se ejecuta el reject como un error, y para manejar el error usamos .catch(e)

promesa.then((resultado) => {
    console.log(resultado);
}).catch((e) => {
    console.log(e);
})
                                                                  */




///////////////////////REEMPLAZANDO EL CODIGO DE ANTES CON PROMESAS////////////////////////
                                                                     /*
class Persona {
    constructor(nombre,instagram){
        this.nombre = nombre;
        this.instagram = instagram;
    }
};

const data = [
    ["Tomas Leyi","@tomasleyi"],
    ["Pelado Giaco","@Pelado"],
    ["Colo rama","@ramapisani"],
    ["Pagano Facu"]
];

const personas = [];

for (let i = 0; i < data.length; i++) {
    personas[i] = new Persona(data[i][0],data[i][1]);
}

const obtenerPersona = (id) => {
    return new Promise((resolve,reject)=>{
        if(personas[id] == undefined) reject("No se ha encontrado la persona");
        else {resolve(personas[id])};
    })
}

const obtenerInstagram = (id) =>{
   return new Promise((resolve,reject)=>{
       if(personas[id].instagram == undefined) reject("No se ha encontrado el instagram");
       else {resolve(personas[id].instagram)};
   })
}

let id = 0;

obtenerPersona(id).then((persona)=>{
    console.log(persona.nombre);
    return obtenerInstagram(id);
}).then((instagram)=>{
    console.log(instagram);
}).catch((e)=>{
    console.log(e);
})
                                                                    */



//////////////////////////////////////AWAIT y ASYNC/////////////////////////////////////
//funciones asincronas.
                                                                       /*

const objeto = {
    propiedad1 : "valor1",
    propiedad2 : "valor2",
    propiedad3 : "valor3"
};

const obtenerInformacion = ()=>{
    return new Promise ((resolve,reject)=>{
        setTimeout(()=> {resolve(objeto)},3000)
    })
}       
                                                                      */           

                                                                       /*
obtenerInformacion().then(resultado => console.log(resultado));
                                                                       */
//como hacer esto con await y async:

//al poner async antes del parametro en una funcion flecha, estamos transformando la funcion en una funcion asincrona.
//las funciones asincronas funcionan con promesas.
//await nos obtiene el resultado de la promesa, sin usar el .then().
                                                                        /*
const mostrarResultado = async ()=> {
    resultado = await obtenerInformacion();
    console.log(resultado);
}

mostrarResultado();
                                                                       */

//hasta que el primer await no se ejecute, no pasa al siguiente await.

                                                                       /*

const obtenerInformacion = (text)=>{
    return new Promise ((resolve,reject)=>{
        setTimeout(()=> {resolve(text)},Math.random()*200)
    })
}       

const mostrarData = async ()=>{
    data1 = await obtenerInformacion("1: pito");
    data2 = await obtenerInformacion("2: bernardo");
    data3 = await obtenerInformacion("3: eduardo");
    console.log(data1);
    console.log(data2);
    console.log(data3);
}

mostrarData();

                                                                       */





/////////////////////////////////////PROBLEMA COFLA/////////////////////////////////////

const materiasHtml = document.querySelector(".materias");

const materias = [
    {
        nombre: "Fisica 4",
        nota: 7
    },{
        nombre: "Calculo 3",
        nota: 8
    },{
        nombre: "Base de datos 3",
        nota: 9
    },{
        nombre: "Matematicas discretas 2",
        nota: 7
    },{
        nombre: "Programacion 4",
        nota: 8
    }
];

const obtenerMateria = (id)=>{
    return new Promise((resolve,reject)=>{
        materia = materias[id];
        if(materia == undefined) reject("No existe la materia");
        else setTimeout (()=>{resolve(materia)},Math.random()*400);
    })
}

const devolverMaterias = async ()=>{
    let materia = [];
    for (let i = 0; i < materias.length; i++){
        materia[i] = await obtenerMateria(i);
        let newHTMLCode = `
        <div class="materia">
            <div class="nombre">${materia[i].nombre}</div>
            <div class="nota">${materia[i].nota}</div>
        </div>`;
        materiasHtml.innerHTML += newHTMLCode;
    } 
}

devolverMaterias();