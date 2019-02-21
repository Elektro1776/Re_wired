import { map, reduce, flatten, without, union } from 'ramda';

export default (features, extractor) => {
  return without('undefined', flatten(map(res => {
    return extractor(res);
  }, features)))
}
