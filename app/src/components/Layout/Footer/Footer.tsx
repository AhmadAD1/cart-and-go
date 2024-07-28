import React from 'react';
import { Box, Container, Grid, IconButton, Typography } from '@mui/material';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const footerStyles = {
  root: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '2rem 0',
    marginTop: 'auto',
  },
  iconButton: {
    color: '#fff',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  socialIcon: {
    fontSize: '1.5rem',
    marginRight: '0.5rem',
  },
};

function Footer() {
  return (
    <Box sx={footerStyles.root}>
      <Container>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" align="center" gutterBottom>
              Connect with Us
            </Typography>
            <Box display="flex" justifyContent="center">
              <IconButton sx={footerStyles.iconButton} href="https://facebook.com">
                <FaFacebook style={footerStyles.socialIcon} />
              </IconButton>
              <IconButton sx={footerStyles.iconButton} href="https://twitter.com">
                <FaXTwitter style={footerStyles.socialIcon} />
              </IconButton>
              <IconButton sx={footerStyles.iconButton} href="https://instagram.com">
                <FaInstagram style={footerStyles.socialIcon} />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" align="center">
              &copy; {new Date().getFullYear()} CART&GO, All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
