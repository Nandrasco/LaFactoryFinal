package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.LaFactoryFinalApp;

import io.github.jhipster.application.domain.Cursus;
import io.github.jhipster.application.repository.CursusRepository;
import io.github.jhipster.application.service.CursusService;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CursusResource REST controller.
 *
 * @see CursusResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LaFactoryFinalApp.class)
public class CursusResourceIntTest {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_DEBUT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_DEBUT = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_FIN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_FIN = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_PREREQUIS = "AAAAAAAAAA";
    private static final String UPDATED_PREREQUIS = "BBBBBBBBBB";

    private static final String DEFAULT_OBJECTIFS = "AAAAAAAAAA";
    private static final String UPDATED_OBJECTIFS = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENU = "AAAAAAAAAA";
    private static final String UPDATED_CONTENU = "BBBBBBBBBB";

    @Autowired
    private CursusRepository cursusRepository;

    @Mock
    private CursusRepository cursusRepositoryMock;

    @Mock
    private CursusService cursusServiceMock;

    @Autowired
    private CursusService cursusService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCursusMockMvc;

    private Cursus cursus;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CursusResource cursusResource = new CursusResource(cursusService);
        this.restCursusMockMvc = MockMvcBuilders.standaloneSetup(cursusResource)
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
    public static Cursus createEntity(EntityManager em) {
        Cursus cursus = new Cursus()
            .nom(DEFAULT_NOM)
            .dateDebut(DEFAULT_DATE_DEBUT)
            .dateFin(DEFAULT_DATE_FIN)
            .prerequis(DEFAULT_PREREQUIS)
            .objectifs(DEFAULT_OBJECTIFS)
            .contenu(DEFAULT_CONTENU);
        return cursus;
    }

    @Before
    public void initTest() {
        cursus = createEntity(em);
    }

    @Test
    @Transactional
    public void createCursus() throws Exception {
        int databaseSizeBeforeCreate = cursusRepository.findAll().size();

        // Create the Cursus
        restCursusMockMvc.perform(post("/api/cursuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cursus)))
            .andExpect(status().isCreated());

        // Validate the Cursus in the database
        List<Cursus> cursusList = cursusRepository.findAll();
        assertThat(cursusList).hasSize(databaseSizeBeforeCreate + 1);
        Cursus testCursus = cursusList.get(cursusList.size() - 1);
        assertThat(testCursus.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testCursus.getDateDebut()).isEqualTo(DEFAULT_DATE_DEBUT);
        assertThat(testCursus.getDateFin()).isEqualTo(DEFAULT_DATE_FIN);
        assertThat(testCursus.getPrerequis()).isEqualTo(DEFAULT_PREREQUIS);
        assertThat(testCursus.getObjectifs()).isEqualTo(DEFAULT_OBJECTIFS);
        assertThat(testCursus.getContenu()).isEqualTo(DEFAULT_CONTENU);
    }

    @Test
    @Transactional
    public void createCursusWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cursusRepository.findAll().size();

        // Create the Cursus with an existing ID
        cursus.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCursusMockMvc.perform(post("/api/cursuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cursus)))
            .andExpect(status().isBadRequest());

        // Validate the Cursus in the database
        List<Cursus> cursusList = cursusRepository.findAll();
        assertThat(cursusList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCursuses() throws Exception {
        // Initialize the database
        cursusRepository.saveAndFlush(cursus);

        // Get all the cursusList
        restCursusMockMvc.perform(get("/api/cursuses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cursus.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].dateDebut").value(hasItem(DEFAULT_DATE_DEBUT.toString())))
            .andExpect(jsonPath("$.[*].dateFin").value(hasItem(DEFAULT_DATE_FIN.toString())))
            .andExpect(jsonPath("$.[*].prerequis").value(hasItem(DEFAULT_PREREQUIS.toString())))
            .andExpect(jsonPath("$.[*].objectifs").value(hasItem(DEFAULT_OBJECTIFS.toString())))
            .andExpect(jsonPath("$.[*].contenu").value(hasItem(DEFAULT_CONTENU.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllCursusesWithEagerRelationshipsIsEnabled() throws Exception {
        CursusResource cursusResource = new CursusResource(cursusServiceMock);
        when(cursusServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restCursusMockMvc = MockMvcBuilders.standaloneSetup(cursusResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restCursusMockMvc.perform(get("/api/cursuses?eagerload=true"))
        .andExpect(status().isOk());

        verify(cursusServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllCursusesWithEagerRelationshipsIsNotEnabled() throws Exception {
        CursusResource cursusResource = new CursusResource(cursusServiceMock);
            when(cursusServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restCursusMockMvc = MockMvcBuilders.standaloneSetup(cursusResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restCursusMockMvc.perform(get("/api/cursuses?eagerload=true"))
        .andExpect(status().isOk());

            verify(cursusServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getCursus() throws Exception {
        // Initialize the database
        cursusRepository.saveAndFlush(cursus);

        // Get the cursus
        restCursusMockMvc.perform(get("/api/cursuses/{id}", cursus.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cursus.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.dateDebut").value(DEFAULT_DATE_DEBUT.toString()))
            .andExpect(jsonPath("$.dateFin").value(DEFAULT_DATE_FIN.toString()))
            .andExpect(jsonPath("$.prerequis").value(DEFAULT_PREREQUIS.toString()))
            .andExpect(jsonPath("$.objectifs").value(DEFAULT_OBJECTIFS.toString()))
            .andExpect(jsonPath("$.contenu").value(DEFAULT_CONTENU.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCursus() throws Exception {
        // Get the cursus
        restCursusMockMvc.perform(get("/api/cursuses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCursus() throws Exception {
        // Initialize the database
        cursusService.save(cursus);

        int databaseSizeBeforeUpdate = cursusRepository.findAll().size();

        // Update the cursus
        Cursus updatedCursus = cursusRepository.findById(cursus.getId()).get();
        // Disconnect from session so that the updates on updatedCursus are not directly saved in db
        em.detach(updatedCursus);
        updatedCursus
            .nom(UPDATED_NOM)
            .dateDebut(UPDATED_DATE_DEBUT)
            .dateFin(UPDATED_DATE_FIN)
            .prerequis(UPDATED_PREREQUIS)
            .objectifs(UPDATED_OBJECTIFS)
            .contenu(UPDATED_CONTENU);

        restCursusMockMvc.perform(put("/api/cursuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCursus)))
            .andExpect(status().isOk());

        // Validate the Cursus in the database
        List<Cursus> cursusList = cursusRepository.findAll();
        assertThat(cursusList).hasSize(databaseSizeBeforeUpdate);
        Cursus testCursus = cursusList.get(cursusList.size() - 1);
        assertThat(testCursus.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testCursus.getDateDebut()).isEqualTo(UPDATED_DATE_DEBUT);
        assertThat(testCursus.getDateFin()).isEqualTo(UPDATED_DATE_FIN);
        assertThat(testCursus.getPrerequis()).isEqualTo(UPDATED_PREREQUIS);
        assertThat(testCursus.getObjectifs()).isEqualTo(UPDATED_OBJECTIFS);
        assertThat(testCursus.getContenu()).isEqualTo(UPDATED_CONTENU);
    }

    @Test
    @Transactional
    public void updateNonExistingCursus() throws Exception {
        int databaseSizeBeforeUpdate = cursusRepository.findAll().size();

        // Create the Cursus

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCursusMockMvc.perform(put("/api/cursuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cursus)))
            .andExpect(status().isBadRequest());

        // Validate the Cursus in the database
        List<Cursus> cursusList = cursusRepository.findAll();
        assertThat(cursusList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCursus() throws Exception {
        // Initialize the database
        cursusService.save(cursus);

        int databaseSizeBeforeDelete = cursusRepository.findAll().size();

        // Get the cursus
        restCursusMockMvc.perform(delete("/api/cursuses/{id}", cursus.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Cursus> cursusList = cursusRepository.findAll();
        assertThat(cursusList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cursus.class);
        Cursus cursus1 = new Cursus();
        cursus1.setId(1L);
        Cursus cursus2 = new Cursus();
        cursus2.setId(cursus1.getId());
        assertThat(cursus1).isEqualTo(cursus2);
        cursus2.setId(2L);
        assertThat(cursus1).isNotEqualTo(cursus2);
        cursus1.setId(null);
        assertThat(cursus1).isNotEqualTo(cursus2);
    }
}
