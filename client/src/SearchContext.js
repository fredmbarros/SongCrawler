import { createContext, useState, useEffect } from "react";
export const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
	// setting user as a state variable for now - later localSession/Storage
	// usar JSON.parse(window.sessionStorage.getItem("loggedUser")) - ver no Facespace - para definir "user"
	const [userId, setUserId] = useState(true);

	// renderOnHome is used in a switch statement to define what is going to be rendered on Home each time
	const [renderOnHome, setRenderOnHome] = useState("Loading");
	// searchTerm is used by the searchBox to pass around the term it receives
	const [searchTerm, setSearchTerm] = useState("");
	// search categories and the full results array
	const [metaCategory, setMetaCategory] = useState("song");
	const [song, setSong] = useState("");
	const [artist, setArtist] = useState("");
	const [album, setAlbum] = useState("");
	const [rawSearchResults, setRawSearchResults] = useState([]);
	const [isHovering, setIsHovering] = useState(false);
	// variable to define (and render on the text for searchBox) the selected category
	const [category, setCategory] = useState("song");
	let categoryToRender;

	const renderCategory = (categ) => {
		setCategory(categ);
	};

	const handleMouseOver = () => {
		setIsHovering(true);
	};

	const handleMouseOut = () => {
		setIsHovering(false);
	};

	return (
		<SearchContext.Provider
			value={{
				userId,
				setUserId,
				renderOnHome,
				searchTerm,
				setSearchTerm,
				metaCategory,
				setMetaCategory,
				song,
				setSong,
				artist,
				setArtist,
				album,
				setAlbum,
				category,
				setCategory,
				rawSearchResults,
				setRawSearchResults,
				renderCategory,
				categoryToRender,
				isHovering,
				setIsHovering,
				handleMouseOut,
				handleMouseOver,
			}}>
			{children}
		</SearchContext.Provider>
	);
};
