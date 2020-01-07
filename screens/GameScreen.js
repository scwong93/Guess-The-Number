import React, { useState, useRef, useEffect } from 'react'
import { View, Text, Button, StyleSheet, Alert } from 'react-native'
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const rndNum = Math.floor(Math.random() * (max - min)) + min
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNum
    }
}

const GameScreen = props => {
    const { userChoice, onGameOver } = props
    const [currentGuess, setCurrentGuess] = useState(
        generateRandomBetween(1, 20, userChoice)
    )
    const [rounds, setRounds] = useState(0)
    const currentLow = useRef(1)
    const currentHigh = useRef(20)
    const currentRounds = useRef(0)

    useEffect(() => {
        if (currentGuess === userChoice || currentRounds.current >= 5) {
            setTimeout(() => onGameOver(currentRounds.current), 3000)
        }
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = direction => {
        if (currentRounds.current >= 5 || currentGuess === userChoice) return

        if (
            (direction === 'lower' && currentGuess < userChoice) ||
            (direction === 'greater' && currentGuess > userChoice)
        ) {
            Alert.alert('False Hint!', "Don't mislead your opponent!", [
                { text: 'Sorry!', style: 'cancel' }
            ])
            return
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess
        } else {
            currentLow.current = currentGuess
        }

        const nextNumber = generateRandomBetween(
            currentLow.current,
            currentHigh.current,
            currentGuess
        )
        setCurrentGuess(nextNumber)
        setRounds(curRounds => curRounds + 1)
        currentRounds.current += 1
    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess #{currentRounds.current + 1}</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button
                    title='Lower'
                    onPress={nextGuessHandler.bind(this, 'lower')}
                />
                <Button
                    title='Greater'
                    onPress={nextGuessHandler.bind(this, 'greater')}
                />
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
})

export default GameScreen
