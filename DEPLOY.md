# Deploy lên GitHub Pages

App được export tĩnh từ Next.js, chạy tại:

**https://siberbk585-coder.github.io/Bamevacon/**

## Cách 1 — GitHub Actions (khuyến nghị)

1. Vào repo **Settings → Pages**
2. **Source:** chọn **GitHub Actions**
3. Push code lên `main` — workflow tự build và deploy

## Cách 2 — Thư mục `/docs` (deploy thủ công)

1. **Settings → Pages → Source:** Deploy from branch
2. Branch: `main`, folder: **`/docs`**
3. Sau khi sửa code, chạy lại build:

```bash
cd web && npm run build:pages
git add docs index.html && git commit -m "Rebuild static site" && git push
```

## Build local

```bash
cd web
npm install
npm run build:pages   # tạo docs/ + index.html ở root
npx serve docs -l 3000
# Mở http://localhost:3000/Bamevacon/
```
