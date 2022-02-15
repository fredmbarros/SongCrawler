import { createContext, useState } from "react";
export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
	const [currentUserSavedSongs, setCurrentUserSavedSongs] = useState([]);

	return (
		<AppContext.Provider
			value={{
				currentUserSavedSongs,
                setCurrentUserSavedSongs
			}}>
			{children}
		</AppContext.Provider>
	);
};
