import * as fs from "fs"
import * as path from "path"


const __dirname = path.resolve();

export const getAllFiles = function(dirPath:string, arrayOfFiles:App.ComponentMeta[],options) {
    const files = fs.readdirSync(dirPath)
  
    arrayOfFiles = arrayOfFiles || []
  
    files.forEach(function(file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        if(options.recursive){
          arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles,options)
        }
      } else {
        const filePath=path.join(__dirname, dirPath, "/", file)
        const fileExt=path.extname(filePath)
        const fileName=path.basename(filePath).replace(fileExt,'')
        const sourceCode=fs.readFileSync(filePath).toString()
        const component:App.ComponentMeta={
          name:fileName,
          ext:fileExt,
          path:filePath,
          code:sourceCode
        };
  
        //if options is having a validExt regexp,we check against it
        //if not successful we skip this file
        if(options.validExt && !fileExt.match(options.validExt))return
        
        arrayOfFiles.push(component)
      }
    })
  
    return arrayOfFiles
  }