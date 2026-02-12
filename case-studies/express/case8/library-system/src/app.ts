import express from 'express';  
import { BookController } from './controllers/BookController';  
import { BookService } from './services/BookService';  
import { InMemoryBookRepository } from './repositories/InMemoryBookRepository';  

const app = express();  
app.use(express.json());  

// Initialize components  
const bookRepository = new InMemoryBookRepository();  
const bookService = new BookService(bookRepository);  
const bookController = new BookController(bookService);  

// Routes  
app.post('/books', (req, res) => bookController.saveBook(req, res));
app.get('/books', (req, res) => bookController.list(req, res));
app.post('/books/:id/borrow', (req, res) => bookController.borrowBook(req, res));
app.post('/books/:id/return', (req, res) => bookController.returnBook(req, res));

// Error handling middleware
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const port = 3000;  
app.listen(port, () => {  
  console.log(`Library system running on port ${port}`);  
});  