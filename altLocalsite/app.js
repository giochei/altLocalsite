// Storage Catalog - Customer Page Logic

// Sample data structure
const sampleData = {
    "suppliers": [
        {
            "id": "supplier-1",
            "name": "Industrial Storage Solutions",
            "logo": "resources/supplier1.png",
            "companies": [
                {
                    "id": "company-1",
                    "name": "Metro Storage Co",
                    "logo": "resources/company1.png",
                    "products": [
                        {
                            "id": "product-1",
                            "name": "Heavy-Duty Steel Shelving",
                            "description": "Industrial-grade steel shelving unit with 5 adjustable tiers. Supports up to 500kg per shelf.",
                            "metric": "unit",
                            "price": 299.99,
                            "image": "resources/product1.png"
                        },
                        {
                            "id": "product-2",
                            "name": "Stackable Storage Bins",
                            "description": "Heavy-duty plastic storage bins perfect for warehouse organization. Set of 10 bins.",
                            "metric": "unit",
                            "price": 89.99,
                            "image": "resources/product2.png"
                        }
                    ]
                }
            ]
        },
        {
            "id": "supplier-2",
            "name": "Global Warehouse Network",
            "logo": "resources/supplier2.png",
            "companies": [
                {
                    "id": "company-2",
                    "name": "SecureVault Pro",
                    "logo": "resources/company2.png",
                    "products": [
                        {
                            "id": "product-3",
                            "name": "Industrial Storage Rack",
                            "description": "Heavy-duty industrial storage rack for warehouse use. Powder-coated finish.",
                            "metric": "unit",
                            "price": 449.99,
                            "image": "resources/product1.png"
                        },
                        {
                            "id": "product-4",
                            "name": "Warehouse Storage Containers",
                            "description": "Large capacity storage containers with lids. Set of 6 heavy-duty containers.",
                            "metric": "unit",
                            "price": 159.99,
                            "image": "resources/product2.png"
                        }
                    ]
                }
            ]
        }
    ]
};

// Catalog App
class CatalogApp {
    constructor() {
        this.data = this.loadCatalogData();
        this.init();
    }

    loadCatalogData() {
        try {
            const stored = localStorage.getItem('storageCatalogData');
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (e) {
            console.warn('Failed to load catalog data from localStorage');
        }
        
        // Return sample data if no stored data
        return sampleData;
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        const container = document.getElementById('catalog-content');
        
        if (!this.data.suppliers || this.data.suppliers.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h2>No Suppliers Found</h2>
                    <p>Add suppliers using the admin interface to get started.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.data.suppliers.map(supplier => this.renderSupplier(supplier)).join('');
    }

    renderSupplier(supplier) {
        return `
            <div class="supplier" data-supplier-id="${supplier.id}">
                <div class="supplier-header">
                    <img class="supplier-logo" src="${supplier.logo}" alt="${supplier.name}" onerror="this.style.backgroundColor='#1a1a1a'">
                    <div class="supplier-name">
                        ${supplier.name}
                        <span class="supplier-arrow">▼</span>
                    </div>
                </div>
                <div class="supplier-content">
                    ${supplier.companies ? supplier.companies.map(company => this.renderCompany(company)).join('') : ''}
                </div>
            </div>
        `;
    }

    renderCompany(company) {
        return `
            <div class="company" data-company-id="${company.id}">
                <div class="company-header">
                    <img class="company-logo" src="${company.logo}" alt="${company.name}" onerror="this.style.backgroundColor='#1a1a1a'">
                    <div class="company-name">
                        ${company.name}
                        <span class="company-arrow">▼</span>
                    </div>
                </div>
                <div class="company-content">
                    ${company.products ? company.products.map(product => this.renderProduct(product)).join('') : ''}
                </div>
            </div>
        `;
    }

    renderProduct(product) {
        return `
            <div class="product" data-product-id="${product.id}">
                <img class="product-image" src="${product.image}" alt="${product.name}" onerror="this.style.backgroundColor='#1a1a1a'">
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-description">${product.description}</div>
                    <div class="product-meta">
                        <span class="product-metric">${product.metric}</span>
                        <span class="product-price">$${product.price.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Supplier expand/collapse
        document.addEventListener('click', (e) => {
            const supplierHeader = e.target.closest('.supplier-header');
            if (supplierHeader) {
                const supplier = supplierHeader.closest('.supplier');
                supplier.classList.toggle('expanded');
            }

            // Company expand/collapse
            const companyHeader = e.target.closest('.company-header');
            if (companyHeader) {
                const company = companyHeader.closest('.company');
                company.classList.toggle('expanded');
            }
        });
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CatalogApp();
});