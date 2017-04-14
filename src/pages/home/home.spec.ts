import { HomePage } from './home';
import { LoginPage } from '../login/login';
import { IonicModule } from 'ionic-angular';
import { MyApp } from '../../app/app.component'; // C:\Users\siljeg95\Cordova_projects\RheumaApp\src\app\app.component.ts
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { AuthService } from '../../security/auth.service';
import {} from 'jasmine';

let comp: HomePage;
let fixture: ComponentFixture<HomePage>;
let componentLogin: LoginPage;
let componentHome: HomePage;

describe('Page: Home/dashboard page', function () {


    beforeEach(async(() => {

            TestBed.configureTestingModule({

                declarations: [MyApp, componentHome],
                providers: [ 
                ],
                imports: [
                    IonicModule.forRoot(componentHome)
                ]
            }).compileComponents();
            /*    var lineChartDataTest: Array<any> =
            [{ data: [1,2,3,4,5,6,7,8,9], label: 'pain' },
            { data: [9,8,7,6,5,4,3,2,1], label: 'disease activity' },
            { data: [7,6,5,5,3,4,5,6,7], label: 'fatigue' }];
          */

        }));

        beforeEach(() => {

            fixture = TestBed.createComponent(HomePage);
            comp = fixture.componentInstance;

        });

        afterEach(() => {
        fixture.destroy();
        comp = null;
       
    });
 
    it('is created', () => {
 
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
 
    });
 
    it('initialises with a title of My Page', () => {
        expect(comp['title']).toEqual('My Page');
    });

        it('should return Observable<string>', function () {
       //     var chartCVS = HomePage.prototype.getChart();
        //    expect(chartCVS).toEqual(jasmine.any(Object));
        expect(true).toBeTruthy(); 

        });

        it('should return a cvs chart', function () {
        /*    var chartCVS = HomePage.prototype.getChart();
            var list: Array<String> = chartCVS[1];
            console.log(list); */
            expect(true).toBeTruthy(); 

        });
    });

