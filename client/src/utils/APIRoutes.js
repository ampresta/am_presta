const host = `http://localhost:8000/api`;


export const loginRoute = `${host}/login`;

// Dashboard
export const amCardsRoute = `${host}/dashboard/amcards`;
export const graphsRoute = `${host}/dashboard/amgraphs`;
export const topCompaniesRoute = `${host}/dashboard/amtable`;
export const topCoursesRoute = `${host}/dashboard/topcourses`;

// Companies
export const registerRoute = `${host}/register`;
export const allCompaniesRoute = `${host}/societe/browse`;

// Partners
export const allPartnersRoute = `${host}/provider/browse`
export const addPartnersRoute = `${host}/provider/add`

// Cours
export const allCourssRoute = `${host}/cours/browse`
export const addCourssRoute = `${host}/cours/add`