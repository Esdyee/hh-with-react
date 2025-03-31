import { alpha, useTheme } from '@mui/material';

export type LabelColor = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

interface ILabelProps {
  htmlFor: string;
  color: LabelColor;
  children: string;
}

const Label = ({ htmlFor, color, children }: ILabelProps) => {
  const theme = useTheme();
  return (
    <label
      className={`text-sm text-primary`}
      style={{
        color: theme.palette[color].main,
        backgroundColor: alpha(theme.palette[color].main, 0.18),
        borderRadius: '5px',
        padding: '5px',
        fontWeight: 'bold',
      }}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};

export default Label;
