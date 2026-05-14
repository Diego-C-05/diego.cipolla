package it.demo.app.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.demo.app.persistence.entities.Item;
import it.demo.app.persistence.repositories.ItemRepository;

@Service
public class ItemService {

    @Autowired
    private ItemRepository repository;
    /**
     * Salva un nuovo `Item` nel database.
     *
     * Responsabilità:
     * - costruire l'entità a partire dai parametri ricevuti dal controller
     * - applicare eventuali validazioni o trasformazioni semplici
     * - delegare il salvataggio al repository
     *
     * Se servono validazioni complesse (es. unique checks) o transazioni
     * multiple, aggiungere qui la logica o annotare il metodo con
     * @Transactional.
     *
     * Aggiornare la firma se si aggiungono colonne/parametri nel DB.
     */
    public Item save(
            String title,
            String body,
            String email) {

        Item entity = new Item();
        entity.setTitle(title);
        entity.setBody(body);
        entity.setEmail(email);
        entity.setCreatedAt(new Date());

        return repository.save(entity);
    }

    // Metodo per leggere tutti i record
    public List<Item> getAll() {
        return repository.findAll();
    }
}