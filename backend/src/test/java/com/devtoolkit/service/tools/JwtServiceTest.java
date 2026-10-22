package com.devtoolkit.service.tools;

import com.devtoolkit.dto.tools.JwtResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class JwtServiceTest {

    private JwtService jwtService;

    @BeforeEach
    void setUp() {
        jwtService = new JwtService(new ObjectMapper());
    }

    @Test
    void testJwtDecode() {
        // A simple test JWT: header={"alg":"HS256"}, payload={"sub":"1234567890","name":"John Doe","iat":1516239022}
        String token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
        
        JwtResponse response = jwtService.decode(token);
        
        assertTrue(response.isValidFormat());
        assertEquals("HS256", response.getHeader().get("alg"));
        assertEquals("John Doe", response.getPayload().get("name"));
    }

    @Test
    void testInvalidJwt() {
        assertThrows(IllegalArgumentException.class, () -> jwtService.decode("invalid.token"));
    }
}