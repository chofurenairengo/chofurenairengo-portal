import { getProducts } from "@/lib/products";
import ProductList from "@/app/components/ProductList";
import SectionHeading from "@/app/components/SectionHeading";
import HeroSlideshow from "@/app/components/HeroSlideshow";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <header>
        <div className="container nav">
          <div className="logo">調布恋AI連合</div>
          <nav className="menu">
            <a href="#about">調布恋AI連合とは</a>
            <a href="#products">プロダクト紹介</a>
            <a href="#contact">問い合わせ</a>
          </nav>
        </div>
      </header>

      <main className="portal-main">
        <section className="hero">
          <HeroSlideshow />
          <span className="badge">Portal</span>
          <h1>調布恋AI連合の<br />プロダクト</h1>
          <div className="cta">
            <a className="btn primary" href="#products">
              プロダクトを見る
            </a>
          </div>
        </section>

        <section id="about" className="about-section">
          <SectionHeading>調布恋AI連合とは</SectionHeading>
          <p className="about-body">
            調布にある国立大学、電気通信大学の学生を中心としたものづくりチームです。<br />
            コミュニケーションをテーマにしたプロダクト開発に取り組んでおり、ハッカソンや未踏プロジェクトなど、学外のさまざまなイベント・コミュニティ・大会にも積極的に挑戦しています。
          </p>
          <p className="vision-text">
            人との会話に自信を持って、<br />
            誰もが自然に笑って話せる世界を作りたい
          </p>
          <p className="about-body">
            この想いは、女子率が非常に少なく、理系のど真ん中にいる電気通信大学の学生である私たち自身の実感から生まれました。<br />
            だからこそ、同じような悩みを持つ人に寄り添いながら、技術でコミュニケーションのハードルを下げることを目指しています。
          </p>
          <p className="about-body">
            チームメンバーは全員、電気通信大学の在校生です。<br />
            学生という立場だからこそ持てる時間と熱意を最大限に活かし、挑戦を続けています。
          </p>
        </section>

        <section id="products">
          <SectionHeading>プロダクト紹介</SectionHeading>
          <ProductList products={products} />
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
