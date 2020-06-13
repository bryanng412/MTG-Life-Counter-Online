import React from 'react'
import {
  ButtonGroup,
  IconButton,
  Flex,
  Editable,
  EditableInput,
  EditablePreview,
} from '@chakra-ui/core'
import { writeStorage, useLocalStorage } from '@rehooks/local-storage'

const EditableName = ({
  name,
  placeholder = '',
  editable = true,
  onSubmit,
}) => {
  const [storagePlayer] = useLocalStorage('player')

  const submitHandler = newName => {
    writeStorage('player', { ...storagePlayer, name: newName })
    if (onSubmit) {
      onSubmit(newName)
    }
  }

  return (
    <Editable
      isDisabled={!editable}
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
          {editable && (
            <>
              <EditableInput aria-label="name" onBlur={null} />
              {isEditing ? (
                <ButtonGroup size="sm">
                  <IconButton
                    aria-label="Confirm name"
                    icon="check"
                    onClick={onSubmit}
                  />
                  <IconButton
                    aria-label="Cancel"
                    icon="close"
                    onClick={onCancel}
                  />
                </ButtonGroup>
              ) : (
                <Flex mt="0.25rem" justifyContent="center">
                  <IconButton
                    aria-label="Edit name"
                    size="sm"
                    icon="edit"
                    onClick={onRequestEdit}
                  />
                </Flex>
              )}
            </>
          )}
        </>
      )}
    </Editable>
  )
}

export default EditableName
