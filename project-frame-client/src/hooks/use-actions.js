import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actions } from "../state";
import { useMemo } from "react";
export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(actions, dispatch);
  }, [dispatch]);
};
