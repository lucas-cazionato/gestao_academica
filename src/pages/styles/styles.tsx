import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 50,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4682B4',
    },
    content: {
        alignItems: 'center',
    },
    contentText: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
    },
    input: {
        borderColor: 'black',
        borderRadius: 8,
        borderWidth: 1,
        fontSize: 18,
        marginBottom: 10,
        marginTop: 10,
        padding: 10,
        textAlign: 'center',
        width: '70%',
    },
    button: {
        backgroundColor: '#4682B4',
        padding: 12,
        borderRadius: 8,
        marginTop: 10,
        width: '70%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    grid: {
        marginTop: 75,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#4682B4',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
      },
    icon: {
        color: 'white',
    },
    iconLabel: {
        marginTop: 5,
        textAlign: 'center',
        color: 'black',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContentContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputModal: {
        borderColor: 'black',
        borderRadius: 8,
        borderWidth: 1,
        fontSize: 16,
        marginBottom: 10,
        marginTop: 10,
        padding: 10,
        textAlign: 'center',
        width: '100%',
    },
    tableContainer: {
        width: '90%',
        marginTop: 50,
    },
    table: {
        borderRadius: 10,
        overflow: 'hidden',
        width: '100%',
    },
    tableBorder: {
        borderWidth: 1,
        borderColor: '#c8e1ff',
        borderRadius: 10,
    },
    tableHead: {
        height: 50,
        backgroundColor: '#4682B4',
    },
    tableHeadText: {
        margin: 6,
        fontWeight: '600',
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
    },
    rowText: {
        margin: 6,
        textAlign: 'center',
        fontSize: 16,
        color:'black',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 70,
        marginLeft: 12,
    },
    picker: {
        height: 50,
        width: '100%',
        fontSize: 24,
    },
});

export default styles;
