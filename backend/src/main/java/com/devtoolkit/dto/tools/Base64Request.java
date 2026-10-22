package com.devtoolkit.dto.tools;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class Base64Request {
    @NotBlank(message = "Content cannot be blank")
    private String content;

    private Action action = Action.ENCODE;

    public enum Action {
        ENCODE, DECODE
    }
}