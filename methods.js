
Meteor.methods({
  'users.register': function (email, role) {
   
    check(email, String);
    check(role, Match.OneOf('admin', 'borrower', 'lender'));

  
    const userId = Users.insert({
      email: email,
      role: role,
    });

    return userId;
  },

  'loans.request': function (userId, amount) {
   
    check(userId, String);
    check(amount, Number);
    

    const user = Users.findOne({ _id: userId, role: 'borrower' });
    if (!user) {
      throw new Meteor.Error('not-authorized', 'Only borrowers can request loans');
    }

  
    const loanId = Loans.insert({
      borrowerId: userId,
      amount: amount,
      status: 'pending',
      createdAt: new Date(),
    });

    return loanId;
  },

  'loans.confirmPayment': function (loanId) {
 
    check(loanId, String);

  
    const user = Users.findOne({ _id: this.userId, role: 'lender' });
    if (!user) {
      throw new Meteor.Error('not-authorized', 'Only lenders can confirm payments');
    }

   
    const loan = Loans.findOne({ _id: loanId, status: 'pending' });
    if (!loan) {
      throw new Meteor.Error('invalid-action', 'Invalid loan or loan already confirmed');
    }

  
    Loans.update({ _id: loanId }, { $set: { status: 'confirmed' } });

  
    Payments.insert({
      loanId: loanId,
      amount: loan.amount,
      status: 'confirmed',
      createdAt: new Date(),
    });
  },
});
