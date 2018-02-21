const browser = typeof window !== 'undefined'
var freejson = {
  fetch: browser ? fetch : require('node-fetch'),
  github: async userid => {
    var arr = userid.split('/')
    var f = await fetch(`https://rawgit.com/${arr[0]}/${arr[1]}/master/${arr[2]}`)
    try {
      return await f.json()
    } catch(e) {
      return await f.text()
    }
  },
  gist: async userid => {
    var arr = userid.split('/')
    var f = await fetch(`https://rawgit.com/${arr[0]}/${arr[1]}/raw`)
    try {
      return await f.json()
    } catch(e) {
      return await f.text()
    }
  },
  gsheet: async id => {
    var f = await fetch(`https://spreadsheets.google.com/feeds/list/${id}/od6/public/basic?alt=json`)
    var j = await f.json()
    return j.feed.entry
  }
}
browser ? window.freejson = freejson : module.exports = freejson
