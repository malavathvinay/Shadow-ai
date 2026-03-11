import { useState, useEffect } from 'react'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { User } from '../types'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null)
  const [isDemoMode, setIsDemoMode] = useState(false)

  useEffect(() => {
    // Check if demo user was previously logged in
    const demoUser = localStorage.getItem('demo_user')
    if (demoUser) {
      setUser(JSON.parse(demoUser))
      setIsDemoMode(true)
      setLoading(false)
      return
    }

    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        setSupabaseUser(session.user)
        await fetchUserProfile(session.user.id)
      }
      
      setLoading(false)
    }

    getInitialSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          setSupabaseUser(session.user)
          await fetchUserProfile(session.user.id)
        } else {
          setSupabaseUser(null)
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching user profile:', error)
        return
      }

      if (data) {
        const userProfile: User = {
          id: data.id,
          name: data.name,
          email: data.email,
          intent_type: (data.intent_type as 'restarting' | 'freelancing' | 'confidence') || 'restarting',
          available_minutes_per_day: data.available_minutes_per_day || 10,
          onboarding_complete: data.onboarding_complete,
          last_login_timestamp: new Date(),
        }
        setUser(userProfile)
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error)
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      // Sign up user in Supabase Auth
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) throw error

      if (data.user) {
        // Insert profile via server-side function to bypass RLS
        const { error: profileError } = await supabase.rpc('insert_user_profile', {
          p_id: data.user.id,
          p_name: name,
          p_email: email
        })

        if (profileError) throw profileError
        await fetchUserProfile(data.user.id)
        return { user: data.user, error: null }
      }
    } catch (error) {
      console.error('Error in signUp:', error)
      return { user: null, error }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      // Demo access
      if (email === 'demo@shadow.com' && password === 'demo123') {
        const demoUser: User = {
          id: 'demo_user',
          name: 'Anjali Demo',
          email: 'demo@shadow.com',
          intent_type: 'restarting',
          available_minutes_per_day: 15,
          onboarding_complete: true,
          last_login_timestamp: new Date(),
        }

        localStorage.setItem('demo_user', JSON.stringify(demoUser))
        setUser(demoUser)
        setIsDemoMode(true)
        return { user: demoUser, error: null }
      }

      // Regular Supabase login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error

      await fetchUserProfile(data.user.id)
      return { user: data.user, error: null }
    } catch (error) {
      console.error('Error in signIn:', error)
      return { user: null, error }
    }
  }

  const signOut = async () => {
    try {
      if (isDemoMode) {
        localStorage.removeItem('demo_user')
        setUser(null)
        setIsDemoMode(false)
        return
      }

      const { error } = await supabase.auth.signOut()
      if (error) throw error

      setUser(null)
      setSupabaseUser(null)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const updateUserProfile = async (updates: Partial<User>) => {
    try {
      if (isDemoMode && user) {
        const updatedUser = { ...user, ...updates }
        localStorage.setItem('demo_user', JSON.stringify(updatedUser))
        setUser(updatedUser)
        return
      }

      if (!supabaseUser) return

      const { error } = await supabase
        .from('users')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', supabaseUser.id)

      if (error) throw error
      await fetchUserProfile(supabaseUser.id)
    } catch (error) {
      console.error('Error updating user profile:', error)
    }
  }

  return {
    user,
    supabaseUser,
    loading,
    isDemoMode,
    signUp,
    signIn,
    signOut,
    updateUserProfile,
    fetchUserProfile,
  }
}
