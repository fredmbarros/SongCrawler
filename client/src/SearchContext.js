import { createContext, useState, useEffect } from "react";
export const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
	// setting user as a state variable for now - later localSession/Storage
	// usar JSON.parse(window.sessionStorage.getItem("loggedUser")) - ver no Facespace - para definir "user"
	const [user, setUser] = useState(true);

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
	// variable to define (and render on the text for searchBox) the selected category
	const [category, setCategory] = useState("song");
	let categoryToRender;

	const renderCategory = (categ) => {
		setCategory(categ);
	};

	// let termToFetch = localStorage.getItem("searchTerm");

	// const searchGenius = async () => {
	// 	await fetch("https://genius.p.rapidapi.com/search?q=" + termToFetch, {
	// 		method: "GET",
	// 		headers: {
	// 			"x-rapidapi-host": "genius.p.rapidapi.com",
	// 			"x-rapidapi-key": "7ad4910444msh707052b566c420fp105e59jsn784037303d1b",
	// 		},
	// 	})
	// 		.then((response) => {
	// 			return response.json();
	// 		})
	// 		.then((data) => {
	// 			setRawSearchResults(data.response.hits);
	// 		})
	// 		.catch((err) => {
	// 			console.error(err);
	// 		});
	// };

	return (
		<SearchContext.Provider
			value={{
				user,
				setUser,
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
				// termToFetch,
				// searchGenius,
			}}>
			{children}
		</SearchContext.Provider>
	);
};
