import { useMemo, useEffect, FC } from "react";
import { RootStore } from "../RootStore";
import { StoreContext } from "./storeContext";

export function withStore(WrappedComponent: FC): FC {
  return () => {
    const store = useMemo(() => new RootStore(), []);

    useEffect(() => {
      return () => store.dispose();
    }, []);

    return (
      <StoreContext.Provider value={store}>
        <WrappedComponent />
      </StoreContext.Provider>
    );
  };
}
