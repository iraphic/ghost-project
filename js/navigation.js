/**
 * GHOST - Navigation Module
 * Handles sidebar navigation, page routing, and active states
 */

const Navigation = {
    // Current active page
    currentPage: 'customer',

    // Navigation items configuration
    navItems: [
        { id: 'customer', label: 'Customer', icon: 'fa-users', url: 'customer.html' },
        { id: 'overview', label: 'Overview', icon: 'fa-chart-line', url: 'index.html' },
        { id: 'topology', label: 'Topology', icon: 'fa-project-diagram', url: 'topology.html' },
        { id: 'business', label: 'Business', icon: 'fa-briefcase', url: 'business.html' },
        { id: 'orders', label: 'Orders', icon: 'fa-clipboard-list', url: 'orders.html' }
    ],

    /**
     * Initialize navigation
     */
    init() {
        this.detectCurrentPage();
        this.highlightActiveNav();
        this.bindEvents();
    },

    /**
     * Detect current page from URL
     */
    detectCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';

        // Handle empty filename or root path
        const targetFile = filename === '' ? 'index.html' : filename;

        const navItem = this.navItems.find(item => item.url === targetFile);
        if (navItem) {
            this.currentPage = navItem.id;
        } else {
            // Default to overview if no match found
            this.currentPage = 'overview';
        }
    },

    /**
     * Highlight active navigation item
     */
    highlightActiveNav() {
        // Remove active class from all nav items
        document.querySelectorAll('.sidebar-nav-item').forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to current page
        const activeItem = document.querySelector(`[data-nav="${this.currentPage}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
    },

    /**
     * Bind navigation events
     */
    bindEvents() {
        document.querySelectorAll('.sidebar-nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                // Don't prevent default - let the link navigate naturally
                const navId = item.getAttribute('data-nav');
                if (navId) {
                    this.currentPage = navId;
                    this.highlightActiveNav();
                }
            });
        });
    },

    /**
     * Navigate to a page
     * @param {string} pageId - The page identifier
     */
    navigateTo(pageId) {
        const navItem = this.navItems.find(item => item.id === pageId);
        if (navItem && navItem.url) {
            window.location.href = navItem.url;
        }
    },

    /**
     * Get current page info
     * @returns {Object} Current page information
     */
    getCurrentPage() {
        return this.navItems.find(item => item.id === this.currentPage);
    }
};

/**
 * Region Filter Module
 * Handles region filtering across the application
 */
const RegionFilter = {
    // Available regions
    regions: [
        { id: 'all', label: 'All Regions', code: null },
        { id: 'reg1', label: 'Sumatera', code: 'REG 1' },
        { id: 'reg2', label: 'Jawa', code: 'REG 2' },
        { id: 'reg4', label: 'Kalimantan', code: 'REG 4' },
        { id: 'reg5', label: 'Bali', code: 'REG 5' }
    ],

    // Currently selected region
    currentRegion: 'all',

    // Callbacks for filter changes
    callbacks: [],

    /**
     * Initialize region filter
     */
    init() {
        this.bindEvents();
    },

    /**
     * Bind filter button events
     */
    bindEvents() {
        document.querySelectorAll('.region-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const region = btn.getAttribute('data-region');
                this.setRegion(region);
            });
        });
    },

    /**
     * Set active region
     * @param {string} regionId - Region identifier
     */
    setRegion(regionId) {
        this.currentRegion = regionId;
        this.updateUI();
        this.notifyCallbacks();
    },

    /**
     * Update UI to reflect current selection
     */
    updateUI() {
        document.querySelectorAll('.region-btn').forEach(btn => {
            const isActive = btn.getAttribute('data-region') === this.currentRegion;
            btn.classList.toggle('active', isActive);
        });
    },

    /**
     * Register callback for region changes
     * @param {Function} callback - Callback function
     */
    onChange(callback) {
        this.callbacks.push(callback);
    },

    /**
     * Notify all callbacks of region change
     */
    notifyCallbacks() {
        const region = this.regions.find(r => r.id === this.currentRegion);
        this.callbacks.forEach(cb => cb(region));
    },

    /**
     * Get current region
     * @returns {Object} Current region info
     */
    getCurrentRegion() {
        return this.regions.find(r => r.id === this.currentRegion);
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
    RegionFilter.init();
});

// Export for use in other modules
window.Navigation = Navigation;
window.RegionFilter = RegionFilter;
