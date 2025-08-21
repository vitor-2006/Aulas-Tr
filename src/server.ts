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
    const newUser: IUser = req.body;
    // Basic validation
    if (!newUser.name || !newUser.email) {
        return res.status(400).send('Missing name or email');
    }
    newUser.id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    users.push(newUser);
    return res.status(201).json(newUser);
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
        return res.status(200).send('User removed!');
    } else {
        return res.status(404).send('User not found!');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
