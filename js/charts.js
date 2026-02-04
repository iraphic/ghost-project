/**
 * GHOST - Chart Configurations
 * Chart.js configurations for network metrics
 */

const ChartConfig = {
    // Default chart options
    defaultOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                titleColor: '#e2e8f0',
                bodyColor: '#94a3b8',
                borderColor: 'rgba(99, 102, 241, 0.3)',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 8
            }
        },
        scales: {
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                    drawBorder: false
                },
                ticks: {
                    color: '#64748b',
                    font: {
                        family: "'JetBrains Mono', monospace"
                    }
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#64748b',
                    font: {
                        family: "'JetBrains Mono', monospace"
                    }
                }
            }
        }
    },

    // Color palette for charts
    colors: {
        indigo: {
            line: '#6366f1',
            fill: 'rgba(99, 102, 241, 0.1)',
            gradient: ['rgba(99, 102, 241, 0.3)', 'rgba(99, 102, 241, 0)']
        },
        cyan: {
            line: '#06b6d4',
            fill: 'rgba(6, 182, 212, 0.1)',
            gradient: ['rgba(6, 182, 212, 0.3)', 'rgba(6, 182, 212, 0)']
        },
        red: {
            line: '#ef4444',
            fill: 'rgba(239, 68, 68, 0.2)',
            gradient: ['rgba(239, 68, 68, 0.3)', 'rgba(239, 68, 68, 0)']
        },
        emerald: {
            line: '#10b981',
            fill: 'rgba(16, 185, 129, 0.1)',
            gradient: ['rgba(16, 185, 129, 0.3)', 'rgba(16, 185, 129, 0)']
        },
        purple: {
            line: '#8b5cf6',
            fill: 'rgba(139, 92, 246, 0.1)',
            gradient: ['rgba(139, 92, 246, 0.3)', 'rgba(139, 92, 246, 0)']
        },
        amber: {
            line: '#f59e0b',
            fill: 'rgba(245, 158, 11, 0.1)',
            gradient: ['rgba(245, 158, 11, 0.3)', 'rgba(245, 158, 11, 0)']
        }
    },

    /**
     * Create latency chart
     * @param {HTMLCanvasElement} canvas - Canvas element
     * @param {Array} data - Chart data
     * @returns {Chart} Chart instance
     */
    createLatencyChart(canvas, data = null) {
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, this.colors.indigo.gradient[0]);
        gradient.addColorStop(1, this.colors.indigo.gradient[1]);

        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: data?.labels || ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
                datasets: [{
                    data: data?.values || [24, 26, 28, 32, 26, 24],
                    borderColor: this.colors.indigo.line,
                    backgroundColor: gradient,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: this.colors.indigo.line,
                    pointBorderColor: '#0a0e1a',
                    pointBorderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 6
                }]
            },
            options: {
                ...this.defaultOptions,
                scales: {
                    ...this.defaultOptions.scales,
                    y: {
                        ...this.defaultOptions.scales.y,
                        suggestedMin: 0,
                        suggestedMax: 50
                    }
                }
            }
        });
    },

    /**
     * Create packet loss chart
     * @param {HTMLCanvasElement} canvas - Canvas element
     * @param {Array} data - Chart data
     * @returns {Chart} Chart instance
     */
    createPacketLossChart(canvas, data = null) {
        const ctx = canvas.getContext('2d');

        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data?.labels || ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
                datasets: [{
                    data: data?.values || [0.02, 0.01, 0.03, 0.02, 0.01, 0.02],
                    backgroundColor: this.colors.red.fill,
                    borderColor: this.colors.red.line,
                    borderWidth: 1,
                    borderRadius: 4,
                    hoverBackgroundColor: this.colors.red.line
                }]
            },
            options: {
                ...this.defaultOptions,
                scales: {
                    ...this.defaultOptions.scales,
                    y: {
                        ...this.defaultOptions.scales.y,
                        suggestedMin: 0,
                        suggestedMax: 0.1
                    }
                }
            }
        });
    },

    /**
     * Create throughput chart
     * @param {HTMLCanvasElement} canvas - Canvas element
     * @param {Array} data - Chart data
     * @returns {Chart} Chart instance
     */
    createThroughputChart(canvas, data = null) {
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, this.colors.cyan.gradient[0]);
        gradient.addColorStop(1, this.colors.cyan.gradient[1]);

        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: data?.labels || ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
                datasets: [{
                    data: data?.values || [847, 820, 890, 920, 880, 847],
                    borderColor: this.colors.cyan.line,
                    backgroundColor: gradient,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: this.colors.cyan.line,
                    pointBorderColor: '#0a0e1a',
                    pointBorderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 6
                }]
            },
            options: {
                ...this.defaultOptions,
                scales: {
                    ...this.defaultOptions.scales,
                    y: {
                        ...this.defaultOptions.scales.y,
                        suggestedMin: 500,
                        suggestedMax: 1000
                    }
                }
            }
        });
    },

    /**
     * Create segment pie chart
     * @param {HTMLCanvasElement} canvas - Canvas element
     * @param {Object} data - Segment data
     * @returns {Chart} Chart instance
     */
    createSegmentPieChart(canvas, data = null) {
        const ctx = canvas.getContext('2d');

        return new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data?.labels || ['Enterprise', 'SME', 'Government'],
                datasets: [{
                    data: data?.values || [54, 115, 29],
                    backgroundColor: [
                        this.colors.purple.fill,
                        this.colors.indigo.fill,
                        this.colors.emerald.fill
                    ],
                    borderColor: [
                        this.colors.purple.line,
                        this.colors.indigo.line,
                        this.colors.emerald.line
                    ],
                    borderWidth: 2,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            color: '#94a3b8',
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                },
                cutout: '60%'
            }
        });
    },

    /**
     * Create region bar chart
     * @param {HTMLCanvasElement} canvas - Canvas element
     * @param {Object} data - Region data
     * @returns {Chart} Chart instance
     */
    createRegionBarChart(canvas, data = null) {
        const ctx = canvas.getContext('2d');

        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data?.labels || ['REG 1', 'REG 2', 'REG 4', 'REG 5'],
                datasets: [{
                    data: data?.values || [26, 122, 18, 32],
                    backgroundColor: [
                        'rgba(239, 68, 68, 0.3)',
                        'rgba(59, 130, 246, 0.3)',
                        'rgba(245, 158, 11, 0.3)',
                        'rgba(168, 85, 247, 0.3)'
                    ],
                    borderColor: [
                        '#f87171',
                        '#60a5fa',
                        '#fbbf24',
                        '#c084fc'
                    ],
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                ...this.defaultOptions,
                indexAxis: 'y'
            }
        });
    }
};

// Export for use in other modules
window.ChartConfig = ChartConfig;
