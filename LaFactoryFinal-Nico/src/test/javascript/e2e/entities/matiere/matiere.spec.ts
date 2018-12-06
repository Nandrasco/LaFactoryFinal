/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MatiereComponentsPage, MatiereDeleteDialog, MatiereUpdatePage } from './matiere.page-object';

const expect = chai.expect;

describe('Matiere e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let matiereUpdatePage: MatiereUpdatePage;
    let matiereComponentsPage: MatiereComponentsPage;
    let matiereDeleteDialog: MatiereDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Matieres', async () => {
        await navBarPage.goToEntity('matiere');
        matiereComponentsPage = new MatiereComponentsPage();
        expect(await matiereComponentsPage.getTitle()).to.eq('laFactoryFinalApp.matiere.home.title');
    });

    it('should load create Matiere page', async () => {
        await matiereComponentsPage.clickOnCreateButton();
        matiereUpdatePage = new MatiereUpdatePage();
        expect(await matiereUpdatePage.getPageTitle()).to.eq('laFactoryFinalApp.matiere.home.createOrEditLabel');
        await matiereUpdatePage.cancel();
    });

    it('should create and save Matieres', async () => {
        const nbButtonsBeforeCreate = await matiereComponentsPage.countDeleteButtons();

        await matiereComponentsPage.clickOnCreateButton();
        await promise.all([
            matiereUpdatePage.setNomInput('nom')
            // matiereUpdatePage.formateursSelectLastOption(),
        ]);
        expect(await matiereUpdatePage.getNomInput()).to.eq('nom');
        await matiereUpdatePage.save();
        expect(await matiereUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await matiereComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Matiere', async () => {
        const nbButtonsBeforeDelete = await matiereComponentsPage.countDeleteButtons();
        await matiereComponentsPage.clickOnLastDeleteButton();

        matiereDeleteDialog = new MatiereDeleteDialog();
        expect(await matiereDeleteDialog.getDialogTitle()).to.eq('laFactoryFinalApp.matiere.delete.question');
        await matiereDeleteDialog.clickOnConfirmButton();

        expect(await matiereComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
