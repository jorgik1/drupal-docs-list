import createDOMPurify from 'dompurify';


const DOMPurify = createDOMPurify();

const prepareHTML = (html: string): string => {
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

    return doc.documentElement.innerHTML;
};

export default prepareHTML;
