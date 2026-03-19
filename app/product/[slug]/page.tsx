import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return { title: "プロダクトが見つかりません | 調布恋AI連合" };
  }
  return {
    title: `${product.name} | 調布恋AI連合`,
    description: product.oneLiner,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  return (
    <>
      <header>
        <div className="container nav">
          <div className="logo">調布恋AI連合</div>
          <nav className="menu">
            <Link href="/#products">プロダクト</Link>
            <Link href="/#contact">問い合わせ</Link>
          </nav>
        </div>
      </header>

      <main className="detail-main">
        <div className="detail-top">
          <Link className="back-link" href="/#products">
            ← 一覧へ戻る
          </Link>
          <a
            className="btn"
            href={product.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>

        <h1 className="detail-title">{product.name}</h1>
        <p className="detail-description">{product.oneLiner}</p>
        <p className="detail-description">{product.description}</p>

        <div className="chips">
          {product.targets.map((target) => (
            <span key={target} className="chip">
              {target}
            </span>
          ))}
        </div>

        <section className="detail-grid">
          <article className="card">
            <h2 className="panel-title">主な機能</h2>
            <ul className="list">
              {product.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>

          <article className="card">
            <h2 className="panel-title">リンク</h2>
            <div className="product-actions">
              <a
                className="btn"
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Link
              </a>
              <a
                className="btn primary"
                href={product.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </article>
        </section>
      </main>

      <footer className="container">
        © {new Date().getFullYear()} 調布恋AI連合
      </footer>
    </>
  );
}
