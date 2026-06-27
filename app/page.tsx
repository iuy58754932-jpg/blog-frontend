import Link from "next/link";

type Article = {
  id: number;
  title: string;
  content: string;
};

async function getArticles(): Promise<Article[]> {
  const res = await fetch("http://localhost:8080/articles", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("記事の取得に失敗しました");
  }
  return res.json();
}

export default async function Home() {
  const articles = await getArticles();

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 24}}>
      <h1 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 24}}>
        記事一覧
      </h1>

      {articles.length === 0 ? (
        <p>記事がまだありません。</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {articles.map((article) => (
            <li key={article.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius:8,
                  padding: 16,
                  marginBottom: 12,
                }}>
              <Link href={`/articles/${article.id}`}>
                <h2 style={{ fontSize: 20, fontWeight: "bold" }}>
                  {article.title}
                </h2>
                <p style={{ color: "#555", marginTop: 8 }}>
                  {article.content}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}