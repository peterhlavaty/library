package hlavaty.peter.library.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Value("${app.name}")
    private String expectedName;

    @Value("${app.password}")
    private String expectedPassword;

    public boolean login(String name, String password) {
        return expectedName.equals(name) && expectedPassword.equals(password);
    }
}

