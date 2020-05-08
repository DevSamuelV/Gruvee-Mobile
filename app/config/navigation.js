import * as StyleConstants from '@StyleConstants'

export const STACK_ID = 'navigation.gruvee.stack.id'

export const ROOT_NAV_ID = 'navigation.gruvee.app.id'
export const ROOT_NAV_NAME = 'navigation.gruvee.app'

export const AUTH_NAV_ID = 'navigation.gruvee.auth.id'
export const AUTH_NAV_NAME = 'navigation.gruvee.auth'

export const PLAYLIST_NAV_ID = 'navigation.gruvee.playlist.id'
export const PLAYLIST_NAV_NAME = 'navigation.gruvee.playlist'

export const SONG_LIST_NAV_ID = 'navigation.gruvee.songList.id'
export const SONG_LIST_NAV_NAME = 'navigation.gruvee.songList'

export const COMMENTS_LIST_NAV_ID = 'navigation.gruvee.commentsList.id'
export const COMMENTS_LIST_NAV_NAME = 'navigation.gruvee.commentsList'

export const TOP_BAR_MEMBERS_ACTION_ID = 'navigation.gruvee.showMembersAction.id'
export const TOP_BAR_MEMBERS_ACTION_NAME = 'navigation.gruvee.showMembersAction'

export const SIDEMENU_ALL_MEMBERS_ID = 'navigation.gruvee.sideMenuAllMembers.id'
export const SIDEMENU_ALL_MEMBERS_NAME = 'navigation.gruvee.sideMenuAllMembers'

export const USERNAME_INPUT_VIEW_ID = 'navigation.gruvee.usernameInputView.id'
export const USERNAME_INPUT_VIEW_NAME = 'navigation.gruvee.usernameInputView'

// Navigation objects
export const AUTH_VIEW_ROOT = {
    component: {
        id: AUTH_NAV_ID,
        name: AUTH_NAV_NAME,
        options: {
            topBar: {
                visible: false,
            },
        },
    },
}

export const PLAYLIST_VIEW_ROOT = {
    component: {
        name: PLAYLIST_NAV_NAME,
        options: {
            topBar: {
                visible: true,
                barStyle: 'default',
                // Since this is the root view after auth, hide back button
                // What we should be doing is setting this as the root if signed in
                backButton: {
                    visible: false,
                },
                background: {
                    color: StyleConstants.TOP_BAR_BACKGROUND_COLOR,
                    blur: false,
                },
                title: {
                    text: 'Playlists',
                    fontSize: StyleConstants.TOP_BAR_TEXT_SIZE,
                    color: StyleConstants.TOP_BAR_TEXT_COLOR,
                    // iOS Only
                    fontWeight: 'medium',
                },
            },
        },
    },
}
