import { GraphQLClient, gql } from "graphql-request"

const client = new GraphQLClient(process.env.HYGRAPH_ENDPOINT!, {
  headers: {
    "Content-Type": "application/json",
  },
})

export interface Author {
  name: string
  title: string | null
  photo: { url: string } | null
}

export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  coverImage: { url: string } | null
  publishedAt: string
  readTime: number | null
  featured: boolean
  author: Author | null
  body: { raw: Record<string, unknown> } | null
}

const POST_FIELDS = gql`
  fragment PostFields on Post {
    id
    title
    slug
    excerpt
    coverImage { url }
    publishedAt
    readTime
    featured
    author {
      name
      title
      photo { url }
    }
  }
`

export async function getAllPosts(): Promise<Post[]> {
  const query = gql`
    ${POST_FIELDS}
    query AllPosts {
      posts(orderBy: publishedAt_DESC) {
        ...PostFields
      }
    }
  `
  const data = await client.request<{ posts: Post[] }>(query)
  return data.posts
}

export async function getFeaturedPost(): Promise<Post | null> {
  const query = gql`
    ${POST_FIELDS}
    query FeaturedPost {
      posts(where: { featured: true }, first: 1, orderBy: publishedAt_DESC) {
        ...PostFields
      }
    }
  `
  const data = await client.request<{ posts: Post[] }>(query)
  return data.posts[0] ?? null
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const query = gql`
    ${POST_FIELDS}
    query PostBySlug($slug: String!) {
      post(where: { slug: $slug }) {
        ...PostFields
        body { raw }
      }
    }
  `
  const data = await client.request<{ post: Post | null }>(query, { slug })
  return data.post
}

export async function getAllPostSlugs(): Promise<string[]> {
  const query = gql`
    query AllSlugs {
      posts { slug }
    }
  `
  const data = await client.request<{ posts: { slug: string }[] }>(query)
  return data.posts.map((p) => p.slug)
}
