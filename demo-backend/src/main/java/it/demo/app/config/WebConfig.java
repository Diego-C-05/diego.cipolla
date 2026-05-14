package it.demo.app.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Configurazione CORS minima per lo sviluppo locale.
        // - Modifica gli origins qui sotto per aggiungere altri frontend in sviluppo.
        // - Il mapping "/api/**" espone tutte le rotte REST sotto /api.
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                // Se il frontend invia cookie/authorization header, impostare true.
                .allowCredentials(true);
    }
}