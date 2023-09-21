export default function elideText (size: number) {
  return (num: number): string => {
    const text = num.toString()
    return (text.length <= size) ? text : `${'9'.repeat(size)}+`
  }
}
