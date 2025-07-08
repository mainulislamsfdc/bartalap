// js/pwaInstall.js

export function initializePWAInstall() {
    let deferredPrompt;
    let isInstalled = false;

    // Check if app is already installed
    function checkIfInstalled() {
        // Check for standalone mode (PWA installed)
        if (window.matchMedia('(display-mode: standalone)').matches) {
            return true;
        }
        
        // Check for iOS PWA
        if (window.navigator.standalone === true) {
            return true;
        }
        
        // Check for Android PWA
        if (document.referrer.includes('android-app://')) {
            return true;
        }
        
        return false;
    }

    // Wait for DOM to be ready
    function waitForDOM() {
        return new Promise((resolve) => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve);
            } else {
                resolve();
            }
        });
    }

    // Initialize after DOM is ready
    waitForDOM().then(() => {
        // Get the install button from HTML
        const installButton = document.getElementById('installButton');
        if (!installButton) {
            console.error('Install button not found in HTML');
            return;
        }

        console.log('PWA Install: Button found, initializing...');

        // Check if already installed
        isInstalled = checkIfInstalled();
        if (isInstalled) {
            console.log('PWA is already installed');
            installButton.style.display = 'none';
            return;
        }

        // Show install button initially (will be hidden if not installable)
        installButton.style.display = 'none'; // Start hidden, show only when installable

        // Handle the beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('PWA Install: beforeinstallprompt event fired');
            e.preventDefault();
            deferredPrompt = e;
            
            // Show the install button only if not already installed
            if (!isInstalled) {
                installButton.style.display = 'inline-flex';
                console.log('PWA Install: Install button shown');
            }
        });

        // Handle install button click
        installButton.addEventListener('click', async (e) => {
            console.log('PWA Install: Install button clicked');
            e.preventDefault();
            
            if (!deferredPrompt) {
                console.log('PWA Install: No deferred prompt available');
                // Fallback: show manual install instructions
                showManualInstallInstructions();
                return;
            }

            try {
                // Hide the button immediately
                installButton.style.display = 'none';
                
                // Show the install prompt
                console.log('PWA Install: Showing install prompt');
                deferredPrompt.prompt();
                
                // Wait for the user to respond to the prompt
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`PWA Install: User response: ${outcome}`);
                
                if (outcome === 'accepted') {
                    console.log('PWA Install: User accepted the install prompt');
                    isInstalled = true;
                } else {
                    console.log('PWA Install: User dismissed the install prompt');
                    // Show button again if user declined
                    installButton.style.display = 'inline-flex';
                }
                
                deferredPrompt = null;
            } catch (error) {
                console.error('PWA Install: Error during installation:', error);
                // Show button again on error
                installButton.style.display = 'inline-flex';
            }
        });

        // Handle successful installation
        window.addEventListener('appinstalled', (e) => {
            console.log('PWA Install: PWA was installed successfully');
            installButton.style.display = 'none';
            isInstalled = true;
            deferredPrompt = null;
            
            // Show success message
            showInstallSuccess();
        });

        // Check for service worker updates
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                console.log('PWA Install: Service worker updated - reloading page');
                window.location.reload();
            });
        }

        // Debug: Check if PWA is installable after a delay
        setTimeout(() => {
            if (!deferredPrompt && !isInstalled) {
                console.log('PWA Install: App may not be installable. Checking requirements...');
                checkInstallRequirements();
            }
        }, 3000);
    });

    // Show manual install instructions for unsupported browsers
    function showManualInstallInstructions() {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isAndroid = /Android/.test(navigator.userAgent);
        
        let instructions = '';
        
        if (isIOS) {
            instructions = 'To install this app on iOS:\n1. Tap the Share button\n2. Select "Add to Home Screen"\n3. Tap "Add"';
        } else if (isAndroid) {
            instructions = 'To install this app on Android:\n1. Tap the menu (⋮) in your browser\n2. Select "Add to Home screen" or "Install app"\n3. Tap "Add"';
        } else {
            instructions = 'To install this app:\n1. Look for an install icon in your browser\'s address bar\n2. Or check your browser\'s menu for "Install" or "Add to Home Screen"';
        }
        
        alert(instructions);
    }

    // Show install success message
    function showInstallSuccess() {
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            font-size: 14px;
            max-width: 300px;
        `;
        successDiv.textContent = '✅ App installed successfully!';
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            if (successDiv.parentElement) {
                successDiv.remove();
            }
        }, 3000);
    }

    // Debug function to check install requirements
    function checkInstallRequirements() {
        console.log('PWA Install: Checking install requirements...');
        
        // Check if HTTPS
        if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
            console.warn('PWA Install: App must be served over HTTPS');
        }
        
        // Check if service worker is registered
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(registrations => {
                if (registrations.length === 0) {
                    console.warn('PWA Install: No service worker registered');
                } else {
                    console.log('PWA Install: Service worker found');
                }
            });
        }
        
        // Check if manifest exists
        const manifestLink = document.querySelector('link[rel="manifest"]');
        if (!manifestLink) {
            console.warn('PWA Install: No manifest link found');
        } else {
            console.log('PWA Install: Manifest link found:', manifestLink.href);
            
            // Try to fetch manifest
            fetch(manifestLink.href)
                .then(response => {
                    if (!response.ok) {
                        console.warn('PWA Install: Manifest not accessible');
                    } else {
                        console.log('PWA Install: Manifest accessible');
                        return response.json();
                    }
                })
                .then(manifest => {
                    if (manifest) {
                        console.log('PWA Install: Manifest loaded:', manifest);
                        
                        // Check required fields
                        const requiredFields = ['name', 'short_name', 'start_url', 'display', 'icons'];
                        const missingFields = requiredFields.filter(field => !manifest[field]);
                        
                        if (missingFields.length > 0) {
                            console.warn('PWA Install: Missing manifest fields:', missingFields);
                        } else {
                            console.log('PWA Install: All required manifest fields present');
                        }
                    }
                })
                .catch(error => {
                    console.error('PWA Install: Error loading manifest:', error);
                });
        }
    }
}