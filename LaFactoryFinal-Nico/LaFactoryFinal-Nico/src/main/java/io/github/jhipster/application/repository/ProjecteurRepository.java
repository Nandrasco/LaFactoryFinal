package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Projecteur;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Projecteur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjecteurRepository extends JpaRepository<Projecteur, Long> {

}
