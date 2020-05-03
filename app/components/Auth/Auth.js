// MrDemonWolf - "A Furry was here" (02/17/20)
// BackeyM - "I don't like furrys" (02/17/20)
// sillyonly - "aaah some said JS or TS would be nice! but you know what! I think if you wrote it in C you would've made perfection!" (02/18/20)
// BackeyM - "pee pee poo poo" (02/18/20)
// dra031cko - "android > ios" (02/19/20)
// sillyonly - "SOOOOOO what happens when silly have 1800?!" (02/19/20)

// Styles
import * as StyleConstants from '@StyleConstants'
import { SetInitialUserData } from 'Gruvee/redux/actions/user/UserActions'
import React, { useEffect } from 'react'
import { Linking, StyleSheet, Text, View, Platform } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

// Redux
import { connect } from 'react-redux'
import { HandleSpotifyDeepLink } from './components/Buttons/actions/SpotifyActions'
import Buttons from './components/Buttons'

const DEEP_LINK_IN_PROGRESS_FLAG = '@Deep_Link_In_Progress'

// no_neon_one - "Btw I Use Arch!" (02/17/20)
const Auth = ({ setInitialUserData }) => {
    useEffect(() => {
        // Deep Link Handler
        if (Platform.OS === 'android') {
            // Android instaniates multiple activites with deep links
            // To combat insane calls to out handler, set a flag here to stop it if it's already working
            AsyncStorage.getItem(DEEP_LINK_IN_PROGRESS_FLAG).then(value => {
                console.log('GOT DEEPLINKFLAG: ', value)
                if (value === null || value === 'false') {
                    // First time running this
                    Linking.getInitialURL().then(url => {
                        if (url !== null) {
                            handleOpenUrl({ url })
                        }
                    })
                }
            })
        } else {
            Linking.addEventListener('url', handleOpenUrl)
        }

        return () => {
            // Do cleanup here
            Linking.removeEventListener('url')
        }
    }, [])

    // Helpers
    const handleOpenUrl = async event => {
        try {
            let newUserObj = {}
            AsyncStorage.setItem('@Deep_Link_In_Progress', 'true')

            // Check to see what platform this is coming from
            if (event.url.includes('spotify_auth')) {
                // Gets API token object
                // HumansNotFish - "Team Yaya. Gotta have faith nerds."(02/21/20)
                newUserObj = await HandleSpotifyDeepLink(event)
            } else if (event.url.includes('apple_auth')) {
                console.log('Starting apple auth deeplink')
            }
            // After auth, we should always set initial user data and sign via firebase
            setInitialUserData(newUserObj.user)

            AsyncStorage.setItem('@Deep_Link_In_Progress', 'false')
        } catch (error) {
            // TODO: Handle Error
            console.warn(error)

            AsyncStorage.setItem('@Deep_Link_In_Progress', 'false')
        }
    }

    return (
        <View style={styles.Container}>
            <Text style={styles.SectionTitle}>Welcome to Grüvee Beta!</Text>
            <View style={styles.TextContainer}>
                <Text style={styles.SectionDetail}>
                    Thanks for taking part in Grüvee Beta for iOS and Android!
                </Text>
                <Text style={styles.SectionDetail}>
                    It's pretty simple, to get started all you need to do is press the "Login With
                    Spotify" button.
                </Text>
                <Text style={styles.SectionDetail}>
                    This will give you all the fanciness Grüvee has to offer. Please reach out on
                    the Discord for any feedback and or questions!
                </Text>
            </View>
            <View style={styles.ButtonContainer}>{Buttons}</View>
        </View>
    )
}

// Styles
const styles = StyleSheet.create({
    ButtonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 'auto',
    },
    Container: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '100%',
        width: '100%',
        paddingTop: 100,
        paddingBottom: 25,
        paddingLeft: 25,
        paddingRight: 25,
        backgroundColor: StyleConstants.BASE_BACKGROUND_COLOR,
    },
    SectionTitle: {
        fontSize: StyleConstants.MEDIUM_TITLE_SIZE_iOS,
        color: StyleConstants.BASE_FONT_COLOR,
    },
    SectionDetail: {
        marginTop: 25,
        fontSize: StyleConstants.HEADLINE_SIZE_iOS,
        fontWeight: StyleConstants.SEMIBOLD_WEIGHT,
        color: StyleConstants.BASE_FONT_COLOR,
    },
    TextContainer: {
        justifyContent: 'center',
    },
})

// Redux Mappers
const mapDispatchToProps = dispatch => ({
    setInitialUserData: (user, jwt) => dispatch(SetInitialUserData(user, jwt)),
})

// sillyonly "110 to Get this! I DEMAND A DISCOUNT SINCE I AM A LOYAL CUSTOMER" (02/17/20)
export default connect(null, mapDispatchToProps)(Auth)
