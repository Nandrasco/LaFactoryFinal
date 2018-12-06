package io.github.jhipster.application.service;

import io.github.jhipster.application.domain.Projecteur;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Projecteur.
 */
public interface ProjecteurService {

    /**
     * Save a projecteur.
     *
     * @param projecteur the entity to save
     * @return the persisted entity
     */
    Projecteur save(Projecteur projecteur);

    /**
     * Get all the projecteurs.
     *
     * @return the list of entities
     */
    List<Projecteur> findAll();


    /**
     * Get the "id" projecteur.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Projecteur> findOne(Long id);

    /**
     * Delete the "id" projecteur.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
