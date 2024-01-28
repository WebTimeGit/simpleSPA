import useSWR from "swr";
import { fetcher } from "@/services/axios";
import { API } from "@/services/api/api";
import { TUserData, useAuthContext } from "@/context/authContext";

export const useCheckLogin = () => {
	const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

	const { data, error, isValidating } = useSWR<TUserData>(
		token ? API.userInfo : null, fetcher
	)

	if (!token) {
		return { statusError: 'no-token', userInfo: null };
	}

	if (error) {
		return { statusError: 'error', userInfo: null };
	}

	const userInfo = data ? data.userInfo : null;
	return { statusError: userInfo ? 'success' : 'loading', userInfo };
}
