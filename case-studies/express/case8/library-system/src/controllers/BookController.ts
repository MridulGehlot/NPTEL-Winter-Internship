import { Request, Response } from 'express';  
import { BookService } from '../services/BookService';  

export class BookController {  
  constructor(private bookService: BookService) {}  

  async borrowBook(req: Request, res: Response): Promise<void> {  
    try {  
      const bookId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const book = await this.bookService.borrowBook(bookId);  
      res.json(book);  
    } catch (error:any) {  
      res.status(400).json({ error: error.message });  
    }  
  }
  
async returnBook(req: Request, res: Response): Promise<void> {
    try {
      const bookId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const book = await this.bookService.returnBook(bookId);
      res.json(book);
    } catch (error: any) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

async  list(req: Request, res: Response): Promise<void> {
try {
      const books = await this.bookService.findAllBooks();
      res.json(books);
    } catch (error: any) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

async saveBook(req: Request, res: Response): Promise<void> {
    try {
      const { title, author } = req.body;
      if (!title || !author) {
        res.status(400).json({ error: 'Title and author required' });
        return;
      }
      
      const book = await this.bookService.saveBook({ title, author });
      res.status(201).json({ success: true, book });
    } catch (error: any) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

}