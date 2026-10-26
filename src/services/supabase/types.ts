// Define types for our database

export interface ReviewSessionStatus {
  id: string;
  session_id: string;
  created_at: string;
  step1_completed?: boolean;
  step2_completed?: boolean;
  step3_completed?: boolean;
  step4_completed?: boolean;
  step5_completed?: boolean;
}
