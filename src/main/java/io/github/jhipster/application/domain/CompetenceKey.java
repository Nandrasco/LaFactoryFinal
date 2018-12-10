package io.github.jhipster.application.domain;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


@Embeddable
public class CompetenceKey {


    @ManyToOne
    @JoinColumn(name = "formateur_id")
    private Formateur formateur;
    @ManyToOne
    @JoinColumn(name = "matiere_id")
    private Matiere matiere;

    public CompetenceKey(Formateur formateur, Matiere matiere) {
        this.formateur = formateur;
        this.matiere = matiere;
    }

    public CompetenceKey() {
    }

    public Formateur getFormateur() {
        return formateur;
    }

    public void setFormateur(Formateur formateur) {
        this.formateur = formateur;
    }

    public Matiere getMatiere() {
        return matiere;
    }

    public void setMatiere(Matiere matiere) {
        this.matiere = matiere;
    }
}
