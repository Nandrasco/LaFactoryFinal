/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CursusComponentsPage, CursusDeleteDialog, CursusUpdatePage } from './cursus.page-object';

const expect = chai.expect;

describe('Cursus e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let cursusUpdatePage: CursusUpdatePage;
    let cursusComponentsPage: CursusComponentsPage;
    let cursusDeleteDialog: CursusDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Cursuses', async () => {
        await navBarPage.goToEntity('cursus');
        cursusComponentsPage = new CursusComponentsPage();
        expect(await cursusComponentsPage.getTitle()).to.eq('laFactoryFinalApp.cursus.home.title');
    });

    it('should load create Cursus page', async () => {
        await cursusComponentsPage.clickOnCreateButton();
        cursusUpdatePage = new CursusUpdatePage();
        expect(await cursusUpdatePage.getPageTitle()).to.eq('laFactoryFinalApp.cursus.home.createOrEditLabel');
        await cursusUpdatePage.cancel();
    });

    it('should create and save Cursuses', async () => {
        const nbButtonsBeforeCreate = await cursusComponentsPage.countDeleteButtons();

        await cursusComponentsPage.clickOnCreateButton();
        await promise.all([
            cursusUpdatePage.setNomInput('nom'),
            cursusUpdatePage.setDateDebutInput('2000-12-31'),
            cursusUpdatePage.setDateFinInput('2000-12-31'),
            cursusUpdatePage.setPrerequisInput('prerequis'),
            cursusUpdatePage.setObjectifsInput('objectifs'),
            cursusUpdatePage.setContenuInput('contenu'),
            cursusUpdatePage.gestionnaireSelectLastOption(),
            cursusUpdatePage.salleSelectLastOption()
            // cursusUpdatePage.stagiairesSelectLastOption(),
            // cursusUpdatePage.modulesSelectLastOption(),
        ]);
        expect(await cursusUpdatePage.getNomInput()).to.eq('nom');
        expect(await cursusUpdatePage.getDateDebutInput()).to.eq('2000-12-31');
        expect(await cursusUpdatePage.getDateFinInput()).to.eq('2000-12-31');
        expect(await cursusUpdatePage.getPrerequisInput()).to.eq('prerequis');
        expect(await cursusUpdatePage.getObjectifsInput()).to.eq('objectifs');
        expect(await cursusUpdatePage.getContenuInput()).to.eq('contenu');
        await cursusUpdatePage.save();
        expect(await cursusUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await cursusComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Cursus', async () => {
        const nbButtonsBeforeDelete = await cursusComponentsPage.countDeleteButtons();
        await cursusComponentsPage.clickOnLastDeleteButton();

        cursusDeleteDialog = new CursusDeleteDialog();
        expect(await cursusDeleteDialog.getDialogTitle()).to.eq('laFactoryFinalApp.cursus.delete.question');
        await cursusDeleteDialog.clickOnConfirmButton();

        expect(await cursusComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
