
Meteor.publish('users.all', function () {
  return Users.find({}, { fields: { email: 1, role: 1 } });
});

Meteor.publish('loans.all', function () {
  return Loans.find({}, { fields: { borrowerId: 1, lenderId: 1, amount: 1, status: 1 } });
});

Meteor.publish('payments.all', function () {
  return Payments.find({}, { fields: { loanId: 1, amount: 1, status: 1 } });
});
