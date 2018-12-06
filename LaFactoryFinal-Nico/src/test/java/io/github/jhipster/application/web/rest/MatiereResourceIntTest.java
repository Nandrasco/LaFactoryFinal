package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.LaFactoryFinalApp;

import io.github.jhipster.application.domain.Matiere;
import io.github.jhipster.application.repository.MatiereRepository;
import io.github.jhipster.application.service.MatiereService;
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
import java.util.ArrayList;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MatiereResource REST controller.
 *
 * @see MatiereResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LaFactoryFinalApp.class)
public class MatiereResourceIntTest {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    @Autowired
    private MatiereRepository matiereRepository;

    @Mock
    private MatiereRepository matiereRepositoryMock;

    @Mock
    private MatiereService matiereServiceMock;

    @Autowired
    private MatiereService matiereService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMatiereMockMvc;

    private Matiere matiere;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MatiereResource matiereResource = new MatiereResource(matiereService);
        this.restMatiereMockMvc = MockMvcBuilders.standaloneSetup(matiereResource)
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
    public static Matiere createEntity(EntityManager em) {
        Matiere matiere = new Matiere()
            .nom(DEFAULT_NOM);
        return matiere;
    }

    @Before
    public void initTest() {
        matiere = createEntity(em);
    }

    @Test
    @Transactional
    public void createMatiere() throws Exception {
        int databaseSizeBeforeCreate = matiereRepository.findAll().size();

        // Create the Matiere
        restMatiereMockMvc.perform(post("/api/matieres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(matiere)))
            .andExpect(status().isCreated());

        // Validate the Matiere in the database
        List<Matiere> matiereList = matiereRepository.findAll();
        assertThat(matiereList).hasSize(databaseSizeBeforeCreate + 1);
        Matiere testMatiere = matiereList.get(matiereList.size() - 1);
        assertThat(testMatiere.getNom()).isEqualTo(DEFAULT_NOM);
    }

    @Test
    @Transactional
    public void createMatiereWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = matiereRepository.findAll().size();

        // Create the Matiere with an existing ID
        matiere.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMatiereMockMvc.perform(post("/api/matieres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(matiere)))
            .andExpect(status().isBadRequest());

        // Validate the Matiere in the database
        List<Matiere> matiereList = matiereRepository.findAll();
        assertThat(matiereList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMatieres() throws Exception {
        // Initialize the database
        matiereRepository.saveAndFlush(matiere);

        // Get all the matiereList
        restMatiereMockMvc.perform(get("/api/matieres?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(matiere.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllMatieresWithEagerRelationshipsIsEnabled() throws Exception {
        MatiereResource matiereResource = new MatiereResource(matiereServiceMock);
        when(matiereServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restMatiereMockMvc = MockMvcBuilders.standaloneSetup(matiereResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restMatiereMockMvc.perform(get("/api/matieres?eagerload=true"))
        .andExpect(status().isOk());

        verify(matiereServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllMatieresWithEagerRelationshipsIsNotEnabled() throws Exception {
        MatiereResource matiereResource = new MatiereResource(matiereServiceMock);
            when(matiereServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restMatiereMockMvc = MockMvcBuilders.standaloneSetup(matiereResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restMatiereMockMvc.perform(get("/api/matieres?eagerload=true"))
        .andExpect(status().isOk());

            verify(matiereServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getMatiere() throws Exception {
        // Initialize the database
        matiereRepository.saveAndFlush(matiere);

        // Get the matiere
        restMatiereMockMvc.perform(get("/api/matieres/{id}", matiere.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(matiere.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMatiere() throws Exception {
        // Get the matiere
        restMatiereMockMvc.perform(get("/api/matieres/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMatiere() throws Exception {
        // Initialize the database
        matiereService.save(matiere);

        int databaseSizeBeforeUpdate = matiereRepository.findAll().size();

        // Update the matiere
        Matiere updatedMatiere = matiereRepository.findById(matiere.getId()).get();
        // Disconnect from session so that the updates on updatedMatiere are not directly saved in db
        em.detach(updatedMatiere);
        updatedMatiere
            .nom(UPDATED_NOM);

        restMatiereMockMvc.perform(put("/api/matieres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMatiere)))
            .andExpect(status().isOk());

        // Validate the Matiere in the database
        List<Matiere> matiereList = matiereRepository.findAll();
        assertThat(matiereList).hasSize(databaseSizeBeforeUpdate);
        Matiere testMatiere = matiereList.get(matiereList.size() - 1);
        assertThat(testMatiere.getNom()).isEqualTo(UPDATED_NOM);
    }

    @Test
    @Transactional
    public void updateNonExistingMatiere() throws Exception {
        int databaseSizeBeforeUpdate = matiereRepository.findAll().size();

        // Create the Matiere

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMatiereMockMvc.perform(put("/api/matieres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(matiere)))
            .andExpect(status().isBadRequest());

        // Validate the Matiere in the database
        List<Matiere> matiereList = matiereRepository.findAll();
        assertThat(matiereList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMatiere() throws Exception {
        // Initialize the database
        matiereService.save(matiere);

        int databaseSizeBeforeDelete = matiereRepository.findAll().size();

        // Get the matiere
        restMatiereMockMvc.perform(delete("/api/matieres/{id}", matiere.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Matiere> matiereList = matiereRepository.findAll();
        assertThat(matiereList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Matiere.class);
        Matiere matiere1 = new Matiere();
        matiere1.setId(1L);
        Matiere matiere2 = new Matiere();
        matiere2.setId(matiere1.getId());
        assertThat(matiere1).isEqualTo(matiere2);
        matiere2.setId(2L);
        assertThat(matiere1).isNotEqualTo(matiere2);
        matiere1.setId(null);
        assertThat(matiere1).isNotEqualTo(matiere2);
    }
}
