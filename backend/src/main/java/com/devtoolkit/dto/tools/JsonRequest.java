package com.devtoolkit.dto.tools;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class JsonRequest {
    @NotBlank(message = "JSON content cannot be blank")
    private String content;

    private Action action = Action.PRETTIFY;

    public enum Action {
        PRETTIFY, MINIFY
    }
}