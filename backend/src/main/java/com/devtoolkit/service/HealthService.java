package com.devtoolkit.service;

import com.devtoolkit.dto.HealthCheckResponse;

public interface HealthService {
    HealthCheckResponse checkHealth();
}