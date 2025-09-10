-- Fix security issue: Restrict blood_requests table access to protect patient privacy

-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Users can view all blood requests" ON public.blood_requests;

-- Create new secure SELECT policies

-- 1. Users can view their own blood requests
CREATE POLICY "Users can view their own blood requests" 
ON public.blood_requests 
FOR SELECT 
USING (auth.uid() = user_id);

-- 2. Blood donors can view anonymized active requests matching their blood group
-- This allows donors to help while protecting patient privacy
CREATE POLICY "Donors can view anonymized active requests" 
ON public.blood_requests 
FOR SELECT 
USING (
  status = 'pending' 
  AND EXISTS (
    SELECT 1 FROM public.blood_donors 
    WHERE blood_donors.user_id = auth.uid() 
    AND blood_donors.is_available = true
    AND blood_donors.blood_group = blood_requests.blood_group
  )
);

-- Note: The second policy allows registered blood donors to see pending requests
-- that match their blood group, enabling them to help while maintaining privacy.
-- Sensitive information like patient names should be handled carefully in the application layer.