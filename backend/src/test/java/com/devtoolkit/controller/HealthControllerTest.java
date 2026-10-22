package com.devtoolkit.controller;

import com.devtoolkit.dto.HealthCheckResponse;
import com.devtoolkit.service.HealthService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(HealthController.class)
class HealthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private HealthService healthService;

    @Test
    void checkHealth_ShouldReturn200AndHealthData() throws Exception {
        HealthCheckResponse mockResponse = HealthCheckResponse.builder()
                .status("UP")
                .serviceName("test-service")
                .environment("test")
                .version("1.0.0")
                .timestamp(LocalDateTime.now())
                .build();

        when(healthService.checkHealth()).thenReturn(mockResponse);

        mockMvc.perform(get("/api/v1/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Service is healthy"))
                .andExpect(jsonPath("$.data.status").value("UP"))
                .andExpect(jsonPath("$.data.serviceName").value("test-service"));
    }
}