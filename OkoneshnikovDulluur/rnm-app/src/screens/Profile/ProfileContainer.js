import React, { useEffect, useState } from "react";
import ProfileView from "./ProfileView";
import { useAuthStore } from "@/store/authStore";

export default function ProfileContainer() {
  const user = useAuthStore((s) => s.user);
  const loadProfile = useAuthStore((s) => s.loadProfile);
  const logout = useAuthStore((s) => s.logout);

  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setError("");
        await loadProfile();
      } catch (e) {
        setError(e.message || "Не удалось загрузить профиль");
      }
    })();
  }, [loadProfile]);

  return <ProfileView user={user} error={error} onReload={loadProfile} onLogout={logout} />;
}
