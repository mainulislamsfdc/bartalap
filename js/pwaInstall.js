// js/pwaInstall.js

export function initializePWAInstall() {
    let deferredPrompt;

    // Create the install button
    const installButton = document.createElement('button');
    installButton.classList.add('action-button', 'install-button');
    installButton.innerHTML = '📱 Install App';
    installButton.style.display = 'none';

    // Add golden text effect using inline styles
    installButton.style.background = 'linear-gradient(to bottom, #ffd700 0%, #b8860b 50%, #daa520 100%)';
    installButton.style.webkitBackgroundClip = 'text';
    installButton.style.backgroundClip = 'text';
    installButton.style.webkitTextFillColor = 'transparent';
    installButton.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';

    // Add the button to the control-buttons section
    function addInstallButton() {
        const controlButtons = document.querySelector('.control-buttons');
        if (controlButtons) {
            // Insert before the export button
            const exportButton = document.querySelector('.export-button');
            if (exportButton) {
                controlButtons.insertBefore(installButton, exportButton);
            } else {
                controlButtons.appendChild(installButton);
            }
        }
    }

    // If DOM is already loaded, add the button immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addInstallButton);
    } else {
        addInstallButton();
    }

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installButton.style.display = 'inline-flex';
        
        installButton.addEventListener('click', async (e) => {
            installButton.style.display = 'none';
            deferredPrompt.prompt();
            
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response to the install prompt: ${outcome}`);
            deferredPrompt = null;
        });
    });

    window.addEventListener('appinstalled', (e) => {
        console.log('PWA was installed');
        installButton.style.display = 'none';
    });
}