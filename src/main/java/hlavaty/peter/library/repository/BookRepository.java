package hlavaty.peter.library.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import hlavaty.peter.library.entity.BookEntity;
import hlavaty.peter.library.entity.LibraryEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Repository
public class BookRepository {
    private static final ObjectMapper mapper = new XmlMapper();

    @Value("${app.db.file}")
    private String dbFilePath;
    
    public Page<BookEntity> findAll(Pageable pageable) {
        List<BookEntity> allBooks = findAll().getBooks();
        int fromIndex = (pageable.getPageNumber() - 1) * pageable.getPageSize();
        if (allBooks.size() <= fromIndex){
            return new PageImpl<>(Collections.emptyList(), pageable, allBooks.size());
        }
        return new PageImpl<>(allBooks.subList(fromIndex, Math.min(fromIndex + pageable.getPageSize(), allBooks.size())));
    }

    public LibraryEntity findAll() {
        if (!Files.exists(Path.of(dbFilePath))) {
            return new LibraryEntity();
        }
        try {
            return mapper.readValue(new File(dbFilePath), LibraryEntity.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public Optional<BookEntity> findById(Long id) {
        return findAll().getBooks().stream()
                .filter(bookEntity -> id.equals(bookEntity.getId()))
                .findAny();
    }

    public List<BookEntity> findBorrowed() {
        return findAll().getBooks().stream()
                .filter(bookEntity -> bookEntity.getBorrowed() != null
                        && StringUtils.hasText(bookEntity.getBorrowed().getLastName()))
                .toList();
    }

    public List<BookEntity> findAvailable() {
        return findAll().getBooks().stream()
                .filter(bookEntity -> bookEntity.getBorrowed() == null
                        || (!StringUtils.hasText(bookEntity.getBorrowed().getLastName())))
                .toList();
    }

    public BookEntity save(BookEntity bookEntity) {
        LibraryEntity libraryEntity = findAll();
        if (bookEntity.getId() == null) {
            long id = libraryEntity.getBooks().stream().map(BookEntity::getId).max(Comparator.nullsFirst(Comparator.naturalOrder())).orElse(0L) + 1;
            bookEntity.setId(id);
        }
        libraryEntity.getBooks().add(bookEntity);
        try {
            mapper.writeValue(new File(dbFilePath), libraryEntity);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return bookEntity;
    }

    public BookEntity update(BookEntity bookEntity) {
        LibraryEntity libraryEntity = findAll();
        libraryEntity.getBooks().removeIf(book -> book.getId() != null && book.getId().equals(bookEntity.getId()));
        libraryEntity.getBooks().add(bookEntity);
        try {
            mapper.writeValue(new File(dbFilePath), libraryEntity);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return bookEntity;
    }

    public void deleteById(Long id) {
        LibraryEntity libraryEntity = findAll();
        libraryEntity.getBooks().removeIf(bookEntity -> bookEntity.getId() != null && bookEntity.getId().equals(id));
        try {
            mapper.writeValue(new File(dbFilePath), libraryEntity);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}

