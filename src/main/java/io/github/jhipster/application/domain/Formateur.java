package io.github.jhipster.application.domain;

import java.io.Serializable;
import java.lang.reflect.Array;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Formateur.
 */
@Entity
@Table(name = "formateur")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Formateur implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
	@SequenceGenerator(name = "sequenceGenerator")
	private Long id;

	@Column(name = "nom")
	private String nom;

	@Column(name = "prenom")	private String prenom;

	@Column(name = "coordonnees")
	private String coordonnees;

	@Column(name = "numero_rue")
	private Integer numeroRue;

	@Column(name = "rue")
	private String rue;

	@Column(name = "code_postal")
	private String codePostal;

	@Column(name = "ville")
	private String ville;

	@ManyToMany(mappedBy = "formateurs")
	@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
	@JsonIgnore
	private Set<Matiere> matieres = new HashSet<>();

	@ManyToMany(mappedBy = "formateurs")
	@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
	@JsonIgnore
	private Set<Module> modules = new HashSet<>();
	
//	@Column(name = "matieres_debutant")
//	private Set<Matiere> matieresDebutant = new HashSet<>();
//	
//	@Column(name = "matieres_intermediaire")
//	private Set<Matiere> matieresIntermediaire = new HashSet<>();
//	
//	@Column(name = "matieres_avance")
//	private Set<Matiere> matieresAvance = new HashSet<>();
//	
//	@Column(name = "matieres_confirme")
//	private Set<Matiere> matieresConfirme = new HashSet<>();




//	@OneToOne(mappedBy = "formateur")
//	@JsonIgnore
//	private User user;

	// jhipster-needle-entity-add-field - JHipster will add fields here, do not
	// remove
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public Formateur nom(String nom) {
		this.nom = nom;
		return this;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public Formateur prenom(String prenom) {
		this.prenom = prenom;
		return this;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getCoordonnees() {
		return coordonnees;
	}

	public Formateur coordonnees(String coordonnees) {
		this.coordonnees = coordonnees;
		return this;
	}

	public void setCoordonnees(String coordonnees) {
		this.coordonnees = coordonnees;
	}

	public Integer getNumeroRue() {
		return numeroRue;
	}

	public Formateur numeroRue(Integer numeroRue) {
		this.numeroRue = numeroRue;
		return this;
	}

	public void setNumeroRue(Integer numeroRue) {
		this.numeroRue = numeroRue;
	}

	public String getRue() {
		return rue;
	}

	public Formateur rue(String rue) {
		this.rue = rue;
		return this;
	}

	public void setRue(String rue) {
		this.rue = rue;
	}

	public String getCodePostal() {
		return codePostal;
	}

	public Formateur codePostal(String codePostal) {
		this.codePostal = codePostal;
		return this;
	}

	public void setCodePostal(String codePostal) {
		this.codePostal = codePostal;
	}

	public String getVille() {
		return ville;
	}

	public Formateur ville(String ville) {
		this.ville = ville;
		return this;
	}

	public void setVille(String ville) {
		this.ville = ville;
	}

	public Set<Matiere> getMatieres() {
		return matieres;
	}

	public Formateur matieres(Set<Matiere> matieres) {
		this.matieres = matieres;
		return this;
	}

	public Formateur addMatieres(Matiere matiere) {
		this.matieres.add(matiere);
		matiere.getFormateurs().add(this);
		return this;
	}

	public Formateur removeMatieres(Matiere matiere) {
		this.matieres.remove(matiere);
		matiere.getFormateurs().remove(this);
		return this;
	}

	public void setMatieres(Set<Matiere> matieres) {
		this.matieres = matieres;
	}

	public Set<Module> getModules() {
		return modules;
	}

	public Formateur modules(Set<Module> modules) {
		this.modules = modules;
		return this;
	}

	public Formateur addModules(Module module) {
		this.modules.add(module);
		module.getFormateurs().add(this);
		return this;
	}

	public Formateur removeModules(Module module) {
		this.modules.remove(module);
		module.getFormateurs().remove(this);
		return this;
	}

	public void setModules(Set<Module> modules) {
		this.modules = modules;
	}
	// jhipster-needle-entity-add-getters-setters - JHipster will add getters and
	// setters here, do not remove

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		Formateur formateur = (Formateur) o;
		if (formateur.getId() == null || getId() == null) {
			return false;
		}
		return Objects.equals(getId(), formateur.getId());
	}

	@Override
	public int hashCode() {
		return Objects.hashCode(getId());
	}

	@Override
	public String toString() {
		return "Formateur{" + "id=" + getId() + ", nom='" + getNom() + "'" + ", prenom='" + getPrenom() + "'"
				+ ", coordonnees='" + getCoordonnees() + "'" + ", numeroRue=" + getNumeroRue() + ", rue='" + getRue()
				+ "'" + ", codePostal='" + getCodePostal() + "'" + ", ville='" + getVille() + "'" + "}";
	}
}
