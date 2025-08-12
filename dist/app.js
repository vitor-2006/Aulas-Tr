"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log('hello typescript');
let nome;
let preco;
let estoque;
let categorias;
let coordenadas;
var status;
(function (status) {
    status[status["Pendente"] = 0] = "Pendente";
    status[status["Processando"] = 1] = "Processando";
    status[status["Entregue"] = 2] = "Entregue";
    status[status["Cancelado"] = 3] = "Cancelado";
})(status || (status = {}));
function receber(nome, preco) {
    console.log(`${nome}, ${preco}`);
}
receber('notebook', 3000);
function cadastroUser(id, name, email, isActive) {
    console.log(`ID: ${id} \nName: ${name} \nE-mail: ${email} \nIs active?: ${isActive}\n`);
}
cadastroUser(102, 'John', 'John@gmail.com', true);
function cadastroProduct(id, name, price, inStock) {
    console.log(`ID: ${id} \nName: ${name} \nPrice: ${price}$ \nIs in Stock?: ${inStock}`);
}
cadastroProduct(1000300, 'Yphone 10', 399.90, true);
function getData(items) {
    return items;
}
console.log(getData([1, 2, 3]));
console.log(getData(['Notebook', 'mouse']));
const objetos = [
    { id: 1 },
    { id: 2 }
];
function getById(items, id) {
    const resultado = items.filter(function (item) {
        return item.id == id;
    });
    if (resultado) {
        return resultado[0];
    }
    return undefined;
}
console.log(getById(objetos, 2));
//# sourceMappingURL=app.js.map