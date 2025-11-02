"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "@/app/store/userSlice";

export default function AuthSync() {
    const { data: session, status } = useSession();
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            dispatch(
                setUser({
                    id: session.user.id ?? "",
                    name: session.user.name ?? "",
                    email: session.user.email ?? "",
                })
            );
        } else if (status === "unauthenticated") {
            dispatch(clearUser());
        }
    }, [session, status, dispatch]);

    return null;
}
