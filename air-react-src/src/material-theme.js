
import { createMuiTheme } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import yellow from '@material-ui/core/colors/yellow';

export default createMuiTheme({
    palette: {
        primary: {
            light: lightBlue[300],
            main: lightBlue[500],
            dark: lightBlue[700],
        },
        secondary: {
            light: yellow[300],
            main: yellow[500],
            dark: yellow[700],
        },
    },
    typography: {
        useNextVariants: true,
    },
});

