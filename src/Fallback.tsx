import styled from "styled-components";

const StyledFallbackWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  margin: 2rem auto;
`;

interface FallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
};

export const Fallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <StyledFallbackWrapper>
    <h2>Something went wrong...</h2>
    <p>{error.message}</p>
    <button onClick={() => resetErrorBoundary()}>Reload</button>
  </StyledFallbackWrapper>
);
