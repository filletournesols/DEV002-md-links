const fs = require("fs");
const path = require("path");
const markdownLinkExtractor = require("markdown-link-extractor");

/* ASYNC lee los archivos .md */
const readFileFun = (ruta) => {
    return new Promise((resolve, reject) => {
        fs.readFile(ruta, "utf8", (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

/* obtiene los links desde un archivo .md */
const getLinksFromMdFile = (file) => new Promise((resolve, reject) => {
    readFileFun(file).then((gettingLinks)=>{
        const { links } = markdownLinkExtractor(gettingLinks);
        const filePlusLinks = links.map((link)=>{
            return {file, link}
        })
        resolve(filePlusLinks)
    })
})

/* obtiene los links desde múltiples archivos .md */
const getLinksFromMdFiles = (mdFiles) => new Promise((resolve, reject) => {
    const promises = mdFiles.map((element) => getLinksFromMdFile(element))
    resolve(Promise.all(promises))
})

const isValidURL = links => {
    const linkitos = Array.isArray(links) ? links : [links]
    const promises = linkitos.map(link => {
        return fetch(link.link).then(result => {
                return {link, status: result.status, isValid: true}
        }).catch(err => {
            return { 
                link,
                status: err.status == undefined ? "No status": err.status,
                isValid: false}
        })
    })
    return Promise.all(promises)
}

const getAllFilesRecursive = (ruta, files = []) => {
    const stat = fs.statSync(ruta)
    if (stat.isDirectory()) {
        fs.readdirSync(ruta).map(file => {
            const route = path.join(ruta, file);
            const fileStat = fs.statSync(route)
            if(fileStat.isDirectory()) {
                getAllFilesRecursive(route, files)
            }else {
                const filesExts = path.extname(route)
                if (filesExts === ".md") {
                    files.push(route)
                }
            }
        })
        return files
    } else {
        fileExt = path.extname(ruta)
        if (fileExt === ".md") {
            files.push(ruta)
            return files
        }
    }
}

const validateFlag = (argumentos)=>{
    return argumentos.find((vFlag) => vFlag === "--validate")
}

const statsFlag = (argumentos)=>{
    return argumentos.find((sFlag) => sFlag === "--stats")
}

/* cantidad de links */
const totalLinks = (links) => {
    const totalLinks = links.flat().length
    return totalLinks
}

/* cantidad de links rotos */
const totalBrokenLinks = (links) => {
    return links.filter((link)=> {
        return link.isValid === false
    }).length
}

/* cantidad de links válidos */
const totalValidLinks = (links) => links.filter((link)=> link.isValid).length

const totalUniqueLinks = (links) =>{
    const busqueda = links.reduce((acc, link) => {
        const clave = JSON.stringify(link);
        acc[clave] = ++acc[clave] || 0;
        return acc;
    }, {});
    const duplicados = links.filter( (link) => {
        return busqueda[JSON.stringify(link)];
    });
    const linksNumber = links.length 
    const duplicadosLength = duplicados.length
    const unique = linksNumber - duplicadosLength
    return unique
}

module.exports = { getAllFilesRecursive, getLinksFromMdFiles, isValidURL, validateFlag, statsFlag, totalLinks, totalBrokenLinks, totalValidLinks, totalUniqueLinks, readFileFun, getLinksFromMdFile };