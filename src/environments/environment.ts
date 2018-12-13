// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBr53c_y0cYIrlb2QhGXc-co8JB0yEWg0U',
    authDomain: 'mindtree-angular-201.firebaseapp.com',
    databaseURL: 'https://mindtree-angular-201.firebaseio.com',
    projectId: 'mindtree-angular-201',
    storageBucket: 'mindtree-angular-201.appspot.com',
    messagingSenderId: '509216902404'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
