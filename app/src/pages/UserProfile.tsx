import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserProfile, updateUserProfile } from '../services/UserProfileService';
import { IUser } from '../models/IUser';
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Box
} from '@mui/material';

const UserProfile: React.FC = () => {
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editedUser, setEditedUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile(id!);
        setUser(data);
        setEditedUser(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch user profile');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedUser) {
      setEditedUser({
        ...editedUser,
        [name]: value,
      });
    }
  };

  const handleSave = async () => {
    try {
      if (editedUser) {
        await updateUserProfile(id!, editedUser);
        alert("User Profile Updated");
      }
    } catch (error) {
      setError('Failed to update user profile');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/Background3.jpg)`, // Overlay with background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 2
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 2,
          padding: 4,
          boxShadow: 3,
          marginTop: '2px', 
        }}
      >
          <Typography
            padding={2}
            variant="h4"
            gutterBottom
            align="center"
            sx={{ color: '#333', 
            }}>
          User Profile
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              name="firstName"
              value={editedUser?.firstName || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              name="lastName"
              value={editedUser?.lastName || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={editedUser?.dateOfBirth || ''}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              value={editedUser?.email || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              type="password"
              value={editedUser?.password || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              value={editedUser?.address || ''}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default UserProfile;
