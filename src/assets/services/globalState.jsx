import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
    loading: false
});

export { useGlobalState, setGlobalState }