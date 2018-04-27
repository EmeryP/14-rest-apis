'use strict';

var app = app || {};


(function (module) {
  const adminView = {};

  adminView.initAdminPage = function (ctx, next) {
    $('.nav-menu').slideUp(350);
    $('.admin-view').show();

    $('#admin-form').on('submit', function(event) {
      event.preventDefault();
      let token = event.target.passphrase.value;

      // COMMENT: Is the token cleared out of local storage? Do you agree or disagree with this structure?
      // no, it's not cleared out of local storage, because it's being set to true here. We don't agree/like this setup because it's not secure; in that any token will evaluate to true allowing you to access the admin view no matter what you enter.
      $.get(`${ENV.apiUrl}/api/v1/admin`, {token})
        .then(res => {
          localStorage.token = true;
          page('/');
        })
        .catch(() => page('/'));
    })
  };

  adminView.verify = function(ctx, next) {
    if(!localStorage.token) $('.admin').addClass('admin-only');
    else $('.admin').show();
    next();
  }

  module.adminView = adminView;
})(app)
