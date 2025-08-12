import express, { Request, Response }  from 'express'

const app = express();
const port = 3000;

app.use(express.urlencoded());
app.use(express.json());

interface IUser {
    id: number = 1
    name: string = 'João'
    email: string = 'joão@gmail.com'
    isActive: boolean = true
}

const users: IUser[]

app.get('/', (req: Request, res: Response) => {
res.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
    console.log(`Server is running at <http://localhost>:${port}`);
    GET `/users` //Retorna todos os usuários.
    GET `/users/:id`//Retorna um usuário específico pelo ID.
    POST `/users`: //Adiciona um novo usuário ao array. O corpo da requisição deve ser validado para garantir que corresponde à interface `IUser` (pode ser uma validação simples para este exercício).
    PUT `/users/:id`: //Atualiza um usuário existente.
    DELETE `/users/:id`: //Remove um usuário.
});