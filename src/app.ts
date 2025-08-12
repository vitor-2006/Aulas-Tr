console.log('hello typescript')

let nome: string
let preco: number
let estoque: boolean
let categorias: string[]
let coordenadas: [number, number]
enum status {
    Pendente, 
    Processando, 
    Entregue, 
    Cancelado
}

function receber(nome: string, preco: number){
    console.log(`${nome}, ${preco}`)
}

receber('notebook', 3000)

interface IUser {
    id: number,
    name: string,
    email: string,
    isActive: boolean
}

interface Iproduct{
    id: number
    name: string
    price: number
    inStock: boolean
    categories: string[]
}

type UserRole = 'admin' | 'user'

interface IAdminUser extends IUser {
    role: UserRole
}

function cadastroUser(id: number, name: string, email: string, isActive: boolean){
    console.log(`ID: ${id} \nName: ${name} \nE-mail: ${email} \nIs active?: ${isActive}\n`)
}
cadastroUser(102, 'John', 'John@gmail.com', true)

function cadastroProduct(id: number, name: string, price: number, inStock: boolean){
    console.log(`ID: ${id} \nName: ${name} \nPrice: ${price}$ \nIs in Stock?: ${inStock}`)
}
cadastroProduct(1000300, 'Yphone 10', 399.90, true)

function getData<T>(items: T[]): T[]{
    return items
}
console.log(getData<number>([1,2,3]))
console.log(getData<string>(['Notebook', 'mouse']))

const objetos = [
    {id: 1},
    {id: 2}
]
function getById<T extends { id: number }>(items: T[], id: number): T | undefined {
    const resultado = items.filter(function(item){
        return item.id == id
    })
    if(resultado){
        return resultado[0]
    }
    return undefined
}

console.log(getById(objetos, 2))