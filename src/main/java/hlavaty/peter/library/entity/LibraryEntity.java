package hlavaty.peter.library.entity;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;

import java.util.List;

@JacksonXmlRootElement(localName = "Library")
public class LibraryEntity {

    private List<BookEntity> bookEntities;

    @JacksonXmlElementWrapper(useWrapping = false)
    @JacksonXmlProperty(localName = "Book")
    public List<BookEntity> getBooks() {
        return bookEntities;
    }

    public void setBooks(List<BookEntity> bookEntities) {
        this.bookEntities = bookEntities;
    }
}


