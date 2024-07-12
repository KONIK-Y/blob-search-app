// Blobのリストを表示するエリアの制御用
export type ListType = 'blob' | 'search'

export interface Filepath {
  container: string
  directory: string
  filename: string
}
export interface SimpleSearcResult {
  chunk: string
  filepath: Filepath
  score: number
}
