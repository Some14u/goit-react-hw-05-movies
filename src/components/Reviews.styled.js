import styled from "styled-components";


export const Wrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 760px));
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

export const Author = styled.h3`
  margin-top: 0;
`;

export const Text = styled.div`
  column-count: 2;
  column-rule: 1px solid lightblue;
  white-space: break-spaces;
`;