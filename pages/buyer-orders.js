// ====================================
// JASUKE HUB - BUYER ORDERS PAGE
// ====================================

function renderBuyerOrdersPage() {
    if (!requireLogin()) {
        return '';
    }

    const orders = Storage.getOrders();

    return `
    <div class="container" style="padding: var(--spacing-2xl) 0;">
      <h1 style="font-size: var(--text-4xl); font-weight: 900; margin-bottom: var(--spacing-xl);">My Orders</h1>
      
      ${orders.length === 0 ? `
        <div class="glass-card text-center" style="padding: var(--spacing-2xl);">
          <i class="fas fa-shopping-bag" style="font-size: 4rem; color: var(--text-muted); margin-bottom: var(--spacing-md);"></i>
          <h3 style="font-size: var(--text-2xl); margin-bottom: var(--spacing-sm);">No orders yet</h3>
          <p style="color: var(--text-secondary); margin-bottom: var(--spacing-lg);">Start browsing services to place your first order</p>
          <button class="btn btn-primary" onclick="navigateTo('home')">Browse Services</button>
        </div>
      ` : `
        <div style="display: flex; flex-direction: column; gap: var(--spacing-lg);">
          ${orders.reverse().map(order => renderOrderCard(order)).join('')}
        </div>
      `}
    </div>
  `;
}

function renderOrderCard(order) {
    const service = getServiceById(order.serviceId);
    const statusColors = {
        in_progress: 'badge-warning',
        delivered: 'badge-primary',
        revision: 'badge-secondary',
        completed: 'badge-success'
    };

    const statusLabels = {
        in_progress: 'In Progress',
        delivered: 'Delivered - Awaiting Review',
        revision: 'In Revision',
        completed: 'Completed'
    };

    return `
    <div class="glass-card">
      <div class="flex justify-between items-center" style="margin-bottom: var(--spacing-md);">
        <div>
          <h3 style="font-size: var(--text-2xl); font-weight: 700; margin-bottom: var(--spacing-xs);">
            ${order.serviceName || service?.title || 'Service'}
          </h3>
          <p style="color: var(--text-secondary);">
            <i class="fas fa-user"></i> ${order.seller}
            <span style="margin: 0 var(--spacing-sm);">•</span>
            <i class="fas fa-calendar"></i> ${formatDate(order.createdAt)}
          </p>
        </div>
        <span class="badge ${statusColors[order.status]}">${statusLabels[order.status]}</span>
      </div>
      
      <div class="grid grid-2" style="gap: var(--spacing-md); margin-bottom: var(--spacing-lg);">
        <div style="padding: var(--spacing-md); background: var(--surface); border-radius: var(--radius-md);">
          <p style="font-size: var(--text-sm); color: var(--text-muted); margin-bottom: var(--spacing-xs);">Amount Paid</p>
          <p style="font-size: var(--text-2xl); font-weight: 800;" class="text-gradient">${formatCurrency(order.amount)}</p>
        </div>
        <div style="padding: var(--spacing-md); background: var(--surface); border-radius: var(--radius-md);">
          <p style="font-size: var(--text-sm); color: var(--text-muted); margin-bottom: var(--spacing-xs);">Revisions Used</p>
          <p style="font-size: var(--text-2xl); font-weight: 800;">
            ${order.revisionsUsed} / ${order.maxRevisions}
          </p>
        </div>
      </div>
      
      ${order.status === 'delivered' ? `
        <div style="background: var(--surface); padding: var(--spacing-md); border-radius: var(--radius-md); margin-bottom: var(--spacing-md);">
          <p style="font-weight: 600; margin-bottom: var(--spacing-sm);">
            <i class="fas fa-check-circle" style="color: var(--accent);"></i> Work Delivered!
          </p>
          <p style="color: var(--text-secondary); font-size: var(--text-sm); margin-bottom: var(--spacing-md);">
            Please review the delivered work and choose to accept or request revision.
          </p>
          <div class="flex gap-sm">
            <button class="btn btn-primary" onclick="acceptWork(${order.id})" style="flex: 1;">
              <i class="fas fa-thumbs-up"></i> Accept Work
            </button>
            <button class="btn btn-secondary" onclick="requestRevision(${order.id})" style="flex: 1;" ${order.revisionsUsed >= order.maxRevisions ? 'disabled' : ''}>
              <i class="fas fa-redo"></i> Request Revision
              ${order.revisionsUsed >= order.maxRevisions ? '(Limit Reached)' : `(${order.maxRevisions - order.revisionsUsed} left)`}
            </button>
          </div>
        </div>
      ` : ''}
      
      ${order.status === 'completed' ? `
        <div style="background: var(--gradient-success); padding: var(--spacing-md); border-radius: var(--radius-md); margin-bottom: var(--spacing-md);">
          <p style="font-weight: 600;">
            <i class="fas fa-check-circle"></i> Order Completed Successfully!
          </p>
        </div>
      ` : ''}
      
      <div class="flex gap-sm">
        <button class="btn btn-ghost" onclick="openChat(${order.serviceId}, '${order.seller}', '${order.serviceName}')" style="flex: 1;">
          <i class="fas fa-comment"></i> Message Seller
        </button>
        ${order.status === 'in_progress' ? `
          <button class="btn btn-primary" onclick="simulateDelivery(${order.id})">
            <i class="fas fa-truck"></i> Simulate Delivery (Demo)
          </button>
        ` : ''}
      </div>
    </div>
  `;
}

function acceptWork(orderId) {
    if (confirm('Are you satisfied with the delivered work? This will mark the order as completed.')) {
        Storage.updateOrder(orderId, { status: 'completed' });
        alert('Order completed! Thank you for using Jasuke Hub.');
        navigateTo('orders');
    }
}

function requestRevision(orderId) {
    const orders = Storage.getOrders();
    const order = orders.find(o => o.id === orderId);

    if (!order) return;

    if (order.revisionsUsed >= order.maxRevisions) {
        alert('You have used all available revisions. Please contact the seller to discuss additional revisions (charges may apply).');
        return;
    }

    const revisionNotes = prompt('Please describe what needs to be revised:');

    if (!revisionNotes) return;

    Storage.updateOrder(orderId, {
        status: 'revision',
        revisionsUsed: order.revisionsUsed + 1,
        lastRevisionNotes: revisionNotes
    });

    // Send revision request to chat
    Storage.addMessage(order.serviceId, {
        type: 'sent',
        text: `📝 Revision Request (${order.revisionsUsed + 1}/${order.maxRevisions}):\n\n${revisionNotes}`
    });

    alert(`Revision request sent! (${order.revisionsUsed + 1}/${order.maxRevisions} revisions used)`);
    navigateTo('orders');
}

function simulateDelivery(orderId) {
    if (confirm('Simulate work delivery? (Demo feature)')) {
        Storage.updateOrder(orderId, { status: 'delivered' });
        alert('Work has been delivered! You can now review and accept or request revision.');
        navigateTo('orders');
    }
}
