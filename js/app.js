/**
 * GHOST - Main Application
 * Application initialization and global functionality
 */

const App = {
    // Chart instances
    charts: {
        latency: null,
        packetLoss: null,
        throughput: null
    },

    /**
     * Initialize application
     */
    init() {
        this.initSummaryCards();
        this.initCharts();
        this.initSegmentTable();
        this.initOrderTable();
        this.bindRegionFilter();
        this.initMapMarkers();

        console.log('GHOST Application initialized');
    },

    /**
     * Initialize summary cards with data
     */
    initSummaryCards() {
        const { summary } = AppData;

        this.updateElement('totalLocations', AppData.formatNumber(summary.totalLocations));
        this.updateElement('totalCustomers', AppData.formatNumber(summary.totalCustomers));
        this.updateElement('totalServices', AppData.formatNumber(summary.totalServices));
    },

    /**
     * Initialize all charts
     */
    initCharts() {
        const latencyCanvas = document.getElementById('latencyChart');
        const packetLossCanvas = document.getElementById('packetLossChart');
        const throughputCanvas = document.getElementById('throughputChart');

        if (latencyCanvas) {
            this.charts.latency = ChartConfig.createLatencyChart(latencyCanvas);
        }

        if (packetLossCanvas) {
            this.charts.packetLoss = ChartConfig.createPacketLossChart(packetLossCanvas);
        }

        if (throughputCanvas) {
            this.charts.throughput = ChartConfig.createThroughputChart(throughputCanvas);
        }
    },

    /**
     * Initialize segmentation table
     */
    initSegmentTable() {
        this.renderSegmentTable(AppData.segmentation);
    },

    /**
     * Render segmentation table
     * @param {Array} data - Segmentation data
     */
    renderSegmentTable(data) {
        const tbody = document.getElementById('segmentTable');
        if (!tbody) return;

        let html = '';

        data.forEach(item => {
            const region = AppData.getRegion(item.region);
            const regClass = item.region.replace('reg', 'reg-');
            const statusClass = item.status === 'active' ? 'emerald' :
                item.status === 'pending' ? 'yellow' : 'blue';
            const statusLabel = item.status === 'active' ? 'Active' :
                item.status === 'pending' ? 'Pending' : 'In Progress';

            html += `
                <tr class="border-b border-gray-800/50 hover:bg-indigo-500/5 transition-all" data-region="${item.region}">
                    <td class="py-4 pl-4">
                        <span class="segment-badge segment-${item.segment}">
                            <i class="fas ${this.getSegmentIcon(item.segment)} mr-2"></i>${this.capitalizeFirst(item.segment)}
                        </span>
                    </td>
                    <td class="py-4 text-gray-300">${item.periode}</td>
                    <td class="py-4"><span class="reg-badge ${regClass}">${region.code}</span></td>
                    <td class="py-4 text-gray-300">${item.witel}</td>
                    <td class="py-4 text-right pr-4 font-bold text-white mono">${item.totalOrder}</td>
                    <td class="py-4 text-center"><span class="text-${statusClass}-400 text-xs">● ${statusLabel}</span></td>
                </tr>
            `;
        });

        tbody.innerHTML = html;

        // Update grand total
        const grandTotal = AppData.calculateGrandTotal(data);
        this.updateElement('grandTotal', grandTotal);
    },

    /**
     * Initialize order table
     */
    initOrderTable() {
        this.renderOrderTable(AppData.orders);
    },

    /**
     * Render order table
     * @param {Array} data - Orders data
     */
    renderOrderTable(data) {
        const tbody = document.getElementById('orderTable');
        if (!tbody) return;

        let html = '';

        data.forEach(order => {
            const region = AppData.getRegion(order.region);
            const regClass = order.region.replace('reg', 'reg-');
            const statusClass = order.status === 'active' ? 'emerald' :
                order.status === 'pending' ? 'yellow' : 'blue';
            const statusLabel = order.status === 'active' ? 'Completed' :
                order.status === 'pending' ? 'Pending' : 'In Progress';

            html += `
                <tr class="border-b border-gray-800/50" data-region="${order.region}">
                    <td class="py-4 pl-4 mono text-indigo-400">${order.id}</td>
                    <td class="py-4">${order.customer}</td>
                    <td class="py-4">${order.serviceType}</td>
                    <td class="py-4"><span class="reg-badge ${regClass}">${region.code}</span></td>
                    <td class="py-4"><span class="px-2 py-1 rounded-full bg-${statusClass}-500/20 text-${statusClass}-400 text-xs">${statusLabel}</span></td>
                    <td class="py-4">
                        <div class="w-24 bg-gray-700 rounded-full h-2">
                            <div class="bg-${statusClass}-500 h-2 rounded-full" style="width: ${order.progress}%"></div>
                        </div>
                    </td>
                </tr>
            `;
        });

        tbody.innerHTML = html;
    },

    /**
     * Bind region filter events
     */
    bindRegionFilter() {
        if (typeof RegionFilter !== 'undefined') {
            RegionFilter.onChange((region) => {
                this.filterByRegion(region.id);
            });
        }
    },

    /**
     * Filter all data by region
     * @param {string} regionId - Region identifier
     */
    filterByRegion(regionId) {
        // Filter segmentation table
        const segData = AppData.getSegmentationByRegion(regionId);
        this.renderSegmentTable(segData);

        // Filter order table
        const orderData = AppData.getOrdersByRegion(regionId);
        this.renderOrderTable(orderData);

        // Filter map markers
        this.filterMapMarkers(regionId);
    },

    /**
     * Initialize map markers
     */
    initMapMarkers() {
        // Markers are already in HTML, this binds click events
        document.querySelectorAll('.city-marker').forEach(marker => {
            marker.addEventListener('click', (e) => {
                const city = marker.getAttribute('data-city');
                this.showLocationDetail(city);
            });
        });
    },

    /**
     * Filter map markers by region
     * @param {string} regionId - Region identifier
     */
    filterMapMarkers(regionId) {
        const locations = AppData.getLocationsByRegion(regionId);
        const locationIds = locations.map(loc => loc.name);

        document.querySelectorAll('.city-marker').forEach(marker => {
            const city = marker.getAttribute('data-city');
            const isVisible = regionId === 'all' || locationIds.includes(city);
            marker.style.display = isVisible ? 'block' : 'none';

            // Also toggle corresponding label
            const label = marker.nextElementSibling;
            if (label && label.classList.contains('city-label')) {
                label.style.display = isVisible ? 'block' : 'none';
            }
        });
    },

    /**
     * Show location detail modal
     * @param {string} cityName - City name
     */
    showLocationDetail(cityName) {
        const location = AppData.locations.find(loc => loc.name === cityName);
        if (!location) return;

        const region = AppData.getRegion(location.region);

        // For now, show alert. Can be replaced with modal
        alert(`Location: ${location.name}\nRegion: ${region.code} (${region.name})\nType: ${location.type.toUpperCase()}`);
    },

    /**
     * Helper: Update element text content
     * @param {string} id - Element ID
     * @param {string} value - New value
     */
    updateElement(id, value) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    },

    /**
     * Helper: Get segment icon
     * @param {string} segment - Segment name
     * @returns {string} Font Awesome icon class
     */
    getSegmentIcon(segment) {
        const icons = {
            enterprise: 'fa-building',
            sme: 'fa-store',
            government: 'fa-landmark'
        };
        return icons[segment] || 'fa-circle';
    },

    /**
     * Helper: Capitalize first letter
     * @param {string} str - String to capitalize
     * @returns {string} Capitalized string
     */
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Export for use in other modules
window.App = App;
