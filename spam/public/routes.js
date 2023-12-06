import { HomePage } from './views/Homepage.jsx'
import { AboutUs } from './views/AboutUs.jsx'
import { BugIndex } from './views/BugIndex.jsx'
import { BugDetails } from './views/BugDetails.jsx'
import { BugEdit } from './views/BugEdit.jsx'
import { UserProfile } from './views/UserProfile.jsx'
import { AdminDashboard } from './views/AdminDashboard.jsx'

export default [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/bug',
        component: BugIndex,
    },
    {
        path: '/bug/:bugId',
        component: BugDetails,
    },
    {
        path: '/about',
        component: AboutUs,
    },
    {
        path: '/bug/edit',
        component: BugEdit,
    },
    {
        path: '/bug/edit/:bugId',
        component: BugEdit,
    },
    {
        path: '/user',
        component: UserProfile,
    }
    ,
    {
        path: '/admin',
        component: AdminDashboard,
    }
]