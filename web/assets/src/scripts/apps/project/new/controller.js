define(['app', 'apps/project/new/views', 'string', 'backbone-forms'], function(app, View, S) {
  return function() {
    var layout = new View.Layout();
    app.mainRegion.show(layout);

    require(['entities/project/model'], function() {
      var newProject = app.request('project:entity:new');

      var formView = new View.ProjectForm({model: newProject});
      layout.projectFormRegion.show(formView);

      Backbone.Form.Field.errorClassName = 'has-error';
      Backbone.Form.Field.template = _.template('\
        <div class="form-group field-<%= key %>">\
          <label class="control-label" for="<%= editorId %>"><%= title %></label>\
          <span data-editor></span>\
          <p class="help-block" data-error></p>\
          <% if (help) { %>\
            <p class="help-block"><%= help %></p>\
          <% } %>\
        </div>\
      ');

      var form = new Backbone.Form({
        template: _.template($('#formTemplate').html()),
        model: newProject
      }).render();

      $('#project-form').append(form.el);

      form.on('name:change', function(form, editor) {
        console.log('update slug');
        var slug = S(editor.getValue()).slugify().s;
        form.fields.slug.editor.setValue(slug);
      });

      form.on('submit', function(event) {
        event.preventDefault();
        form.commit();

        console.log(JSON.stringify(newProject));
        /*$.ajax({
          type: 'POST',
          url: backendRouter.generate('openl10n_api_get_projects'),
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify(newProject)
        }).done(function() {
          app.trigger('project:show', newProject.id);
        }).fail(function() {
          alert('Project not save');
        });*/
      });
    });
  }
});
