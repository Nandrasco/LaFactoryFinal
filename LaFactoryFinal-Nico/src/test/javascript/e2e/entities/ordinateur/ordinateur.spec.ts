/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OrdinateurComponentsPage, OrdinateurDeleteDialog, OrdinateurUpdatePage } from './ordinateur.page-object';

const expect = chai.expect;

describe('Ordinateur e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let ordinateurUpdatePage: OrdinateurUpdatePage;
    let ordinateurComponentsPage: OrdinateurComponentsPage;
    let ordinateurDeleteDialog: OrdinateurDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Ordinateurs', async () => {
        await navBarPage.goToEntity('ordinateur');
        ordinateurComponentsPage = new OrdinateurComponentsPage();
        expect(await ordinateurComponentsPage.getTitle()).to.eq('laFactoryFinalApp.ordinateur.home.title');
    });

    it('should load create Ordinateur page', async () => {
        await ordinateurComponentsPage.clickOnCreateButton();
        ordinateurUpdatePage = new OrdinateurUpdatePage();
        expect(await ordinateurUpdatePage.getPageTitle()).to.eq('laFactoryFinalApp.ordinateur.home.createOrEditLabel');
        await ordinateurUpdatePage.cancel();
    });

    it('should create and save Ordinateurs', async () => {
        const nbButtonsBeforeCreate = await ordinateurComponentsPage.countDeleteButtons();

        await ordinateurComponentsPage.clickOnCreateButton();
        await promise.all([
            ordinateurUpdatePage.setCodeInput('code'),
            ordinateurUpdatePage.setCoutInput('5'),
            ordinateurUpdatePage.setProcesseurInput('processeur'),
            ordinateurUpdatePage.setRamInput('5'),
            ordinateurUpdatePage.setDdInput('5'),
            ordinateurUpdatePage.setDateAchatInput('2000-12-31'),
            ordinateurUpdatePage.stagiaireSelectLastOption()
        ]);
        expect(await ordinateurUpdatePage.getCodeInput()).to.eq('code');
        expect(await ordinateurUpdatePage.getCoutInput()).to.eq('5');
        expect(await ordinateurUpdatePage.getProcesseurInput()).to.eq('processeur');
        expect(await ordinateurUpdatePage.getRamInput()).to.eq('5');
        expect(await ordinateurUpdatePage.getDdInput()).to.eq('5');
        expect(await ordinateurUpdatePage.getDateAchatInput()).to.eq('2000-12-31');
        await ordinateurUpdatePage.save();
        expect(await ordinateurUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await ordinateurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Ordinateur', async () => {
        const nbButtonsBeforeDelete = await ordinateurComponentsPage.countDeleteButtons();
        await ordinateurComponentsPage.clickOnLastDeleteButton();

        ordinateurDeleteDialog = new OrdinateurDeleteDialog();
        expect(await ordinateurDeleteDialog.getDialogTitle()).to.eq('laFactoryFinalApp.ordinateur.delete.question');
        await ordinateurDeleteDialog.clickOnConfirmButton();

        expect(await ordinateurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
