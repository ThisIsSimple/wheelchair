export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      disability_facilities: {
        Row: {
          address: string | null
          corporate: string | null
          created_at: string
          id: number
          installed_at: string | null
          location: unknown | null
          name: string | null
          phone: string | null
          type: string | null
        }
        Insert: {
          address?: string | null
          corporate?: string | null
          created_at?: string
          id?: number
          installed_at?: string | null
          location?: unknown | null
          name?: string | null
          phone?: string | null
          type?: string | null
        }
        Update: {
          address?: string | null
          corporate?: string | null
          created_at?: string
          id?: number
          installed_at?: string | null
          location?: unknown | null
          name?: string | null
          phone?: string | null
          type?: string | null
        }
        Relationships: []
      }
      places: {
        Row: {
          address: string | null
          address_detail: string | null
          created_at: string
          google_place_id: string
          is_accessibility_entrance: boolean
          is_accessibility_parking: boolean
          location: unknown | null
          name: string | null
          opening_hours: string | null
          thumbnail: string | null
        }
        Insert: {
          address?: string | null
          address_detail?: string | null
          created_at?: string
          google_place_id: string
          is_accessibility_entrance?: boolean
          is_accessibility_parking?: boolean
          location?: unknown | null
          name?: string | null
          opening_hours?: string | null
          thumbnail?: string | null
        }
        Update: {
          address?: string | null
          address_detail?: string | null
          created_at?: string
          google_place_id?: string
          is_accessibility_entrance?: boolean
          is_accessibility_parking?: boolean
          location?: unknown | null
          name?: string | null
          opening_hours?: string | null
          thumbnail?: string | null
        }
        Relationships: []
      }
      routes: {
        Row: {
          created_at: string
          end_location: unknown
          id: number
          mode: string | null
          start_location: unknown
        }
        Insert: {
          created_at?: string
          end_location: unknown
          id?: number
          mode?: string | null
          start_location: unknown
        }
        Update: {
          created_at?: string
          end_location?: unknown
          id?: number
          mode?: string | null
          start_location?: unknown
        }
        Relationships: []
      }
      toilets: {
        Row: {
          address: string | null
          address_detail: string | null
          created_at: string
          female_count: number | null
          id: number
          is_emergency_bell: boolean | null
          is_female: boolean | null
          is_male: boolean | null
          location: unknown | null
          male_count: number | null
          name: string | null
          old_address: string | null
          opening_hours: string | null
        }
        Insert: {
          address?: string | null
          address_detail?: string | null
          created_at?: string
          female_count?: number | null
          id?: number
          is_emergency_bell?: boolean | null
          is_female?: boolean | null
          is_male?: boolean | null
          location?: unknown | null
          male_count?: number | null
          name?: string | null
          old_address?: string | null
          opening_hours?: string | null
        }
        Update: {
          address?: string | null
          address_detail?: string | null
          created_at?: string
          female_count?: number | null
          id?: number
          is_emergency_bell?: boolean | null
          is_female?: boolean | null
          is_male?: boolean | null
          location?: unknown | null
          male_count?: number | null
          name?: string | null
          old_address?: string | null
          opening_hours?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      facilities: {
        Args: Record<PropertyKey, never>
        Returns: {
          lat: number
          lng: number
          id: number
          name: string
          address: string
          phone: string
          corporate: string
          type: string
        }[]
      }
      nearby_facilities: {
        Args: {
          lat: number
          lng: number
          d: number
        }
        Returns: {
          lat: number
          lng: number
          distance: number
          id: number
          name: string
          address: string
          phone: string
          corporate: string
          type: string
        }[]
      }
      nearby_places: {
        Args: {
          lat: number
          lng: number
          d: number
          accessibility: boolean
        }
        Returns: {
          lat: number
          lng: number
          distance: number
          google_place_id: string
          name: string
          address: string
          address_detail: string
          is_accessibility_entrance: boolean
          is_accessibility_parking: boolean
          opening_hours: string
          thumbnail: string
        }[]
      }
      nearby_toilets:
        | {
            Args: {
              lat: number
              lng: number
            }
            Returns: {
              id: number
              name: string
              lat: number
              lng: number
              distance: number
            }[]
          }
        | {
            Args: {
              lat: number
              lng: number
              d: number
            }
            Returns: {
              id: number
              name: string
              point: string
              lat: number
              lng: number
              distance: number
            }[]
          }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
