import * as React from 'react';
import styled from '../../themes/styled';
import { Box } from 'rebass/styled-components';

const Wrapper = styled(Box)`
  border-radius: 4px;
  line-height: 26px;
  padding: 8px 16px;
  font-family: ${props => props.theme.fontFamily};
  font-weight: 600;
  font-size: 13px;
`;
const Alert: React.FC<{ variant: string }> = ({ variant, children }) => (
  <Wrapper variant={variant}>{children}</Wrapper>
);

export default Alert;