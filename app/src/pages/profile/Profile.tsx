import React, { useState } from "react";
import UniContainer from "@components/UniContainer/UniContainer";
import { useAuthProvider } from "@src/providers/authProvider";
import ProfileForm from "./components/ProfileForms";
import { useApiProvider } from "@src/providers/apiProvider";
import { usePageState } from "@src/providers/pageStateProvider";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/system";
import { CircularProgress, Box, Typography, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { UPLOADS_URL } from "@src/constants";

const Input = styled("input")({
  display: "none",
});

export interface updateVals {
  email: string;
  fullName: string;
  username: string;
}

function Profile() {
  const { get, isLoading, getMultiPartFormData } = useApiProvider();
  const { updateLoggedInUser, user } = useAuthProvider();
  const { setPageStateUsersValue, setGeneralError } = usePageState();
  const [imageLoading, setImageLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.photo ? `${UPLOADS_URL}/${user?.photo}` : "");
  const [profileImageFile, setProfileImageFile] = useState(null);
  const onSave = async (values: updateVals) => {
    const formData = new FormData();
    formData.append("fullName", values.fullName);
    formData.append("email", values.email);
    if (profileImageFile) {
      formData.append("image", profileImageFile);
    }

    const result = await getMultiPartFormData("PATCH", "users/updateProfile", null, formData, true);
    if (result) {
      setPageStateUsersValue("profile", result);
      updateLoggedInUser(result);
      setGeneralError({ open: true, msg: "Updated Successfully", type: "success" });
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setGeneralError({ open: true, msg: "File is not an image", type: "error" });

        return;
      }
      if (file.size > 512000) {
        setGeneralError({ open: true, msg: "Image size should be less than 512KB", type: "error" });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
      setProfileImageFile(file);
    }
  };

  return (
    <UniContainer>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
        <Tooltip title="Change Profile Image">
          <label htmlFor="profile-image-upload">
            <Input accept="image/*" id="profile-image-upload" type="file" onChange={handleImageChange} />
            <IconButton component="span" sx={{ mb: 2 }}>
              {imageLoading ? (
                <CircularProgress />
              ) : (
                <Avatar src={profileImage} alt={user?.fullName} sx={{ width: 90, height: 90 }} />
              )}
            </IconButton>
          </label>
        </Tooltip>
        <Typography variant="h6">{user?.fullName}</Typography>
      </Box>
      <ProfileForm isLoading={isLoading} onSave={onSave} />
    </UniContainer>
  );
}

export default Profile;
