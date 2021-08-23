export default function elideText (size) {
  return num => {
    const text = num.toString()

    if (text.length < size + 1) {
      return text
    }

    return '9'.repeat(size) + '+'
  }
}
