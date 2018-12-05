/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GestionnaireComponentsPage, GestionnaireDeleteDialog, GestionnaireUpdatePage } from './gestionnaire.page-object';

const expect = chai.expect;

describe('Gestionnaire e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let gestionnaireUpdatePage: GestionnaireUpdatePage;
    let gestionnaireComponentsPage: GestionnaireComponentsPage;
    let gestionnaireDeleteDialog: GestionnaireDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Gestionnaires', async () => {
        await navBarPage.goToEntity('gestionnaire');
        gestionnaireComponentsPage = new GestionnaireComponentsPage();
        expect(await gestionnaireComponentsPage.getTitle()).to.eq('laFactoryFinalApp.gestionnaire.home.title');
    });

    it('should load create Gestionnaire page', async () => {
        await gestionnaireComponentsPage.clickOnCreateButton();
        gestionnaireUpdatePage = new GestionnaireUpdatePage();
        expect(await gestionnaireUpdatePage.getPageTitle()).to.eq('laFactoryFinalApp.gestionnaire.home.createOrEditLabel');
        await gestionnaireUpdatePage.cancel();
    });

    it('should create and save Gestionnaires', async () => {
        const nbButtonsBeforeCreate = await gestionnaireComponentsPage.countDeleteButtons();

        await gestionnaireComponentsPage.clickOnCreateButton();
        await promise.all([
            gestionnaireUpdatePage.setNomInput('nom'),
            gestionnaireUpdatePage.setPrenomInput('prenom'),
            gestionnaireUpdatePage.setCoordonneesInput('coordonnees'),
            gestionnaireUpdatePage.setNumeroRueInput('5'),
            gestionnaireUpdatePage.setRueInput('rue'),
            gestionnaireUpdatePage.setCodePostalInput('codePostal'),
            gestionnaireUpdatePage.setVilleInput('ville')
        ]);
        expect(await gestionnaireUpdatePage.getNomInput()).to.eq('nom');
        expect(await gestionnaireUpdatePage.getPrenomInput()).to.eq('prenom');
        expect(await gestionnaireUpdatePage.getCoordonneesInput()).to.eq('coordonnees');
        expect(await gestionnaireUpdatePage.getNumeroRueInput()).to.eq('5');
        expect(await gestionnaireUpdatePage.getRueInput()).to.eq('rue');
        expect(await gestionnaireUpdatePage.getCodePostalInput()).to.eq('codePostal');
        expect(await gestionnaireUpdatePage.getVilleInput()).to.eq('ville');
        await gestionnaireUpdatePage.save();
        expect(await gestionnaireUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await gestionnaireComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Gestionnaire', async () => {
        const nbButtonsBeforeDelete = await gestionnaireComponentsPage.countDeleteButtons();
        await gestionnaireComponentsPage.clickOnLastDeleteButton();

        gestionnaireDeleteDialog = new GestionnaireDeleteDialog();
        expect(await gestionnaireDeleteDialog.getDialogTitle()).to.eq('laFactoryFinalApp.gestionnaire.delete.question');
        await gestionnaireDeleteDialog.clickOnConfirmButton();

        expect(await gestionnaireComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
