// http://civicrm.org/licensing
CRM.volunteerApp.module('Assign', function(Assign, volunteerApp, Backbone, Marionette, $, _) {

  Assign.startWithParent = false;

  // Kick everything off
  Assign.addInitializer(function() {
    Assign.layout = new Assign.layoutClass();
    volunteerApp.dialogRegion.show(Assign.layout);
  });

  // Initialize entities and views
  Assign.on('start', function() {
    var request = volunteerApp.Entities.getNeeds({'api.volunteer_assignment.get': {}, 'is_active': 1});

    request.done(function(arrData) {

      var flexibleView = new Assign.needsView({
        collection: volunteerApp.Entities.Needs.getFlexible(arrData)
      });

      var scheduledView = new Assign.needsView({
        collection: volunteerApp.Entities.Needs.getScheduled(arrData)
      });

      Assign.layout.flexibleRegion.show(flexibleView);
      Assign.layout.scheduledRegion.show(scheduledView);
    });
  });

});
