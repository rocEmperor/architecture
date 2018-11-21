import asyncComponent from '../common/asyncComponent';

const HomePageRouter = [
  {
    path: '/',
    component: asyncComponent(() => import(/* webpackChunkName: 'homePage'*/ "../components/homePage/homePage")),
    children: []
  }
];

export default HomePageRouter;