package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.SalleService;
import io.github.jhipster.application.domain.Salle;
import io.github.jhipster.application.repository.SalleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing Salle.
 */
@Service
@Transactional
public class SalleServiceImpl implements SalleService {

    private final Logger log = LoggerFactory.getLogger(SalleServiceImpl.class);

    private final SalleRepository salleRepository;

    public SalleServiceImpl(SalleRepository salleRepository) {
        this.salleRepository = salleRepository;
    }

    /**
     * Save a salle.
     *
     * @param salle the entity to save
     * @return the persisted entity
     */
    @Override
    public Salle save(Salle salle) {
        log.debug("Request to save Salle : {}", salle);
        return salleRepository.save(salle);
    }

    /**
     * Get all the salles.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Salle> findAll() {
        log.debug("Request to get all Salles");
        return salleRepository.findAll();
    }



    /**
     *  get all the salles where Projecteur is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Salle> findAllWhereProjecteurIsNull() {
        log.debug("Request to get all salles where Projecteur is null");
        return StreamSupport
            .stream(salleRepository.findAll().spliterator(), false)
            .filter(salle -> salle.getProjecteur() == null)
            .collect(Collectors.toList());
    }


    /**
     *  get all the salles where Cursus is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Salle> findAllWhereCursusIsNull() {
        log.debug("Request to get all salles where Cursus is null");
        return StreamSupport
            .stream(salleRepository.findAll().spliterator(), false)
            .filter(salle -> salle.getCursus() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one salle by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Salle> findOne(Long id) {
        log.debug("Request to get Salle : {}", id);
        return salleRepository.findById(id);
    }

    /**
     * Delete the salle by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Salle : {}", id);
        salleRepository.deleteById(id);
    }
}
