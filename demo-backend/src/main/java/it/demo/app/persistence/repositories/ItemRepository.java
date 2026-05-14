package it.demo.app.persistence.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.demo.app.persistence.entities.Item;

/**
 * Repository JPA per l'entità `Item`.
 *
 * Nota: estendere con query custom qui se necessario. Esempio:
 * List<Item> findByEmail(String email);
 *
 * Questo layer non dovrebbe contenere logica di business complessa;
 * usare `ItemService` per orchestrare validazioni e transazioni.
 */
@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

}