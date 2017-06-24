/**
 * Returns an array of products based on the type requested.
 * @param tag ['lemon','lime','citrus']
 * @param productArray
 */
export default function tagFilter (tag, productArray) {
  let ret = productArray.filter((product) => {
    let isTagMatch = product.tags.split(',').indexOf(type.toLowerCase());
    return isTagMatch >= 0;
  });
  return ret;
}
