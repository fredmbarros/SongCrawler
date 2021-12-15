import { useState } from "react";
import styled from "styled-components";

const NotesBox = ({ setShowNotesBox }) => {
	const [noteText, setNoteText] = useState("");
	const handleSubmit = () => {
		console.log(noteText);
		setShowNotesBox(false);
	};

	return (
		<Wrapper>
			<TextEntryBox
				rows="4"
				value={noteText}
				onChange={(e) => setNoteText(e.target.value)}
			/>
			<BtnDiv>
				<Button
					type="submit"
					name="SaveNotes"
					value="Save"
					onClick={() => handleSubmit()}>
					Save
				</Button>
				<Button
					type="button"
					name="CancelSaveNotes"
					value="Cancel"
					onClick={() => setShowNotesBox(false)}>
					Cancel
				</Button>
			</BtnDiv>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	filter: drop-shadow(0 0 8px #68696e);
`;
const TextEntryBox = styled.textarea`
	position: relative;
	left: -0.5vw;
	top: -0.5vh;
	margin: 5px;
	padding: 5px;
	background-color: #fffefa;
	width: 300px;
	height: 200px;
	border: solid lightgrey 1px;
	border-radius: 5px;
`;
const BtnDiv = styled.div`
	display: flex;
	position: relative;
	left: 64%;
`;
const Button = styled.button`
	border-radius: 5px;
	color: black;
	border: solid 1px grey;
	background-color: white;
	&:hover {
		bottom: 2px;
	}
`;
export default NotesBox;
