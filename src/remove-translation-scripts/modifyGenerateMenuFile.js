import { consola } from 'consola'
import fs from 'fs-extra'

export const modifyGenerateMenuFile = async () => {
  const filePath = 'src/components/GenerateMenu.jsx'
  let content = await fs.readFile(filePath, 'utf8')

  content = content
    .replace(/const href = .*?:.*?\n/gs, '')
    .replace(/href={href}/g, 'href={menuItem.href}')
    .replace(/excludeLang,/g, '')
  await fs.writeFile(filePath, content)
  consola.success('GenerateMenu.jsx file modified\n')
}
