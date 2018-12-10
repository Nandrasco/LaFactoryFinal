import { element, by, ElementFinder } from 'protractor';

export class FormateurComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-formateur div table .btn-danger'));
    title = element.all(by.css('jhi-formateur div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class FormateurUpdatePage {
    pageTitle = element(by.id('jhi-formateur-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nomInput = element(by.id('field_nom'));
    prenomInput = element(by.id('field_prenom'));
    coordonneesInput = element(by.id('field_coordonnees'));
    numeroRueInput = element(by.id('field_numeroRue'));
    rueInput = element(by.id('field_rue'));
    codePostalInput = element(by.id('field_codePostal'));
    villeInput = element(by.id('field_ville'));
    matieresDebutantSelect = element(by.id('field_matieresDebutant'));
    matieresIntermedaireSelect = element(by.id('field_matieresIntermedaire'));
    matieresAvanceSelect = element(by.id('field_matieresAvance'));
    matieresConfirmeSelect = element(by.id('field_matieresConfirme'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNomInput(nom) {
        await this.nomInput.sendKeys(nom);
    }

    async getNomInput() {
        return this.nomInput.getAttribute('value');
    }

    async setPrenomInput(prenom) {
        await this.prenomInput.sendKeys(prenom);
    }

    async getPrenomInput() {
        return this.prenomInput.getAttribute('value');
    }

    async setCoordonneesInput(coordonnees) {
        await this.coordonneesInput.sendKeys(coordonnees);
    }

    async getCoordonneesInput() {
        return this.coordonneesInput.getAttribute('value');
    }

    async setNumeroRueInput(numeroRue) {
        await this.numeroRueInput.sendKeys(numeroRue);
    }

    async getNumeroRueInput() {
        return this.numeroRueInput.getAttribute('value');
    }

    async setRueInput(rue) {
        await this.rueInput.sendKeys(rue);
    }

    async getRueInput() {
        return this.rueInput.getAttribute('value');
    }

    async setCodePostalInput(codePostal) {
        await this.codePostalInput.sendKeys(codePostal);
    }

    async getCodePostalInput() {
        return this.codePostalInput.getAttribute('value');
    }

    async setVilleInput(ville) {
        await this.villeInput.sendKeys(ville);
    }

    async getVilleInput() {
        return this.villeInput.getAttribute('value');
    }

    async matieresDebutantSelectLastOption() {
        await this.matieresDebutantSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async matieresDebutantSelectOption(option) {
        await this.matieresDebutantSelect.sendKeys(option);
    }

    getMatieresDebutantSelect(): ElementFinder {
        return this.matieresDebutantSelect;
    }

    async getMatieresDebutantSelectedOption() {
        return this.matieresDebutantSelect.element(by.css('option:checked')).getText();
    }

    async matieresIntermedaireSelectLastOption() {
        await this.matieresIntermedaireSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async matieresIntermedaireSelectOption(option) {
        await this.matieresIntermedaireSelect.sendKeys(option);
    }

    getMatieresIntermedaireSelect(): ElementFinder {
        return this.matieresIntermedaireSelect;
    }

    async getMatieresIntermedaireSelectedOption() {
        return this.matieresIntermedaireSelect.element(by.css('option:checked')).getText();
    }

    async matieresAvanceSelectLastOption() {
        await this.matieresAvanceSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async matieresAvanceSelectOption(option) {
        await this.matieresAvanceSelect.sendKeys(option);
    }

    getMatieresAvanceSelect(): ElementFinder {
        return this.matieresAvanceSelect;
    }

    async getMatieresAvanceSelectedOption() {
        return this.matieresAvanceSelect.element(by.css('option:checked')).getText();
    }

    async matieresConfirmeSelectLastOption() {
        await this.matieresConfirmeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async matieresConfirmeSelectOption(option) {
        await this.matieresConfirmeSelect.sendKeys(option);
    }

    getMatieresConfirmeSelect(): ElementFinder {
        return this.matieresConfirmeSelect;
    }

    async getMatieresConfirmeSelectedOption() {
        return this.matieresConfirmeSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class FormateurDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-formateur-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-formateur'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
