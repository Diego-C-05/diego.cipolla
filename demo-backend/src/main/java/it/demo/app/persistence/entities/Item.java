package it.demo.app.persistence.entities;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // Titolo: campo obbligatorio corrispondente a una colonna NOT NULL nel DB.
    @Column(nullable = false)
    private String title;

    // Body: testo lungo. Se il DB cambia tipo, aggiornare columnDefinition o la migration.
    @Column(columnDefinition = "TEXT")
    private String body;

    // Email: mapping diretto (nome campo Java = nome colonna DB).
    private String email;

    // Esempio: per usare un nome colonna diverso, aggiungere @Column(name = "...").
    // @Column(name = "contact_person")
    // private String contactPerson;

    // Data di creazione salvata nella colonna `created_at`.
    @Column(name = "created_at")
    private Date createdAt;

    // Imposta createdAt prima del persist se non specificato.
    @PrePersist
    public void prePersist() {
        if (createdAt == null) {
            createdAt = new Date();
        }
    }
}