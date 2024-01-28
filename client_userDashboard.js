
Template.userDashboard.events({
  'submit #loan-request-form': function (event) {
    event.preventDefault();
    const amount = event.target.amount.value;
    Meteor.call('loans.request', Meteor.userId(), amount, function (error, result) {
      if (error) {
        console.log(error.reason);
      }
    });
  },
});

Template.userDashboard.helpers({
  users: function () {
    return Users.find({});
  },

  loans: function () {
    return Loans.find({ borrowerId: Meteor.userId() });
  },

  payments: function () {
    return Payments.find({ userId: Meteor.userId() });
  },
});
