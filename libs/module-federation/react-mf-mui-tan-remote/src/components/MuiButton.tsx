import type { FC } from 'react';

import { Button, styled } from '@mui/material';

interface MuiButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'contained' | 'outlined' | 'text';
}

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.tokens.color.Neutrals.Black
}));

export const MuiButton: FC<MuiButtonProps> = ({ 
  children,
  onClick, 
  variant = 'contained' 
}) => (
  <StyledButton 
    onClick={onClick}
    sx={{ margin: 1 }}
    variant={variant}
  >
    {children}
  </StyledButton>
);

export default MuiButton;