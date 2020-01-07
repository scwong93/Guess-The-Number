import React from 'react'
import { View, Text, StyleSheet, Button, Card } from 'react-native'

const GameOverScreen = props => {
    let gameResults = <Text>You Win!</Text>
    if (props.roundsNum >= 6) {
        gameResults = <Text>You Lose!</Text>
    }

    return (
        <View style={styles.screen}>
            {gameResults}
            <Text>The Game is Over!</Text>
            <Text>You used {props.roundsNum + 1} guesses.</Text>
            <Text>Correct Number was {props.userNumber}.</Text>
            <Button title='New Game' onPress={props.onRestart} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default GameOverScreen
