export default function () {
  const [hash, externalSignature] = window.location.hash
    .substring(2)
    .replace('%23', '#')
    .split('?signature=')
  const [slug, anchor] = hash.split('#')
  return {
    slug,
    anchor,
    externalSignature,
  }
}
