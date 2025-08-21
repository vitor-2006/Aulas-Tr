

import express, { Request, Response, NextFunction }  from 'express'

const app = express();
const port = 3000;

// Middleware to log requests
const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
    next(); // Pass control to the next handler
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(loggingMiddleware); // Apply the logging middleware to all routes

// Define the interface to describe the shape of a user object
interface IUser {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
}

// Now you can define an array of IUser objects
let users: IUser[] = [
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

// GET `/users` //Returns all users.
app.get('/users', (req: Request, res: Response) => {
    return res.json(users);
});

// GET `/users/:id` //Returns a specific user by ID.
app.get('/users/:id', (req: Request<{ id: string }>, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find(element => element.id === userId);
    if (user) {
        return res.json(user);
    }
    return res.status(404).send('User not found!');
});
        
// POST `/users`: //Adds a new user to the array.
app.post('/users', (req: Request, res: Response) => {
    // This follows the original logic of pushing the body and returning the full array.
    // Note: The client is responsible for providing the full user object, including the ID.
    users.push(req.body);
    return res.status(201).send(users);
});
        
// PUT `/users/:id`: //Updates an existing user.
app.put('/users/:id', (req: Request<{ id: string }>, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    const userIndex = users.findIndex(element => element.id === userId);
    
    if (userIndex !== -1) {
        const updatedUser: IUser = { ...users[userIndex], ...req.body };
        users[userIndex] = updatedUser;
        return res.json(updatedUser);
    }
    return res.status(404).send('User not found!');
});
        
// DELETE `/users/:id`: //Removes a user.
app.delete('/users/:id', (req: Request<{ id: string }>, res: Response) => {
    const userId = parseInt(req.params.id, 10);
    const userIndex = users.findIndex(element => element.id === userId);
    
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        return res.status(200).send('user removido!');
    } else {
        return res.status(404).send('user não encontrado!');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//================================CÓDIGO IA ORIGINAL==============================================================

// import express, { Request, Response, NextFunction }  from 'express'

// const app = express();
// const port = 3000;

// // Middleware to log requests
// const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     const timestamp = new Date().toISOString();
//     console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
//     next(); // Pass control to the next handler
// };

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(loggingMiddleware); // Apply the logging middleware to all routes

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

// // GET `/users` //Returns all users.
// app.get('/users', (req: Request, res: Response) => {
//     return res.json(users);
// });

// // GET `/users/:id` //Returns a specific user by ID.
// app.get('/users/:id', (req: Request<{ id: string }>, res: Response) => {
//     const userId = parseInt(req.params.id, 10);
//     const user = users.find(element => element.id === userId);
//     if (user) {
//         return res.json(user);
//     }
//     return res.status(404).send('User not found!');
// });
        
// // POST `/users`: //Adds a new user to the array.
// app.post('/users', (req: Request, res: Response) => {
//     const newUser: IUser = req.body;
//     // Basic validation
//     if (!newUser.name || !newUser.email) {
//         return res.status(400).send('Missing name or email');
//     }
//     newUser.id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
//     users.push(newUser);
//     return res.status(201).json(newUser);
// });
        
// // PUT `/users/:id`: //Updates an existing user.
// app.put('/users/:id', (req: Request<{ id: string }>, res: Response) => {
//     const userId = parseInt(req.params.id, 10);
//     const userIndex = users.findIndex(element => element.id === userId);
    
//     if (userIndex !== -1) {
//         const updatedUser: IUser = { ...users[userIndex], ...req.body };
//         users[userIndex] = updatedUser;
//         return res.json(updatedUser);
//     }
//     return res.status(404).send('User not found!');
// });
        
// // DELETE `/users/:id`: //Removes a user.
// app.delete('/users/:id', (req: Request<{ id: string }>, res: Response) => {
//     const userId = parseInt(req.params.id, 10);
//     const userIndex = users.findIndex(element => element.id === userId);
    
//     if (userIndex !== -1) {
//         users.splice(userIndex, 1);
//         return res.status(200).send('User removed!');
//     } else {
//         return res.status(404).send('User not found!');
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });

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