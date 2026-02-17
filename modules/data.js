// ====================================
// JASUKE HUB - MOCK DATA STORAGE
// ====================================

// Mock Services Data
const MOCK_SERVICES = [
  {
    id: 1,
    title: "VR Training Simulation Development",
    description: "Professional VR training application development for enterprise clients. Includes Unity development, 3D modeling, and interaction design.",
    seller: "Alex Chen",
    sellerAvatar: "AC",
    rating: 4.9,
    reviews: 127,
    price: 5000000,
    category: "VR Development",
    image: "vr-training",
    portfolio: ["vr-portfolio-1", "vr-portfolio-2", "vr-portfolio-3"],
    deliveryTime: "14 days",
    revisions: 3
  },
  {
    id: 2,
    title: "AR Mobile App Development",
    description: "Create stunning augmented reality experiences for iOS and Android. Specializing in marker-based and markerless AR.",
    seller: "Sarah Martinez",
    sellerAvatar: "SM",
    rating: 5.0,
    reviews: 89,
    price: 4500000,
    category: "AR Development",
    image: "ar-mobile",
    portfolio: ["ar-portfolio-1", "ar-portfolio-2", "ar-portfolio-3"],
    deliveryTime: "10 days",
    revisions: 3
  },
  {
    id: 3,
    title: "High-Quality 3D Character Modeling",
    description: "Professional 3D character creation for games, VR, and animation. Realistic and stylized styles available.",
    seller: "David Kim",
    sellerAvatar: "DK",
    rating: 4.8,
    reviews: 234,
    price: 3000000,
    category: "3D Modeling",
    image: "3d-character",
    portfolio: ["3d-portfolio-1", "3d-portfolio-2", "3d-portfolio-3"],
    deliveryTime: "7 days",
    revisions: 3
  },
  {
    id: 4,
    title: "360° Virtual Tour Creation",
    description: "Immersive 360-degree virtual tours for real estate, museums, and tourism. Professional photography and post-processing included.",
    seller: "Emma Johnson",
    sellerAvatar: "EJ",
    rating: 4.9,
    reviews: 156,
    price: 2500000,
    category: "360 Content",
    image: "360-tour",
    portfolio: ["360-portfolio-1", "360-portfolio-2", "360-portfolio-3"],
    deliveryTime: "5 days",
    revisions: 2
  },
  {
    id: 5,
    title: "3D Product Visualization & Animation",
    description: "Photorealistic 3D product renders and animations for marketing and e-commerce. Fast turnaround guaranteed.",
    seller: "Michael Brown",
    sellerAvatar: "MB",
    rating: 4.7,
    reviews: 198,
    price: 2000000,
    category: "3D Modeling",
    image: "product-viz",
    portfolio: ["product-portfolio-1", "product-portfolio-2", "product-portfolio-3"],
    deliveryTime: "3 days",
    revisions: 3
  },
  {
    id: 6,
    title: "VR Game Development (Unity)",
    description: "Custom VR game development using Unity. From concept to deployment on all major VR platforms.",
    seller: "Jessica Lee",
    sellerAvatar: "JL",
    rating: 5.0,
    reviews: 76,
    price: 7500000,
    category: "VR Development",
    image: "vr-game",
    portfolio: ["vr-game-1", "vr-game-2", "vr-game-3"],
    deliveryTime: "21 days",
    revisions: 3
  },
  {
    id: 7,
    title: "Motion Capture Animation",
    description: "Professional motion capture and animation services. Perfect for games, VR experiences, and film.",
    seller: "Ryan Torres",
    sellerAvatar: "RT",
    rating: 4.8,
    reviews: 112,
    price: 4000000,
    category: "Animation",
    image: "mocap",
    portfolio: ["mocap-1", "mocap-2", "mocap-3"],
    deliveryTime: "10 days",
    revisions: 2
  },
  {
    id: 8,
    title: "AR Filter Creation (Instagram/Snapchat)",
    description: "Engaging AR filters and effects for social media marketing campaigns. High engagement guaranteed.",
    seller: "Lisa Wang",
    sellerAvatar: "LW",
    rating: 4.9,
    reviews: 203,
    price: 1500000,
    category: "AR Development",
    image: "ar-filter",
    portfolio: ["ar-filter-1", "ar-filter-2", "ar-filter-3"],
    deliveryTime: "4 days",
    revisions: 3
  }
];

// Mock E-Courses
const MOCK_COURSES = [
  {
    id: 1,
    title: "Introduction to VR Development",
    description: "Learn the basics of VR development with Unity",
    duration: "2 hours",
    points: 100,
    lessons: 8,
    progress: 0
  },
  {
    id: 2,
    title: "3D Modeling Fundamentals",
    description: "Master Blender for 3D modeling",
    duration: "3 hours",
    points: 150,
    lessons: 12,
    progress: 0
  },
  {
    id: 3,
    title: "AR Development with ARCore",
    description: "Build Android AR applications",
    duration: "2.5 hours",
    points: 120,
    lessons: 10,
    progress: 0
  },
  {
    id: 4,
    title: "Animation Principles",
    description: "Learn professional animation techniques",
    duration: "4 hours",
    points: 200,
    lessons: 15,
    progress: 0
  },
  {
    id: 5,
    title: "XR User Experience Design",
    description: "Design principles for immersive experiences",
    duration: "2 hours",
    points: 100,
    lessons: 8,
    progress: 0
  }
];

// LocalStorage Utilities
const Storage = {
  // User
  setUser(user) {
    localStorage.setItem('jasuke_user', JSON.stringify(user));
  },
  
  getUser() {
    const user = localStorage.getItem('jasuke_user');
    return user ? JSON.parse(user) : null;
  },
  
  clearUser() {
    localStorage.removeItem('jasuke_user');
  },
  
  // Orders
  getOrders() {
    const orders = localStorage.getItem('jasuke_orders');
    return orders ? JSON.parse(orders) : [];
  },
  
  setOrders(orders) {
    localStorage.setItem('jasuke_orders', JSON.stringify(orders));
  },
  
  addOrder(order) {
    const orders = this.getOrders();
    orders.push({
      ...order,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: 'in_progress',
      revisionsUsed: 0,
      maxRevisions: 3
    });
    this.setOrders(orders);
    return orders[orders.length - 1];
  },
  
  updateOrder(orderId, updates) {
    const orders = this.getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      orders[index] = { ...orders[index], ...updates };
      this.setOrders(orders);
    }
  },
  
  // Chat
  getChats() {
    const chats = localStorage.getItem('jasuke_chats');
    return chats ? JSON.parse(chats) : {};
  },
  
  setChats(chats) {
    localStorage.setItem('jasuke_chats', JSON.stringify(chats));
  },
  
  addMessage(serviceId, message) {
    const chats = this.getChats();
    if (!chats[serviceId]) {
      chats[serviceId] = [];
    }
    chats[serviceId].push({
      ...message,
      timestamp: new Date().toISOString()
    });
    this.setChats(chats);
  },
  
  // Seller Balance
  getBalance() {
    const balance = localStorage.getItem('jasuke_balance');
    return balance ? parseFloat(balance) : 0;
  },
  
  setBalance(amount) {
    localStorage.setItem('jasuke_balance', amount.toString());
  },
  
  addBalance(amount) {
    const current = this.getBalance();
    this.setBalance(current + amount);
  },
  
  // Withdrawals
  getWithdrawals() {
    const withdrawals = localStorage.getItem('jasuke_withdrawals');
    return withdrawals ? JSON.parse(withdrawals) : [];
  },
  
  addWithdrawal(withdrawal) {
    const withdrawals = this.getWithdrawals();
    withdrawals.push({
      ...withdrawal,
      id: Date.now(),
      date: new Date().toISOString(),
      status: 'pending'
    });
    localStorage.setItem('jasuke_withdrawals', JSON.stringify(withdrawals));
  },
  
  // Course Progress
  getCourseProgress() {
    const progress = localStorage.getItem('jasuke_course_progress');
    return progress ? JSON.parse(progress) : {};
  },
  
  updateCourseProgress(courseId, progress) {
    const allProgress = this.getCourseProgress();
    allProgress[courseId] = progress;
    localStorage.setItem('jasuke_course_progress', JSON.stringify(allProgress));
  },
  
  // Points
  getPoints() {
    const points = localStorage.getItem('jasuke_points');
    return points ? parseInt(points) : 0;
  },
  
  addPoints(points) {
    const current = this.getPoints();
    localStorage.setItem('jasuke_points', (current + points).toString());
  }
};

// Helper Functions
function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function getServiceById(id) {
  return MOCK_SERVICES.find(s => s.id === parseInt(id));
}

function getCourseById(id) {
  return MOCK_COURSES.find(c => c.id === parseInt(id));
}

// Initialize demo data
function initializeDemoData() {
  // Add some demo balance for seller
  if (!localStorage.getItem('jasuke_balance')) {
    Storage.setBalance(15750000); // IDR 15.75 million unclaimed
  }
  
  // Add some demo points
  if (!localStorage.getItem('jasuke_points')) {
    Storage.addPoints(350);
  }
}

// Run initialization
initializeDemoData();
