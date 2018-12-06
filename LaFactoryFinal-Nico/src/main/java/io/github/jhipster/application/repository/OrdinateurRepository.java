package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Ordinateur;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Ordinateur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrdinateurRepository extends JpaRepository<Ordinateur, Long> {

}
