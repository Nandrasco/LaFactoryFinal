package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Cursus;
import io.github.jhipster.application.domain.Stagiaire;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Stagiaire entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StagiaireRepository extends JpaRepository<Stagiaire, Long> {

    //@Query("select  from Salle s left join fetch s.cursus sc where s.id=:id")
    @Query("select distinct sc.stagiaires from Salle s left join s.cursus sc where s.id=:id")
    List<Stagiaire> findStagiaireBySalleId(@Param("id") Long id);
}

