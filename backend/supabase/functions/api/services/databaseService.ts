import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Create Supabase client for Edge Function
const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database service functions
export const databaseService = {
  // Get all opportunities from database
  async getAllOpportunities() {
    try {
      const { data, error } = await supabase
        .from('ghl_opportunities')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Error fetching opportunities:', error)
      throw error
    }
  },

  // Insert opportunity into database
  async insertOpportunity(opportunityData: any) {
    try {
      const { data, error } = await supabase
        .from('ghl_opportunities')
        .insert([opportunityData])
        .select()

      if (error) {
        throw error
      }

      return data?.[0] || null
    } catch (error) {
      console.error('Error inserting opportunity:', error)
      throw error
    }
  },

  // Update opportunity in database
  async updateOpportunity(id: string, updateData: any) {
    try {
      const { data, error } = await supabase
        .from('ghl_opportunities')
        .update(updateData)
        .eq('opportunity_id', id)
        .select()

      if (error) {
        throw error
      }

      return data?.[0] || null
    } catch (error) {
      console.error('Error updating opportunity:', error)
      throw error
    }
  },

  // Get opportunity by ID
  async getOpportunityById(id: string) {
    try {
      const { data, error } = await supabase
        .from('ghl_opportunities')
        .select('*')
        .eq('opportunity_id', id)
        .single()

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error('Error fetching opportunity by ID:', error)
      throw error
    }
  },

  // Delete opportunity by ID
  async deleteOpportunity(id: string) {
    try {
      const { error } = await supabase
        .from('ghl_opportunities')
        .delete()
        .eq('opportunity_id', id)

      if (error) {
        throw error
      }

      return true
    } catch (error) {
      console.error('Error deleting opportunity:', error)
      throw error
    }
  },

  // Check if opportunity exists
  async opportunityExists(opportunityId: string) {
    try {
      const { data, error } = await supabase
        .from('ghl_opportunities')
        .select('id')
        .eq('opportunity_id', opportunityId)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        throw error
      }

      return !!data
    } catch (error) {
      console.error('Error checking if opportunity exists:', error)
      return false
    }
  },

  // Update opportunity stage
  async updateOpportunityStage(opportunityId: string, stageData: any) {
    try {
      const { data, error } = await supabase
        .from('ghl_opportunities')
        .update(stageData)
        .eq('opportunity_id', opportunityId)
        .select()

      if (error) {
        throw error
      }

      return data?.[0] || null
    } catch (error) {
      console.error('Error updating opportunity stage:', error)
      throw error
    }
  }
} 