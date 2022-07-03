import styled from "styled-components";


export const Wrapper = styled.ul`
  width: 760px;

  list-style: none;
  padding-left: 0;

  @media (min-width: 1580px) {
    column-count: 2;
    width: calc(760px * 2 + 10px);
    column-gap: 10px;
  }

  & li {
    background-color: white;
    padding: 1em;
    border-radius: 5px;
    box-shadow: 0 5px 7px -5px #0005;
    margin-bottom: 10px;
    break-inside: avoid-column;
    overflow: hidden;
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

export const Timestamp = styled.div`
  text-align: right;
  font-style: italic;
  font-size: 0.8em;

  opacity: 0.5;

  margin-top: 10px;
`

