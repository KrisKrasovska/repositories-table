export interface Repository {
  id: string
  name: string
  url: string
  description: string
  language: string | null
  forksCount: number
  stargazersCount: number
  topics: string[]
  updatedAt: string
  licenseInfo: {
    name: string
  } | null
}
export interface GithubState {
  repositories: Repository[]
  selectedRepository: Repository | null
  loading: boolean
  error: string | null
  startCursor: string | null
  hasPreviousPage: boolean
  endCursor: string | null
  hasNextPage: boolean
  totalCount: number
  totalPages: number
}
