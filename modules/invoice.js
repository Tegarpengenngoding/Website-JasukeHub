// ====================================
// JASUKE HUB - INVOICE & PAYMENT MODULE
// ====================================

let currentInvoiceAmount = 0;

// Show Invoice Form
function showInvoiceForm() {
    const user = Storage.getUser();
    if (user && (user.role === 'seller' || user.role === 'both')) {
        document.getElementById('invoiceModal').classList.add('active');
    } else {
        alert('Only sellers can send invoices');
    }
}

// Close Invoice Modal
function closeInvoiceModal() {
    document.getElementById('invoiceModal').classList.remove('active');
    document.getElementById('invoiceForm').reset();
}

// Handle Invoice Submission
document.getElementById('invoiceForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const description = document.getElementById('invoiceDescription').value;
    const amount = parseFloat(document.getElementById('invoiceAmount').value);
    const deadline = document.getElementById('invoiceDeadline').value;

    if (!currentChatService) {
        alert('No active chat');
        return;
    }

    const user = Storage.getUser();

    // Add invoice message to chat
    Storage.addMessage(currentChatService, {
        type: 'sent',
        isInvoice: true,
        description: description,
        amount: amount,
        deadline: deadline,
        sender: user.name
    });

    closeInvoiceModal();
    loadChatMessages(currentChatService);

    alert('Invoice sent successfully!');
});

// Show QR Code for Payment
function showQRCode(amount) {
    currentInvoiceAmount = amount;
    document.getElementById('qrAmount').textContent = formatCurrency(amount);

    // Clear previous QR code
    const qrContainer = document.getElementById('qrCodeContainer');
    qrContainer.innerHTML = '';

    // Generate QR Code
    // In production, this would contain actual payment gateway data
    const qrData = `JASUKE_HUB_PAYMENT_${Date.now()}_${amount}`;

    new QRCode(qrContainer, {
        text: qrData,
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    document.getElementById('qrModal').classList.add('active');
}

// Close QR Modal
function closeQRModal() {
    document.getElementById('qrModal').classList.remove('active');
}

// Confirm Payment
function confirmPayment() {
    const service = getServiceById(currentChatService);
    if (!service) return;

    // Create order
    Storage.addOrder({
        serviceId: currentChatService,
        serviceName: service.title,
        seller: service.seller,
        amount: currentInvoiceAmount,
        paymentDate: new Date().toISOString()
    });

    // Add seller balance (for demo purposes)
    Storage.addBalance(currentInvoiceAmount * 0.9); // 90% to seller, 10% platform fee

    closeQRModal();
    closeChat();

    alert('Payment confirmed! Order created successfully.');

    // Navigate to orders page
    navigateTo('orders');
}
