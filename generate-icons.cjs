// generate-icons.js
const sharp = require('sharp');
const fs = require('fs');

const svg = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" fill="#2196F3"/>
    <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-size="200" font-family="Arial">B</text>
</svg>`;

// Create images directory if it doesn't exist
if (!fs.existsSync('images')) {
    fs.mkdirSync('images');
}

// Generate 192x192 icon
sharp(Buffer.from(svg))
    .resize(192, 192)
    .png()
    .toFile('images/icon-192x192.png');

// Generate 512x512 icon
sharp(Buffer.from(svg))
    .resize(512, 512)
    .png()
    .toFile('images/icon-512x512.png');