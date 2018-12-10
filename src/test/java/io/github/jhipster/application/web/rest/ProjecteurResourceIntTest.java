package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.LaFactoryFinalApp;

import io.github.jhipster.application.domain.Projecteur;
import io.github.jhipster.application.repository.ProjecteurRepository;
import io.github.jhipster.application.service.ProjecteurService;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ProjecteurResource REST controller.
 *
 * @see ProjecteurResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LaFactoryFinalApp.class)
public class ProjecteurResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final Float DEFAULT_COUT = 1F;
    private static final Float UPDATED_COUT = 2F;

    private static final Integer DEFAULT_STOCK = 1;
    private static final Integer UPDATED_STOCK = 2;

    @Autowired
    private ProjecteurRepository projecteurRepository;

    @Autowired
    private ProjecteurService projecteurService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProjecteurMockMvc;

    private Projecteur projecteur;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProjecteurResource projecteurResource = new ProjecteurResource(projecteurService);
        this.restProjecteurMockMvc = MockMvcBuilders.standaloneSetup(projecteurResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Projecteur createEntity(EntityManager em) {
        Projecteur projecteur = new Projecteur()
            .code(DEFAULT_CODE)
            .cout(DEFAULT_COUT)
            .stock(DEFAULT_STOCK);
        return projecteur;
    }

    @Before
    public void initTest() {
        projecteur = createEntity(em);
    }

    @Test
    @Transactional
    public void createProjecteur() throws Exception {
        int databaseSizeBeforeCreate = projecteurRepository.findAll().size();

        // Create the Projecteur
        restProjecteurMockMvc.perform(post("/api/projecteurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(projecteur)))
            .andExpect(status().isCreated());

        // Validate the Projecteur in the database
        List<Projecteur> projecteurList = projecteurRepository.findAll();
        assertThat(projecteurList).hasSize(databaseSizeBeforeCreate + 1);
        Projecteur testProjecteur = projecteurList.get(projecteurList.size() - 1);
        assertThat(testProjecteur.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testProjecteur.getCout()).isEqualTo(DEFAULT_COUT);
        assertThat(testProjecteur.getStock()).isEqualTo(DEFAULT_STOCK);
    }

    @Test
    @Transactional
    public void createProjecteurWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = projecteurRepository.findAll().size();

        // Create the Projecteur with an existing ID
        projecteur.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProjecteurMockMvc.perform(post("/api/projecteurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(projecteur)))
            .andExpect(status().isBadRequest());

        // Validate the Projecteur in the database
        List<Projecteur> projecteurList = projecteurRepository.findAll();
        assertThat(projecteurList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProjecteurs() throws Exception {
        // Initialize the database
        projecteurRepository.saveAndFlush(projecteur);

        // Get all the projecteurList
        restProjecteurMockMvc.perform(get("/api/projecteurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(projecteur.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].cout").value(hasItem(DEFAULT_COUT.doubleValue())))
            .andExpect(jsonPath("$.[*].stock").value(hasItem(DEFAULT_STOCK)));
    }
    
    @Test
    @Transactional
    public void getProjecteur() throws Exception {
        // Initialize the database
        projecteurRepository.saveAndFlush(projecteur);

        // Get the projecteur
        restProjecteurMockMvc.perform(get("/api/projecteurs/{id}", projecteur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(projecteur.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.cout").value(DEFAULT_COUT.doubleValue()))
            .andExpect(jsonPath("$.stock").value(DEFAULT_STOCK));
    }

    @Test
    @Transactional
    public void getNonExistingProjecteur() throws Exception {
        // Get the projecteur
        restProjecteurMockMvc.perform(get("/api/projecteurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProjecteur() throws Exception {
        // Initialize the database
        projecteurService.save(projecteur);

        int databaseSizeBeforeUpdate = projecteurRepository.findAll().size();

        // Update the projecteur
        Projecteur updatedProjecteur = projecteurRepository.findById(projecteur.getId()).get();
        // Disconnect from session so that the updates on updatedProjecteur are not directly saved in db
        em.detach(updatedProjecteur);
        updatedProjecteur
            .code(UPDATED_CODE)
            .cout(UPDATED_COUT)
            .stock(UPDATED_STOCK);

        restProjecteurMockMvc.perform(put("/api/projecteurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProjecteur)))
            .andExpect(status().isOk());

        // Validate the Projecteur in the database
        List<Projecteur> projecteurList = projecteurRepository.findAll();
        assertThat(projecteurList).hasSize(databaseSizeBeforeUpdate);
        Projecteur testProjecteur = projecteurList.get(projecteurList.size() - 1);
        assertThat(testProjecteur.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testProjecteur.getCout()).isEqualTo(UPDATED_COUT);
        assertThat(testProjecteur.getStock()).isEqualTo(UPDATED_STOCK);
    }

    @Test
    @Transactional
    public void updateNonExistingProjecteur() throws Exception {
        int databaseSizeBeforeUpdate = projecteurRepository.findAll().size();

        // Create the Projecteur

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProjecteurMockMvc.perform(put("/api/projecteurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(projecteur)))
            .andExpect(status().isBadRequest());

        // Validate the Projecteur in the database
        List<Projecteur> projecteurList = projecteurRepository.findAll();
        assertThat(projecteurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProjecteur() throws Exception {
        // Initialize the database
        projecteurService.save(projecteur);

        int databaseSizeBeforeDelete = projecteurRepository.findAll().size();

        // Get the projecteur
        restProjecteurMockMvc.perform(delete("/api/projecteurs/{id}", projecteur.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Projecteur> projecteurList = projecteurRepository.findAll();
        assertThat(projecteurList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Projecteur.class);
        Projecteur projecteur1 = new Projecteur();
        projecteur1.setId(1L);
        Projecteur projecteur2 = new Projecteur();
        projecteur2.setId(projecteur1.getId());
        assertThat(projecteur1).isEqualTo(projecteur2);
        projecteur2.setId(2L);
        assertThat(projecteur1).isNotEqualTo(projecteur2);
        projecteur1.setId(null);
        assertThat(projecteur1).isNotEqualTo(projecteur2);
    }
}
