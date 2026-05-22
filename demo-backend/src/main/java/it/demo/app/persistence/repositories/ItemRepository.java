package it.demo.app.persistence.repositories;

import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.demo.app.persistence.entities.Item;

/**
 * Repository JPA per l'entità `Item`.
 *
 * Metodi base CRUD sono ereditati da {@link JpaRepository} (save, findAll,
 * findById, deleteById, ecc.). Qui definiamo alcune query di utilità che
 * possono servire al progetto (Spring Data genera automaticamente
 * l'implementazione a runtime).
 *
 * Esempi di metodi custom:
 * - List<Item> findByEmail(String email);
 * - List<Item> findByTitleContainingIgnoreCase(String keyword);
 * - List<Item> findByCreatedAtBetween(Date start, Date end);
 * - boolean existsByEmail(String email);
 * - void deleteByEmail(String email);
 *
 * Questo layer non dovrebbe contenere logica di business complessa;
 * usare `ItemService` per orchestrare validazioni e transazioni.
 */
@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

	// Cerca tutti gli item associati a una email specifica.
	List<Item> findByEmail(String email);

	// Cerca item il cui titolo contiene la parola chiave (case-insensitive).
	List<Item> findByTitleContainingIgnoreCase(String keyword);

	// Restituisce item creati in un intervallo di date.
	List<Item> findByCreatedAtBetween(Date start, Date end);

	// Verifica se esiste almeno un item per una data email.
	boolean existsByEmail(String email);

	// Elimina item con l'email fornita.
	void deleteByEmail(String email);

}