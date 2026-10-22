package com.devtoolkit.service;

import com.devtoolkit.dto.HealthCheckResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

class HealthServiceTest {

    private HealthServiceImpl healthService;

    @BeforeEach
    void setUp() {
        healthService = new HealthServiceImpl();
        ReflectionTestUtils.setField(healthService, "serviceName", "test-service");
        ReflectionTestUtils.setField(healthService, "environment", "test");
    }

    @Test
    void checkHealth_ShouldReturnValidResponse() {
        HealthCheckResponse response = healthService.checkHealth();

        assertNotNull(response);
        assertEquals("UP", response.getStatus());
        assertEquals("test-service", response.getServiceName());
        assertEquals("test", response.getEnvironment());
        assertEquals("1.0.0", response.getVersion());
        assertNotNull(response.getTimestamp());
    }
}