package com.devtoolkit.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI devToolkitOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("DevToolkit API")
                        .description("Backend APIs for DevToolkit developer utilities platform")
                        .version("1.0.0")
                        .contact(new Contact().name("DevToolkit Team"))
                        .license(new License().name("MIT License").url("https://opensource.org/licenses/MIT")));
    }
}