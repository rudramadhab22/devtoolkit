package com.devtoolkit.controller;

import com.devtoolkit.dto.ApiResponse;
import com.devtoolkit.dto.HealthCheckResponse;
import com.devtoolkit.service.HealthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/health")
@Tag(name = "Health Check", description = "Endpoints for monitoring system health")
public class HealthController {

    private final HealthService healthService;

    public HealthController(HealthService healthService) {
        this.healthService = healthService;
    }

    @GetMapping
    @Operation(summary = "Get system health status", description = "Returns the current status of the backend service")
    public ResponseEntity<ApiResponse<HealthCheckResponse>> checkHealth() {
        HealthCheckResponse healthData = healthService.checkHealth();
        return ResponseEntity.ok(ApiResponse.success("Service is healthy", healthData));
    }
}