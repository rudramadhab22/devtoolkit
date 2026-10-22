package com.devtoolkit.controller;

import com.devtoolkit.dto.ApiResponse;
import com.devtoolkit.dto.tools.Base64Request;
import com.devtoolkit.dto.tools.JsonRequest;
import com.devtoolkit.dto.tools.JwtResponse;
import com.devtoolkit.dto.tools.SqlRequest;
import com.devtoolkit.service.tools.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/tools")
@Tag(name = "Developer Tools", description = "Endpoints for all developer utilities")
public class ToolController {

    private final JsonService jsonService;
    private final Base64Service base64Service;
    private final UuidService uuidService;
    private final JwtService jwtService;
    private final SqlService sqlService;

    public ToolController(JsonService jsonService,
                          Base64Service base64Service,
                          UuidService uuidService,
                          JwtService jwtService,
                          SqlService sqlService) {
        this.jsonService = jsonService;
        this.base64Service = base64Service;
        this.uuidService = uuidService;
        this.jwtService = jwtService;
        this.sqlService = sqlService;
    }

    @PostMapping("/json")
    @Operation(summary = "Format or Minify JSON")
    public ResponseEntity<ApiResponse<String>> formatJson(@Valid @RequestBody JsonRequest request) {
        boolean minify = request.getAction() == JsonRequest.Action.MINIFY;
        String result = jsonService.format(request.getContent(), minify);
        return ResponseEntity.ok(ApiResponse.success("JSON processed successfully", result));
    }

    @PostMapping("/base64")
    @Operation(summary = "Encode or Decode Base64 string")
    public ResponseEntity<ApiResponse<String>> processBase64(@Valid @RequestBody Base64Request request) {
        String result;
        if (request.getAction() == Base64Request.Action.ENCODE) {
            result = base64Service.encode(request.getContent());
        } else {
            result = base64Service.decode(request.getContent());
        }
        return ResponseEntity.ok(ApiResponse.success("Base64 processed successfully", result));
    }

    @GetMapping("/uuid")
    @Operation(summary = "Generate UUIDs")
    public ResponseEntity<ApiResponse<List<String>>> generateUuids(@RequestParam(defaultValue = "1") int count) {
        List<String> uuids = uuidService.generateV4(count);
        return ResponseEntity.ok(ApiResponse.success(count + " UUID(s) generated successfully", uuids));
    }

    @PostMapping("/jwt")
    @Operation(summary = "Decode JWT token")
    public ResponseEntity<ApiResponse<JwtResponse>> decodeJwt(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        JwtResponse response = jwtService.decode(token);
        return ResponseEntity.ok(ApiResponse.success("JWT decoded successfully", response));
    }

    @PostMapping("/sql")
    @Operation(summary = "Format SQL query")
    public ResponseEntity<ApiResponse<String>> formatSql(@Valid @RequestBody SqlRequest request) {
        String result = sqlService.format(request.getContent());
        return ResponseEntity.ok(ApiResponse.success("SQL formatted successfully", result));
    }
}