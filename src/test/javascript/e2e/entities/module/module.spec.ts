/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ModuleComponentsPage, ModuleDeleteDialog, ModuleUpdatePage } from './module.page-object';

const expect = chai.expect;

describe('Module e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let moduleUpdatePage: ModuleUpdatePage;
    let moduleComponentsPage: ModuleComponentsPage;
    let moduleDeleteDialog: ModuleDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Modules', async () => {
        await navBarPage.goToEntity('module');
        moduleComponentsPage = new ModuleComponentsPage();
        expect(await moduleComponentsPage.getTitle()).to.eq('laFactoryFinalApp.module.home.title');
    });

    it('should load create Module page', async () => {
        await moduleComponentsPage.clickOnCreateButton();
        moduleUpdatePage = new ModuleUpdatePage();
        expect(await moduleUpdatePage.getPageTitle()).to.eq('laFactoryFinalApp.module.home.createOrEditLabel');
        await moduleUpdatePage.cancel();
    });

    it('should create and save Modules', async () => {
        const nbButtonsBeforeCreate = await moduleComponentsPage.countDeleteButtons();

        await moduleComponentsPage.clickOnCreateButton();
        await promise.all([
            moduleUpdatePage.setNomInput('nom'),
            moduleUpdatePage.setDateDebutInput('2000-12-31'),
            moduleUpdatePage.setDateFinInput('2000-12-31')
            // moduleUpdatePage.matieresSelectLastOption(),
            // moduleUpdatePage.formateursSelectLastOption(),
        ]);
        expect(await moduleUpdatePage.getNomInput()).to.eq('nom');
        expect(await moduleUpdatePage.getDateDebutInput()).to.eq('2000-12-31');
        expect(await moduleUpdatePage.getDateFinInput()).to.eq('2000-12-31');
        await moduleUpdatePage.save();
        expect(await moduleUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await moduleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Module', async () => {
        const nbButtonsBeforeDelete = await moduleComponentsPage.countDeleteButtons();
        await moduleComponentsPage.clickOnLastDeleteButton();

        moduleDeleteDialog = new ModuleDeleteDialog();
        expect(await moduleDeleteDialog.getDialogTitle()).to.eq('laFactoryFinalApp.module.delete.question');
        await moduleDeleteDialog.clickOnConfirmButton();

        expect(await moduleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
