import fs from 'fs-extra'
import { consola } from 'consola'

const staticMenuFiles = [
  'src/components/layout/vertical/VerticalMenu.jsx',
  'src/components/layout/horizontal/HorizontalMenu.jsx'
]

const menuDataFiles = ['src/data/navigation/verticalMenuData.jsx', 'src/data/navigation/horizontalMenuData.jsx']

const removeTranslationInNavigation = async path => {
  consola.start('Removing translation in navigation files...')
  let fileContent = await fs.readFile(path, 'utf8')

  fileContent = fileContent.replace(/href={`\/\$\{locale\}\/(.*?)`}/g, (match, p1) => {
    // Check if there's any dynamic segment like `${id || '4987'}` and preserve it as is
    if (p1.includes('${')) {
      // Rebuild the path with preserved dynamic expressions
      return `href={\`/${p1}\`}`
    } else {
      // For static paths, simply remove the `${locale}` part
      return `href='/${p1}'`
    }
  })

  // Replace dictionary references in labels and MenuItem children
  fileContent = fileContent
    .replace(/label=\{dictionary\['navigation'\]\.(\w+)\}/g, "label='$1'")
    .replace(/\{dictionary\['navigation'\]\.(\w+)\}/g, '$1')
    .replace(/\${locale}\//g, '')
    .replace(/const params\s.*/, '')
    .replace(/const {.*=\sparams/, '')
  await fs.writeFile(path, fileContent)
  consola.success('Removed translation in navigation files successfully\n')
}

const removeFromMenuData = async path => {
  consola.start('Removing translation in menu data files...')
  let fileContent = await fs.readFile(path, 'utf8')

  // Transform `label` by directly using the key from the dictionary reference
  fileContent = fileContent.replace(/label: dictionary\['navigation'\]\.(\w+)/g, "label: '$1'")
  await fs.writeFile(path, fileContent)
  consola.success('Removed translation in menu data files successfully\n')
}

export const updateMenuFiles = async () => {
  for (const path of staticMenuFiles) {
    await removeTranslationInNavigation(path)
  }

  for (const path of menuDataFiles) {
    await removeFromMenuData(path)
  }
}
