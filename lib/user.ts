import useSWR from "swr";
import fetcher from "./fetcher";

export function useCurrentUser() {
    const { data, mutate } = useSWR('/api/user/auth', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })
    const user = data?.user;
    return [user, { mutate }]
}