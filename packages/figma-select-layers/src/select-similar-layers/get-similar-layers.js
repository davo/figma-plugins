import { compareObjects, traverseLayer } from '@create-figma-plugin/utilities'

export function getSimilarLayers (referenceLayer) {
  const result = []
  const type = referenceLayer.type
  if (type === 'SLICE' || type === 'GROUP') {
    traverseLayer(figma.currentPage, function (layer) {
      if (layer.type === type) {
        result.push(layer)
      }
    })
    return result
  }
  traverseLayer(figma.currentPage, function (layer) {
    if (layer.type === 'PAGE') {
      return
    }
    if (
      layer.id !== referenceLayer.id &&
      compareAttributes(referenceLayer, layer) === true
    ) {
      result.push(layer)
    }
  })
  return result
}

const attributes = [
  'blendMode',
  'bottomLeftRadius',
  'bottomRightRadius',
  'dashPattern',
  'effects',
  'effectsStyleId',
  'fills',
  'fillsStyleId',
  'fontName',
  'fontSize',
  'letterSpacing',
  'lineHeight',
  'opacity',
  'paragraphIndent',
  'paragraphSpacing',
  'strokeAlign',
  'strokeCap',
  'strokeJoin',
  'strokes',
  'strokesStyleId',
  'strokeWeight',
  'textAlignHorizontal',
  'textAlignVertical',
  'textCase',
  'textDecoration',
  'textStyleId',
  'topLeftRadius',
  'topRightRadius'
]

export function compareAttributes (a, b) {
  for (const attribute of attributes) {
    if (compareObjects(a[attribute], b[attribute]) === false) {
      return false
    }
  }
  return true
}
