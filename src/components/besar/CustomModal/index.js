import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../utils';

const CustomModal = ({ visible, onClose }) => {

    const [data, setData] = useState(null); // State untuk menyimpan data dari API

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://192.168.18.38:8080/get-data');
                const json = await response.json();
                setData(json); // Simpan data ke state
            } catch (error) {
                console.error('Error fetching data: ', error);
                setData({ error: 'Failed to load data' });
            }
        };

        fetchData();
    }, []); 

    const handleIncrementPositive = async () => {
        if (data && data.id) {
            try {
                const response = await fetch(`http://127.0.0.1:8080/increment-positive/${data.id}`, {
                    method: 'POST'
                });
                const json = await response.json();
                console.log('Increment response:', json); // Log response or handle it as needed
                onClose(); // Optionally close modal after action
            } catch (error) {
                console.error('Error incrementing positive: ', error);
            } finally {
                onClose(); // Close modal after API call, regardless of result
            }
        } else {
            console.error('No data ID available for incrementing.');
        }
    };

    const handleIncrementNegative = async () => {
        if (data && data.id) {
            try {
                const response = await fetch(`http://127.0.0.1:8080/increment-negatif/${data.id}`, {
                    method: 'POST'
                });
                const json = await response.json();
                console.log('Increment response:', json); // Log response or handle it as needed
                onClose(); // Optionally close modal after action
            } catch (error) {
                console.error('Error incrementing negatif: ', error);
            } finally {
                onClose(); // Close modal after API call, regardless of result
            }
        } else {
            console.error('No data ID available for incrementing.');
        }
    };

    console.log(data)
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Kalimat ini termasuk kalimat positif atau negatif</Text>
                    <Text style={styles.modalText}>{data ? JSON.stringify(data.text) : 'Loading data...'}</Text>
                    <TouchableOpacity onPress={handleIncrementPositive} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Positif</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleIncrementNegative} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Negatif</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 18,
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 10,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default CustomModal;
