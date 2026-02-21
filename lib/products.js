import { promises as fs } from "fs";
import path from "path";

const fallbackProducts = [
  {
    id: "renai",
    slug: "renai",
    name: "renai",
    oneLiner: "恋愛文脈に特化した対話・提案支援",
    description: "恋愛の悩み相談や会話練習に特化した対話体験を提供し、次の行動を具体化するプロダクトです。",
    targets: ["恋愛相談をしたい個人", "会話練習をしたいユーザー"],
    features: ["会話シミュレーション", "状況別アドバイス", "継続的な振り返り"],
    link: "https://renailove.vercel.app",
    github: "https://github.com/chofurenairengo/renai"
  },
  {
    id: "emotion-readar",
    slug: "emotion-readar",
    name: "emotion-readar",
    oneLiner: "感情傾向を可視化するリーダー",
    description: "会話やテキストから感情の変化を読み取り、自己理解や対話改善につなげるプロダクトです。",
    targets: ["感情の変化を記録したい個人", "対話品質を改善したいチーム"],
    features: ["感情トレンドの可視化", "時系列での比較", "状況に応じたインサイト表示"],
    link: "https://zenn.dev/miyabi206/articles/5d73fdba36c75e",
    github: "https://github.com/chofurenairengo/emotion-readar"
  }
];

const productsPath = path.join(process.cwd(), "data", "products.json");

function isValidProduct(product) {
  return (
    product &&
    typeof product.id === "string" &&
    typeof product.slug === "string" &&
    typeof product.name === "string" &&
    typeof product.oneLiner === "string" &&
    typeof product.description === "string" &&
    Array.isArray(product.targets) &&
    Array.isArray(product.features) &&
    typeof product.link === "string" &&
    typeof product.github === "string"
  );
}

export async function getProducts() {
  try {
    const json = await fs.readFile(productsPath, "utf8");
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) {
      return fallbackProducts;
    }

    const validProducts = parsed.filter(isValidProduct);
    return validProducts.length > 0 ? validProducts : fallbackProducts;
  } catch {
    return fallbackProducts;
  }
}

export async function getProductBySlug(slug) {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) ?? null;
}
