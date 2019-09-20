import React from 'react'
import {
    Image,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    TextInput,
} from 'react-native'
import { Navigation } from 'react-native-navigation'

import * as StyleConstants from '../../StyleConstants'
import * as NavigationConstants from '../../NavigationConstants'
import AddPlaylistButton from './Buttons/AddPlaylistButton'
import Playlist from '../../lib/Playlist'

const styles = StyleSheet.create({
    Backdrop: {
        backgroundColor: `${StyleConstants.BASE_BACKGROUND_COLOR}B3`,
        opacity: 1.0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Modal: {
        width: '90%',
        height: 250,
        backgroundColor: StyleConstants.BASE_MODAL_BACKGROUND_COLOR,
        borderRadius: StyleConstants.BASE_BORDER_RADIUS,
    },
    Header: {
        fontSize: StyleConstants.MODAL_HEADER_SIZE_iOS,
        color: StyleConstants.BASE_FONT_COLOR,
        fontWeight: StyleConstants.SEMIBOLD_WEIGHT,
        paddingTop: 10,
        textAlign: 'center',
    },
    InputContainer: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 30,
    },
    Input: {
        width: '75%',
        marginBottom: 25,
        color: StyleConstants.BASE_FONT_COLOR,
        fontSize: StyleConstants.CARD_ITEM_DETAIL_SIZE_iOS,
        fontWeight: StyleConstants.SEMIBOLD_WEIGHT,
        borderBottomColor: StyleConstants.INPUT_BORDER_BOTTOM_COLOR,
        borderBottomWidth: 0.5,
    },
})

const AddPlaylistModal = ({ createAction }) => {
    const [playlistNameValue, onChangePlaylistNameText] = React.useState('')
    const [membersNameValue, onChangeMembersNameText] = React.useState('')
    const createPlaylistAction = () => {
        // Create playlist object
        const playlist = new Playlist(playlistNameValue, membersNameValue)

        if (!playlistNameValue) {
        }

        // Run action to create playlist
        createAction(playlist)

        // Dismiss
        Navigation.dismissOverlay(NavigationConstants.ADD_PLAYLIST_MODAL_NAV_ID)
    }

    return (
        // Backdrop view
        <View style={styles.Backdrop}>
            {/* Modal View */}
            <View style={styles.Modal}>
                <Text style={styles.Header}>Let's Get Grüvee</Text>
                <View style={styles.InputContainer}>
                    <TextInput
                        placeholder="Playlist Name"
                        placeholderTextColor={
                            StyleConstants.INPUT_PLACEHOLDER_FONT_COLOR
                        }
                        style={styles.Input}
                        onChangeText={text => onChangePlaylistNameText(text)}
                        value={playlistNameValue}
                    ></TextInput>
                    <TextInput
                        placeholder="Members"
                        placeholderTextColor={
                            StyleConstants.INPUT_PLACEHOLDER_FONT_COLOR
                        }
                        style={styles.Input}
                        onChangeText={text => onChangeMembersNameText(text)}
                        value={membersNameValue}
                    ></TextInput>
                </View>
                <AddPlaylistButton
                    name={playlistNameValue}
                    members={membersNameValue}
                    createAction={createPlaylistAction}
                    disabled={!playlistNameValue}
                ></AddPlaylistButton>
            </View>
        </View>
    )
}

export default AddPlaylistModal
