import { IBookRepository } from '../repositories/interfaces/IBookRepository';  
import { Book } from '../models/Book';  

export class BookService {  
  constructor(private bookRepository: IBookRepository) {}  

  async borrowBook(bookId: string): Promise<Book> {  
    const book = await this.bookRepository.findById(bookId);  
    if (!book) throw new Error('Book not found');  
    if (book.isBorrowed) throw new Error('Book already borrowed');  

    const updatedBook = { ...book, isBorrowed: true };  
    book.isBorrowed=true;
    //await this.bookRepository.save(updatedBook);  
    return updatedBook;  
  }

async returnBook(bookId: string): Promise<Book> {
    const book = await this.bookRepository.findById(bookId);
    if (!book) throw new Error('Book not found');
    if (!book.isBorrowed) throw new Error('Book not currently borrowed');

    const updatedBook = { ...book, isBorrowed: false };
    book.isBorrowed=false;
    //await this.bookRepository.save(updatedBook);
    return updatedBook;
  }

  // List all books (for GET /books)
  async findAllBooks(): Promise<Book[]> {
    return await this.bookRepository.findAll();
  }
  
async saveBook(bookData: { title: string; author: string }): Promise<Book> {
  const newBook: Book = {
    id: Date.now().toString(),
    title: bookData.title,
    author: bookData.author,
    isBorrowed: false
  };
  await this.bookRepository.save(newBook);
  return newBook;
}

}  