import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './App.css';
import Account from './Account';
import Home from './Home';



function App() {
  return (
    <Router>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{mr: 5}}>
            Ethereum Explorer
          </Typography>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="/"
              sx={{ my: 1, mx: 1.5 }}
            >
              VIEW BLOCK
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/account"
              sx={{ my: 1, mx: 1.5 }}
            >
              VIEW ACCOUNT
            </Link>
          </nav>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path="/account/:address" children={<Account />} />
        <Route path="/" children={<Home />}></Route>
      </Switch>
    </Router>
  );
}

export default App;
