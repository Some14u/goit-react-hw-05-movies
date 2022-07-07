import { ControllerLink } from "helpers/urlApi";
import styled from "styled-components";

export const Wrapper = styled.article`
  display: flex;
  padding-top: 20px;
`;

export const Title = styled.h1`
  margin-top: 0;
`;

export const Details = styled.div`
  padding-left: 20px;
  max-width: 500px;
`;

export const Poster = styled.img`
  display: block;
  width: 240px;
  height: 100%;
`;

export const Link = styled(ControllerLink)`
  &.matchUrl {
    color: red;
  }
`;

export const BackLink = styled(ControllerLink)`
  display: block;
  width: fit-content;
  transform: translateY(10px);
`;