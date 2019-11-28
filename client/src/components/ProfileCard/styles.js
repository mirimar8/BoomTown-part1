const styles = theme => ({
    card: {
        padding: '60px',
        backgroundColor: '#202020'
    },
    cardContainer: {
        margin: '2rem',
        padding: '2rem',
        backgroundColor: 'white',
        height: '250px',
        borderRadius: '3px'

    },
    userName: {
        height: '80px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'white'
    },
    avatar: {
        width: '50px',
        height: '50px',
        margin: '10px'
    },
    fullname: {
        fontSize: '3rem',
        color: 'grey'
    },
    userInfo: {
        backgroundColor: 'white',
        paddingLeft: '15px'

    },
    userBio: {
        backgroundColor: 'white',
        paddingLeft: '15px',
        fontSize: '1rem',
        paddingTop: '8px'
    }

});
export default styles;