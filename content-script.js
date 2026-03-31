// 將 img.cover 中被限制的圖片（restricted18_122）替換成真實書籍封面
// 封面 URL 規則：產品 ID 如 E050324080 → /img/E05/032/40/E050324080.jpg
// 產品 ID 來自同一個 <a> 父元素的 href

function buildCoverUrl(productId) {
    const p1 = productId.slice(0, 3); // E05
    const p2 = productId.slice(3, 6); // 032
    const p3 = productId.slice(6, 8); // 40
    return `https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/${p1}/${p2}/${p3}/${productId}.jpg&w=170&h=170`;
}

function replaceRestrictedImages() {
    document.querySelectorAll('img.cover').forEach(img => {
        if (!img.src.includes('restricted18_122')) return;

        // 找最近的 <a> 祖先，其 href 含有 /products/{id}
        const anchor = img.closest('a[href*="/products/"]');
        if (!anchor) return;

        const match = anchor.href.match(/\/products\/([A-Z0-9]+)/);
        if (!match) return;

        const productId = match[1];
        img.src = buildCoverUrl(productId);
    });
}

// 頁面載入時執行一次
replaceRestrictedImages();
