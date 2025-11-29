import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: window.localStorage
  }
})

// Helper functions
export const auth = {
  signUp: async (email, password, name) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })
    return { data, error }
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  resetPassword: async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    })
    return { data, error }
  },

  updatePassword: async (newPassword) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    })
    return { data, error }
  },

  getUser: async () => {
    const {
      data: { user },
      error
    } = await supabase.auth.getUser()
    return { user, error }
  },

  getSession: async () => {
    const {
      data: { session },
      error
    } = await supabase.auth.getSession()
    return { session, error }
  }
}

// Database helpers
export const db = {
  // Profiles
  getProfile: async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  updateProfile: async (userId, updates) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    return { data, error }
  },

  // Patients
  getPatients: async () => {
    const { data, error } = await supabase
      .from('patients')
      .select(
        `
        *,
        blood_pressure_records (
          id,
          systolic,
          diastolic,
          category,
          measurement_date,
          measurement_time
        )
      `
      )
      .order('created_at', { ascending: false })
    return { data, error }
  },

  getPatient: async (id) => {
    const { data, error } = await supabase
      .from('patients')
      .select(
        `
        *,
        blood_pressure_records (
          id,
          systolic,
          diastolic,
          category,
          symptoms,
          measurement_date,
          measurement_time
        )
      `
      )
      .eq('id', id)
      .single()
    return { data, error }
  },

  createPatient: async (patientData) => {
    const { data, error } = await supabase
      .from('patients')
      .insert([patientData])
      .select()
      .single()
    return { data, error }
  },

  updatePatient: async (id, updates) => {
    const { data, error } = await supabase
      .from('patients')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  deletePatient: async (id) => {
    const { error } = await supabase.from('patients').delete().eq('id', id)
    return { error }
  },

  // Blood Pressure Records
  getBloodPressureRecords: async (patientId) => {
    const { data, error } = await supabase
      .from('blood_pressure_records')
      .select('*')
      .eq('patient_id', patientId)
      .order('measurement_date', { ascending: false })
      .order('measurement_time', { ascending: false })
    return { data, error }
  },

  createBloodPressureRecord: async (recordData) => {
    // Determine category
    const { systolic, diastolic } = recordData
    let category = 'Normal'

    if (systolic >= 140 || diastolic >= 90) {
      category = 'Hipertensi Stadium 2'
    } else if (
      (systolic >= 130 && systolic <= 139) ||
      (diastolic >= 80 && diastolic <= 89)
    ) {
      category = 'Hipertensi Stadium 1'
    } else if (systolic >= 120 && systolic <= 129 && diastolic < 80) {
      category = 'Pra-hipertensi'
    }

    const { data, error } = await supabase
      .from('blood_pressure_records')
      .insert([{ ...recordData, category }])
      .select()
      .single()
    return { data, error }
  },

  deleteBloodPressureRecord: async (id) => {
    const { error } = await supabase
      .from('blood_pressure_records')
      .delete()
      .eq('id', id)
    return { error }
  },

  // Medication Reminders
  getReminders: async (patientId) => {
    const { data, error } = await supabase
      .from('medication_reminders')
      .select('*')
      .eq('patient_id', patientId)
      .order('reminder_time', { ascending: true })
    return { data, error }
  },

  createReminder: async (reminderData) => {
    const { data, error } = await supabase
      .from('medication_reminders')
      .insert([reminderData])
      .select()
      .single()
    return { data, error }
  },

  toggleReminder: async (id, isActive) => {
    const { data, error } = await supabase
      .from('medication_reminders')
      .update({ is_active: isActive })
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  deleteReminder: async (id) => {
    const { error } = await supabase
      .from('medication_reminders')
      .delete()
      .eq('id', id)
    return { error }
  },

  // Educational Content
  getEducationalContent: async () => {
    const { data, error } = await supabase
      .from('educational_contents')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  getEducationalContentByCategory: async (category) => {
    const { data, error } = await supabase
      .from('educational_contents')
      .select('*')
      .eq('category', category)
      .eq('is_active', true)
    return { data, error }
  }
}

// Realtime subscriptions
export const subscribeToPatients = (callback) => {
  return supabase
    .channel('patients')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'patients' },
      callback
    )
    .subscribe()
}

export const subscribeToBloodPressure = (patientId, callback) => {
  return supabase
    .channel(`blood_pressure_${patientId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'blood_pressure_records',
        filter: `patient_id=eq.${patientId}`
      },
      callback
    )
    .subscribe()
}
