import { element, by, ElementFinder } from 'protractor';

export class SalleComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-salle div table .btn-danger'));
    title = element.all(by.css('jhi-salle div h2#page-heading span')).first();

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

export class SalleUpdatePage {
    pageTitle = element(by.id('jhi-salle-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    codeInput = element(by.id('field_code'));
    coutInput = element(by.id('field_cout'));
    capaciteMaxInput = element(by.id('field_capaciteMax'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setCodeInput(code) {
        await this.codeInput.sendKeys(code);
    }

    async getCodeInput() {
        return this.codeInput.getAttribute('value');
    }

    async setCoutInput(cout) {
        await this.coutInput.sendKeys(cout);
    }

    async getCoutInput() {
        return this.coutInput.getAttribute('value');
    }

    async setCapaciteMaxInput(capaciteMax) {
        await this.capaciteMaxInput.sendKeys(capaciteMax);
    }

    async getCapaciteMaxInput() {
        return this.capaciteMaxInput.getAttribute('value');
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

export class SalleDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-salle-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-salle'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
