const fs = require("fs");
const {readdirSync, copyFileSync} = require("fs");
const {join} = require("path");

const destDir = join("build/static");
const srcPath = "src/static";
fs.mkdir(destDir, () => {
    readdirSync(srcPath)
        .filter(f => !f.endsWith(".ts"))
        .forEach(fileName => {
            const filePath = join(srcPath, fileName);
            console.log(`Copy ${ filePath } to ${ destDir }.`);
            copyFileSync(filePath, join(destDir, fileName));
        })
});
