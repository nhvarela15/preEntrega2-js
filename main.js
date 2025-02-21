let titulo = document.createElement("h1")
titulo.innerHTML=`<h1> Bienvenidos a Dolcie Voglie </h1>`
document.body.appendChild(titulo)








let cuenta = 0;

let postres = [
    { postre: "Macaron ", valor: 1200 },
    { postre: "Cheesecake ", valor: 15000 },
    { postre: "Crumble de Manzana ", valor: 13000 },
    { postre: "Cuorelato ", valor: 1500 },
    { postre: "Chiboust de Frutos Rojos ", valor: 17000 },
    { postre: "LemonPie ", valor: 12500 }
];

function cartaPasteleria() {
    let stockPostres = "Estas son las delicias que tenemos disponibles a la venta!\n";
    for (let i = 0; i < postres.length; i++) {
        stockPostres += `${i + 1}- ${postres[i].postre} / su valor es de ARG$${postres[i].valor}\n`;
    }
    alert(stockPostres);
}

function seleccionarPostre() {
    let numeroPostre = parseInt(prompt("Ingresa el número del producto que deseas (1-6):"));

    if (isNaN(numeroPostre) || numeroPostre < 1 || numeroPostre > postres.length) {
        alert("El número ingresado es inválido. Inténtalo nuevamente.");
        return seleccionarPostre();
    }

    let postreElegido = postres[numeroPostre - 1];
    cuenta += postreElegido.valor;
    alert(`Tu ${postreElegido.postre} será empaquetado cuidadosamente.`);
}


function mostrarPostresBaratos() {
    let precioMaximo = parseInt(prompt("¿Cuál es el precio máximo que deseas pagar por un postre?"));

    if (isNaN(precioMaximo) || precioMaximo <= 0) {
        alert("Por favor ingresa un número válido.");
        return;
    }

    let postresBaratos = postres.filter(postre => postre.valor <= precioMaximo);

    if (postresBaratos.length === 0) {
        alert("Lo sentimos, no hay postres en ese rango de precio.");
    } else {
        let mensaje = "Estos son los postres dentro de tu rango de precio:\n";
        for (let i = 0; i < postresBaratos.length; i++) {
            mensaje += `${postresBaratos[i].postre} - Precio: ARG$${postresBaratos[i].valor}\n`;
        }
        alert(mensaje);
    }
}

function abonarCuenta() {
    let efectivo = parseFloat(prompt(`Tu cuenta final es de ARG$${cuenta}. Ingresa el efectivo:`));

    while (isNaN(efectivo) || efectivo < cuenta) {
        alert("El monto ingresado es insuficiente o inválido.");
        efectivo = parseFloat(prompt(`Por favor, ingresa un monto válido. Tu cuenta es de ARG$${cuenta}:`));
    }

    let cambio = efectivo - cuenta;
    alert(`Muchas gracias por tu compra! Tu vuelto es de ARG$${cambio}`);
}

function ejecutarCompra() {
    cuenta = 0;
    alert("Te damos la bienvenida a Dolcie Voglie!");

    let verBaratos = prompt("¿Quieres ver solo postres más baratos de un precio específico? (si/no)").toLowerCase();
    if (verBaratos === "si") {
        mostrarPostresBaratos();
    }

    let continuarCompra = "si";
    while (continuarCompra === "si") {
        cartaPasteleria();
        seleccionarPostre();
        continuarCompra = prompt("¿Te gustaría seguir comprando? (si/no)").toLowerCase();
    }

    abonarCuenta();
}


ejecutarCompra();
