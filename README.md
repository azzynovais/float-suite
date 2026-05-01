The Offline-First Creative Suite

A collection of powerful, privacy-focused productivity tools built entirely with vanilla web technologies. No accounts, no cloud sync, no tracking—just pure performance on your machine.

**📋 v3.0+ Improvements**: [Read IMPROVEMENTS.md](IMPROVEMENTS.md) for security, performance, and accessibility upgrades. | **📁 New Structure**: [STRUCTURE.md](STRUCTURE.md) documents the modular architecture.

## Overview

Float Suite is designed for creators who value speed, privacy, and simplicity. Unlike traditional web apps that rely on heavy backend infrastructure, Float Suite runs entirely in your browser. Your data stays on your device using Local Storage and IndexedDB, ensuring zero latency and total ownership.

Why Float Suite?

    🔒 Privacy First: Zero telemetry, zero analytics, zero user accounts.
    ⚡ Zero Dependencies: Built with vanilla HTML, CSS, and JavaScript. No build steps, no node_modules, no framework lock-in.
    📦 Portable: A lightweight codebase that you can inspect, fork, and customize.

🛠 The Arsenal

The suite currently consists of three specialized tools:
🎨 Paint.web (v4.0)

The "Paint.net of the Web." An advanced raster graphics engine for sketching, photo editing, and digital painting.

    Features:
        Raster Layers & Advanced Blend Modes.
        Auto-Save to prevent data loss.
        JSON Project Backup for portability.
        Integrated "Man Page" documentation.

✒️ Inkling.web (v3.0)

A professional vector graphics editor bringing production-ready SVG editing to the browser.

    Features:
        Precision Bezier Pen Tool & Path Manipulation.
        Layer Z-Index Management.
        Clean SVG Import & Export (no metadata bloat).

📝 Thesis.web (v2.0)

The definitive academic formatting engine. Auto-formats text for strict academic standards instantly.

    Features:
        Supports ABNT, APA, and MLA standards.
        Auto-Citation Generator.
        Print-Ready PDF Engine integration.

💻 Tech Stack & Philosophy

This project adheres to a "Clean Code, Clean UI" philosophy. We deliberately avoid modern framework bloat in favor of web standards.

- Frontend: HTML5, CSS3 (Custom Properties & Grid), ES6+ JavaScript
- Security: HTML sanitization, XSS prevention, input validation
- Accessibility: WCAG 2.1 Level AA, ARIA labels, keyboard navigation
- Performance: Debounce/throttle, lazy loading, IndexedDB caching
- Storage: LocalStorage + IndexedDB (offline-first)

## 🔒 Security First

Float Suite v3.0+ includes:
- ✅ XSS prevention with HTML sanitization
- ✅ URL validation and file type checking
- ✅ Input sanitization and limits
- ✅ Error handling without info leaks
- ✅ Privacy-first (no tracking, no cloud required)

See [IMPROVEMENTS.md](IMPROVEMENTS.md) for security audit details.

## ♿ Accessibility

Full WCAG 2.1 Level AA support:
- ✅ Screen reader compatible
- ✅ Keyboard navigation
- ✅ High contrast mode
- ✅ Reduced motion support
- ✅ Focus indicators

## 📦 Project Structure

```
Float Suite/
├── src/shared/          # Shared modules (security, storage, UI)
├── src/paint/           # Paint.web (refactored)
├── src/inkling/         # Inkling.web
├── src/thesis/          # Thesis.web
├── styles/              # Global styles
└── IMPROVEMENTS.md      # Detailed changelog
```

See [STRUCTURE.md](STRUCTURE.md) for full architecture.

## 🚀 Quick Start

### Using Improved Versions
```html
<!-- Include shared modules -->
<script src="src/shared/config.js"></script>
<script src="src/shared/security.js"></script>
<script src="src/shared/storage.js"></script>
<script src="src/shared/ui.js"></script>
<script src="src/shared/utils.js"></script>

<!-- Your app -->
<script src="src/your-app/app.js"></script>
```

### Example: Secure HTML insertion
```javascript
// Safe - prevents XSS
Security.setInnerHTML(element, userInput);

// Validation
if (!Security.isValidURL(url)) {
  UI.error('Invalid URL');
}

// Storage
Storage.saveLocal('theme', 'dark');
```

## 📖 Documentation

- [IMPROVEMENTS.md](IMPROVEMENTS.md) - Security, performance, and accessibility improvements
- [STRUCTURE.md](STRUCTURE.md) - New modular architecture
- [src/shared/](src/shared/) - Utility modules documentation
    Storage: Browser Local Storage & IndexedDB API.
    Styling: A custom "Fluid Dev Mode" theme system with automatic Light/Dark mode detection.
    Architecture: Single Page Application (SPA) structure without the overhead of a virtual DOM.

🏁 Getting Started

No installation is required. You can run Float Suite directly from the file system or any static server.
Option 1: Direct Use

    Clone or download the repository.
    Open index.html in your preferred modern browser (Chrome, Firefox, Edge, Safari).

Option 2: Local Server (Recommended for Development)

If you want to run it with hot-reloading or simulate a real environment:

# Using Python 3python -m http.server 8000# Using Node.js (npx)npx serve



Then navigate to http://localhost:8000 in your browser.
🎨 Customization

The entire design system is controlled via CSS Custom Properties (Variables) in the :root selector within the <style> tag. You can easily re-theme the suite by changing a few lines of code:
css



:root {
    /* Palette - Syntax Highlighting Inspired */
    --c-bg: #f8fafc;
    --c-primary: #8B5CF6;    /* Purple Keyword */
    --c-secondary: #F43F5E;  /* Rose String */
    --c-tertiary: #3B82F6;   /* Blue Function */

    /* Structural - Soft & Fluid */
    --radius-md: 12px;
    --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}



🗺 Roadmap

     Cloud Sync (Optional): Encrypted backup to a user-provided S3 bucket or Google Drive.
     Plugin API: A standardized interface for community-created tools.
     PWA Support: Full installable Progressive Web App capabilities.


🤝 Contributing

We welcome contributions! As a vanilla JS project, it's easy to jump in.

    Fork the Project.
    Create your Feature Branch (git checkout -b feature/AmazingFeature).
    Commit your Changes (git commit -m 'Add some AmazingFeature').
    Push to the Branch (git push origin feature/AmazingFeature).
    Open a Pull Request.

📜 License

Distributed under the MIT License. See LICENSE for more information.
<p align="center">
  Made with ❤️ and ☕ by yours truly, FloatingSkies / Renard Six Organization
</p>
```
