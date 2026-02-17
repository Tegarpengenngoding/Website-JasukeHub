// ====================================
// JASUKE HUB - WITHDRAWAL MODULE
// ====================================

// Show Withdrawal Form
function showWithdrawalForm() {
    const balance = Storage.getBalance();

    if (balance < 50000) {
        alert('Minimum withdrawal amount is IDR 50,000');
        return;
    }

    const amount = prompt(`Your unclaimed balance: ${formatCurrency(balance)}\n\nEnter withdrawal amount (IDR):`);

    if (!amount) return;

    const withdrawalAmount = parseFloat(amount);

    if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
        alert('Invalid amount');
        return;
    }

    if (withdrawalAmount > balance) {
        alert('Insufficient balance');
        return;
    }

    if (withdrawalAmount < 50000) {
        alert('Minimum withdrawal amount is IDR 50,000');
        return;
    }

    // Get bank details
    const bankName = prompt('Bank Name:');
    if (!bankName) return;

    const accountNumber = prompt('Account Number:');
    if (!accountNumber) return;

    const accountName = prompt('Account Holder Name:');
    if (!accountName) return;

    // Process withdrawal
    Storage.addWithdrawal({
        amount: withdrawalAmount,
        bankName: bankName,
        accountNumber: accountNumber,
        accountName: accountName
    });

    // Deduct from balance
    Storage.setBalance(balance - withdrawalAmount);

    alert(`Withdrawal request submitted!\n\nAmount: ${formatCurrency(withdrawalAmount)}\nBank: ${bankName}\nAccount: ${accountNumber}\n\nEstimated processing time: 1-3 business days`);

    // Reload dashboard if on dashboard page
    if (window.currentRoute === 'dashboard') {
        navigateTo('dashboard');
    }
}

// Get Withdrawal History
function renderWithdrawalHistory() {
    const withdrawals = Storage.getWithdrawals();

    if (withdrawals.length === 0) {
        return '<p class="text-secondary text-center" style="padding: var(--spacing-xl);">No withdrawal history</p>';
    }

    const statusColors = {
        pending: 'badge-warning',
        completed: 'badge-success',
        rejected: 'badge-danger'
    };

    return withdrawals.reverse().map(w => `
    <div class="glass-card" style="margin-bottom: var(--spacing-md);">
      <div class="flex justify-between items-center" style="margin-bottom: var(--spacing-sm);">
        <div>
          <p style="font-weight: 700; font-size: var(--text-xl);">${formatCurrency(w.amount)}</p>
          <p style="font-size: var(--text-sm); color: var(--text-muted);">${formatDate(w.date)}</p>
        </div>
        <span class="badge ${statusColors[w.status] || 'badge-primary'}">${w.status}</span>
      </div>
      <div style="padding-top: var(--spacing-sm); border-top: 1px solid var(--border);">
        <p style="font-size: var(--text-sm); color: var(--text-secondary);">
          ${w.bankName} - ${w.accountNumber}<br>
          ${w.accountName}
        </p>
      </div>
    </div>
  `).join('');
}
