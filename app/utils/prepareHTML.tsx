'use client';
import createDOMPurify from 'dompurify';

// Initialize DOMPurify only on client side
let DOMPurify: any = null;

// Server-side compatible HTML preparation
const prepareHTML = (html: string): string => {
    // DOMPurify needs a DOM; never return unsanitized HTML on the server
    if (typeof window === 'undefined') {
        return '';
    }
    
    // Lazy initialize DOMPurify
    if (!DOMPurify) {
        DOMPurify = createDOMPurify(window);
    }
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Update image src attribute to point to the correct Drupal.org URL
    doc.querySelectorAll('img[src]').forEach((img) => {
        const src = img.getAttribute('src');
        if (src && !src.startsWith('http')) {
            img.setAttribute('src', `https://www.drupal.org${src}`);
        }
    });

    doc.querySelectorAll('a[href]').forEach((a) => {
        const href = a.getAttribute('href');
        if (href && !href.startsWith('http')) {
            a.setAttribute('href', `https://www.drupal.org${href}`);
        }
        a.setAttribute('target', '_blank');
        a.setAttribute('class', 'text-blue-600 hover:text-blue-800');
    });

    // Wrap <pre> tags with a div that has a specific class for styling
    doc.querySelectorAll('pre').forEach((pre) => {
        const wrapper = doc.createElement('div');
        wrapper.className = 'mockup-code';
        pre.parentNode?.replaceChild(wrapper, pre);
        wrapper.appendChild(pre);
    });

    // Sanitize last so nothing added above can reintroduce unsafe markup.
    // ADD_ATTR keeps target="_blank", which DOMPurify strips by default.
    return DOMPurify.sanitize(doc.body.innerHTML, {ADD_ATTR: ['target']});
};

export default prepareHTML;