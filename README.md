# Todo List test assignment

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/arslan-dev/todo-list)

This is a solution for the typical test task that can be asked of the applicant in technical interviews for the Front-end web developer position. I've adopted it from the existing test task, but I’ve added fairly more than the maximum amount of features that was asked to be implemented in the original assignment.

## The task itself
To create an app that can manipulate (CRUD), validate and filter Todos.

## Implementation details
- Every feature was accomplished in test-first style (TDD), meaning, Unit Tests and Integrations Tests were passed before any of the UI had been rendered in the browser. Only after all tests have passed I ran the app in the development environment and added some bootstrap classes for the UI to look comely.
- I used exclusively TypeScript
- All data is stored in the Redux store.

## Features
- It is possible to add a new todo by entering its title through a simple form. Though, the app will not accept an empty string, or the string consisting of more than arbitrary number of characters (presently hardcoded to 10).
- It is possible to display items as a list.
- It is possible to remove items from the list.
- It is possible to update (or toggle) the task status by clicking in the checkbox next to the item.
- There is a filter with three options for displaying tasks: All, Finished or Unfinished.
- There is a counter that always displays the ratio of finished to unfinished tasks.

## Containerization
- There is a Dockerfile and compose file that will build and run the container with the built app’s artifacts and runtime environment.

## How to build and run locally
- Use this command:
```bash
docker compose up -d
```
- Then visit http://localhost:8080

## Run using built image from Docker Hub

```bash
docker run -d --rm --name todo-list --publish 8080:80 arslandev/todo-list:v1.0
```

- Then visit http://localhost:8080