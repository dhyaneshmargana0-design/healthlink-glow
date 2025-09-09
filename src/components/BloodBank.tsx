import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Phone, Droplet, AlertCircle, Clock, Building2, Heart } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { NeonButton } from "@/components/ui/neon-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const mockBloodBanks = [
  {
    id: 1,
    name: "City Central Blood Bank",
    location: "Downtown Medical Center",
    distance: "2.3 km",
    availability: { "A+": 15, "B+": 8, "O+": 12, "AB+": 5 },
    phone: "+91 9876543210",
  },
  {
    id: 2,
    name: "Red Cross Blood Center",
    location: "Park Street Hospital",
    distance: "4.1 km",
    availability: { "A+": 10, "B+": 20, "O+": 18, "O-": 7 },
    phone: "+91 9876543211",
  },
  {
    id: 3,
    name: "Life Care Blood Bank",
    location: "Medical College Campus",
    distance: "5.8 km",
    availability: { "A-": 3, "B+": 15, "AB+": 8, "O+": 25 },
    phone: "+91 9876543212",
  },
];

export const BloodBank = () => {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [location, setLocation] = useState("");
  const [showRequest, setShowRequest] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bloodGroup: "",
    address: "",
  });

  const handleEmergency = () => {
    alert("Emergency services contacted! Help is on the way.");
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Blood request submitted successfully!");
    setShowRequest(false);
  };

  return (
    <div className="min-h-screen px-4 py-6 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 group"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="w-8 h-8 text-primary animate-pulse" />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
            Blood Bank Services
          </h1>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <NeonButton
            variant="primary"
            size="lg"
            onClick={() => setShowRequest(true)}
            className="gap-2"
          >
            <Droplet className="w-5 h-5" />
            Find Blood Now
          </NeonButton>
        </motion.div>
      </motion.div>

      {/* Search Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="group"
      >
        <GlassCard className="mb-6 p-6 hover:bg-card/50 hover:shadow-neon transition-all duration-300 cursor-default">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform duration-300" />
            <h2 className="text-xl font-semibold text-foreground">Search Blood Banks</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="blood-group">Blood Group</Label>
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger id="blood-group" className="bg-background/50 hover:bg-background/70 transition-colors duration-300">
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  {bloodGroups.map((group) => (
                    <SelectItem key={group} value={group} className="hover:bg-primary/10">
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your location"
                  className="pl-10 bg-background/50"
                />
              </div>
            </div>
          </div>
          <NeonButton variant="secondary" className="mt-4 gap-2">
            <Search className="w-4 h-4" />
            Search
          </NeonButton>
        </GlassCard>
      </motion.div>

      {/* Results */}
      <div className="space-y-4 mb-6">
        {mockBloodBanks.map((bank, index) => (
          <motion.div
            key={bank.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="group"
          >
            <GlassCard variant="neon" className="p-4 hover:scale-[1.02] hover:shadow-neon-glow-intense transition-all duration-300 cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary group-hover:rotate-6 transition-transform duration-300" />
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">{bank.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1 group-hover:text-foreground transition-colors">
                    <MapPin className="w-3 h-3" />
                    {bank.location} • {bank.distance}
                  </p>
                </div>
                <motion.a
                  href={`tel:${bank.phone}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1 text-primary hover:text-primary/80"
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">Call</span>
                </motion.a>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(bank.availability).map(([group, units]) => (
                  <div
                    key={group}
                    className="px-3 py-1 rounded-lg bg-background/50 border border-border/50"
                  >
                    <span className="font-semibold text-foreground">{group}</span>
                    <span className="text-muted-foreground ml-2">{units} units</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Request Form Modal */}
      {showRequest && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowRequest(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <GlassCard className="w-full max-w-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Request Blood</h2>
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background/50"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-background/50"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="request-blood-group">Blood Group</Label>
                  <Select
                    value={formData.bloodGroup}
                    onValueChange={(value) => setFormData({ ...formData, bloodGroup: value })}
                  >
                    <SelectTrigger id="request-blood-group" className="bg-background/50">
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodGroups.map((group) => (
                        <SelectItem key={group} value={group}>
                          {group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="address">Hospital/Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="bg-background/50"
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <NeonButton type="submit" variant="primary" className="flex-1">
                    Submit Request
                  </NeonButton>
                  <NeonButton
                    type="button"
                    variant="secondary"
                    className="flex-1"
                    onClick={() => setShowRequest(false)}
                  >
                    Cancel
                  </NeonButton>
                </div>
              </form>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}

      {/* Emergency Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleEmergency}
        className="fixed bottom-24 right-4 md:right-8 w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-neon-glow-intense animate-pulse-glow flex items-center justify-center"
      >
        <AlertCircle className="w-8 h-8" />
      </motion.button>
    </div>
  );
};