import { map, flatten, without } from 'ramda';

export default (features, extractor) => without('undefined', flatten(map(res => extractor(res), features)));
