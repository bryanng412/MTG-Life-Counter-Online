import React, { useContext } from 'react'
import {
  ButtonGroup,
  IconButton,
  Flex,
  Editable,
  EditableInput,
  EditablePreview,
} from '@chakra-ui/core'
import SocketContext from '../context/socket'

const EditableName = ({ name, id, placeholder = '' }) => {
  const socket = useContext(SocketContext)

  const submitHandler = newName =>
    socket.emit('updateName', { id, name: newName })

  return (
    <Editable
      textAlign="center"
      paddingBottom="1rem"
      maxW="70%"
      marginX="15%"
      defaultValue={name}
      fontSize="2xl"
      isPreviewFocusable={false}
      submitOnBlur={false}
      placeholder={placeholder}
      onSubmit={submitHandler}
    >
      {({ isEditing, onSubmit, onCancel, onRequestEdit }) => (
        <>
          <EditablePreview whiteSpace="nowrap" />
          <EditableInput onBlur={null} />
          {isEditing ? (
            <ButtonGroup justifyContent="center" size="sm">
              <IconButton icon="check" onClick={onSubmit} />
              <IconButton icon="close" onClick={onCancel} />
            </ButtonGroup>
          ) : (
            <Flex justifyContent="center">
              <IconButton size="sm" icon="edit" onClick={onRequestEdit} />
            </Flex>
          )}
        </>
      )}
    </Editable>
  )
}

export default EditableName
