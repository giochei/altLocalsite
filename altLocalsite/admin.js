// Storage Catalog - Admin Page Logic

// Admin App
class AdminApp {
    constructor() {
        this.data = this.loadData();
        this.currentEditing = null;
        this.init();
    }

    init() {
        // Check if already logged in
        if (sessionStorage.getItem('adminLoggedIn') === 'true') {
            this.showAdminInterface();
        }
    }

    loadData() {
        try {
            const stored = localStorage.getItem('storageCatalogData');
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (e) {
            console.warn('Failed to load catalog data');
        }
        
        // Return empty structure if no data
        return { suppliers: [] };
    }

    saveData() {
        try {
            localStorage.setItem('storageCatalogData', JSON.stringify(this.data));
            return true;
        } catch (e) {
            alert('Failed to save data. Storage may be full.');
            return false;
        }
    }

    showAdminInterface() {
        document.getElementById('passwordScreen').style.display = 'none';
        document.getElementById('adminInterface').classList.add('active');
        sessionStorage.setItem('adminLoggedIn', 'true');
        this.renderTree();
        this.showEmptyPanel();
    }

    renderTree() {
        const tree = document.getElementById('adminTree');
        
        if (!this.data.suppliers || this.data.suppliers.length === 0) {
            tree.innerHTML = '<p>No suppliers yet. Add one to get started!</p>';
            return;
        }

        tree.innerHTML = this.data.suppliers.map(supplier => `
            <div class="tree-item">
                <div class="tree-item-content tree-supplier" onclick="editSupplier('${supplier.id}')">
                    <span>${supplier.name}</span>
                    <span class="delete-btn" onclick="event.stopPropagation(); deleteSupplier('${supplier.id}')">×</span>
                </div>
                ${supplier.companies ? supplier.companies.map(company => `
                    <div class="tree-item">
                        <div class="tree-item-content tree-company" onclick="editCompany('${supplier.id}', '${company.id}')">
                            <span>${company.name}</span>
                            <span class="delete-btn" onclick="event.stopPropagation(); deleteCompany('${supplier.id}', '${company.id}')">×</span>
                        </div>
                        ${company.products ? company.products.map(product => `
                            <div class="tree-item">
                                <div class="tree-item-content tree-product" onclick="editProduct('${supplier.id}', '${company.id}', '${product.id}')">
                                    <span>${product.name}</span>
                                    <span class="delete-btn" onclick="event.stopPropagation(); deleteProduct('${supplier.id}', '${company.id}', '${product.id}')">×</span>
                                </div>
                            </div>
                        `).join('') : ''}
                    </div>
                `).join('') : ''}
            </div>
        `).join('');
    }

    showEmptyPanel() {
        document.getElementById('adminPanel').innerHTML = `
            <div class="empty-panel">
                <h2>Welcome to Admin</h2>
                <p>Select an item to edit or click "Add Supplier" to create new items.</p>
            </div>
        `;
    }

    showAddSupplierForm() {
        this.currentEditing = { type: 'supplier' };
        document.getElementById('adminPanel').innerHTML = `
            <div class="form-container">
                <h2 class="form-title">Add Supplier</h2>
                <form onsubmit="saveForm(event)">
                    <div class="form-group">
                        <label class="form-label">Supplier Name</label>
                        <input type="text" class="form-input" name="name" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Logo</label>
                        <div class="file-input-wrapper">
                            <input type="file" class="file-input" id="logoFile" name="logo" accept="image/*">
                            <label class="file-input-label" for="logoFile">Choose Image</label>
                        </div>
                        <div class="file-name" id="logoFileName">No file selected</div>
                    </div>
                    <div class="form-buttons">
                        <button type="submit" class="btn-primary">Save Supplier</button>
                        <button type="button" class="btn-secondary" onclick="cancelForm()">Cancel</button>
                    </div>
                </form>
            </div>
        `;
        this.setupFileInput('logoFile', 'logoFileName');
    }

    showEditSupplierForm(supplierId) {
        const supplier = this.findSupplier(supplierId);
        if (!supplier) return;

        this.currentEditing = { type: 'supplier', id: supplierId };
        document.getElementById('adminPanel').innerHTML = `
            <div class="form-container">
                <h2 class="form-title">Edit Supplier</h2>
                <form onsubmit="saveForm(event)">
                    <div class="form-group">
                        <label class="form-label">Supplier Name</label>
                        <input type="text" class="form-input" name="name" value="${supplier.name}" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Logo</label>
                        <div class="file-input-wrapper">
                            <input type="file" class="file-input" id="logoFile" name="logo" accept="image/*">
                            <label class="file-input-label" for="logoFile">Choose New Image</label>
                        </div>
                        <div class="file-name" id="logoFileName">No file selected</div>
                    </div>
                    <div class="form-buttons">
                        <button type="submit" class="btn-primary">Save Changes</button>
                        <button type="button" class="btn-secondary" onclick="cancelForm()">Cancel</button>
                    </div>
                </form>
            </div>
        `;
        this.setupFileInput('logoFile', 'logoFileName');
    }

    showAddCompanyForm() {
        this.currentEditing = { type: 'company' };
        document.getElementById('adminPanel').innerHTML = `
            <div class="form-container">
                <h2 class="form-title">Add Company</h2>
                <form onsubmit="saveForm(event)">
                    <div class="form-group">
                        <label class="form-label">Company Name</label>
                        <input type="text" class="form-input" name="name" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Logo</label>
                        <div class="file-input-wrapper">
                            <input type="file" class="file-input" id="logoFile" name="logo" accept="image/*">
                            <label class="file-input-label" for="logoFile">Choose Image</label>
                        </div>
                        <div class="file-name" id="logoFileName">No file selected</div>
                    </div>
                    <div class="form-buttons">
                        <button type="submit" class="btn-primary">Save Company</button>
                        <button type="button" class="btn-secondary" onclick="cancelForm()">Cancel</button>
                    </div>
                </form>
            </div>
        `;
        this.setupFileInput('logoFile', 'logoFileName');
    }

    showEditCompanyForm(supplierId, companyId) {
        const company = this.findCompany(supplierId, companyId);
        if (!company) return;

        this.currentEditing = { type: 'company', supplierId, companyId };
        document.getElementById('adminPanel').innerHTML = `
            <div class="form-container">
                <h2 class="form-title">Edit Company</h2>
                <form onsubmit="saveForm(event)">
                    <div class="form-group">
                        <label class="form-label">Company Name</label>
                        <input type="text" class="form-input" name="name" value="${company.name}" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Logo</label>
                        <div class="file-input-wrapper">
                            <input type="file" class="file-input" id="logoFile" name="logo" accept="image/*">
                            <label class="file-input-label" for="logoFile">Choose New Image</label>
                        </div>
                        <div class="file-name" id="logoFileName">No file selected</div>
                    </div>
                    <div class="form-buttons">
                        <button type="submit" class="btn-primary">Save Changes</button>
                        <button type="button" class="btn-secondary" onclick="cancelForm()">Cancel</button>
                    </div>
                </form>
            </div>
        `;
        this.setupFileInput('logoFile', 'logoFileName');
    }

    showAddProductForm() {
        this.currentEditing = { type: 'product' };
        document.getElementById('adminPanel').innerHTML = `
            <div class="form-container">
                <h2 class="form-title">Add Product</h2>
                <form onsubmit="saveForm(event)">
                    <div class="form-group">
                        <label class="form-label">Product Name</label>
                        <input type="text" class="form-input" name="name" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Description</label>
                        <textarea class="form-textarea" name="description" required></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Metric</label>
                        <select class="form-select" name="metric" required>
                            <option value="">Select metric</option>
                            <option value="kg">kg</option>
                            <option value="liter">liter</option>
                            <option value="unit">unit</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Price</label>
                        <input type="number" class="form-input" name="price" step="0.01" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Product Image</label>
                        <div class="file-input-wrapper">
                            <input type="file" class="file-input" id="productImage" name="image" accept="image/*">
                            <label class="file-input-label" for="productImage">Choose Image</label>
                        </div>
                        <div class="file-name" id="productImageName">No file selected</div>
                    </div>
                    <div class="form-buttons">
                        <button type="submit" class="btn-primary">Save Product</button>
                        <button type="button" class="btn-secondary" onclick="cancelForm()">Cancel</button>
                    </div>
                </form>
            </div>
        `;
        this.setupFileInput('productImage', 'productImageName');
    }

    showEditProductForm(supplierId, companyId, productId) {
        const product = this.findProduct(supplierId, companyId, productId);
        if (!product) return;

        this.currentEditing = { type: 'product', supplierId, companyId, productId };
        document.getElementById('adminPanel').innerHTML = `
            <div class="form-container">
                <h2 class="form-title">Edit Product</h2>
                <form onsubmit="saveForm(event)">
                    <div class="form-group">
                        <label class="form-label">Product Name</label>
                        <input type="text" class="form-input" name="name" value="${product.name}" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Description</label>
                        <textarea class="form-textarea" name="description" required>${product.description}</textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Metric</label>
                        <select class="form-select" name="metric" required>
                            <option value="kg" ${product.metric === 'kg' ? 'selected' : ''}>kg</option>
                            <option value="liter" ${product.metric === 'liter' ? 'selected' : ''}>liter</option>
                            <option value="unit" ${product.metric === 'unit' ? 'selected' : ''}>unit</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Price</label>
                        <input type="number" class="form-input" name="price" step="0.01" value="${product.price}" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Product Image</label>
                        <div class="file-input-wrapper">
                            <input type="file" class="file-input" id="productImage" name="image" accept="image/*">
                            <label class="file-input-label" for="productImage">Choose New Image</label>
                        </div>
                        <div class="file-name" id="productImageName">No file selected</div>
                    </div>
                    <div class="form-buttons">
                        <button type="submit" class="btn-primary">Save Changes</button>
                        <button type="button" class="btn-secondary" onclick="cancelForm()">Cancel</button>
                    </div>
                </form>
            </div>
        `;
        this.setupFileInput('productImage', 'productImageName');
    }

    setupFileInput(inputId, nameId) {
        const input = document.getElementById(inputId);
        const nameDisplay = document.getElementById(nameId);
        
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                nameDisplay.textContent = file.name;
            } else {
                nameDisplay.textContent = 'No file selected';
            }
        });
    }

    async saveForm(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        
        // Handle image upload
        const imageFile = formData.get('logo') || formData.get('image');
        let imageData = null;
        
        if (imageFile && imageFile.size > 0) {
            imageData = await this.fileToBase64(imageFile);
        }

        if (this.currentEditing.type === 'supplier') {
            this.saveSupplier(formData, imageData);
        } else if (this.currentEditing.type === 'company') {
            this.saveCompany(formData, imageData);
        } else if (this.currentEditing.type === 'product') {
            this.saveProduct(formData, imageData);
        }
    }

    saveSupplier(formData, imageData) {
        const name = formData.get('name');
        
        if (this.currentEditing.id) {
            // Edit existing
            const supplier = this.findSupplier(this.currentEditing.id);
            if (supplier) {
                supplier.name = name;
                if (imageData) supplier.logo = imageData;
            }
        } else {
            // Add new
            const newSupplier = {
                id: 'supplier-' + Date.now(),
                name: name,
                logo: imageData || 'resources/supplier1.png',
                companies: []
            };
            this.data.suppliers.push(newSupplier);
        }

        if (this.saveData()) {
            this.showSuccessMessage();
            this.renderTree();
            this.showEmptyPanel();
        }
    }

    saveCompany(formData, imageData) {
        const name = formData.get('name');
        const supplier = this.findSupplier(this.currentEditing.supplierId);
        
        if (!supplier) return;

        if (!supplier.companies) supplier.companies = [];

        if (this.currentEditing.companyId) {
            // Edit existing
            const company = this.findCompany(this.currentEditing.supplierId, this.currentEditing.companyId);
            if (company) {
                company.name = name;
                if (imageData) company.logo = imageData;
            }
        } else {
            // Add new
            const newCompany = {
                id: 'company-' + Date.now(),
                name: name,
                logo: imageData || 'resources/company1.png',
                products: []
            };
            supplier.companies.push(newCompany);
        }

        if (this.saveData()) {
            this.showSuccessMessage();
            this.renderTree();
            this.showEmptyPanel();
        }
    }

    saveProduct(formData, imageData) {
        const name = formData.get('name');
        const description = formData.get('description');
        const metric = formData.get('metric');
        const price = parseFloat(formData.get('price'));
        
        const company = this.findCompany(this.currentEditing.supplierId, this.currentEditing.companyId);
        if (!company) return;

        if (!company.products) company.products = [];

        if (this.currentEditing.productId) {
            // Edit existing
            const product = this.findProduct(this.currentEditing.supplierId, this.currentEditing.companyId, this.currentEditing.productId);
            if (product) {
                product.name = name;
                product.description = description;
                product.metric = metric;
                product.price = price;
                if (imageData) product.image = imageData;
            }
        } else {
            // Add new
            const newProduct = {
                id: 'product-' + Date.now(),
                name: name,
                description: description,
                metric: metric,
                price: price,
                image: imageData || 'resources/product1.png'
            };
            company.products.push(newProduct);
        }

        if (this.saveData()) {
            this.showSuccessMessage();
            this.renderTree();
            this.showEmptyPanel();
        }
    }

    showSuccessMessage() {
        const panel = document.getElementById('adminPanel');
        const message = document.createElement('div');
        message.className = 'success-message';
        message.textContent = 'Saved successfully!';
        panel.insertBefore(message, panel.firstChild);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    fileToBase64(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
        });
    }

    findSupplier(supplierId) {
        return this.data.suppliers.find(s => s.id === supplierId);
    }

    findCompany(supplierId, companyId) {
        const supplier = this.findSupplier(supplierId);
        if (!supplier || !supplier.companies) return null;
        return supplier.companies.find(c => c.id === companyId);
    }

    findProduct(supplierId, companyId, productId) {
        const company = this.findCompany(supplierId, companyId);
        if (!company || !company.products) return null;
        return company.products.find(p => p.id === productId);
    }

    deleteSupplier(supplierId) {
        if (confirm('Are you sure you want to delete this supplier and all its companies and products?')) {
            this.data.suppliers = this.data.suppliers.filter(s => s.id !== supplierId);
            this.saveData();
            this.renderTree();
            this.showEmptyPanel();
        }
    }

    deleteCompany(supplierId, companyId) {
        if (confirm('Are you sure you want to delete this company and all its products?')) {
            const supplier = this.findSupplier(supplierId);
            if (supplier && supplier.companies) {
                supplier.companies = supplier.companies.filter(c => c.id !== companyId);
                this.saveData();
                this.renderTree();
                this.showEmptyPanel();
            }
        }
    }

    deleteProduct(supplierId, companyId, productId) {
        if (confirm('Are you sure you want to delete this product?')) {
            const company = this.findCompany(supplierId, companyId);
            if (company && company.products) {
                company.products = company.products.filter(p => p.id !== productId);
                this.saveData();
                this.renderTree();
                this.showEmptyPanel();
            }
        }
    }

    cancelForm() {
        this.showEmptyPanel();
    }
}

// Global functions
let adminApp;

function verifyPassword() {
    const password = document.getElementById('passwordInput').value;
    const errorMsg = document.getElementById('errorMessage');
    
    if (password === 'storage2024') {
        adminApp.showAdminInterface();
    } else {
        errorMsg.textContent = 'Access Denied';
        document.getElementById('passwordInput').value = '';
    }
}

function showAddSupplierForm() {
    adminApp.showAddSupplierForm();
}

function editSupplier(supplierId) {
    adminApp.showEditSupplierForm(supplierId);
}

function editCompany(supplierId, companyId) {
    adminApp.showEditCompanyForm(supplierId, companyId);
}

function editProduct(supplierId, companyId, productId) {
    adminApp.showEditProductForm(supplierId, companyId, productId);
}

function saveForm(event) {
    adminApp.saveForm(event);
}

function cancelForm() {
    adminApp.cancelForm();
}

function deleteSupplier(supplierId) {
    adminApp.deleteSupplier(supplierId);
}

function deleteCompany(supplierId, companyId) {
    adminApp.deleteCompany(supplierId, companyId);
}

function deleteProduct(supplierId, companyId, productId) {
    adminApp.deleteProduct(supplierId, companyId, productId);
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    adminApp = new AdminApp();
    
    // Allow Enter key for password
    document.getElementById('passwordInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            verifyPassword();
        }
    });
});