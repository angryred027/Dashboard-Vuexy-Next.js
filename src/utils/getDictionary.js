// Third-party Imports
import 'server-only'

const dictionaries = {
  en: () => import('@/data/dictionaries/en.json').then(module => module.default),
}

export const getDictionary = async locale => dictionaries[locale]()
