// Component Imports
import LangRedirect from '@components/LangRedirect'

// Config Imports
import { i18n } from '@configs/i18n'

// ℹ️ We've to create this array because next.js makes request with `_next` prefix for static/asset files
const invalidLangs = ['_next']

const TranslationWrapper = props => {
  const doesLangExist = i18n.locales.includes(props.lang)

  // ℹ️ This doesn't mean MISSING, it means INVALID
  const isInvalidLang = invalidLangs.includes(props.lang)

  return doesLangExist || isInvalidLang ? props.children : <LangRedirect />
}

export default TranslationWrapper
