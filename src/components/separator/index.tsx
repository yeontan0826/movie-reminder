import styled, { css } from 'styled-components/native';

interface SeparatorProps {
  space: number;
  horizontal?: boolean;
}

const Separator = (props: SeparatorProps): JSX.Element => {
  return <SeparatorView {...props} />;
};

export default Separator;

const SeparatorView = styled.View<SeparatorProps>`
  ${props =>
    props.horizontal
      ? css`
          width: ${props.space}px;
        `
      : css`
          height: ${props.space}px;
        `}
`;
