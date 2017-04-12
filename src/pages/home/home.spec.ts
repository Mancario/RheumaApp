import { HomePage } from './home';
import { LoginPage } from '../login/login';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

describe('Home screen', function () {
    let componentLogin: LoginPage;
    let componentHome: HomePage;

    beforeEach(() => {
        /*    var lineChartDataTest: Array<any> =
        [{ data: [1,2,3,4,5,6,7,8,9], label: 'pain' },
        { data: [9,8,7,6,5,4,3,2,1], label: 'disease activity' },
        { data: [7,6,5,5,3,4,5,6,7], label: 'fatigue' }];
      */
     
    });

    it('should return Observable<string>', function () {
        var chartCVS = HomePage.prototype.getChart();
        expect(chartCVS).toEqual(jasmine.any(Object));

    });

    it('should return a cvs chart', function () {
        var chartCVS = HomePage.prototype.getChart();
        var list: Array<String> = chartCVS[1];
        console.log(list); 
        expect(true).toBeTruthy();
    });
});

