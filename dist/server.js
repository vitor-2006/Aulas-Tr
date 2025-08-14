"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
// Now you can define an array of IUser objects
const users = [
    {
        id: 1,
        name: 'João',
        email: 'joão@gmail.com',
        isActive: true
    },
    {
        id: 2,
        name: 'Maria',
        email: 'maria@gmail.com',
        isActive: false
    }
];
// app.get('/', (req: Request, res: Response) => {
// res.send('Hello, TypeScript with Express!');
// });
// GET `/users` //Retorna todos os usuários.
// GET `/users/:id`//Retorna um usuário específico pelo ID.
// POST `/users`: //Adiciona um novo usuário ao array. O corpo da requisição deve ser validado para garantir que corresponde à interface `IUser` (pode ser uma validação simples para este exercício).
// PUT `/users/:id`: //Atualiza um usuário existente.
// DELETE `/users/:id`: //Remove um usuário.
app.use(express_1.default.json());
app.get('/users', (req, res) => {
    return res.send(users);
});
app.get('/users/:id', (req, res) => {
    // if(users.includes(req.params.users.id)){
    //     return res.send(users)
    // }else{
    //     return res.send('id inválido!')
    // }
    const user = users.find((element) => {
        return element.id === req.params.id;
    });
    return res.json(user);
});
app.post('/users', (req, res) => {
    users.push(req.body);
    return res.send(users);
});
app.put('/users/:id', (req, res) => {
});
app.delete('/users/:id', (req, res) => {
});
app.listen(port, () => {
    console.log(`Server is running at <http://localhost>:${port}`);
});
//# sourceMappingURL=server.js.map