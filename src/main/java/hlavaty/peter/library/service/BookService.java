package hlavaty.peter.library.service;

import hlavaty.peter.library.entity.BookEntity;
import hlavaty.peter.library.entity.BorrowedEntity;
import hlavaty.peter.library.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<BookEntity> getAllBooks() {
        return bookRepository.findAll().getBooks();
    }

    public Page<BookEntity> getAllBooks(Pageable pageable) {
        return bookRepository.findAll(pageable);
    }

    public List<BookEntity> getAvailableBooks() {
        return bookRepository.findAvailable();
    }

    public List<BookEntity> getBorrowedBooks() {
        return bookRepository.findBorrowed();
    }

    @Transactional
    public BookEntity addBook(BookEntity bookEntity) {
        return bookRepository.save(bookEntity);
    }

    @Transactional
    public BookEntity updateBook(Long id, BookEntity bookEntity) {
        bookEntity.setId(id);
        return bookRepository.findById(id).map(existingBook -> {
            existingBook.setId(bookEntity.getId());
            existingBook.setName(bookEntity.getName());
            existingBook.setAuthor(bookEntity.getAuthor());
            existingBook.setBorrowed(bookEntity.getBorrowed());
            return bookRepository.update(existingBook);
        }).orElseThrow(() -> new IllegalArgumentException("Invalid book Id:" + id));
    }

    @Transactional
    public BookEntity borrowBook(Long id, BorrowedEntity borrowed) {
        Optional<BookEntity> bookOp = bookRepository.findById(id);
        return bookOp.map(book -> {
            if (!isBorrowed(book)) {
                book.setBorrowed(borrowed);
                return bookRepository.update(book);
            } else {
                throw new IllegalArgumentException("Book not available for borrowing");
            }
        }).orElseThrow(() -> new IllegalArgumentException("Book not available in library"));
    }

    @Transactional
    public BookEntity returnBook(Long id) {
        Optional<BookEntity> bookOp = bookRepository.findById(id);
        return bookOp.map(book -> {
            if (isBorrowed(book)) {
                book.setBorrowed(null);
                return bookRepository.update(book);
            } else {
                throw new IllegalArgumentException("Book is not borrowed");
            }
        }).orElseThrow(() -> new IllegalArgumentException("Book not available in library"));
    }

    @Transactional
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    private boolean isBorrowed(BookEntity book) {
        return book.getBorrowed() != null && StringUtils.hasText(book.getBorrowed().getLastName());
    }

    public BookEntity getBook(Long id) {
        return getAllBooks().stream().filter(bookEntity -> bookEntity.getId().equals(id)).findAny().orElseThrow(() -> new IllegalArgumentException("Wrong book id!"));
    }
}

