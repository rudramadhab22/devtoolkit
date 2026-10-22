package com.devtoolkit.service.tools;

import com.devtoolkit.dto.tools.JwtResponse;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Map;

@Service
public class JwtService {

    private final ObjectMapper objectMapper;

    public JwtService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public JwtResponse decode(String token) {
        if (token == null || token.isBlank()) {
            throw new IllegalArgumentException("JWT token cannot be empty");
        }

        String[] parts = token.split("\\.");
        if (parts.length < 2) {
            throw new IllegalArgumentException("Invalid JWT token format. Must have at least header and payload.");
        }

        try {
            String headerJson = decodeBase64Url(parts[0]);
            String payloadJson = decodeBase64Url(parts[1]);

            Map<String, Object> header = objectMapper.readValue(headerJson, new TypeReference<>() {});
            Map<String, Object> payload = objectMapper.readValue(payloadJson, new TypeReference<>() {});

            return JwtResponse.builder()
                    .header(header)
                    .payload(payload)
                    .validFormat(true)
                    .build();
        } catch (Exception e) {
            throw new IllegalArgumentException("Failed to parse JWT: " + e.getMessage(), e);
        }
    }

    private String decodeBase64Url(String base64Url) {
        byte[] decodedBytes = Base64.getUrlDecoder().decode(base64Url);
        return new String(decodedBytes, StandardCharsets.UTF_8);
    }
}