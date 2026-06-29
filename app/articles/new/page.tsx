"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewArticle() {
    const [title, setTitle] = useState("");
    const [content, setContent] =useState("");
    const router = useRouter();

    async function handleSubmit() {
        const res = await fetch("http:localhost:8080/articles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, content }),
        });

        if (!res.ok) {
            alert("登録に失敗しました");
            return;
        }

        //登録成功　→　一覧ページへ移動
        router.push("/");
    }

    return (
        <main style={{ maxWidth: 720, margin: "0 auto", padding: 24}}>
            <Link href="/" style={{ color: "#0070f3" }}>
                ← 一覧に戻る
            </Link>
            <h1 style={{ fontSize: 28, fontWeight: "bold", margin: "16px 0" }}>
                新規投稿
            </h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <input type="text" placeholder="タイトル" value={title} onChange={(e) => setTitle(e.target.value)}
                        style={{ padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
                />
                <textarea placeholder="本文" value={content} onChange={(e) => setContent(e.target.value)} rows={6}
                          style={{ padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
                />
                <button onClick={handleSubmit}
                        style={{
                            padding: 12,
                            background: "#0070f3",
                            color: "white",
                            border: "none",
                            borderRadius: 4,
                            cursor: "pointer",
                        }}
                >
                    投稿する
                </button>
            </div>
        </main>
    )
}