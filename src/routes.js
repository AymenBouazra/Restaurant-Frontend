import { lazy } from "react"
const Home = lazy(() => import('./components/Home'))
const ClientHome = lazy(() => import('./clientSide/Home'))
const ClientFood = lazy(() => import('./clientSide/Food'))
const CreateUser = lazy(() => import('./components/Pages/User/CreateUser'))
const ListUser = lazy(() => import('./components/Pages/User/ListUser'))
const CreateFood = lazy(() => import('./components/Pages/Food/CreateFood'))
const ListFood = lazy(() => import('./components/Pages/Food/ListFood'))
const ListCategory = lazy(() => import('./components/Pages/Category/ListCategory'))
const CreateCategory = lazy(() => import('./components/Pages/Category/CreateCategory'))
export const adminRoutes = [
    {
        path: '/admin',
        element: Home,
        name: 'Home',
        exact: true
    },
    {
        path: '/admin/users/add',
        element: CreateUser,
        name: 'Create-user',
        exact: true
    },
    {
        path: '/admin/users',
        element: ListUser,
        name: 'Users',
        exact: true
    },
    {
        path: '/admin/food/add',
        element: CreateFood,
        name: 'Create food',
        exact: true
    },
    {
        path: '/admin/food',
        element: ListFood,
        name: 'Foods',
        exact: true
    },
    {
        path: '/admin/categories/add',
        element: CreateCategory,
        name: 'Categories',
        exact: true
    },
    {
        path: '/admin/categories',
        element: ListCategory,
        name: 'Home',
        exact: true
    },

]

export const clientRoutes = [
    {
        path: '/',
        element: ClientHome,
        name: 'Home',
        exact: true
    },
    {
        path: '/food',
        element: ClientFood,
        name: 'Food',
        exact: true
    },


]

