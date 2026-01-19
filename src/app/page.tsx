import { LogoutButton } from "@/components/auth/logout-button";
import { getAllPosts, getAllDrafts } from "@/lib/posts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function HomePage() {
  const posts = await getAllPosts();
  const drafts = process.env.NODE_ENV === "development" ? await getAllDrafts() : [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Hello there 👋</h1>
        <LogoutButton />
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.slug}>
            <Link href={`/${post.slug}`}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {post.title}
                  </CardTitle>

                  <CardDescription>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardDescription>
                </CardHeader>

                {post.description && (
                  <CardContent>
                    <p className="text-muted-foreground">{post.description}</p>
                  </CardContent>
                )}
              </Card>
            </Link>
          </div>
        ))}
      </div>

      {drafts.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Drafts</h2>
          <div className="space-y-4">
            {drafts.map((draft) => (
              <Link key={draft.slug} href={`/${draft.slug}`}>
                <Card className="hover:shadow-md transition-shadow opacity-75 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <CardTitle className="hover:underline">
                        {draft.title}
                      </CardTitle>
                      <Badge variant="secondary">Draft</Badge>
                    </div>
                    <CardDescription>
                      {new Date(draft.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </CardDescription>
                  </CardHeader>
                  {draft.description && (
                    <CardContent>
                      <p className="text-muted-foreground">{draft.description}</p>
                    </CardContent>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
