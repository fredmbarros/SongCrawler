import styled from "styled-components";

const AddToLists = () => {
	return (
		<Wrapper>
			<button>Save song</button>
			<button>Write a note</button>
			<button>Add to constellation</button>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
`;
export default AddToLists;
