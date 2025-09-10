-- Fix security issue: Restrict blood_requests table access to protect patient privacy

-- First, drop ALL existing SELECT policies on blood_requests
DROP POLICY IF EXISTS "Users can view all blood requests" ON public.blood_requests;
DROP POLICY IF EXISTS "Users can view their own blood requests" ON public.blood_requests;
DROP POLICY IF EXISTS "Donors can view anonymized active requests" ON public.blood_requests;

-- Create new secure SELECT policies

-- 1. Users can view ONLY their own blood requests
CREATE POLICY "Users can view own blood requests" 
ON public.blood_requests 
FOR SELECT 
USING (auth.uid() = user_id);

-- 2. Registered blood donors can view pending requests matching their blood group
-- This enables donors to help while protecting some privacy
CREATE POLICY "Donors can view matching blood requests" 
ON public.blood_requests 
FOR SELECT 
USING (
  status = 'pending' 
  AND auth.uid() != user_id  -- Don't duplicate own requests
  AND EXISTS (
    SELECT 1 FROM public.blood_donors 
    WHERE blood_donors.user_id = auth.uid() 
    AND blood_donors.is_available = true
    AND blood_donors.blood_group = blood_requests.blood_group
  )
);

-- The above policies ensure:
-- 1. Users can always see their own requests (full details)
-- 2. Available blood donors can see pending requests for their blood type (to offer help)
-- 3. No unauthorized access to patient data
-- The application layer should handle anonymization of sensitive fields for donor views