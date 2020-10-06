/**
 * Parse URLs from given string
 * {@link https://urlregex.com/ PERFECT_URL_REGEX}
 *
 * @param {string} rawText A string that contains urls
 * @param {boolean} [allowNoProtocol] Whether parse urls not contain protocol (ex. www.google.com) Recommend to use false
 * @param {boolean} [multiple] Whether return all matched urls
 * @returns {array} if multiple is true, return an array of [href, hostname]. if not, return [href, hostname] or null whether the url is valid.
 */

export function urlParser (rawText, allowNoProtocol, multiple) {
  const PERFECT_URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/g

  let urlCandidates = []
  let urlSelected = []
  let match = null

  if (multiple || allowNoProtocol) {
    while ((match = PERFECT_URL_REGEX.exec(rawText)) !== null) urlCandidates.push(match)

    for (let i of urlCandidates) {
      if (allowNoProtocol) urlSelected.push([i[0], (i.length > 3) ? i[0].replace(i[3], '') : i[0]])
      else absoluteURLParse(i[0], urlSelected)
    }
  } else {
    absoluteURLParse(rawText, urlSelected)
  }

  return !multiple ? (urlSelected.length > 0 ? urlSelected[0] : null) : urlSelected
}

function absoluteURLParse (rawText, selected) {
  const ALLOWED_PROTOCOL = ['http:', 'https:']
  try {
    const url = new URL(rawText)
    if (ALLOWED_PROTOCOL.includes(url.protocol)) selected.push([url.href, url.hostname])
  } catch (e) {}
}
