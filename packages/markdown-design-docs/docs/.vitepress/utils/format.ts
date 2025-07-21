export default function getComponentName(path: string) {
  return `vp${path.replace(/\//g, '-')}`
}
