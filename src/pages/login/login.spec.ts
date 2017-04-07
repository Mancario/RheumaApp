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

let comp: LoginPage;
let fixture: ComponentFixture<LoginPage>;
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
                IonicModule.forRoot(MyApp)
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
/*
    it('can set the title to a supplied value', () => {

        de = fixture.debugElement.query(By.css('ion-title'));
        el = de.nativeElement;

        comp.changeTitle('Your Page');
        fixture.detectChanges();
        expect(comp['title']).toEqual('Your Page');
        expect(el.textContent).toContain('Your Page');

    });
*/
});
