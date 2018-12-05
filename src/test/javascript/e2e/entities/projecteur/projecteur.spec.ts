/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProjecteurComponentsPage, ProjecteurDeleteDialog, ProjecteurUpdatePage } from './projecteur.page-object';

const expect = chai.expect;

describe('Projecteur e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let projecteurUpdatePage: ProjecteurUpdatePage;
    let projecteurComponentsPage: ProjecteurComponentsPage;
    let projecteurDeleteDialog: ProjecteurDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Projecteurs', async () => {
        await navBarPage.goToEntity('projecteur');
        projecteurComponentsPage = new ProjecteurComponentsPage();
        expect(await projecteurComponentsPage.getTitle()).to.eq('laFactoryFinalApp.projecteur.home.title');
    });

    it('should load create Projecteur page', async () => {
        await projecteurComponentsPage.clickOnCreateButton();
        projecteurUpdatePage = new ProjecteurUpdatePage();
        expect(await projecteurUpdatePage.getPageTitle()).to.eq('laFactoryFinalApp.projecteur.home.createOrEditLabel');
        await projecteurUpdatePage.cancel();
    });

    it('should create and save Projecteurs', async () => {
        const nbButtonsBeforeCreate = await projecteurComponentsPage.countDeleteButtons();

        await projecteurComponentsPage.clickOnCreateButton();
        await promise.all([
            projecteurUpdatePage.setCodeInput('code'),
            projecteurUpdatePage.setCoutInput('5'),
            projecteurUpdatePage.salleSelectLastOption()
        ]);
        expect(await projecteurUpdatePage.getCodeInput()).to.eq('code');
        expect(await projecteurUpdatePage.getCoutInput()).to.eq('5');
        await projecteurUpdatePage.save();
        expect(await projecteurUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await projecteurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Projecteur', async () => {
        const nbButtonsBeforeDelete = await projecteurComponentsPage.countDeleteButtons();
        await projecteurComponentsPage.clickOnLastDeleteButton();

        projecteurDeleteDialog = new ProjecteurDeleteDialog();
        expect(await projecteurDeleteDialog.getDialogTitle()).to.eq('laFactoryFinalApp.projecteur.delete.question');
        await projecteurDeleteDialog.clickOnConfirmButton();

        expect(await projecteurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
