import { useEffect, useState } from "react";

import { selectCurrentUser, updateUserTC } from "@/features/user/userSlice.ts";
import styles from "./ProfileForm.module.css";
import { ROUTES } from "@/common/utils/Routes.ts";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"

export const ProfileForm = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: ""
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name,
        email: currentUser.email,
        password: "",
        avatar: currentUser.avatar || ""
      });
    }
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(updateUserTC({
        ...formData,
        id: currentUser?.id || 0
      })).unwrap();
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage("Failed to update profile");
    }
  };

  if (!currentUser) {
    return (
      <div className={styles.container}>
        <div className={styles.message}>
          Please <Link to={ROUTES.HOME}>login</Link> to view your profile
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Edit Profile</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>New Password (leave blank to keep current)</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Avatar URL</label>
          <input
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            className={styles.input}
            placeholder="Paste image URL"
          />
          {formData.avatar && (
            <div
              className={styles.avatarPreview}
              style={{ backgroundImage: `url(${formData.avatar})` }}
            />
          )}
        </div>

        {message && <div className={styles.message}>{message}</div>}

        <button type="submit" className={styles.submitButton}>
          Update Profile
        </button>
      </form>
    </div>
  );
};