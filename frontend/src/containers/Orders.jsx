import { useEffect, useReducer } from "react";

// api
import { fetchLineFoods } from "../apis/line_foods";

// reducer
import {
  initialState,
  lineFoodsActionTypes,
  lineFoodsReducer,
} from "../reducers/lineFoods";

export const Orders = () => {
  const [state, dispatch] = useReducer(lineFoodsReducer, initialState);

  useEffect(() => {
    fetchLineFoods()
    .then((data) => {
      dispatch({
        type: lineFoodsActionTypes.FETCH_SUCCESS,
        payload: {
          lineFoodsSummary: data,
        },
      });
    })
    .catch((e) => console.error(e));
  }, []);

  return <>注文画面{state.lineFoodsSummary && state.lineFoodsSummary.count}</>;
};
