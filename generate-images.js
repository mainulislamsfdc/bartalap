// generate-images.js
import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICON_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <rect width="512" height="512" fill="#2196F3"/>
    <text x="256" y="256" text-anchor="middle" dy=".3em" fill="white" font-size="300" font-family="Arial">B</text>
</svg>`;

const FAVICON_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" fill="#2196F3"/>
    <text x="16" y="16" text-anchor="middle" dy=".3em" fill="white" font-size="20" font-family="Arial">B</text>
</svg>`;

async function generateImages() {
    try {
        // Create images directory if it doesn't exist
        await fs.mkdir('images', { recursive: true });

        // Generate favicon
        await sharp(Buffer.from(FAVICON_SVG))
            .resize(32, 32)
            .toFile('favicon.ico');

        console.log('Generated favicon.ico');

        // Generate PWA icons
        const sizes = [192, 512];
        for (const size of sizes) {
            await sharp(Buffer.from(ICON_SVG))
                .resize(size, size)
                .png()
                .toFile(`images/icon-${size}x${size}.png`);
            console.log(`Generated icon-${size}x${size}.png`);
        }

        console.log('All images generated successfully!');
    } catch (error) {
        console.error('Error generating images:', error);
    }
}

generateImages();