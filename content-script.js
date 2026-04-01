function buildCoverUrl(productId) {
    const p1 = productId.slice(0, 3); // E05
    const p2 = productId.slice(3, 6); // 032
    const p3 = productId.slice(6, 8); // 40
    return `https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/${p1}/${p2}/${p3}/${productId}.jpg&w=170&h=170`;
}

function replaceRestrictedImages() {
    document.querySelectorAll('img.cover').forEach(img => {
        const original = img.getAttribute('data-original');
        if (!original || !original.includes('restricted18_122')) return;

        // 找最近的 <a> 祖先，其 href 含有 /products/{id}
        const anchor = img.closest('a[href*="/products/"]');
        if (!anchor) return;

        const match = anchor.href.match(/\/products\/([A-Z0-9]+)/);
        if (!match) return;

        const productId = match[1];
        img.setAttribute('data-original', buildCoverUrl(productId));
    });
}

replaceRestrictedImages();
