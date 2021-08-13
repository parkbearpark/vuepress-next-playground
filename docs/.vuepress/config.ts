import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import fs from 'fs'

const dirpath = './docs'
const ignoreDir = ['.vuepress']
const dirs = fs.readdirSync(dirpath).filter(
  f => {
    if (ignoreDir.includes(f)) {
      return false
    }

    const tmp = `${dirpath}/${f}`
    return fs.existsSync(tmp) && fs.statSync(tmp).isDirectory()
  }
)

const dirList = dirs.map(
  dir => {
    return {
      text: dir,
      title: dir,
      children: fs.readdirSync(`${dirpath}/${dir}`).map(
        child => {
          const childName = child.replace('.md', '')
          return {
            text: childName,
            link: `/${dir}/${childName}.html`,
          }
        }
      )
    }
  }
)
const sidebarList = dirList

export default defineUserConfig<DefaultThemeOptions>({
  lang: 'ja',
  title: 'Hello VuePress',
  description: 'Just playing around',
  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
    docsDir: 'docs',
    sidebarDepth: 3,
    sidebar: sidebarList
  }
})
