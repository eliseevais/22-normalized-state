import './profileDescription.css';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import avatarIrina from '../../assets/avatarIrina.jpg';

export const ProfileDescription = () => {
  return (
    <div className="ContainerProfile">
      <Stack direction="row" spacing={2}>
        <Avatar
          alt="Remy Sharp"
          src={avatarIrina}
          sx={{width: 160, height: 160}}
          style={{marginRight: 20}}
        />
      </Stack>
      <h2 className="NameProfile">Irina Eliseeva</h2>
    </div>
  )
};