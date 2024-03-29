import React, { ChangeEvent, FC, KeyboardEvent, memo, useState } from 'react'
import { RejectValueType } from 'common/utils'
import { AddBox, IconButton, TextField } from 'shared/ui'

type Props = {
  addItem: (title: string) => Promise<unknown>
  disabled?: boolean
}
export const AddItemForm: FC<Props> = memo(({ addItem, disabled = false }) => {
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const addItemHandler = () => {
    if (title.trim() !== '') {
      addItem(title)
        .then(() => {
          setTitle('')
        })
        .catch((err: RejectValueType) => {
          if (err.data) {
            const messages = err.data.messages
            setError(messages.length ? messages[0] : 'Some error occurred')
          }
        })
    } else {
      setError('Title is required')
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (e.charCode === 13) {
      addItemHandler()
    }
  }

  return (
    <div>
      <TextField
        variant="outlined"
        disabled={disabled}
        error={!!error}
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        label="Title"
        helperText={error}
      />
      <IconButton color="primary" onClick={addItemHandler} disabled={disabled} style={{ marginLeft: '5px' }}>
        <AddBox />
      </IconButton>
    </div>
  )
})
