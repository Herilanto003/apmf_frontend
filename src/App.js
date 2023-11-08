import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Statistic from './pages/Statistic';
import AddStatistic from './pages/AddStatistic';
import Port from './pages/Port';
import Merchendise from './pages/Merchendise';
import Navire from './pages/Navire';
import User from './pages/User';
import RouteGard from './routes/RouteGard';
import RouteNotAccessLogin from './routes/RouteNotAccessLogin';
import ResponsableNavire from './pages/ResponsableNavire';
import Rapport from './pages/Rapport';
import RouteUser from './routes/RouteUser';
import Localization from './pages/Localization';

function App() {

    console.log('hery');

    return (
        // inclusion du router
        <Router>

            <Routes>
                {/* route vers la page d'acceuil */}
                <Route 
                    path='/'
                    element={<Home />}
                />
                <Route path='/apmf/'>
                    {/* route vers la page d'acceuil */}
                    <Route 
                        path=''
                        element={<Home />}
                    />
                    {/* route vers la page d'acceuil */}
                    <Route 
                        path='home'
                        element={<Home />}
                    />

                    {/* route vers la page login */}
                    <Route 
                        path='login'
                        element={(
                            <RouteNotAccessLogin>
                                <Login />
                            </RouteNotAccessLogin>
                        )}
                    />

                    {/* route vers la page signup */}
                    <Route 
                        path='signup'
                        element={(
                            <RouteNotAccessLogin>
                                <Signup />
                            </RouteNotAccessLogin>
                        )}
                    />
                </Route>

                {/** route vers les pages avec identification utilisateur */}
                <Route path='/apmf/account/'>
                    {/** route vers la page dashboard */}
                    <Route path='' 
                        element={(
                            <RouteGard>
                                <RouteUser>
                                    <Dashboard />
                                </RouteUser>
                            </RouteGard>
                        )} 
                    />
                    <Route path='dashboard'  
                        element={(
                            <RouteGard>
                                <RouteUser>
                                    <Dashboard />
                                </RouteUser>
                            </RouteGard>
                        )} 
                    />

                    {/** route vers la page statistic */}
                    <Route path='statistic' 
                            element={(
                                <RouteGard>
                                    <RouteUser>
                                        <Statistic />
                                    </RouteUser>
                                </RouteGard>
                            )} 
                        />
                    <Route path='statistic/add-new' 
                        element={(
                            <RouteGard>
                                <RouteUser>
                                    <AddStatistic />
                                </RouteUser>
                            </RouteGard>
                        )} 
                    />

                    {/** route vers la page port */}
                    <Route path='port' 
                        element={(
                            <RouteGard>
                                <RouteUser>
                                    <Port />
                                </RouteUser>
                            </RouteGard>
                        )} 
                    />

                    {/** route vers la page marchadise */}
                    <Route path='merchendise' 
                        element={(
                            <RouteGard>
                                <RouteUser>
                                    <Merchendise />
                                </RouteUser>
                            </RouteGard>
                        )} 
                    />

                    {/** route vers la page navires */}
                    <Route path='navires' 
                        element={(
                            <RouteGard>
                                <RouteUser>
                                    <Navire />
                                </RouteUser>
                            </RouteGard>
                        )} 
                    />

                    {/** route vers la page navires */}
                    <Route path='users' 
                        element={(
                            <RouteGard>
                                <RouteUser>
                                    <User />
                                </RouteUser>
                            </RouteGard>
                        )} 
                    />

                    {/** route vers la page navires */}
                    <Route path='responsable' 
                        element={(
                            <RouteGard>
                                <RouteUser>
                                    <ResponsableNavire />
                                </RouteUser>
                            </RouteGard>
                        )} 
                    />

                    {/** route vers la page rapport */}
                    <Route path='rapport' 
                        element={(
                            <RouteGard>
                                <RouteUser>
                                    <Rapport />
                                </RouteUser>
                            </RouteGard>
                        )} 
                    />

                    {/** route vers la page rapport */}
                    <Route path='localisation' 
                        element={(
                            <RouteGard>
                                <RouteUser>
                                    <Localization />
                                </RouteUser>
                            </RouteGard>
                        )} 
                    />
                </Route>
            </Routes>

        </Router>
    ) 
}

export default App