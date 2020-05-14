import React from 'react'
import {
  ButtonGroup,
  IconButton,
  Flex,
  Editable,
  EditableInput,
  EditablePreview,
} from '@chakra-ui/core'

const EditableName = ({ name }) => {
  const EditableControls = ({ isEditing, onSubmit, onCancel, onRequestEdit }) =>
    isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon="check" onClick={onSubmit} />
        <IconButton icon="close" onClick={onCancel} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon="edit" onClick={onRequestEdit} />
      </Flex>
    )

  return (
    <Editable
      textAlign="center"
      paddingBottom="1rem"
      defaultValue={name}
      fontSize="2xl"
      isPreviewFocusable={false}
      submitOnBlur={false}
    >
      {(props) => (
        <>
          <EditablePreview />
          <EditableInput />
          <EditableControls {...props} />
        </>
      )}
    </Editable>
  )
}

export default EditableName
