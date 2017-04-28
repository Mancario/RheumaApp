
import { AuthService } from "./auth.service";
import { LocalStorageService } from './local-storage.service';
import { StoreCredentialsService } from './store-credentials.service';
import { Http } from "@angular/http";
import { HttpMock} from '../mocks.ts';
import { AuthUserImpl} from './auth-user';


let authService: AuthService = null;
let localStorageService : LocalStorageService;
let storeCredentialsService : StoreCredentialsService;
let http : Http;

describe('Component: AuthService', () => {

    beforeEach(() => {
      localStorageService = new LocalStorageService();
      storeCredentialsService = new StoreCredentialsService();
      http = new Http(undefined, null);
      authService = new AuthService(localStorageService, storeCredentialsService, http);

    });


    afterEach(() => {
        authService = null;
    });


    it('is initialized', () => {
      expect(authService).not.toBe(null);
    });


    it('is initially logged out', () => {
      expect(!authService.isLoggedIn());
    });



    it('stores credentials when calling storeCredentials()', () => {
      let username = "username";
      let password = "password";

      const credentials: string = JSON.stringify({
          username,
          password,
      });

      authService.storeCredentials(credentials);
      let retrievedCreds = storeCredentialsService.retrieve();

      expect(JSON.parse(retrievedCreds).username).toEqual('username');
      expect(JSON.parse(retrievedCreds).password).toEqual('password');

    });


    it('removes credentials when logging out', () => {
      let username = "username";
      let password = "password";

      const credentials: string = JSON.stringify({
          username,
          password,
      });

      authService.storeCredentials(credentials);
      let retrievedCreds = storeCredentialsService.retrieve();

      expect(JSON.parse(retrievedCreds).username).toEqual('username');
      expect(JSON.parse(retrievedCreds).password).toEqual('password');

      authService.logout();
      retrievedCreds = storeCredentialsService.retrieve();

      // Expect credentials to be default credentials in store
      expect(retrievedCreds).toEqual('null');

    });


    it('stores user when calling storeUser()', () => {
      let username = "username";
      let uid = "id";
      let token = "token";

      let user = new AuthUserImpl(username, uid, token);

      authService.storeUser(user);
      let retrievedUser = authService.retrieveFromStore();

      expect(retrievedUser).toEqual(user);

    });


    it('removes user when logging out', () => {
      let username = "username";
      let uid = "id";
      let token = "token";

      let user = new AuthUserImpl(username, uid, token);

      authService.storeUser(user);
      let retrievedUser = authService.retrieveFromStore();

      expect(retrievedUser).toEqual(user);

      authService.logout();

      retrievedUser = authService.retrieveFromStore();

      expect(retrievedUser).toEqual(null);

    });

});
