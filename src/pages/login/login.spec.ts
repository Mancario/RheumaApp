import { TestBed } from '@angular/core/testing';

import { LoginPage } from './login';

import {} from 'jasmine';


describe('Component: Login', () => {
    let component: LoginPage;

    beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [LoginPage]
            });

            const fixture = TestBed.createComponent(LoginPage);
            component = fixture.componentInstance;
        });

    it('should have a defined component', () => {
      expect(component).toBeDefined();
    });

});
