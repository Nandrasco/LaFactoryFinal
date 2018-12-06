package io.github.jhipster.application.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(io.github.jhipster.application.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.PersistentToken.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.User.class.getName() + ".persistentTokens", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Formateur.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Formateur.class.getName() + ".matieres", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Formateur.class.getName() + ".modules", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Stagiaire.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Stagiaire.class.getName() + ".cursuses", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Technicien.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Gestionnaire.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Gestionnaire.class.getName() + ".cursuses", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Module.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Module.class.getName() + ".matieres", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Module.class.getName() + ".formateurs", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Module.class.getName() + ".cursuses", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Cursus.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Cursus.class.getName() + ".stagiaires", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Cursus.class.getName() + ".modules", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Matiere.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Matiere.class.getName() + ".formateurs", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Matiere.class.getName() + ".modules", jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Ordinateur.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Projecteur.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.jhipster.application.domain.Salle.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
