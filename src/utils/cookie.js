export default function cookie (name) {
  if (!document.cookie || document.cookie === '') {
    return null
  }

  for (const cookieRaw of document.cookie.split(';')) {
    const cookieText = cookieRaw.trim()
    if (!cookieText.startsWith(`${name}=`)) continue

    return decodeURIComponent(cookieText.substring(name.length + 1))
  }

  return null
}
