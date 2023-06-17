import { createContext, useState } from "react";

const LoadersContext = createContext();

const LoadProvider = ({children}) => {
    const [loadBio, setLoadBio] = useState(false);
    const [loadJadwal, setLoadJadwal] = useState(false);
    const [loadKRS, setLoadKRS] = useState(false);

    return(
        <LoadersContext.Provider
            value={{loadBio, setLoadBio, loadJadwal, setLoadJadwal, loadKRS, setLoadKRS}}
        >
            {children}
        </LoadersContext.Provider>
    )
}

export const Loaders = LoadersContext;
export default LoadProvider;