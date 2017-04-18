import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { NavParamsMock} from '../../mocks.ts';
import { AuthService } from "../../security/auth.service";
import { LocalStorageService } from '../../security/local-storage.service';
import { StoreCredentialsService } from '../../security/store-credentials.service';
import { MyApp } from '../../app/app.component';
import { LoginPage } from './login';
import { HomePage } from '../home/home';

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
/*
    it('denies access to guarded pages', () => {
        navCtrl.setRoot(HomePage);

        de = fixture.debugElement.query(By.css('ion-title'));
        el = de.nativeElement;

        fixture.detectChanges();
        expect(el.textContent).toContain('Login');
    });

/*
    it('displays error when failed login', () => {
        comp.login();
        de = fixture.debugElement.query(By.css('p'));
        el = de.nativeElement;
        fixture.detectChanges();

        expect(comp['errorMessage']).toEqual('Wrong username or password');
        //expect(el.textContent).toContain('Wrong username or password');

    });
    */

});
