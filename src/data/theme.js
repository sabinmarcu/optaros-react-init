import { createMuiTheme } from '@material-ui/core/styles';
import { orange, purple } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: purple[500],
        },
        secondary: {
            main: orange[500],
        }
    }
});

export default theme;
