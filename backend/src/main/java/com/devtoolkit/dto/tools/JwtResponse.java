package com.devtoolkit.dto.tools;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class JwtResponse {
    private Map<String, Object> header;
    private Map<String, Object> payload;
    private boolean validFormat;
}