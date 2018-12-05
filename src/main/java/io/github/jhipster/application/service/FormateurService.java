package io.github.jhipster.application.service;

import io.github.jhipster.application.domain.Formateur;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Formateur.
 */
public interface FormateurService {

    /**
     * Save a formateur.
     *
     * @param formateur the entity to save
     * @return the persisted entity
     */
    Formateur save(Formateur formateur);

    /**
     * Get all the formateurs.
     *
     * @return the list of entities
     */
    List<Formateur> findAll();


    /**
     * Get the "id" formateur.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Formateur> findOne(Long id);

    /**
     * Delete the "id" formateur.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
