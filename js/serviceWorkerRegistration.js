// serviceWorkerRegistration.js - Add this to your bundle.js or create separate file
export function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('SW registered: ', registration);
                    
                    // Check for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed') {
                                if (navigator.serviceWorker.controller) {
                                    // New content available
                                    console.log('New content available');
                                    showUpdateAvailable();
                                } else {
                                    // Content cached for offline use
                                    console.log('Content cached for offline use');
                                }
                            }
                        });
                    });
                })
                .catch((registrationError) => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

function showUpdateAvailable() {
    const updateDiv = document.createElement('div');
    updateDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #2196F3;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
    `;
    updateDiv.innerHTML = `
        <div>New version available!</div>
        <div style="font-size: 12px; margin-top: 5px;">Click to update</div>
    `;
    
    updateDiv.onclick = () => {
        window.location.reload();
    };
    
    document.body.appendChild(updateDiv);
    
    setTimeout(() => {
        if (updateDiv.parentElement) {
            updateDiv.remove();
        }
    }, 10000);
}