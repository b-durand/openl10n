define([
  'jquery',
  'backbone',
  'app',
  'apps/config/backend/router'
], function($, Backbone, app, backendRouter) {

  var Project = Backbone.Model.extend({
    idAttribute: 'slug',

    url: function() {
      return backendRouter.generate('openl10n_api_get_project', {
        'project': this.id,
      });
    },

    defaults: {
      slug: '', // to be replaced by slug
      name: '',
      default_locale: 'en',
    },

    schema: {
      name: {validators: ['required'], editorClass: 'form-control input-lg'},
      slug: {validators: ['required'], editorClass: 'form-control input-lg'},
      default_locale: {type: 'Select', options: [
        {val: 'en', label: 'English (en)'},
        {val: 'fr', label: 'French (fr)'},
        {val: 'it', label: 'Italian (it)'},
        {val: 'es', label: 'Spanish (es)'}
      ], title: 'Default locale', editorClass: 'form-control input-lg'}
    },

    validate: function(attrs, options) {
      var errors = {};

      if (!attrs.name) {
        errors.name = 'cant be blank';
      }

      if (!_.isEmpty(errors)) {
        return errors;
      }
    }
  });

  var API = {
    getProjectEntity: function(projectSlug) {
      var project = new Project({slug: projectSlug});
      var defer = $.Deferred();

      project.fetch({
        success: function(data) {
          defer.resolve(data);
        },
        error: function(data) {
          defer.resolve(undefined);
        }
      });

      return defer.promise();
    }
  };

  app.reqres.setHandler('project:entity', function(projectSlug) {
    return API.getProjectEntity(projectSlug);
  });

  app.reqres.setHandler('project:entity:new', function() {
    return new Project();
  });

  return Project;
});
