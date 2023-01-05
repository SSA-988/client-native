import { StyleSheet, Text, View,Modal,ActivityIndicator } from 'react-native'
import React from 'react'

const Loader = (props) => {
    const {loading, ...attributes} = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={true}
            color="#000000"
            size="large"
            style={styles.activityIndicator}
          />
        </View>
      </View>
    </Modal>
  )
}

export default Loader

const styles = StyleSheet.create({})