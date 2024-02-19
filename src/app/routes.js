const ROUTES = {
    goalsRoute: () => "/goals",
    newGoalRoute: () => "/goals/new",
    goalRoute: (id) => `/goals/${id}`,
    newTaskRoute: (id) => `/tasks/new/${id}`
  };
  
  export default ROUTES;