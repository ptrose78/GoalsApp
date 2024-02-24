const ROUTES = {
    homeRoute: () => "/",
    goalsRoute: () => "/goals",
    newGoalRoute: () => "/goals/new",
    tasksRoute: (id) => `/tasks/${id}`,
    newTaskRoute: (id) => `/tasks/new/${id}`,
    todoRoute: () => '/todos'
  };
  
  export default ROUTES;