export const baseURL = `http://localhost:8000/api`;

// Auth
export const loginRoute = `${baseURL}/login`;

// Dashboard
export const amCardsRoute = `${baseURL}/dashboard/amcards`;
export const graphsRoute = `${baseURL}/dashboard/amgraphs`;
export const topCompaniesRoute = `${baseURL}/dashboard/amtable`;
export const topCoursesRoute = `${baseURL}/dashboard/topcourses`;

// Companies
export const registerRoute = `${baseURL}/register`;
export const allCompaniesRoute = `${baseURL}/societe/browse`;
export const companyIdBynameRoute = `${baseURL}/societe/getIdByName`;

// Partners
export const allPartnersRoute = `${baseURL}/provider/browse`;
export const addPartnersRoute = `${baseURL}/provider/add`;

// Cours
export const allCoursesRoute = `${baseURL}/cours/browse`;
export const addCoursesRoute = `${baseURL}/cours/add`;

//DeleteInstances
export const DeleteInstances = `${baseURL}/delete`;

//Upload images
export const uploadRoute = `${baseURL}/upload`;
