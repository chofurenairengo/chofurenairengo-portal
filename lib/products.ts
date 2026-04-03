import { promises as fs } from "fs";
import path from "path";

export interface Product {
  id: string;
  slug: string;
  name: string;
  oneLiner: string;
  description: string;
  targets: string[];
  features: string[];
  link: string;
  github: string;
  image?: string;
}

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_SLUG_LENGTH = 64;

function isValidSlug(slug: unknown): slug is string {
  return (
    typeof slug === "string" &&
    slug.length > 0 &&
    slug.length <= MAX_SLUG_LENGTH &&
    SLUG_PATTERN.test(slug)
  );
}

function isValidProduct(product: unknown): product is Product {
  if (!product || typeof product !== "object") return false;
  const p = product as Record<string, unknown>;
  return (
    typeof p.id === "string" &&
    typeof p.slug === "string" &&
    typeof p.name === "string" &&
    typeof p.oneLiner === "string" &&
    typeof p.description === "string" &&
    Array.isArray(p.targets) &&
    Array.isArray(p.features) &&
    typeof p.link === "string" &&
    typeof p.github === "string"
  );
}

const fallbackProducts: Product[] = [
  {
    id: "renai",
    slug: "renai",
    name: "renai",
    oneLiner: "恋愛文脈に特化した対話・提案支援",
    description:
      "恋愛の悩み相談や会話練習に特化した対話体験を提供し、次の行動を具体化するプロダクトです。",
    targets: ["恋愛相談をしたい個人", "会話練習をしたいユーザー"],
    features: ["会話シミュレーション", "状況別アドバイス", "継続的な振り返り"],
    link: "https://renailove.vercel.app",
    github: "https://github.com/chofurenairengo/renai",
  },
  {
    id: "emotion-readar",
    slug: "emotion-readar",
    name: "emotion-readar",
    oneLiner: "感情傾向を可視化するリーダー",
    description:
      "会話やテキストから感情の変化を読み取り、自己理解や対話改善につなげるプロダクトです。",
    targets: ["感情の変化を記録したい個人", "対話品質を改善したいチーム"],
    features: [
      "感情トレンドの可視化",
      "時系列での比較",
      "状況に応じたインサイト表示",
    ],
    link: "https://zenn.dev/miyabi206/articles/5d73fdba36c75e",
    github: "https://github.com/chofurenairengo/emotion-readar",
  },
  {
    id: "saeboku",
    slug: "saeboku",
    name: "冴えない僕でも彼女が欲しい",
    oneLiner: "コミュ力に自信がない人のための恋愛コーチング",
    description:
      "コミュニケーションが苦手な人でも一歩踏み出せるよう、恋愛シナリオを通じて実践的なコーチングを提供するプロダクトです。",
    targets: ["恋愛に自信がない個人", "コミュニケーションを練習したい人"],
    features: ["シナリオ型コーチング", "段階的なフィードバック", "自信づけのサポート"],
    link: "https://github.com/chofurenairengo/saeboku",
    github: "https://github.com/chofurenairengo/saeboku",
    image: "/images/saegi.png",
  },
];

const productsPath = path.join(process.cwd(), "data", "products.json");

export async function getProducts(): Promise<Product[]> {
  try {
    const json = await fs.readFile(productsPath, "utf8");
    const parsed: unknown = JSON.parse(json);
    if (!Array.isArray(parsed)) {
      return fallbackProducts;
    }

    const validProducts = parsed.filter(isValidProduct);
    return validProducts.length > 0 ? validProducts : fallbackProducts;
  } catch (error: unknown) {
    console.error(
      "[products] Failed to load products.json:",
      error instanceof Error ? error.message : error
    );
    return fallbackProducts;
  }
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  if (!isValidSlug(slug)) {
    return null;
  }
  const products = await getProducts();
  return products.find((product) => product.slug === slug) ?? null;
}
