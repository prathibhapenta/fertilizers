import { useState } from "react";
import {
  Building2,
  Phone,
  Mail,
  Globe,
  MapPin,
  BadgeIndianRupee,
  Bell,
  Palette,
  Languages,
  Save,
} from "lucide-react";
import "./Setting.css";

function Settings() {
  const [settings, setSettings] = useState({
    company: "GreenGrow Fertilizers",
    email: "admin@greengrow.com",
    phone: "+91 9876543210",
    website: "www.greengrow.com",
    address: "Hyderabad, Telangana",
    gst: "36ABCDE1234F1Z5",
    currency: "INR (₹)",
    language: "English",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Settings Saved Successfully!");
  };

  return (
    <div className="settings-page">

      <div className="settings-card">

        <h1>Settings</h1>
        <p>Manage your company preferences.</p>

        <form onSubmit={handleSubmit}>

          <div className="settings-grid">

            <div className="setting-box">
              <label>
                <Building2 size={18} />
                Company Name
              </label>

              <input
                type="text"
                name="company"
                value={settings.company}
                onChange={handleChange}
              />
            </div>

            <div className="setting-box">
              <label>
                <Mail size={18} />
                Email
              </label>

              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
              />
            </div>

            <div className="setting-box">
              <label>
                <Phone size={18} />
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
              />
            </div>

            <div className="setting-box">
              <label>
                <Globe size={18} />
                Website
              </label>

              <input
                type="text"
                name="website"
                value={settings.website}
                onChange={handleChange}
              />
            </div>

            <div className="setting-box full">
              <label>
                <MapPin size={18} />
                Address
              </label>

              <textarea
                rows="3"
                name="address"
                value={settings.address}
                onChange={handleChange}
              />
            </div>

            <div className="setting-box">
              <label>
                <BadgeIndianRupee size={18} />
                GST Number
              </label>

              <input
                type="text"
                name="gst"
                value={settings.gst}
                onChange={handleChange}
              />
            </div>

            <div className="setting-box">
              <label>
                <BadgeIndianRupee size={18} />
                Currency
              </label>

              <select
                name="currency"
                value={settings.currency}
                onChange={handleChange}
              >
                <option>INR (₹)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
              </select>
            </div>

            <div className="setting-box">
              <label>
                <Languages size={18} />
                Language
              </label>

              <select
                name="language"
                value={settings.language}
                onChange={handleChange}
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Telugu</option>
              </select>
            </div>

            

          </div>


          <button type="submit" className="save-settings-btn">
            <Save size={18} />
            Save Settings
          </button>

        </form>

      </div>

    </div>
  );
}

export default Settings;