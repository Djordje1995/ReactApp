class Auth {
  constructor() {
    if (!!Auth.instance) {
      return Auth.instance;
    }

    Auth.instance = this;
    this.authenticated = false;
    this.admin = false;
    // this.isAuthenticated = function() {
    //   return this.authenticated;
    // };
    // this.isAdmin = function() {
    //   return this.admin;
    // };
    // this.login = function(_admin, callback) {
    //   this.authenticated = true;
    //   this.admin = _admin;
    //   callback();
    // };
    // this.logout = function(callback) {
    //   this.authenticated = false;
    //   this.admin = false;
    //   callback();
    // };
    return this;
  }

  isAuthenticated() {
    return this.authenticated;
  }
  isAdmin() {
    return this.admin;
  }
  login(_admin, callback) {
    this.admin = _admin;
    this.authenticated = true;
    callback();
  }
  logout(callback) {
    this.admin = false;
    this.authenticated = false;
    callback();
  }
}

// var Auth = (function() {
//   var instance;
//   function init() {
//     function isAuthenticated() {
//       return instance.authenticated;
//     }
//     function isAdmin() {
//       return instance.admin;
//     }
//     function login(admin, callback) {
//       instance.authenticated = true;
//       instance.admin = admin;
//       callback();
//     }
//     function logout(callback) {
//       instance.authenticated = false;
//       instance.admin = false;
//       callback();
//     }
//     return {
//       authenticated: false,
//       admin: false,
//       isAuthenticated: isAuthenticated,
//       isAdmin: isAdmin,
//       login: login,
//       logout: logout
//     };
//   }
//   return {
//     getInstance: function() {
//       if (!instance) {
//         instance = init();
//       }
//       return instance;
//     }
//   };
// })();

export default Auth;

// class Auth {
//   constructor() {
//     this.authenticated = false;
//     this.admin = false;
//   }

//   login(_admin, callback) {
//     this.authenticated = true;
//     this.admin = _admin;
//     callback();
//   }

//   logout(callback) {
//     this.authenticated = false;
//     this.admin = false;
//     callback();
//   }

//   isAuthenticated() {
//     return this.authenticated;
//   }

//   isAdmin() {
//     return this.admin;
//   }
// }

// export default new Auth();
