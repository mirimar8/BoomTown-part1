
const styles = theme => ({
    formControl: {
        marginBottom: theme.spacing(2),
        width: '100%'
    },
    formButton: {
        marginTop: theme.spacing(2),
    },
    formToggle: {
        background: 'none',
        border: 'none',
        textDecoration: 'underline',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    shareForm: {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '400px'
        },
        fontWeight: 800,
        fontSize: '22px'

    },
    shareButton: {
        width: '30%',
        height: '7%',
        marginTop: '20px'
    },
    errorMessage: {
        color: 'firebrick'
    },
    heading: {
        paddingBottom: theme.spacing(5),
        paddingLeft: theme.spacing(0),
        marginTop: 0
    }
});

export default styles;
