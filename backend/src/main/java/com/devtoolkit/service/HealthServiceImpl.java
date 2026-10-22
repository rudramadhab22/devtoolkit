package com.devtoolkit.service;

import com.devtoolkit.dto.HealthCheckResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class HealthServiceImpl implements HealthService {

    @Value("${spring.application.name:devtoolkit-backend}")
    private String serviceName;

    @Value("${spring.profiles.active:default}")
    private String environment;

    @Override
    public HealthCheckResponse checkHealth() {
        return HealthCheckResponse.builder()
                .status("UP")
                .serviceName(serviceName)
                .version("1.0.0") // Can be read from build properties in the future
                .environment(environment)
                .timestamp(LocalDateTime.now())
                .build();
    }
}