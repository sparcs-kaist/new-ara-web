import store from '@/store'

export const fetchWithProgress = async (targets) => {
  store.dispatch('fetch/startProgress')
  const results = await Promise.all(targets)
  store.dispatch('fetch/endProgress')
  return results
}

const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-zA-Z]{2,}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/g
export const modifyURL = (post) => {
  let htmlObject = document.createElement('div')
  htmlObject.innerHTML = post.content

  for(let i of htmlObject.children){
    let a_raw = i.getElementsByTagName("a")
    let raw_text = i.innerText
    let links = [];
    let a_innerText=""

    if(a_raw.length > 0){
      let j = null
      while((j = i.getElementsByTagName("a")).length !== 0){
        j = j[0]
        let href = j.getAttribute("href")
        if(new RegExp(URL_REGEX).test(href)) links.push([href, j.innerHTML, j.innerText])
        let new_node = document.createElement('span')
        new_node.innerHTML = !j.innerHTML ? j.innerHTML : j.innerText
        let b = j.parentNode
        j.parentNode.replaceChild(new_node, j)
      }
    }

    else {
      let regex_url = new RegExp(URL_REGEX)
      while ((a_innerText = regex_url.exec(raw_text)) !== null) {
        links.push([a_innerText[0], "", a_innerText[0]])
      }
    }

    for(let j of links){
      i.innerHTML += `<a href=${j[0]}>${(j[2] ? j[2] : j[0])}</a>`
    }
  }

  htmlObject.innerHTML = `<p style=""><a href=${post.url}>PORTAL NOTICE</a></p><p></p>`+ htmlObject.innerHTML
  return htmlObject.outerHTML
}
