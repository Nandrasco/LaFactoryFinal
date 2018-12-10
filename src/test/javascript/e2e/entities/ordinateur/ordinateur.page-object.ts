import { element, by, ElementFinder } from 'protractor';

export class OrdinateurComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-ordinateur div table .btn-danger'));
    title = element.all(by.css('jhi-ordinateur div h2#page-heading span')).first();

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

export class OrdinateurUpdatePage {
    pageTitle = element(by.id('jhi-ordinateur-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    codeInput = element(by.id('field_code'));
    coutInput = element(by.id('field_cout'));
    processeurInput = element(by.id('field_processeur'));
    ramInput = element(by.id('field_ram'));
    ddInput = element(by.id('field_dd'));
    dateAchatInput = element(by.id('field_dateAchat'));
    stockInput = element(by.id('field_stock'));
    stagiaireSelect = element(by.id('field_stagiaire'));

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

    async setProcesseurInput(processeur) {
        await this.processeurInput.sendKeys(processeur);
    }

    async getProcesseurInput() {
        return this.processeurInput.getAttribute('value');
    }

    async setRamInput(ram) {
        await this.ramInput.sendKeys(ram);
    }

    async getRamInput() {
        return this.ramInput.getAttribute('value');
    }

    async setDdInput(dd) {
        await this.ddInput.sendKeys(dd);
    }

    async getDdInput() {
        return this.ddInput.getAttribute('value');
    }

    async setDateAchatInput(dateAchat) {
        await this.dateAchatInput.sendKeys(dateAchat);
    }

    async getDateAchatInput() {
        return this.dateAchatInput.getAttribute('value');
    }

    async setStockInput(stock) {
        await this.stockInput.sendKeys(stock);
    }

    async getStockInput() {
        return this.stockInput.getAttribute('value');
    }

    async stagiaireSelectLastOption() {
        await this.stagiaireSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async stagiaireSelectOption(option) {
        await this.stagiaireSelect.sendKeys(option);
    }

    getStagiaireSelect(): ElementFinder {
        return this.stagiaireSelect;
    }

    async getStagiaireSelectedOption() {
        return this.stagiaireSelect.element(by.css('option:checked')).getText();
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

export class OrdinateurDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-ordinateur-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-ordinateur'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
