
Template.adminDashboard.helpers({
  transactions: function () {
    return Loans.find({}, { sort: { createdAt: -1 } });
  },
});

Template.adminDashboard.events({
  'click .confirm-payment': function (event) {
    const loanId = $(event.target).data('loan-id');
    Meteor.call('loans.confirmPayment', loanId, function (error, result) {
      if (error) {
        console.log(error.reason);
      }
    });
  },
});
