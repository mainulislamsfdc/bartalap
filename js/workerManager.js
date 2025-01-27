// workerManager.js
class WorkerManager {
    constructor(options = {}) {
        // Initial configuration
        this.minWorkers = options.minWorkers || 2;
        this.maxWorkers = options.maxWorkers || 8;
        this.targetLatency = options.targetLatency || 500; // Target processing time in ms
        
        // Performance tracking
        this.workers = [];
        this.workerMetrics = new Map();
        this.activeWorkers = 0;
        
        // Initialize with minimum workers
        this.initializeWorkers(this.minWorkers);
        
        // Start performance monitoring
        this.startMonitoring();
    }

    initializeWorkers(count) {
        for (let i = 0; i < count; i++) {
            const worker = new Worker('translation.worker.js');
            worker.id = Date.now() + i;  // Unique ID for tracking
            
            // Set up worker metrics tracking
            this.workerMetrics.set(worker.id, {
                tasksCompleted: 0,
                totalProcessingTime: 0,
                averageLatency: 0,
                lastTaskStart: null
            });
            
            // Handle worker messages and track performance
            worker.onmessage = (e) => this.handleWorkerMessage(worker.id, e);
            
            this.workers.push(worker);
        }
        
        console.log(`Initialized ${count} workers`);
    }

    handleWorkerMessage(workerId, event) {
        const metrics = this.workerMetrics.get(workerId);
        const now = Date.now();
        
        // Calculate task processing time
        if (metrics.lastTaskStart) {
            const processingTime = now - metrics.lastTaskStart;
            metrics.totalProcessingTime += processingTime;
            metrics.tasksCompleted++;
            metrics.averageLatency = metrics.totalProcessingTime / metrics.tasksCompleted;
            
            // Adjust workers based on performance
            this.optimizeWorkerCount(metrics.averageLatency);
        }
        
        metrics.lastTaskStart = null;
        this.activeWorkers--;
        
        // Forward the translation result
        if (event.data.success) {
            this.onTranslationComplete(event.data);
        }
    }

    optimizeWorkerCount(currentLatency) {
        // If we're consistently above target latency, add workers
        if (currentLatency > this.targetLatency * 1.2 && 
            this.workers.length < this.maxWorkers) {
            
            console.log(`Latency (${currentLatency}ms) above target (${this.targetLatency}ms), adding worker`);
            this.initializeWorkers(1);
        }
        
        // If we're consistently below target latency, consider removing workers
        else if (currentLatency < this.targetLatency * 0.5 && 
                 this.workers.length > this.minWorkers &&
                 this.activeWorkers < this.workers.length * 0.7) {
            
            console.log(`Latency (${currentLatency}ms) well below target, removing worker`);
            this.removeWorker();
        }
    }

    removeWorker() {
        if (this.workers.length > this.minWorkers) {
            const worker = this.workers.pop();
            this.workerMetrics.delete(worker.id);
            worker.terminate();
        }
    }

    assignTask(text, sourceLang, targetLang) {
        // Find least busy worker
        let selectedWorker = this.workers[0];
        let lowestLatency = Infinity;
        
        for (const worker of this.workers) {
            const metrics = this.workerMetrics.get(worker.id);
            if (metrics.averageLatency < lowestLatency && !metrics.lastTaskStart) {
                lowestLatency = metrics.averageLatency;
                selectedWorker = worker;
            }
        }
        
        // Assign task to selected worker
        const metrics = this.workerMetrics.get(selectedWorker.id);
        metrics.lastTaskStart = Date.now();
        this.activeWorkers++;
        
        selectedWorker.postMessage({
            text,
            sourceLang,
            targetLang,
            apiKey: 'YOUR_API_KEY'
        });
    }

    startMonitoring() {
        // Monitor overall system performance every 10 seconds
        setInterval(() => {
            const totalLatency = Array.from(this.workerMetrics.values())
                .reduce((sum, metrics) => sum + metrics.averageLatency, 0);
            const avgLatency = totalLatency / this.workerMetrics.size;
            
            console.log(`System Status:
                Active Workers: ${this.workers.length}
                Average Latency: ${avgLatency.toFixed(2)}ms
                Target Latency: ${this.targetLatency}ms
                Active Tasks: ${this.activeWorkers}`);
        }, 10000);
    }

    onTranslationComplete(result) {
        // Forward translation results to main application
        window.dispatchEvent(new CustomEvent('translationComplete', {
            detail: result
        }));
    }
}