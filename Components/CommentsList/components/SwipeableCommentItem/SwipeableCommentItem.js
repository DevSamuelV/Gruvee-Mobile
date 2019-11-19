import React, { useState } from 'react'
import { Alert } from 'react-native'

import AnimatedSwipeRow from 'Gruvee/Components/Common/AnimatedSwipeRow'
import SwipeAction from 'Gruvee/Components/Common/SwipeAction'
import CommentItem from '../CommentItem/CommentItem'
import * as StyleConstants from '@StyleConstants'

// deleteItemById === func
const SwipeableCommentItem = ({ comment, deleteItemById }) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const [itemHeight, setItemHeight] = useState(75)
    const onConfirmDelete = () => setIsDeleting(true)
    const confirmDeleteCommentAction = () =>
        comfirmDeleteAlert(comment, onConfirmDelete)
    const setItemHeightAction = height => {
        setItemHeight(height)
    }

    return (
        <AnimatedSwipeRow
            swipeTriggered={isDeleting}
            swipeActionCallback={() => {
                deleteItemById(comment.id)
            }}
            itemHeight={itemHeight} // TODO: Android vs iOS check
            isRightOpenValue
            swipeActionComponent={renderSwipeActionComponent(
                comment,
                confirmDeleteCommentAction
            )}
            listItemComponent={renderItem(comment, setItemHeightAction)}
        />
    )
}

// Actions
const comfirmDeleteAlert = (comment, onConfirmDelete) => {
    Alert.alert(
        'Delete Comment',
        `Come on, are you sure you want to delete your comment?`,
        [
            {
                text: 'Delete',
                onPress: onConfirmDelete,
                style: 'destructive',
            },
            { text: 'Cancel', style: 'cancel' },
        ],
        { cancelable: true }
    )
}

// Rendered Components
const renderItem = (comment, setItemHeightAction) => (
    <CommentItem comment={comment} setHeightAction={setItemHeightAction} />
)

const renderSwipeActionComponent = (comment, confirmDeleteCommentAction) => {
    // eslint-disable-next-line global-require
    const trashIconAsset = require('Gruvee/Assets/Icons/Trash/trash_icon.png')

    return (
        <SwipeAction
            name="Delete Action Button"
            action={() => {
                confirmDeleteCommentAction(comment)
            }}
            icon={trashIconAsset}
            actionColor={StyleConstants.DELETE_SWIPE_ACTION_BG_COLOR}
            width={19}
            height={25}
        />
    )
}

export default SwipeableCommentItem