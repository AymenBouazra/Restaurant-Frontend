import { lazy } from "react"
const Home = lazy(() => import('./components/Home'))
const CreateUser = lazy(() => import('./components/Pages/User/CreateUser'))
const ListUser = lazy(() => import('./components/Pages/User/ListUser'))
const CreateFood = lazy(() => import('./components/Pages/Food/CreateFood'))
const ListFood = lazy(() => import('./components/Pages/Food/ListFood'))
const ListCategory = lazy(() => import('./components/Pages/Category/ListCategory'))
const CreateCategory = lazy(() => import('./components/Pages/Category/CreateCategory'))
const routes = [
    { path: '/', exact: true, name: 'Home' },
    {
        path: '/',
        element: Home,
        name: 'Home',
        exact: true
    },
    {
        path: '/users/add',
        element: CreateUser,
        name: 'Create-user',
        exact: true
    },
    {
        path: '/users',
        element: ListUser,
        name: 'Users',
        exact: true
    },
    {
        path: '/food/add',
        element: CreateFood,
        name: 'Create food',
        exact: true
    },
    {
        path: '/food',
        element: ListFood,
        name: 'Foods',
        exact: true
    },
    {
        path: '/categories/add',
        element: CreateCategory,
        name: 'Categories',
        exact: true
    },
    {
        path: '/categories',
        element: ListCategory,
        name: 'Home',
        exact: true
    },

]

export default routes