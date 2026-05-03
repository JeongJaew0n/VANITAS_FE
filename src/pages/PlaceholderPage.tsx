interface PlaceholderPageProps {
  title: string;
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <main className="placeholder">
      <title>MARU.SHOP — {title}</title>
      <meta name="description" content={`${title} 페이지는 준비 중입니다.`} />
      <div className="placeholder-box">
        <h1>{title}</h1>
        <p>COMING SOON — 다음 챕터에서 열립니다.</p>
      </div>
    </main>
  );
}
