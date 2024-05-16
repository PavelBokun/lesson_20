import React, { ChangeEvent, useCallback } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { TaskType } from "features/TodolistsList/todolists.api";
import { EditableSpan } from "common/components";
import { TaskStatuses } from "common/enums";
import { useActions } from "common/hooks";
import { tasksThunks } from "features/TodolistsList/tasks.reducer";

type TaskPropsType = {
  task: TaskType;
  todolistId: string;
  removeTask: (taskId: string, todolistId: string) => void;
};

// const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
//   updateTask({ taskId, domainModel: { status }, todolistId });
// }, []);

// const changeTaskTitle = useCallback(function (taskId: string, title: string, todolistId: string) {
//   updateTask({ taskId, domainModel: { title }, todolistId });
// }, []);

export const Task = React.memo((props: TaskPropsType) => {
  const { updateTask } = useActions(tasksThunks);
  const onClickHandler = useCallback(
    () => props.removeTask(props.task.id, props.todolistId),
    [props.task.id, props.todolistId],
  );

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    let status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New
    updateTask({
      taskId: props.task.id,
      domainModel: { status },
      todolistId: props.todolistId,
    });
  };

  const onTitleChangeHandler = 
    (newValue: string) => {
      updateTask({ taskId, domainModel: { title }, todolistId })
    }
   

  return (
    <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
      <Checkbox checked={props.task.status === TaskStatuses.Completed} color="primary" onChange={changeTAs} />

      <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} />
      <IconButton onClick={onClickHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});
