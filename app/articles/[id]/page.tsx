import Link from "next/link";

type Article = {
    id: number;
    title: string;
    content: string;
};

async function getArticle(id: string): Promise<Article> {
    const res = await fetch(`http://localhost:8080/articles/${id}`, {
        cache: "no-store",
    });
    if(!res.ok) {
        throw new Error("記事の取得に失敗しました")
    }
    return res.json();
}

export default async function ArticleDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const article = await getArticle(id);

    return (
        <main style={{ maxWidth: 720, margin: "0 auto", padding: 24}}>
            <Link href="/" style={{ color: "#0070f3" }}>
                ← 一覧に戻る
            </Link>

            <h1 style={{ fontSize: 28, fontWeight: "bold", margin: "16px 0" }}>
                { article.title }
            </h1>
            <p style={{ color: "#333", lineHeight: 1.8 }}>{article.content}</p>
        </main>
    );
}