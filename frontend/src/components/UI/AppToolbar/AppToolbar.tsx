import { AppBar, Container, styled, Toolbar, Typography} from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import UserMenu from "./UserMenu.tsx";
import AnonymousMenu from "./AnonymousMenu.tsx";
import {useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../../features/Users/usersSlice.ts";

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit'
  },
});


const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{mb: 4, backgroundColor:"dodgerblue"}}>
          <Container maxWidth="lg">
              <Toolbar>
                  <Typography variant="h5" component="div" sx={{flexGrow: 1}}>
                      <Link to="/">Forum</Link>
                  </Typography>
                  {user ? <UserMenu user={user}/> : <AnonymousMenu />}
              </Toolbar>
          </Container>

    </AppBar>
  );
};

export default AppToolbar;