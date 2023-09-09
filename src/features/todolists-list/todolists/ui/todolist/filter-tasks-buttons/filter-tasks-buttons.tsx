import React, {FC, useCallback} from "react"
import {FilterValuesType, TodolistDomainType} from "features/todolists-list/todolists/model/todolists-slice"
import {Button, PropTypes} from "@mui/material"

type Props = {
  todolist: TodolistDomainType
}

export const FilterTasksButtons: FC<Props> = ({todolist}) => {
  const renderFilterButton = (buttonFilter: FilterValuesType, color: PropTypes.Color, text: string) => {
    return (
      <Button
        variant={todolist.filter === buttonFilter ? "outlined" : "text"}
        onClick={() => onFilterButtonClickHandler(buttonFilter)}
        color={color}
      >
        {text}
      </Button>
    )
  }

  const onFilterButtonClickHandler = useCallback(
    (filter: FilterValuesType) =>
      changeTodolistFilter({
        filter: filter,
        id: todolist.id,
      }),
    [todolist.id],
  )

  return (
    <>
      {renderFilterButton("all", "default", "All")}
      {renderFilterButton("active", "primary", "Active")}
      {renderFilterButton("completed", "secondary", "Completed")}
    </>
  )
}
