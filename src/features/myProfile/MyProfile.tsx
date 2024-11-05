import './MyProfile.css';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import avatarIrina from '../../assets/avatarIrina.jpg'

export const MyProfile = () => {
  return (
    <div className="Container">
      <Stack direction="row" spacing={2}>
        <Avatar
          alt="Remy Sharp"
          src={avatarIrina}
          sx={{width: 160, height: 160}}
        />
      </Stack>
      <b>Irina Eliseeva</b>
    </div>
  )
}