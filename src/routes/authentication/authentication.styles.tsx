import styled from "styled-components";

export const AuthenticationContainer = styled.div`
  display: flex;
  width: 900px;
  justify-content: space-between;
  margin: 30px auto;
  flex-wrap: wrap;

  @media (max-width: 960px) {
    flex-direction: column;
    gap: 4rem;
    align-items: center;
    width: 500px;
  }
`;
