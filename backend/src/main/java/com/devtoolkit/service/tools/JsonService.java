package com.devtoolkit.service.tools;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

@Service
public class JsonService {

    private final ObjectMapper objectMapper;

    public JsonService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public String format(String json, boolean minify) {
        try {
            JsonNode tree = objectMapper.readTree(json);
            if (minify) {
                return objectMapper.writeValueAsString(tree);
            } else {
                return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(tree);
            }
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Invalid JSON: " + e.getOriginalMessage(), e);
        }
    }
}