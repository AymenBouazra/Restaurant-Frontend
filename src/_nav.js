const navs = [
    {
        name: 'Users',
        children: [{
            to: '/users',
            name: 'List users'
        },
        {
            to: '/users/add',
            name: 'Add user'
        }]
    },
    {
        name: 'Food',
        children: [{
            to: '/food',
            name: 'List food'
        },
        {
            to: '/food/add',
            name: 'Add food'
        }]
    },
    {
        name: 'Category',
        children: [{
            to: '/categories',
            name: 'Category List'
        },
        {
            to: '/categories/add',
            name: 'Add category'
        },]
    },


]
export default navs