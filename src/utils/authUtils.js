import { axiosAccPublic } from "./axiosConfig";

// Extract refresh token from URL
export function checkRefreshFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const refreshToken = urlParams.get("refreshToken");
  if (refreshToken) {
    console.log("Refresh token from URL:", refreshToken); // Log the refresh token
    localStorage.setItem("refreshToken", refreshToken);
    urlParams.delete("refreshToken");
    window.history.replaceState({}, "", `${window.location.pathname}`);
  }
}

// Refresh access token
export async function refreshTheAccessToken() {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    console.log("Refresh token from localStorage:", refreshToken);
    if (!refreshToken) {
      window.location.href = "https://play.excelmec.org"; // Redirect if no refresh token
      return null;
    }

    const response = await axiosAccPublic.post("/api/Auth/refresh", { refreshToken });
    const { accessToken } = response.data;

    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Token refresh failed:", error);
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    window.location.href = "https://play.excelmec.org"; // Redirect on refresh failure
    return null;
  }
}
