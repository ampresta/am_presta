export const baseURL = `http://127.0.0.1:8000/api`;

// Auth
export const loginRoute = `${baseURL}/login`;

export const getType = `${baseURL}/gettype`;

export const refreshRoute = `${baseURL}/login/refreshtoken`;

// Dashboard
export const amCardsRoute = `${baseURL}/dashboard/amcards`;
export const graphsRoute = `${baseURL}/dashboard/amgraphs`;
export const topCompaniesRoute = `${baseURL}/dashboard/amtable`;
export const topCoursesRoute = `${baseURL}/dashboard/topcourses`;

// Societe Dashboard
export const SocCardsRoute = `${baseURL}/dashboard/soccards`;
export const graphsSocRoute = `${baseURL}/dashboard/amgraphs`;
export const topCollabRoute = `${baseURL}/dashboard/soccollab`;
export const topChallengesRoute = `${baseURL}/dashboard/topcourses`;
// Companies
export const registerRoute = `${baseURL}/register`;
export const allCompaniesRoute = `${baseURL}/societe/browse`;
export const userCompanyRoute = `${baseURL}/societe/uerSociete`;

// Partners
export const allPartnersRoute = `${baseURL}/provider/browse`;
export const addPartnersRoute = `${baseURL}/provider/add`;

// Cours
export const allCoursesRoute = `${baseURL}/cours/browse`;
export const addCoursesRoute = `${baseURL}/cours/add`;
export const allCompanyCoursesRoute = `${baseURL}/cours/browsesoc`;

// Sessions
export const allSessionsRoute = `${baseURL}/session/browse`;
export const addSessionsRoute = `${baseURL}/session/add`;
export const SessionsofSociete = `${baseURL}/session/browsesoc`;

// Quota
export const AllQuotaRoute = `${baseURL}/quota/browse`;
export const AllQuotaSocRoute = `${baseURL}/quota/browsesoc`;
export const AddQuotaRoute = `${baseURL}/quota/add`;

// Departments
export const allDepartmentsRoute = `${baseURL}/societe/browsedepts`;
export const addDepartementRoute = `${baseURL}/dept/add`;

//DeleteInstances
export const DeleteInstances = `${baseURL}/delete`;

// Requests
export const allRequestsRoute = `${baseURL}/societe/browserequests`;
export const AcceptRequestRoute = `${baseURL}/collab/addsession`;

//Upload images
export const uploadRoute = `${baseURL}/upload`;
// Session Details
export const SessionGraph = `${baseURL}/session/graph`;
export const SessionCollabRoute = `${baseURL}/session/collab`;

//Collabs
export const addCollabsRoute = `${baseURL}/collab/addmany`;
export const browseCollabsRoute = `${baseURL}/collab/browse`;
