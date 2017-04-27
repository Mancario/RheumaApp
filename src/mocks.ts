export class ConfigMock {

  public get(): any {
    return '';
  }

  public getBoolean(): boolean {
    return true;
  }

  public getNumber(): number {
    return 1;
  }
}

export class FormMock {
  public register(): any {
    return true;
  }
}

export class NavMock {

  public pop(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }

  public push(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }

  public getActive(): any {
    return {
      'instance': {
        'model': 'something',
      },
    };
  }

  public setRoot(): any {
    return true;
  }
}

export class NavParamsMock {
  static returnParam = null;
  public get(key): any {
    if (NavParamsMock.returnParam) {
       return NavParamsMock.returnParam
    }
    return 'default';
  }
  static setParams(value){
    NavParamsMock.returnParam = value;
  }
}

export class PlatformMock {
  public ready(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}

export class MenuMock {
  public close(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}

export class HttpMock{

  public post(foo, bar, baz): any{
    return {
      "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzMDY0IiwiaWF0IjoxNDkzMjA5NzEwLCJleHAiOjE0OTM4MTQ1MTB9.wtzhoZFODHrHnPetFxv_-16__oEIyIlFGAcb20WM7wU",
      "success": true
    };
  }
}

export class AuthServiceMock{
  public loggedInUser(){
    let user = {
      username: "HVL",
      uid: "3064",
      authToken: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzMDY0IiwiaWF0IjoxNDkzMjA5NzEwLCJleHAiOjE0OTM4MTQ1MTB9.wtzhoZFODHrHnPetFxv_-16__oEIyIlFGAcb20WM7wU",
    }
    return user;
  }
}
