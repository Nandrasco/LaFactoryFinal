import { element, by, ElementFinder } from 'protractor';

export class ModuleComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-module div table .btn-danger'));
    title = element.all(by.css('jhi-module div h2#page-heading span')).first();

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

export class ModuleUpdatePage {
    pageTitle = element(by.id('jhi-module-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nomInput = element(by.id('field_nom'));
    dateDebutInput = element(by.id('field_dateDebut'));
    dateFinInput = element(by.id('field_dateFin'));
    matieresSelect = element(by.id('field_matieres'));
    formateursSelect = element(by.id('field_formateurs'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNomInput(nom) {
        await this.nomInput.sendKeys(nom);
    }

    async getNomInput() {
        return this.nomInput.getAttribute('value');
    }

    async setDateDebutInput(dateDebut) {
        await this.dateDebutInput.sendKeys(dateDebut);
    }

    async getDateDebutInput() {
        return this.dateDebutInput.getAttribute('value');
    }

    async setDateFinInput(dateFin) {
        await this.dateFinInput.sendKeys(dateFin);
    }

    async getDateFinInput() {
        return this.dateFinInput.getAttribute('value');
    }

    async matieresSelectLastOption() {
        await this.matieresSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async matieresSelectOption(option) {
        await this.matieresSelect.sendKeys(option);
    }

    getMatieresSelect(): ElementFinder {
        return this.matieresSelect;
    }

    async getMatieresSelectedOption() {
        return this.matieresSelect.element(by.css('option:checked')).getText();
    }

    async formateursSelectLastOption() {
        await this.formateursSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async formateursSelectOption(option) {
        await this.formateursSelect.sendKeys(option);
    }

    getFormateursSelect(): ElementFinder {
        return this.formateursSelect;
    }

    async getFormateursSelectedOption() {
        return this.formateursSelect.element(by.css('option:checked')).getText();
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

export class ModuleDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-module-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-module'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
