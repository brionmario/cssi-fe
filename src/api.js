const BASE_API =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_ENDPOINT
    : process.env.REACT_APP_DEV_API_ENDPOINT;

const API_ENDPOINTS = {
  authorize: `${BASE_API}/auth/`,
  getUsers: `${BASE_API}/users/`,
  getUserInfo: `${BASE_API}/users/{}/`,
  updateUserStatus: `${BASE_API}/users/{}/status/`,
  createUser: `${BASE_API}/users/`,
  editUser: `${BASE_API}/users/{}/`,
  deleteUser: `${BASE_API}/users/{}/`,
  getApplications: `${BASE_API}/applications/`,
  getApplicationTypes: `${BASE_API}/applications/types`,
  getApplicationGenres: `${BASE_API}/applications/genres`,
  getApplicationInfo: `${BASE_API}/applications/{}`,
  updateApplicationSharing: `${BASE_API}/applications/{}/sharing/`,
  createApplication: `${BASE_API}/applications/`,
  editApplication: `${BASE_API}/applications/{}/`,
  deleteApplication: `${BASE_API}/applications/{}/`,
  getQuestionnaires: `${BASE_API}/questionnaires/`,
  getQuestionnaireInfo: `${BASE_API}/questionnaires/{}`,
  updateQuestionnaire: `${BASE_API}/questionnaires/{}/post`,
  createQuestionnaire: `${BASE_API}/questionnaires/`,
  fetchSessions: `${BASE_API}/sessions/`,
  updateSession: `${BASE_API}/sessions/{}`,
  initializeSession: `${BASE_API}/sessions/`,
  getSessionInfo: `${BASE_API}/sessions/{}`
};

export { API_ENDPOINTS };
