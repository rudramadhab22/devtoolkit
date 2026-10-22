package com.devtoolkit.dto.tools;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SqlRequest {
    @NotBlank(message = "SQL content cannot be blank")
    private String content;
    
    // Can support different dialects later (e.g., standard, postgresql, mysql)
    private String dialect = "standard";
}