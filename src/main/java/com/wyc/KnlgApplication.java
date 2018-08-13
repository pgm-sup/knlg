package com.wyc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

/**
 * @author pgm_sup
 */
@SpringBootApplication
public class KnlgApplication extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(KnlgApplication.class);
    }
    public static void main(String[] args) {
        SpringApplication.run(KnlgApplication.class, args);
    }
}
