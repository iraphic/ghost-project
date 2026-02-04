/**
 * GHOST - Data Module
 * Mock data and data handling utilities
 */

const AppData = {
    // Summary statistics
    summary: {
        totalLocations: 1247,
        totalCustomers: 856,
        totalServices: 2841,
        growth: {
            locations: 12,
            customers: 8.5,
            services: 23
        }
    },

    // Region configuration
    regions: {
        'reg1': { code: 'REG 1', name: 'Sumatera', color: '#f87171' },
        'reg2': { code: 'REG 2', name: 'Jawa', color: '#60a5fa' },
        'reg4': { code: 'REG 4', name: 'Kalimantan', color: '#fbbf24' },
        'reg5': { code: 'REG 5', name: 'Bali', color: '#c084fc' }
    },

    // City/Location data
    locations: [
        { id: 'jkt', name: 'Jakarta', region: 'reg2', type: 'hq', position: { left: '52%', top: '68%' } },
        { id: 'mdn', name: 'Medan', region: 'reg1', type: 'branch', position: { left: '25%', top: '20%' } },
        { id: 'plm', name: 'Palembang', region: 'reg1', type: 'branch', position: { left: '30%', top: '50%' } },
        { id: 'bdg', name: 'Bandung', region: 'reg2', type: 'branch', position: { left: '48%', top: '72%' } },
        { id: 'sby', name: 'Surabaya', region: 'reg2', type: 'branch', position: { left: '65%', top: '70%' } },
        { id: 'dps', name: 'Denpasar', region: 'reg5', type: 'branch', position: { left: '75%', top: '78%' } },
        { id: 'bpn', name: 'Balikpapan', region: 'reg4', type: 'branch', position: { left: '70%', top: '40%' } },
        { id: 'mks', name: 'Makassar', region: 'reg4', type: 'branch', position: { left: '80%', top: '60%' } }
    ],

    // Traffic utilization data
    traffic: [
        { id: 'internet', name: 'Internet', sublabel: 'Primary Link', value: 78, icon: 'fa-globe', color: 'blue' },
        { id: 'lte', name: 'LTE Backup', sublabel: 'Secondary', value: 23, icon: 'fa-broadcast-tower', color: 'purple' },
        { id: 'mpls', name: 'MPLS', sublabel: 'Enterprise', value: 45, icon: 'fa-exchange-alt', color: 'emerald' }
    ],

    // Business segmentation data
    segmentation: [
        { segment: 'enterprise', periode: 'Jan 2024', region: 'reg2', witel: 'Jakarta Pusat', totalOrder: 24, status: 'active' },
        { segment: 'enterprise', periode: 'Jan 2024', region: 'reg1', witel: 'Medan', totalOrder: 18, status: 'active' },
        { segment: 'enterprise', periode: 'Feb 2024', region: 'reg4', witel: 'Balikpapan', totalOrder: 12, status: 'pending' },
        { segment: 'sme', periode: 'Jan 2024', region: 'reg2', witel: 'Bandung', totalOrder: 45, status: 'active' },
        { segment: 'sme', periode: 'Jan 2024', region: 'reg5', witel: 'Denpasar', totalOrder: 32, status: 'active' },
        { segment: 'sme', periode: 'Feb 2024', region: 'reg2', witel: 'Surabaya', totalOrder: 38, status: 'active' },
        { segment: 'government', periode: 'Jan 2024', region: 'reg2', witel: 'Jakarta Selatan', totalOrder: 15, status: 'active' },
        { segment: 'government', periode: 'Feb 2024', region: 'reg1', witel: 'Palembang', totalOrder: 8, status: 'in-progress' },
        { segment: 'government', periode: 'Feb 2024', region: 'reg4', witel: 'Samarinda', totalOrder: 6, status: 'in-progress' }
    ],

    // Orders data
    orders: [
        { id: 'ORD-2024-001', customer: 'PT Maju Jaya', serviceType: 'SD-WAN Hybrid', region: 'reg2', status: 'in-progress', progress: 75 },
        { id: 'ORD-2024-002', customer: 'CV Sukses Bersama', serviceType: 'SD-WAN Basic', region: 'reg1', status: 'pending', progress: 25 },
        { id: 'ORD-2024-003', customer: 'PT Digital Nusantara', serviceType: 'SD-WAN Enterprise', region: 'reg2', status: 'active', progress: 100 },
        { id: 'ORD-2024-004', customer: 'Kementerian XYZ', serviceType: 'SD-WAN Government', region: 'reg2', status: 'in-progress', progress: 60 },
        { id: 'ORD-2024-005', customer: 'PT Borneo Mining', serviceType: 'SD-WAN Hybrid', region: 'reg4', status: 'pending', progress: 10 }
    ],

    /**
     * Get locations filtered by region
     * @param {string} regionId - Region identifier
     * @returns {Array} Filtered locations
     */
    getLocationsByRegion(regionId) {
        if (regionId === 'all') return this.locations;
        return this.locations.filter(loc => loc.region === regionId);
    },

    /**
     * Get segmentation data filtered by region
     * @param {string} regionId - Region identifier
     * @returns {Array} Filtered segmentation data
     */
    getSegmentationByRegion(regionId) {
        if (regionId === 'all') return this.segmentation;
        return this.segmentation.filter(seg => seg.region === regionId);
    },

    /**
     * Get orders filtered by region
     * @param {string} regionId - Region identifier
     * @returns {Array} Filtered orders
     */
    getOrdersByRegion(regionId) {
        if (regionId === 'all') return this.orders;
        return this.orders.filter(order => order.region === regionId);
    },

    /**
     * Get region info by ID
     * @param {string} regionId - Region identifier
     * @returns {Object} Region info
     */
    getRegion(regionId) {
        return this.regions[regionId];
    },

    /**
     * Calculate grand total of segmentation
     * @param {Array} data - Segmentation data
     * @returns {number} Total orders
     */
    calculateGrandTotal(data = null) {
        const segData = data || this.segmentation;
        return segData.reduce((sum, item) => sum + item.totalOrder, 0);
    },

    /**
     * Get summary by segment
     * @returns {Object} Summary grouped by segment
     */
    getSegmentSummary() {
        const summary = {
            enterprise: 0,
            sme: 0,
            government: 0
        };

        this.segmentation.forEach(item => {
            summary[item.segment] += item.totalOrder;
        });

        return summary;
    },

    /**
     * Get summary by region
     * @returns {Object} Summary grouped by region
     */
    getRegionSummary() {
        const summary = {};

        Object.keys(this.regions).forEach(key => {
            summary[key] = 0;
        });

        this.segmentation.forEach(item => {
            summary[item.region] += item.totalOrder;
        });

        return summary;
    },

    /**
     * Format number with commas
     * @param {number} num - Number to format
     * @returns {string} Formatted number
     */
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
};

// Export for use in other modules
window.AppData = AppData;
