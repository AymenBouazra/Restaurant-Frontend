import React from "react"
const Home = React.lazy(() => import('./components/Home'))

const routes = [
    {
        path: '/',
        element: Home,
        name:'Home',
        exact: true
    }

]

export default routes