import { getProducts } from "@/lib/products";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <header>
        <div className="container nav">
          <div className="logo">調布恋AI連合</div>
          <nav className="menu">
            <a href="#products">プロダクト</a>
            <a href="#contact">問い合わせ</a>
          </nav>
        </div>
      </header>

      <main className="portal-main">
        <section className="hero">
          <span className="badge">Portal</span>
          <h1>調布恋AI連合の<br />プロダクト</h1>
          <div className="cta">
            <a className="btn primary" href="#products">
              プロダクトを見る
            </a>
          </div>
        </section>

        <section id="products">
          <h2>プロダクト紹介</h2>
          <p className="meta">紹介 / Link / GitHub</p>
          <div className="grid products">
            {products.map((product) => (
              <article key={product.id} className="card">
                <div className="meta">{product.id}</div>
                <h3>{product.name}</h3>
                <p>{product.oneLiner}</p>
                <div className="product-actions">
                  <a className="btn" href={product.link} target="_blank" rel="noopener noreferrer">
                    Link
                  </a>
                  <a className="btn primary" href={product.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="card">
          <h2>問い合わせ</h2>
          <p className="meta">導入相談や連携のご連絡はこちら。</p>
          <a
            className="btn primary"
            href="https://mail.google.com/mail/?view=cm&fs=1&to=dacchotech@gmail.com,masaimasaizu@gmail.com,sorato.jibiki@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            問い合わせる
          </a>
        </section>
      </main>

      <footer className="container">© {new Date().getFullYear()} 調布恋AI連合</footer>
    </>
  );
}
