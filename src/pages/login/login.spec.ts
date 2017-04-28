import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { NavParamsMock } from '../../mocks.ts';
import { AuthService } from "../../security/auth.service";
import { LocalStorageService } from '../../security/local-storage.service';
import { StoreCredentialsService } from '../../security/store-credentials.service';
import { MyApp } from '../../app/app.component';
import { HomePage } from '../home/home';
import { LoginPage } from './login';
import { BloodTestPage } from '../blood-test/blood-test';
import { EDASPage } from '../e-das/e-das';
import { EHAQPage } from '../e-haq/e-haq';
import { EHaqNewEntryPage } from '../e-haq-new-entry/e-haq-new-entry';
import { GenerateReportPage } from '../generate-report/generate-report';
import { NewEntryPage } from '../new-entry/new-entry';
import { PainDiaryPage } from '../pain-diary/pain-diary';
import { SettingsPage } from '../settings/settings';
import { UserGuidePage } from '../user-guide/user-guide';


import { TranslateModule } from '@ngx-translate/core';


let comp: LoginPage;
let fixture: ComponentFixture<LoginPage>;
let navCtrl : NavController;
let de: DebugElement;
let el: HTMLElement;

describe('Page: Login Page', () => {

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            declarations: [MyApp, LoginPage],

            providers: [
              NavController,
              {provide: NavParams, useClass: NavParamsMock},
              AuthService,
              LocalStorageService,
              StoreCredentialsService
            ],

            imports: [
                IonicModule.forRoot(MyApp),
                TranslateModule.forRoot()
            ]

        }).compileComponents();

    }));

    beforeEach(() => {

        fixture = TestBed.createComponent(LoginPage);
        comp    = fixture.componentInstance;

    });

    afterEach(() => {
        fixture.destroy();
        comp = null;
        de = null;
        el = null;
    });



    it('is created', () => {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
        expect(comp).toBeDefined();
    });


    it('initialises with empty errorMessage', () => {
        expect(comp['errorMessage']).toEqual('');
    });


    it('can set the error to a supplied value', () => {
        de = fixture.debugElement.query(By.css('p'));
        el = de.nativeElement;

        comp.setError("Custom error");
        fixture.detectChanges();
        expect(comp['errorMessage']).toEqual('Custom error');
        expect(el.textContent).toContain('Custom error');
    });

    it('denies access to guarded pages', () => {
        comp.navCtrl.setRoot(HomePage);
        de = fixture.debugElement.query(By.css('ion-title'));
        el = de.nativeElement;
        fixture.detectChanges();
        expect(el.textContent).toContain('Login');

        comp.navCtrl.setRoot(BloodTestPage);
        fixture.detectChanges();
        expect(el.textContent).toContain('Login');

        comp.navCtrl.setRoot(EDASPage);
        fixture.detectChanges();
        expect(el.textContent).toContain('Login');

        comp.navCtrl.setRoot(EHAQPage);
        fixture.detectChanges();
        expect(el.textContent).toContain('Login');

        comp.navCtrl.setRoot(EHaqNewEntryPage);
        fixture.detectChanges();
        expect(el.textContent).toContain('Login');

        comp.navCtrl.setRoot(GenerateReportPage);
        fixture.detectChanges();
        expect(el.textContent).toContain('Login');

        comp.navCtrl.setRoot(NewEntryPage);
        fixture.detectChanges();
        expect(el.textContent).toContain('Login');

        comp.navCtrl.setRoot(PainDiaryPage);
        fixture.detectChanges();
        expect(el.textContent).toContain('Login');

        comp.navCtrl.setRoot(SettingsPage);
        fixture.detectChanges();
        expect(el.textContent).toContain('Login');

        comp.navCtrl.setRoot(UserGuidePage);
        fixture.detectChanges();
        expect(el.textContent).toContain('Login');


    });

/* Test excluded when auto-login is enabled
    it('failes login with no parameters', () => {
        comp.login();
        de = fixture.debugElement.query(By.css('ion-title'));
        el = de.nativeElement;
        fixture.detectChanges();

        expect(el.textContent).toContain('Login');
    });

    */




});
