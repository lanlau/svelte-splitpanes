import * as fs from "fs"
import * as path from "path"


const __dirname = path.resolve();

/* 
create an array of objects (ComponentMeta see 'app.d.ts') representing the file entries from filesystem
(
  ComponentMeta:{
    name:string, =filename
		path:string, =relativepath
		ext:string, =file extension (contains the initial ".")
		code:string = full source code of the file
  }
) 
-dirPath = directory from which we start the exploration eg: '.src/comp/'
-arrayOfFiles = will contains the list of files found
-options:object with 2 possible options: 
    -recursive:boolean = do we want to go deeper in the tree when we found directories
    -validExt:regexp = regexp which allow to match for extensions we want to keep eg: /\.svelte/
*/
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
        const relativePath=dirPath  +file
        const fileExt=path.extname(filePath)
        const fileName=path.basename(filePath).replace(fileExt,'')
        const sourceCode=fs.readFileSync(filePath).toString()
        const component:App.ComponentMeta={
          name:fileName,
          ext:fileExt,
          path:relativePath,
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