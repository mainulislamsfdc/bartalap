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

    // Get the install button from HTML
    const installButton = document.getElementById('installButton');
    if (!installButton) {
        console.error('Install button not found in HTML');
        return;
    }

    // Check if already installed and don't show button
    isInstalled = checkIfInstalled();
    if (isInstalled) {
        console.log('PWA is already installed');
        installButton.style.display = 'none';
        return;
    }

    // Handle the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
        console.log('beforeinstallprompt event fired');
        e.preventDefault();
        deferredPrompt = e;
        
        // Show the install button only if not already installed
        if (!isInstalled) {
            installButton.style.display = 'inline-flex';
        }
    });

    // Handle install button click
    installButton.addEventListener('click', async (e) => {
        console.log('Install button clicked');
        e.preventDefault();
        
        if (deferredPrompt) {
            installButton.style.display = 'none';
            deferredPrompt.prompt();
            
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response to the install prompt: ${outcome}`);
            
            if (outcome === 'accepted') {
                isInstalled = true;
            } else {
                // Show button again if user declined
                installButton.style.display = 'inline-flex';
            }
            
            deferredPrompt = null;
        }
    });

    // Handle successful installation
    window.addEventListener('appinstalled', (e) => {
        console.log('PWA was installed successfully');
        installButton.style.display = 'none';
        isInstalled = true;
        deferredPrompt = null;
    });

    // Check for service worker updates
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('Service worker updated - reloading page');
            window.location.reload();
        });
    }
}