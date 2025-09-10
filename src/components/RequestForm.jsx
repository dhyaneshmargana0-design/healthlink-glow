// src/components/RequestForm.jsx
import React, { useState } from "react";
import supabase from "../lib/supabaseClient"; // relative path from components -> lib

export default function RequestForm() {
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [hospital, setHospital] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const payload = {
        patient_name: patientName,
        phone,
        email,
        blood_group: bloodGroup,
        city,
        hospital_name: hospital,
        hospital_address: address
      };

      // Insert row into Supabase
      const { data, error } = await supabase
        .from("blood_requests")
        .insert([payload])
        .select()
        .single();

      if (error) throw error;

      setMessage("Request saved ✅ Check Supabase table.");
      // reset form
      setPatientName("");
      setPhone("");
      setEmail("");
      setBloodGroup("");
      setCity("");
      setHospital("");
      setAddress("");
    } catch (err) {
      console.error("Insert error:", err);
      setMessage("Error saving request. Open console for details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      <h3 className="text-xl font-bold mb-3">Request Blood</h3>

      <input required value={patientName} onChange={e=>setPatientName(e.target.value)} placeholder="Patient name" className="w-full mb-2 p-2 border rounded" />
      <input required value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone" className="w-full mb-2 p-2 border rounded" />
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email (optional)" className="w-full mb-2 p-2 border rounded" />

      <select required value={bloodGroup} onChange={e=>setBloodGroup(e.target.value)} className="w-full mb-2 p-2 border rounded">
        <option value="">Select blood group</option>
        <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
        <option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
      </select>

      <input required value={city} onChange={e=>setCity(e.target.value)} placeholder="City (e.g., Hyderabad)" className="w-full mb-2 p-2 border rounded" />
      <input value={hospital} onChange={e=>setHospital(e.target.value)} placeholder="Hospital name (admitted at)" className="w-full mb-2 p-2 border rounded" />
      <input value={address} onChange={e=>setAddress(e.target.value)} placeholder="Hospital address" className="w-full mb-3 p-2 border rounded" />

      <div className="flex items-center gap-3">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-red-600 text-white rounded">
          {loading ? "Submitting..." : "Request"}
        </button>
        <div>{message}</div>
      </div>
    </form>
  );
}