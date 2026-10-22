package com.devtoolkit.service.tools;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ToolServiceTest {

    private JsonService jsonService;
    private Base64Service base64Service;
    private UuidService uuidService;
    private SqlService sqlService;

    @BeforeEach
    void setUp() {
        jsonService = new JsonService(new ObjectMapper());
        base64Service = new Base64Service();
        uuidService = new UuidService();
        sqlService = new SqlService();
    }

    @Test
    void testJsonPrettify() {
        String input = "{\"name\":\"test\"}";
        String formatted = jsonService.format(input, false);
        assertTrue(formatted.contains("\\n") || formatted.contains("\r") || formatted.contains(" "));
        assertTrue(formatted.contains("\"name\""));
    }

    @Test
    void testJsonMinify() {
        String input = "{ \n \"name\" : \n \"test\" }";
        String minified = jsonService.format(input, true);
        assertEquals("{\"name\":\"test\"}", minified);
    }

    @Test
    void testBase64Encode() {
        String encoded = base64Service.encode("Hello World");
        assertEquals("SGVsbG8gV29ybGQ=", encoded);
    }

    @Test
    void testBase64Decode() {
        String decoded = base64Service.decode("SGVsbG8gV29ybGQ=");
        assertEquals("Hello World", decoded);
    }

    @Test
    void testUuidGeneration() {
        List<String> uuids = uuidService.generateV4(5);
        assertEquals(5, uuids.size());
        assertNotNull(uuids.get(0));
        assertTrue(uuids.get(0).matches("^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$"));
    }

    @Test
    void testSqlFormat() {
        String sql = "SELECT * FROM users WHERE id=1";
        String formatted = sqlService.format(sql);
        assertTrue(formatted.contains("SELECT"));
        assertTrue(formatted.contains("FROM"));
        assertTrue(formatted.contains("\n")); // Should have newlines
    }
}