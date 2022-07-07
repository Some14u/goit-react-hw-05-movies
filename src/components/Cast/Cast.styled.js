import styled from "styled-components";

export const ItemWrapper = styled.article`
  display: flex;
`;

export const Details = styled.div`
  padding-left: 1em;
`;

export const Portrait = styled.img`
  width: 100px;
  border-radius: 3px;
  height: min-content;
`;

export const Wrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  gap: 0.5rem;
  list-style: none;
  padding-left: 0;
  & li {
    background-color: white;
    padding: 1em;
    border-radius: 5px;
    box-shadow: 0 5px 7px -5px #0005;
  }
`;

export const Character = styled.div`
  font-size: 0.7em;
  font-style: italic;
  opacity: 0.7;
`

export const Name = styled.p`
  margin-top: 0;
`