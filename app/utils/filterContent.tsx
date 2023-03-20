
const filterContent = (htmlString: string, searchTerm: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const textNodes = doc.evaluate('//text()', doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    const searchText = searchTerm.toLowerCase();
    const filteredNodes = [];
    for (let i = 0; i < textNodes.snapshotLength; i++) {
        const node = textNodes.snapshotItem(i);
        if (node && node.textContent && node.textContent.toLowerCase().includes(searchText)) {
            filteredNodes.push(node);
        }
    }
    filteredNodes.forEach((node) => {
        const newNode = doc.createElement('mark');
        newNode.textContent = node.textContent;
        if (node.parentNode) {
            node.parentNode.replaceChild(newNode, node);
        }
    });
    return doc.body.innerHTML;
};

export default filterContent;