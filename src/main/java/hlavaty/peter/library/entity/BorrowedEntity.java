package hlavaty.peter.library.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

public class BorrowedEntity {

    private String firstName;
    private String lastName;
    private String from;

    @JsonCreator
    public BorrowedEntity(@JsonProperty("FirstName") String firstName,
                    @JsonProperty("LastName") String lastName,
                    @JsonProperty("From") String from) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.from = from;
    }

    @JacksonXmlProperty(localName = "FirstName")
    public String getFirstName() {
        return firstName;
    }

    @JacksonXmlProperty(localName = "LastName")
    public String getLastName() {
        return lastName;
    }

    @JacksonXmlProperty(localName = "From")
    public String getFrom() {
        return from;
    }
}
