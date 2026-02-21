# 調布恋AI連合 ポータル

## 開き方（ローカル）

```bash
cd /Users/daccho/code/chofurenairengo
npm install
npm run dev
```

ブラウザで `http://localhost:3000` を開いてください。

## 本番ビルド

```bash
npm run build
npm run start
```

本番起動後は `http://localhost:3000` で確認できます。

## 確認フロー

- トップ: `http://localhost:3000`
- 詳細（renai）: `http://localhost:3000/product/renai`
- 詳細（emotion-readar）: `http://localhost:3000/product/emotion-readar`

## API

- 一覧: `GET /api/products`
- 単体: `GET /api/products/:slug`

レスポンス例（一覧）:

```json
{
  "items": [
    {
      "id": "renai",
      "slug": "renai",
      "name": "renai"
    }
  ],
  "count": 2
}
```

## 主要ファイル

- `app/layout.js`: ルートレイアウト
- `app/globals.css`: 共通スタイル
- `app/page.js`: トップページ
- `app/product/[slug]/page.js`: プロダクト詳細ページ
- `app/api/products/route.js`: プロダクト一覧API
- `app/api/products/[slug]/route.js`: プロダクト単体API
- `lib/products.js`: `products.json` 読み込み
- `data/products.json`: 表示データ
- `public/images/renai-title.jpg`: トップ背景画像
