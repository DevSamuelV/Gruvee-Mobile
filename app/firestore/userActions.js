// edburtnieks - "Turn off emote only chat" (02/22/20)
// sillyonly - "SOOOO YOU THOUGHT YOU CAN RUN?" (03/02/20)
// ywnklme - "!!! CHECK OUT SVELTE NATIVE TODAY !!!" (03/03/20)
import firestore from '@react-native-firebase/firestore'
import SocialPlatform from 'Gruvee/lib/SocialPlatform'
import User from 'Gruvee/lib/User'
import { FetchChildRefs } from './helpers'

// sillyonly - "SOOOOO I HAVE ENOUGH TO DO THIS!" (02/21/20)
// eslint-disable-next-line import/prefer-default-export
export const CreateNewUserDocument = async newPlatformData => {
    try {
        // Create new User object here
        const newUser = new User(
            `${newPlatformData.platformName}:${newPlatformData.id}`,
            newPlatformData.username,
            newPlatformData
        )

        // Get user socialPlatform document reference
        const userSocialPlatformRef = await firestore()
            .collection('social_platforms')
            .doc(newUser.preferredSocialPlatform.id)

        // Add reference to our SocialPlatformDoc
        const newUserDoc = {
            ...newUser,
            preferredSocialPlatform: userSocialPlatformRef,
            socialPlatforms: [userSocialPlatformRef],
        }

        firestore()
            .collection('users')
            .doc(newUser.id)
            .set(newUserDoc)

        return newUser
    } catch (error) {
        return error
    }
}

export const CreateSocialPlatformDocument = async (platformData, tokenObj) => {
    // Create socialPlatform Object
    const newSocialPlatform = new SocialPlatform(
        'spotify',
        platformData.id,
        platformData.display_name,
        platformData.images.length ? platformData.images[0] : null,
        platformData.email,
        tokenObj.access_token,
        tokenObj.refresh_token,
        true, // TODO: Figure approach to this
        platformData.product === 'premium'
    )

    // Write to DB
    try {
        firestore()
            .collection('social_platforms')
            .doc(newSocialPlatform.id)
            .set(newSocialPlatform)

        return Promise.resolve(newSocialPlatform)
    } catch (error) {
        return Promise.reject(error)
    }
}

// TheTechExec - "You are the semicolon to my statements" (03/03/20)
export const GetUserDocument = async uid => {
    console.log(uid)
    const db = firestore()
    const dbUserSnap = await db
        .collection('users')
        .doc(uid)
        .get()
    const dbUser = dbUserSnap.data()

    console.log(dbUser)

    // Remaiten - "and at this moment he knew he f'd up" (03/03/20)
    const socialPlatforms = await FetchChildRefs(dbUser.socialPlatforms)
    const isPreferredService = socialPlatforms.find(
        platform => platform.isPreferredService === true
    )

    // Get Playlist Data
    const playlistsData = await FetchChildRefs(dbUser.playlists)
    const reducedPlaylists = playlistsData.reduce((state, currentPlaylistData) => {
        return [
            ...state,
            {
                ...currentPlaylistData,
                createdBy: currentPlaylistData.createdBy.id,
                songs: {
                    addedBy: { ...currentPlaylistData.songs.addedBy },
                    allSongs: currentPlaylistData.songs.allSongs.map(songRef => songRef.id),
                },
                members: currentPlaylistData.members.map(memberRef => memberRef.id),
            },
        ]
    }, [])

    const user = {
        ...dbUser,
        playlists: dbUser.playlists.map(playlistRef => playlistRef.id),
        preferredSocialPlatform: isPreferredService,
        socialPlatforms,
    }

    return { user, playlists: reducedPlaylists }
}

export const IsUsernameAvailable = async username => {
    const db = firestore()
    const usersRef = db.collection('users')

    // Check for username
    const querySnapshot = await usersRef.where('username', '==', username).get()

    return !querySnapshot.docs.length
}
