// ====================================
// JASUKE HUB - CHAT MODULE
// ====================================

let currentChatService = null;

// Open Chat
function openChat(serviceId, sellerName, serviceName) {
    if (!requireLogin()) return;

    currentChatService = serviceId;
    document.getElementById('chatSellerName').textContent = sellerName;
    document.getElementById('chatServiceName').textContent = serviceName;

    loadChatMessages(serviceId);
    document.getElementById('chatOverlay').classList.add('active');
}

// Close Chat
function closeChat() {
    document.getElementById('chatOverlay').classList.remove('active');
    currentChatService = null;
}

// Load Chat Messages
function loadChatMessages(serviceId) {
    const chats = Storage.getChats();
    const messages = chats[serviceId] || [];

    const chatContainer = document.getElementById('chatMessages');
    chatContainer.innerHTML = '';

    messages.forEach(msg => {
        const messageEl = document.createElement('div');
        messageEl.className = `chat-message ${msg.type === 'sent' ? 'sent' : 'received'}`;

        if (msg.isInvoice) {
            messageEl.innerHTML = `
        <div style="padding: var(--spacing-sm); background: rgba(0,0,0,0.2); border-radius: var(--radius-sm); margin-top: var(--spacing-xs);">
          <p style="font-weight: 600; margin-bottom: var(--spacing-xs);">📄 Invoice</p>
          <p style="font-size: var(--text-sm); opacity: 0.9;">${msg.description}</p>
          <p style="font-size: var(--text-xl); font-weight: 800; margin: var(--spacing-xs) 0;">${formatCurrency(msg.amount)}</p>
          <p style="font-size: var(--text-xs); opacity: 0.7;">Due: ${formatDate(msg.deadline)}</p>
          ${msg.type === 'received' ? `
            <button class="btn btn-primary" onclick="showQRCode(${msg.amount})" style="width: 100%; margin-top: var(--spacing-sm); padding: 0.5rem;">
              Pay with QRIS
            </button>
          ` : ''}
        </div>
      `;
        } else {
            messageEl.innerHTML = `
        <p>${msg.text}</p>
        <p style="font-size: var(--text-xs); opacity: 0.7; margin-top: 0.25rem;">
          ${new Date(msg.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
        </p>
      `;
        }

        chatContainer.appendChild(messageEl);
    });

    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Send Message
function sendMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();

    if (!text || !currentChatService) return;

    const user = Storage.getUser();
    Storage.addMessage(currentChatService, {
        type: 'sent',
        text: text,
        sender: user.name
    });

    input.value = '';
    loadChatMessages(currentChatService);

    // Simulate seller response after 2 seconds
    setTimeout(() => {
        simulateSellerResponse(currentChatService, text);
    }, 2000);
}

// Simulate Seller Response
function simulateSellerResponse(serviceId, userMessage) {
    const service = getServiceById(serviceId);
    if (!service) return;

    let response = '';

    if (userMessage.toLowerCase().includes('harga') || userMessage.toLowerCase().includes('price')) {
        response = `Harga untuk layanan ini adalah ${formatCurrency(service.price)}. Apakah Anda tertarik untuk melanjutkan?`;
    } else if (userMessage.toLowerCase().includes('ya') || userMessage.toLowerCase().includes('setuju') || userMessage.toLowerCase().includes('deal')) {
        response = 'Baik! Saya akan mengirimkan invoice sekarang.';
    } else if (userMessage.toLowerCase().includes('revisi') || userMessage.toLowerCase().includes('revision')) {
        response = 'Tentu, bisa dijelaskan revisi apa yang Anda butuhkan?';
    } else {
        response = 'Terima kasih atas pertanyaannya. Saya siap membantu Anda dengan layanan immersive technology. Ada yang bisa saya jelaskan lebih lanjut?';
    }

    Storage.addMessage(serviceId, {
        type: 'received',
        text: response,
        sender: service.seller
    });

    loadChatMessages(serviceId);
}

// Enter key to send
document.getElementById('chatInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
