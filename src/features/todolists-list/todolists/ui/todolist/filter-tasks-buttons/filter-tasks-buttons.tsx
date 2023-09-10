import React, {FC, useCallback} from "react"
import {
    FilterValuesType,
    TodolistDomainType,
    todolistsActions
} from "features/todolists-list/todolists/model/todolists-slice"
import {Button, PropTypes} from "@mui/material"
import {useActions} from "common/hooks";

type Props = {
    todolist: TodolistDomainType
}

export const FilterTasksButtons: FC<Props> = ({todolist}) => {
    const {changeTodolistFilter} = useActions(todolistsActions)
    const id = todolist.id

    const renderFilterButton = (buttonFilter: FilterValuesType, color: PropTypes.Color, text: string) => {
        return (
            <Button
                variant={todolist.filter === buttonFilter ? "outlined" : "text"}
                onClick={() => onFilterButtonClickHandler(buttonFilter)}
                color={"primary"}
                // color={color}
            >
                {text}
            </Button>
        )
    }

    const onFilterButtonClickHandler = useCallback(
        (filter: FilterValuesType) =>
            changeTodolistFilter({
                filter,
                id,
            }),
        [id],
    )

    return (
        <>
            {renderFilterButton("all", "default", "All")}
            {renderFilterButton("active", "primary", "Active")}
            {renderFilterButton("completed", "secondary", "Completed")}
        </>
    )
}
