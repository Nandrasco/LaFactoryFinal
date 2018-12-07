/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SalleComponentsPage, SalleDeleteDialog, SalleUpdatePage } from './salle.page-object';

const expect = chai.expect;

describe('Salle e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let salleUpdatePage: SalleUpdatePage;
    let salleComponentsPage: SalleComponentsPage;
    let salleDeleteDialog: SalleDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Salles', async () => {
        await navBarPage.goToEntity('salle');
        salleComponentsPage = new SalleComponentsPage();
        expect(await salleComponentsPage.getTitle()).to.eq('laFactoryFinalApp.salle.home.title');
    });

    it('should load create Salle page', async () => {
        await salleComponentsPage.clickOnCreateButton();
        salleUpdatePage = new SalleUpdatePage();
        expect(await salleUpdatePage.getPageTitle()).to.eq('laFactoryFinalApp.salle.home.createOrEditLabel');
        await salleUpdatePage.cancel();
    });

    it('should create and save Salles', async () => {
        const nbButtonsBeforeCreate = await salleComponentsPage.countDeleteButtons();

        await salleComponentsPage.clickOnCreateButton();
        await promise.all([
            salleUpdatePage.setCodeInput('code'),
            salleUpdatePage.setCoutInput('5'),
            salleUpdatePage.setCapaciteMaxInput('5')
        ]);
        expect(await salleUpdatePage.getCodeInput()).to.eq('code');
        expect(await salleUpdatePage.getCoutInput()).to.eq('5');
        expect(await salleUpdatePage.getCapaciteMaxInput()).to.eq('5');
        await salleUpdatePage.save();
        expect(await salleUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await salleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Salle', async () => {
        const nbButtonsBeforeDelete = await salleComponentsPage.countDeleteButtons();
        await salleComponentsPage.clickOnLastDeleteButton();

        salleDeleteDialog = new SalleDeleteDialog();
        expect(await salleDeleteDialog.getDialogTitle()).to.eq('laFactoryFinalApp.salle.delete.question');
        await salleDeleteDialog.clickOnConfirmButton();

        expect(await salleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
