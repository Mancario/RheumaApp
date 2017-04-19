import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { NavParamsMock, AuthServiceMock} from '../../mocks.ts';
import { AuthService } from "../../security/auth.service";
import { DiaryService } from './pain-diary-service';
import { MyApp } from '../../app/app.component';
import { PainDiaryPage } from './pain-diary';

let comp: PainDiaryPage;
let fixture: ComponentFixture<PainDiaryPage>;
let de: DebugElement;
let el: HTMLElement;

describe('Page: Pain Diary Page', () => {

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            declarations: [MyApp, PainDiaryPage],

            providers: [
              NavController,
              {provide: NavParams, useClass: NavParamsMock},
              {provide: AuthService, useClass: AuthServiceMock},
              DiaryService
            ],

            imports: [
                IonicModule.forRoot(MyApp),
            ]

        }).compileComponents();

    }));

    beforeEach(() => {

        fixture = TestBed.createComponent(PainDiaryPage);
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

    it('deletes entry correctly', () => {
        de = fixture.debugElement.query(By.css("card"));
        el = de.nativeElement;
    });

});
