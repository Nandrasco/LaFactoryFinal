package io.github.jhipster.application.domain;

import io.github.jhipster.application.domain.enumeration.Niveau;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Entity;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.io.Serializable;

@Entity
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Competence  implements Serializable {

@EmbeddedId
    private CompetenceKey id;

    @Enumerated(EnumType.STRING)
    @Column(name = "niveau")
    private Niveau niveau;

    public Competence() {
    }

    public Competence(CompetenceKey id, Niveau niveau) {
        this.id = id;
        this.niveau = niveau;
    }

    public CompetenceKey getId() {
        return id;
    }

    public void setId(CompetenceKey id) {
        this.id = id;
    }

    public Niveau getNiveau() {
        return niveau;
    }

    public void setNiveau(Niveau niveau) {
        this.niveau = niveau;
    }
}
