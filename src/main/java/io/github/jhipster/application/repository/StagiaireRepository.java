package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Stagiaire;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Stagiaire entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StagiaireRepository extends JpaRepository<Stagiaire, Long> {

    @Query("select distinct s from stagiaire s left join fetch s.cursuses c where c.salle=:id")
    List<Stagiaire> findStagiaireBySalleId(@Param("id")Long id);
}
