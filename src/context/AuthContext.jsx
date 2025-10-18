import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!mounted) return;
        setSession(data?.session ?? null);
        setUser(data?.session?.user ?? null);
      } catch (err) {
        console.error("Failed to get session", err);
      } finally {
        setLoading(false);
      }
    };
    init();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      // unsubscribe listener (support both shapes)
      if (listener?.subscription?.unsubscribe) listener.subscription.unsubscribe();
      if (typeof listener?.unsubscribe === "function") listener.unsubscribe();
    };
  }, []);

  const signUp = (payload) => supabase.auth.signUp(payload);
  const signIn = (payload) => supabase.auth.signInWithPassword(payload);
  const signOut = () => supabase.auth.signOut();

  const value = { user, session, loading, signUp, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;