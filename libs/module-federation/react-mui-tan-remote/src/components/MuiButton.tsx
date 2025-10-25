import type { FC } from 'react';

import { Button } from '@mui/material';

interface MuiButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'contained' | 'outlined' | 'text';
}

export const MuiButton: FC<MuiButtonProps> = ({ 
  children,
  onClick, 
  variant = 'contained' 
}) => (
  <Button 
    onClick={onClick}
    sx={{ margin: 1 }}
    variant={variant}
  >
    {children}
  </Button>
);

export default MuiButton;