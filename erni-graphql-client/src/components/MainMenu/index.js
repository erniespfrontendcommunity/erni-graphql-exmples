import React from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';
import AccountBoxIcon from 'material-ui-icons/AccountBox';
import MessageIcon from 'material-ui-icons/Message';
import CakeIcon from 'material-ui-icons/Cake';
import { NavLink } from 'react-router-dom';

const MainMenu = (props) => {
  let uri = '/';

  if (window.location.pathname.match(/user/i)) {
    uri = '/users';
  }
  else if (window.location.pathname.match(/feed/i)) {
    uri = '/feed';
  }

  return (
    <Tabs
      value={uri}
      indicatorColor="primary"
      textColor="primary"
      centered
    >
      <Tab value="/" exact label="Posts" icon={<MessageIcon />} component={NavLink} to="/" />
      <Tab value="/users" label="Users" icon={<AccountBoxIcon />} component={NavLink} to="/users" />
      <Tab value="/feed" label="Twitter Feed" icon={<CakeIcon />} component={NavLink} to="/feed" />
    </Tabs>
  );
}

export default MainMenu;
