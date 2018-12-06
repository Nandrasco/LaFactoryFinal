package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Projecteur;
import io.github.jhipster.application.service.ProjecteurService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Projecteur.
 */
@RestController
@RequestMapping("/api")
public class ProjecteurResource {

    private final Logger log = LoggerFactory.getLogger(ProjecteurResource.class);

    private static final String ENTITY_NAME = "projecteur";

    private final ProjecteurService projecteurService;

    public ProjecteurResource(ProjecteurService projecteurService) {
        this.projecteurService = projecteurService;
    }

    /**
     * POST  /projecteurs : Create a new projecteur.
     *
     * @param projecteur the projecteur to create
     * @return the ResponseEntity with status 201 (Created) and with body the new projecteur, or with status 400 (Bad Request) if the projecteur has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/projecteurs")
    @Timed
    public ResponseEntity<Projecteur> createProjecteur(@RequestBody Projecteur projecteur) throws URISyntaxException {
        log.debug("REST request to save Projecteur : {}", projecteur);
        if (projecteur.getId() != null) {
            throw new BadRequestAlertException("A new projecteur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Projecteur result = projecteurService.save(projecteur);
        return ResponseEntity.created(new URI("/api/projecteurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /projecteurs : Updates an existing projecteur.
     *
     * @param projecteur the projecteur to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated projecteur,
     * or with status 400 (Bad Request) if the projecteur is not valid,
     * or with status 500 (Internal Server Error) if the projecteur couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/projecteurs")
    @Timed
    public ResponseEntity<Projecteur> updateProjecteur(@RequestBody Projecteur projecteur) throws URISyntaxException {
        log.debug("REST request to update Projecteur : {}", projecteur);
        if (projecteur.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Projecteur result = projecteurService.save(projecteur);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, projecteur.getId().toString()))
            .body(result);
    }

    /**
     * GET  /projecteurs : get all the projecteurs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of projecteurs in body
     */
    @GetMapping("/projecteurs")
    @Timed
    public List<Projecteur> getAllProjecteurs() {
        log.debug("REST request to get all Projecteurs");
        return projecteurService.findAll();
    }

    /**
     * GET  /projecteurs/:id : get the "id" projecteur.
     *
     * @param id the id of the projecteur to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the projecteur, or with status 404 (Not Found)
     */
    @GetMapping("/projecteurs/{id}")
    @Timed
    public ResponseEntity<Projecteur> getProjecteur(@PathVariable Long id) {
        log.debug("REST request to get Projecteur : {}", id);
        Optional<Projecteur> projecteur = projecteurService.findOne(id);
        return ResponseUtil.wrapOrNotFound(projecteur);
    }

    /**
     * DELETE  /projecteurs/:id : delete the "id" projecteur.
     *
     * @param id the id of the projecteur to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/projecteurs/{id}")
    @Timed
    public ResponseEntity<Void> deleteProjecteur(@PathVariable Long id) {
        log.debug("REST request to delete Projecteur : {}", id);
        projecteurService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
