import {
  DashboardView,
  ApplicationsView
} from '../views';
import testIcon from '../assets/img/icons/test.svg';
import dashboardIcon from '../assets/img/icons/dashboard.svg';
import hmdIcon from '../assets/img/icons/hmd.svg';

const dashboard = [
  {
    path: '/dashboard', name: 'Dashboard', icon: dashboardIcon, component: DashboardView, restrictionLevel: 0,
  },
  {
    path: '/applications', name: 'Applications', icon: hmdIcon, component: ApplicationsView, restrictionLevel: 0,
  },
  {
    path: '/sessions', name: 'Sessions', icon: testIcon, component: DashboardView, restrictionLevel: 0,
  },
  {
    redirect: true, path: '/', pathTo: '/dashboard', name: 'Dashboard', restrictionLevel: 0,
  },
];

export default dashboard;