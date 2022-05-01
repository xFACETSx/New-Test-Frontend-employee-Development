import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Navbar } from './components/Navbar/Navbar'

import { StockAndMenuPage } from './pages/StockAndMenuPage/StockAndMenuPage'
import { UpdateStockPage } from './pages/UpdateStockPage/UpdateStockPage'
import { RestockPage } from './pages/RestockPage/RestockPage'
import { EmployeePage } from './pages/EmployeePage/EmployeePage'
import { MemberPage } from './pages/MemberPage/MemberPage'
import { DashboardPage } from './pages/DashboardPage/DashboardPage'
import { AdminPage } from './pages/AdminPage/AdminPage'
import { OrderPage } from './pages/OrderPage/OrderPage'
import { AllMenuPage } from './pages/AllMenuPage/AllMenuPage'
import { HomePage } from './pages/HomePage/HomePage'

function App() {
  return (
    <BrowserRouter basename="/coffee-admin">
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/stockandmenu" component={StockAndMenuPage} />
        <Route exact path="/updatestock" component={UpdateStockPage} />
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route exact path="/employee" component={EmployeePage} />
        <Route exact path="/member" component={MemberPage} />
        <Route exact path="/restock" component={RestockPage} />
        <Route exact path="/admin" component={AdminPage} />
        <Route exact path="/order" component={OrderPage} />
        <Route exact path="/allmenu" component={AllMenuPage} />
      </Switch>
      {/* <Footer /> */}
    </BrowserRouter>
  )
}

export default App
