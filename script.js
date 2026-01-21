let products = [];

const productForm = document.getElementById('productForm');
const productTableBody = document.getElementById('productTableBody');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const emptyState = document.getElementById('emptyState');


const totalProductsEl = document.getElementById('totalProducts');
const highRiskCountEl = document.getElementById('highRiskCount');
const lowStockCountEl = document.getElementById('lowStockCount');
const topRiskScoreEl = document.getElementById('topRiskScore');


productForm.addEventListener('submit', handleAddProduct);
searchInput.addEventListener('input', renderProducts);
categoryFilter.addEventListener('change', renderProducts);

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.style.transform = sidebar.style.transform === 'translateX(-300px)' ? 'translateX(0)' : 'translateX(-300px)';
}

function saveProducts() {
  localStorage.setItem('products', JSON.stringify(products));
}

function loadProducts() {
  try {
    const stored = localStorage.getItem('products');
    products = stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Corrupted local storage data, resetting...");
    products = [];
    localStorage.removeItem('products');
  }
}


function calculateRisk(p) {
  const demandRatio = p.monthlyDemand / (p.quantity + 10); // buffer
  const restockFactor = Math.min(p.restockTime / 14, 1);   // cap
  const priceFactor = p.price > 5000 ? 0.2 : 0.1;

  let score =
    demandRatio * 40 +
    restockFactor * 30 +
    priceFactor * 30;

  return Math.min(Math.round(score), 100);
}


function getRiskLevel(score) {
  if (score <= 30) return 'Low';
  if (score <= 60) return 'Medium';
  return 'High';
}

function getDecision(product) {
  if (product.riskScore >= 70) {
    return {
      label: 'Immediate Reorder Recommended',
      reason: 'High demand pressure combined with low availability or delayed restocking'
    };
  }

  if (product.riskScore >= 40) {
    return {
      label: 'Monitor Inventory Trend',
      reason: 'Moderate risk detected based on demand and restock patterns'
    };
  }

  return {
    label: 'Inventory Stable',
    reason: 'Current stock levels are sufficient for projected demand'
  };
}


function handleAddProduct(e) {
  e.preventDefault();

  const name = productName.value.trim();
  const category = productCategory.value;
  const price = Number(productPrice.value);
  const quantity = Number(productQuantity.value);
  const monthlyDemand = Number(monthlyDemand.value);
  const restockTime = Number(restockTime.value);

  /* ---------- STEP 3: VALIDATIONS ---------- */

  if (!name || !category) {
    alert("Please fill all required fields");
    return;
  }

  if (price <= 0) {
    alert("Price must be greater than 0");
    return;
  }

  if (quantity < 0) {
    alert("Quantity cannot be negative");
    return;
  }

  if (monthlyDemand <= 0) {
    alert("Monthly demand must be greater than 0");
    return;
  }

  if (monthlyDemand > quantity * 10) {
    alert("Warning: Monthly demand is unusually high compared to stock");
  }

  /* ---------- PRODUCT CREATION ---------- */

  const product = {
    id: Date.now(),
    name,
    category,
    price,
    quantity,
    monthlyDemand,
    restockTime
  };

  product.riskScore = calculateRisk(product);
  product.riskLevel = getRiskLevel(product.riskScore);

  const decision = getDecision(product);
  product.decision = decision.label;
  product.decisionReason = decision.reason;

  products.push(product);
  saveProducts();
  productForm.reset();
  updateCategoryFilter();
  renderProducts();
}


function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
  saveProducts();
  updateCategoryFilter();
  renderProducts();
}

function updateCategoryFilter() {
  const categories = [...new Set(products.map(p => p.category))];
  const current = categoryFilter.value;
  categoryFilter.innerHTML = '<option value="">All Categories</option>';
  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    categoryFilter.appendChild(opt);
  });
  categoryFilter.value = current;
}

function filterProducts() {
  const search = searchInput.value.toLowerCase().trim();
  const category = categoryFilter.value;
  return products.filter(p => p.name.toLowerCase().includes(search) && (!category || p.category === category));
}

function renderProducts() {
  const filtered = filterProducts();

  emptyState.classList.toggle('show', !filtered.length);
  productTableBody.innerHTML = filtered.map(p => {
    const stockClass = p.quantity > 0 ? 'in-stock' : 'out-of-stock';
    const riskClass = p.riskLevel === 'Low' ? 'risk-low' : p.riskLevel === 'Medium' ? 'risk-medium' : 'risk-high';

    return `
      <tr>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>$${p.price.toFixed(2)}</td>
        <td>${p.quantity}</td>
        <td><span class="stock-status ${stockClass}">${p.quantity > 0 ? 'In Stock' : 'Out of Stock'}</span></td>
        <td><span class="risk-badge ${riskClass}">${p.riskLevel}</span></td>
        <td title="${p.decisionReason}">${p.decision}</td>
        <td><button class="delete-btn" onclick="deleteProduct(${p.id})">Delete</button></td>
      </tr>
    `;
  }).join('');

  updateDashboardCards();
}

function updateDashboardCards() {
  totalProductsEl.textContent = products.length;
  highRiskCountEl.textContent = products.filter(p => p.riskLevel === 'High').length;
  lowStockCountEl.textContent = products.filter(p => p.quantity < 10).length;
  topRiskScoreEl.textContent = products.length ? Math.max(...products.map(p => p.riskScore)) : 0;
}




loadProducts();
updateCategoryFilter();
renderProducts();
