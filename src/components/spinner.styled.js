import styled from "styled-components";
import { LoopingRhombusesSpinner } from 'react-epic-spinners';

export const Wrapper = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function MySpinner() {
  return (<Wrapper><LoopingRhombusesSpinner color="SteelBlue" /></Wrapper>);
}