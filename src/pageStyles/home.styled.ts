import { Button as MuiButton, Typography, styled } from '@mui/material';

export const SurroundingBox = styled('div')({
  '--all': '0px',
  '--top-left': '30px',
  '--bottom-right': '30px',
  backgroundColor: '#00457d',
  maxWidth: '600px',
  padding: '10px',
  position: 'absolute',
  bottom: '25px',
  right: '50px',
  WebkitMask: `
    linear-gradient(45deg, transparent 0 var(--bottom-left, var(--all)), #fff 0) bottom left,
    linear-gradient(-45deg, transparent 0 var(--bottom-right, var(--all)), #fff 0) bottom right,
    linear-gradient(135deg, transparent 0 var(--top-left, var(--all)), #fff 0) top left,
    linear-gradient(-135deg, transparent 0 var(--top-right, var(--all)), #fff 0) top right
  `,
  WebkitMaskSize: '50.5% 50.5%',
  WebkitMaskRepeat: 'no-repeat',
});

export const Info = styled('div')({
  padding: '30px 20px',
});

export const InfoTypography = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  letterSpacing: '0.05rem',
  lineHeight: '1.4rem',
  marginBottom: '15px',
  color: theme.palette.common.white,
}));

export const InfoHeader = styled(InfoTypography)({
  fontSize: '30px',
});

export const Button = styled(MuiButton)({
  height: '50px',
  width: '175px',
  backgroundColor: 'white',
  border: 'none',
  borderRadius: '1.7rem',
  color: '#00457d',
  textAlign: 'center',
  fontSize: '18px',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#00457d',
    color: '#fff',
    border: '3px solid #fff',
  },
});
