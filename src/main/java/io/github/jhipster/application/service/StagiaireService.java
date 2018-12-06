package io.github.jhipster.application.service;

import io.github.jhipster.application.domain.Stagiaire;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Stagiaire.
 */
public interface StagiaireService {

    /**
     * Save a stagiaire.
     *
     * @param stagiaire the entity to save
     * @return the persisted entity
     */
    Stagiaire save(Stagiaire stagiaire);

    /**
     * Get all the stagiaires.
     *
     * @return the list of entities
     */
    List<Stagiaire> findAll();
    /**
     * Get all the StagiaireDTO where Ordinateur is null.
     *
     * @return the list of entities
     */
    List<Stagiaire> findAllWhereOrdinateurIsNull();

    List<Stagiaire> findStagiaireBySalleId(Long id);

    /**
     * Get the "id" stagiaire.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Stagiaire> findOne(Long id);

    /**
     * Delete the "id" stagiaire.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
