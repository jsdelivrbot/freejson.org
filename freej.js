var freejson = {
  fetch: typeof window !== 'undefined' ? fetch : require('node-fetch'),
  github: async userid => {
    var arr = userid.split('/')
    var f = await freejson.fetch(`https://rawgit.com/${arr[0]}/${arr[1]}/master/${arr[2]}`)
    return await f.json()
  },
  gist: async userid => {
    var arr = userid.split('/')
    var f = await freejson.fetch(`https://rawgit.com/${arr[0]}/${arr[1]}/raw`)
    try {
     return await f.json()
    } catch (e) {
     return await f.text()
    }
  },
  gsheet: async id => {
    var f = await freejson.fetch(`https://spreadsheets.google.com/feeds/list/${id}/od6/public/basic?alt=json`)
    var j = await f.json()
    return j.feed.entry
  }
}
typeof window !== 'undefined' ? window.freejson = freejson : module.exports = freejson
