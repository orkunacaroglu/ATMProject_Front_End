import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export default function CreateTheme() {
  const theme = createTheme({       
    typography: {
      fontFamily: [
        'DynaPuff',
      ].join(','),         
      body1: {
        fontFamily: "'DynaPuff'",
        color: 'black',
      },
    },
    components: {
      MuiButton: {
        variants: [
          {
            props: { variant: 'contained' },
            style: {
              textTransform: 'none',
            },
          },              
        ],
      },
    },
    textField: {
      width: '90%',
      marginLeft: 'auto',
      marginRight: 'auto',
      color: 'black',
      paddingBottom: 0,
      marginTop: 0,
      fontWeight: 500
  },
  });

  return responsiveFontSizes(theme);
}