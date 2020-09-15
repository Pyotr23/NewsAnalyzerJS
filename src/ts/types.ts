export type Article = {
  source: ArticleSource,
  author: string,
  title: string,
  description: string,
  url: string,
  urlToImage: string,
  publishedAt: Date,
  content: string
}

type ArticleSource = {
  id?: string,
  name: string
}

export type DetailedCommit = {
  commit: Commit,
  author: Author,
}

type Commit = {
  committer: Committer,
  message: string
}

type Author = {
  avatar_url: string
}

type Committer = {
  name: string,
  email: string,
  date: Date
}
