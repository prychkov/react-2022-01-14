import { FAILURE, REQUEST, SUCCESS } from '../constants';

export default (store) => (next) => async (action) => {
  if (!action.CallAPI) return next(action);
  //console.log('Middlware restaursnts Before REQUEST', `store: ${store}, action: ${action}`);
  const { CallAPI, type, ...rest } = action;
  next({ ...rest, type: type + REQUEST });
  //console.log('After REQUEST', `type: ${type}, store: ${store}, action: ${action}`);
  try {
    //console.log('Middlware restaursnts try');
    const data = await fetch(CallAPI).then((res) => res.json());
    //console.log('Middlware restaursnts Before SUCCESS', `type: ${type}, store: ${store}, action: ${action}`);
    next({ ...rest, type: type + SUCCESS, data });
    //console.log('Middlware restaursnts After SUCCESS', `type: ${type}, store: ${store}, action: ${action}`);
  } catch (error) {
    next({ ...rest, type: type + FAILURE, error });
  }
};
