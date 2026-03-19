import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="detail-main">
      <h1 className="detail-title">ページが見つかりません</h1>
      <p className="detail-description">トップページからもう一度お試しください。</p>
      <div className="cta">
        <Link className="btn primary" href="/">
          トップへ戻る
        </Link>
      </div>
    </main>
  );
}
