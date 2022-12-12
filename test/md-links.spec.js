const { mdLinks } = require("../mdLinks.js");

const part1 = "./mdtests/part1.md"
const brokenPath = "!mdtests.md"

describe("mdLinks ", () => {

  it("should reject the function", () => {
    mdLinks(brokenPath, []).then().catch((err) =>{
      expect(err).toEqual("INVALID PATH")
    })
  })

  it("should get links", () => {
    mdLinks(part1, []).then((links)=>{
      expect(links.length).not.toBe(0)
    })
  })

  it("should get path + links", () => {
    mdLinks(part1, []).then((links)=>{
      const flatlinks = links.flat()
      expect(flatlinks[0]).not.toBe(null)
    })
  })

  it("Should get status", () => {
    const argumentos = ["--validate"]
    mdLinks(part1, argumentos).then((links)=>{
      expect(links[0].status).toBe(200)
    })
  })

  it("Should get valid URL", () => {
    const argumentos = ["--validate"]
    mdLinks(part1, argumentos).then((links)=>{
      expect(links.validLinks).toBe(1)
    })
  })

  it("Should get number of total links", () => {
    const argumentos = ["--stats"]
    mdLinks(part1, argumentos).then((links)=>{
      expect(links.totalLinks).toBe(1)
    })
  })

  it("Should get number of total links, uniqueLinks valid links and broken links", () => {
    const argumentos = ["--stats", "--validate"]
    mdLinks(part1, argumentos).then((links)=>{
      expect(links.totalLinks).toBe(1)
      expect(links.uniqueLinks).toBe(1)
      expect(links.validLinks).toBe(1)
      expect(links.brokenLinks).toBe(0)
    })
  })

})

/* const argumentos = ["--validate"] */