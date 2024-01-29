package hlavaty.peter.library.controller;

import hlavaty.peter.library.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {

    private final LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String name, @RequestParam String password) {
        if (loginService.login(name, password)) {
            return ResponseEntity.ok("{'message': 'Logged in successfully'}");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{'message': 'Invalid name or password'}");
        }
    }
}

