import React, { useEffect } from "react";
import { useContext, useState } from "react";

const dataContext = React.createContext();

export const useContextElement = () => {
  return useContext(dataContext);
};

export default function Context({ children }) {
  const [quickViewItem, setQuickViewItem] = useState(null);

  const contextElement = {
    quickViewItem,
    setQuickViewItem,
  };
  return (
    <dataContext.Provider value={contextElement}>
      {children}
    </dataContext.Provider>
  );
}
