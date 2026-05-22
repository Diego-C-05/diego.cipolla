package it.demo.app.controllers;

	import java.util.Date;
	import java.util.List;
	import java.util.stream.Collectors;
	
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.web.bind.annotation.CrossOrigin;
	import org.springframework.web.bind.annotation.GetMapping;
	import org.springframework.web.bind.annotation.PostMapping;
	import org.springframework.web.bind.annotation.RequestBody;
	import org.springframework.web.bind.annotation.RequestMapping;
	import org.springframework.web.bind.annotation.RestController;
	
	import it.demo.app.persistence.entities.Item;
	import it.demo.app.services.ItemService;
	import lombok.AllArgsConstructor;
	import lombok.Data;
	import lombok.NoArgsConstructor;
	import lombok.extern.slf4j.Slf4j;
	
	@RestController
	@RequestMapping("api/items")
	@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
	@Slf4j
	public class ItemController {
	
		@Autowired
		private ItemService service;

		// DTO: oggetti semplici usati per scambiare dati con il frontend.
		// Se modifichi la struttura del DB (aggiungi colonne), aggiorna i DTO
		// corrispondenti e il mapping nei metodi del controller.
	    @Data
	    @NoArgsConstructor
	    @AllArgsConstructor
	    public static class ItemInputDTO {
	        private String title;
	        private String body;
	        private String email;
	        // Aggiungi altri campi qui...
	    }
	
	    // DTO (quello che il frontend riceve dopo la get)
	    @Data
	    @NoArgsConstructor
	    @AllArgsConstructor
	    public static class ItemListDTO {
	        private long id;
	        private String title;
	        private String body;
	    }
	
	    // DTO per la risposta all'inserimento della post
	    @Data
	    @AllArgsConstructor
	    public static class ItemResultDTO {
	        private long id;
	        private String title;
	        private Date createdAt;
	    }
	
	    // POST: riceve i dati e salva nel database
	    @PostMapping("")
	    public ItemResultDTO create(@RequestBody ItemInputDTO data) {
	
	        log.info("Ricevuta richiesta: {}", data);
	
	        Item saved = service.save(
	            data.getTitle(),
	            data.getBody(),
	            data.getEmail()
	        );
	
	        return new ItemResultDTO(
	            saved.getId(),
	            saved.getTitle(),
	            saved.getCreatedAt()
	        );
	    }
	
	    // GET: restituisce tutti i dati prendendoli dal service e trasformandoli in DTO
	    @GetMapping("")
	    public List<ItemListDTO> getAll() {
	        return service.getAll().stream()
	            .map(i -> new ItemListDTO(
	                i.getId(),
	                i.getTitle(),
	                i.getBody()
	            ))
	            .collect(Collectors.toList());
	    }
	}