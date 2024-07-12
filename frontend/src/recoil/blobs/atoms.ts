import { atom } from 'recoil'
import type { ListType, SimpleSearcResult } from '../../models/models'
import { BlobAtomKeys } from './recoil-keys'

export const ListTypeState = atom<ListType>({
  key: BlobAtomKeys.ListType,
  default: 'blob',
})

export const ContentState = atom<string>({
  key: BlobAtomKeys.ContentState,
  default: '',
})

export const SearchResultsListState = atom<SimpleSearcResult[]>({
  key: BlobAtomKeys.SearchResultsList,
  default: [],
})

export const PageStateState = atom<number>({
  key: BlobAtomKeys.PageState,
  default: 0,
})
