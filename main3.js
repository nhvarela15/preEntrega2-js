//Buenas, en ésta nueva entrega me ayude mucho con mis conocimientos en html basados en el curso de desarrollo web, tuve que ver algunas clases de vuelta
//para tener todo un poco mas fresco, de igual manera habia algunas cosas que no lograba enlazar sin escribir codigo en la seccion de html
//y lo que pude enlazar me ayude con la clase de doom y IA.
//Tambien cambie la orientacion de la pasteleria, ya que me interesaria mas enfocarla en un solo producto que destaque antes que abarcar mucho y apretar poco.




let cuenta = 0;
let carrito = [];

const macarons = [
    { id: 1, nombre: "Macaron de Pistacho", precio: 1500, color: "verde" },
    { id: 2, nombre: "Macaron de Cappuccino", precio: 900, color: "café" },
    { id: 3, nombre: "Macaron de Frutos Rojos", precio: 900, color: "violeta" },
    { id: 4, nombre: "Macaron de Coco y Dulce De Leche", precio: 1200, color: "blanco con café" },
    { id: 5, nombre: "Macaron de Maní", precio: 1000, color: "marrón" },
    { id: 6, nombre: "Macaron de Moka", precio: 1400, color: "negro" },
    { id: 7, nombre: "Macaron de Baileys", precio: 1500, color: "crema" },
    { id: 8, nombre: "Macaron de Caramel", precio: 1300, color: "dorado" },
    { id: 9, nombre: "Macaron de Melocotón", precio: 900, color: "naranja" }
];

function cargarCompraDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        cuenta = carrito.reduce((total, item) => total + item.precio, 0);
        actualizarCarrito();
    }
}


function guardarCompraEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarOpcionesMacarons() {
    const select = document.getElementById("macaronSelect");
    macarons.forEach(macaron => {
        let option = document.createElement("option");
        option.value = macaron.id;
        option.textContent = `${macaron.nombre} - ARG$${macaron.precio}`;
        select.appendChild(option);
    });
}

function seleccionarMacaron() {
    const select = document.getElementById("macaronSelect");
    let macaronId = parseInt(select.value);
    let macaronElegido = macarons.find(macaron => macaron.id === macaronId);
    
    carrito.push(macaronElegido);
    cuenta += macaronElegido.precio;
    guardarCompraEnLocalStorage();
    actualizarCarrito();
}

function actualizarCarrito() {
    const lista = document.getElementById("carritoLista");
    lista.innerHTML = "";

    carrito.forEach((macaron, index) => {
        let li = document.createElement("li");
        li.textContent = `${macaron.nombre} - ARG$${macaron.precio}`;
        
        let btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.onclick = () => eliminarMacaron(index);
        
        li.appendChild(btnEliminar);
        lista.appendChild(li);
    });

    document.getElementById("totalCuenta").textContent = `Total: ARG$${cuenta}`;
}

function eliminarMacaron(index) {
    cuenta -= carrito[index].precio;
    carrito.splice(index, 1);
    guardarCompraEnLocalStorage();
    actualizarCarrito();
}

function abonarCuenta() {
    let montoPago = parseFloat(document.getElementById("montoPago").value);
    let mensajeCompra = document.getElementById("mensajeCompra");

    if (isNaN(montoPago) || montoPago < cuenta) {
        mensajeCompra.textContent = "El monto ingresado es insuficiente o inválido.";
        mensajeCompra.style.color = "red";
        return;
    }

    let cambio = montoPago - cuenta;
    mensajeCompra.textContent = `Compra exitosa. Tu vuelto es de ARG$${cambio.toFixed(2)}.`;
    mensajeCompra.style.color = "green";

    // Mostrar resumen de compra
    let resumen = "Resumen de tu compra:\n";
    carrito.forEach(macaron => {
        resumen += `- ${macaron.nombre} (ARG$${macaron.precio})\n`;
    });
    alert(resumen);

    // Limpiar compra
    carrito = [];
    cuenta = 0;
    localStorage.removeItem("carrito");
    actualizarCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
    cargarOpcionesMacarons();
    cargarCompraDesdeLocalStorage();
});
