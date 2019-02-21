import { compose, pickBy, prop } from 'ramda';

import * as modules from '../config';


const envSettings = pickBy((v, k) => k !== 'env', modules);

export default envSettings;
