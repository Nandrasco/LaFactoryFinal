import { element, by, ElementFinder } from 'protractor';

export class ProjecteurComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-projecteur div table .btn-danger'));
    title = element.all(by.css('jhi-projecteur div h2#page-heading span')).first();

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

export class ProjecteurUpdatePage {
    pageTitle = element(by.id('jhi-projecteur-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    codeInput = element(by.id('field_code'));
    coutInput = element(by.id('field_cout'));
    salleSelect = element(by.id('field_salle'));

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

    async salleSelectLastOption() {
        await this.salleSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async salleSelectOption(option) {
        await this.salleSelect.sendKeys(option);
    }

    getSalleSelect(): ElementFinder {
        return this.salleSelect;
    }

    async getSalleSelectedOption() {
        return this.salleSelect.element(by.css('option:checked')).getText();
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

export class ProjecteurDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-projecteur-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-projecteur'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
