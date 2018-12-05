package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Technicien;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Technicien entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TechnicienRepository extends JpaRepository<Technicien, Long> {

}
