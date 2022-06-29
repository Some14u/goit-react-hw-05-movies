import styled from "styled-components";
import { ControllerLink } from "helpers/urlApi";

export const Link = styled(ControllerLink)`
  color: black;
  font-size: 1.2em;
  text-decoration: none;
  &:hover,
  &:focus {
    text-decoration: underline;
  }
  &:first-child {
     margin-right: 20px;
  }
  &.matchUrl:last-child,
  &.exactMatchUrl:first-child {
    color: red;
  }
`;