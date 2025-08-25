// src/index.ts

import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { userRepository, IUser, CreateUserDto } from './user.repository'; // <-- Import the repository

// Custom Error class
class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

const app = express();
const port = 3000;

const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
    next();
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(loggingMiddleware);

// GET `/users` //Returns all users.
app.get('/users', async (req: Request, res: Response) => {
    const users = await userRepository.findAll();
    return res.json(users);
});

// GET `/users/:id` //Returns a specific user by ID.
app.get('/users/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.id, 10);
    const user = await userRepository.findById(userId);
    if (user) {
        return res.json(user);
    }
    return next(new AppError('User not found!', 404));
});

// POST `/users`: //Adds a new user.
app.post('/users', async (req: Request, res: Response) => {
    // The request body should contain name, email, isActive
    const userData: CreateUserDto = req.body;
    const newUser = await userRepository.create(userData);
    return res.status(201).json(newUser);
});

// PUT `/users/:id`: //Updates an existing user.
app.put('/users/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.id, 10);
    const updates: Partial<IUser> = req.body;
    
    const updatedUser = await userRepository.update(userId, updates);
    
    if (updatedUser) {
        return res.json(updatedUser);
    }
    return next(new AppError('User not found!', 404));
});

// DELETE `/users/:id`: //Removes a user.
app.delete('/users/:id', async (req: Request<{ id:string }>, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.id, 10);
    
    const wasDeleted = await userRepository.delete(userId);
    
    if (wasDeleted) {
        // Using 204 No Content is common for successful deletions without a body
        return res.status(204).send(); 
    } else {
        return next(new AppError('User not found!', 404));
    }
});

// Global Error Handling Middleware
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(`Error: ${err.message}`);

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'An internal server error occurred.'
    });
};

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//====================================================MEU CÓDIGO===================================================
// import express, { Request, Response }  from 'express'

// const app = express();
// const port = 3000;

// app.use(express.urlencoded());
// app.use(express.json());

// // Define the interface to describe the shape of a user object
// interface IUser {
//     id: number;
//     name: string;
//     email: string;
//     isActive: boolean;
// }

// // Now you can define an array of IUser objects
// let users: IUser[] = [
//     {
//         id: 1,
//         name: 'João',
//         email: 'joão@gmail.com',
//         isActive: true
//     },
//     {
//         id: 2,
//         name: 'Maria',
//         email: 'maria@gmail.com',
//         isActive: false
//     }
// ];


// // app.get('/', (req: Request, res: Response) => {
// // res.send('Hello, TypeScript with Express!');
// // });


// // GET `/users` //Retorna todos os usuários.
// // GET `/users/:id`//Retorna um usuário específico pelo ID.
// // POST `/users`: //Adiciona um novo usuário ao array. O corpo da requisição deve ser validado para garantir que corresponde à interface `IUser` (pode ser uma validação simples para este exercício).
// // PUT `/users/:id`: //Atualiza um usuário existente.
// // DELETE `/users/:id`: //Remove um usuário.

// app.use(express.json())

// app.get('/users', (req: Request, res: Response) => {
//     return res.send(users)
// })

// app.get('/users/:id', (req: Request<{id:number}>, res: Response) => {
// // if(users.includes(req.params.users.id)){
// //     return res.send(users)
// // }else{
// //     return res.send('id inválido!')
// // }
//     const user = users.find((element) => {
//         return element.id === req.params.id
//     })
//     return res.json(user)
// })
        
// app.post('/users', (req: Request, res: Response) => {
//     users.push(req.body)
//     return res.send(users)
// })
        
// app.put('/users/:id', (req: Request<{id:number}>, res: Response) => {
//     const user = users.findIndex((element) => {
//         return element.id === req.params.id
//     })
//     let update = req.body
//     if(user!==-1){
//         users[user] = update
//     }
//     return res.json(user)
// })
        
// app.delete('/users/:id', (req: Request<{id:number}>, res: Response) => {
//     const user = users.findIndex((element) => {
//         return element.id === req.params.id
        
//     })
//     if(user!==-1){
//         users.splice(user, 1)
//         return res.send('user removido!')
//     }else{
//         return res.send('user não encontrado!')
//     }
// })

// app.listen(port, () => {
//     console.log(`Server is running at <http://localhost>:${port}`);
// });