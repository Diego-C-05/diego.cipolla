package it.demo.app;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
/**
 * Test di base che verifica il caricamento del contesto Spring.
 *
 * Scopo: assicurarsi che la configurazione dell'app non fallisca all'avvio.
 * Eseguire tutti i test (da root del progetto, Windows):
 *   .\\mvnw.cmd test
 */
class DemoBackendApplicationTests {

	@Test
	void contextLoads() {
	}

}
