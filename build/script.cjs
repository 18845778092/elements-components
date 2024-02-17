/* eslint-env node */
const path = require('path')
const fs = require('fs')
const appendMarker = '// append-by-script'
const basePath = path.join(__dirname, '..')
const componentsDir = path.join(basePath, 'src', 'components')
const mainFilePath = path.join(basePath, 'src', 'main.ts')
let componentExports = ''
const walkDir = (dir) => {
  const files = fs.readdirSync(dir)
  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const state = fs.statSync(filePath)
    if (state.isDirectory()) {
      walkDir(filePath)
    } else {
      if (state.isFile()) {
        const ext = path.extname(file) // .vue
        const baseName = path.basename(file, ext) // AvatarList

        const importPath = `./components/${path.relative(componentsDir, filePath).replace('/\\/g', '/')}`
        if (ext === '.vue') {
          componentExports += `export { default as ${baseName} } from '${importPath};'\n`
        }
      }
    }
  })
}

walkDir(componentsDir)

let mainFileContent = fs.readFileSync(mainFilePath, 'utf-8')

const markerIndex = mainFileContent.indexOf(appendMarker)
if (markerIndex !== -1) {
  mainFileContent = mainFileContent.substring(0, markerIndex + appendMarker.length)
} else {
  mainFileContent += '\n' + appendMarker
}

mainFileContent += '\n' + componentExports
fs.writeFileSync(mainFilePath, mainFileContent)
