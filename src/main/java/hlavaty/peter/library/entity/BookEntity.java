package hlavaty.peter.library.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

public class BookEntity {

    private Long id;
    private String name;
    private String author;
    private BorrowedEntity borrowed;

    @JsonCreator
    public BookEntity(@JsonProperty("id") Long id,
                      @JsonProperty("Name") String name,
                      @JsonProperty("Author") String author,
                      @JsonProperty("Borrowed") BorrowedEntity borrowed) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.borrowed = borrowed;
    }

    @JacksonXmlProperty(isAttribute = true)
    public Long getId() {
        return id;
    }

    @JacksonXmlProperty(localName = "Name")
    public String getName() {
        return name;
    }

    @JacksonXmlProperty(localName = "Author")
    public String getAuthor() {
        return author;
    }

    @JacksonXmlProperty(localName = "Borrowed")
    public BorrowedEntity getBorrowed() {
        return borrowed;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setBorrowed(BorrowedEntity borrowed) {
        this.borrowed = borrowed;
    }
}


