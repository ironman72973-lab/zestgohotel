import { BrowserRouter, Routes, Route } from "react-router-dom";

// Authentication
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Dashboard
import Dashboard from "./pages/dashboard/Dashboard";

// New Booking
import NewBooking from "./pages/bookings/NewBooking";

// Airport
import Airport from "./pages/airport/Airport";
import AirportPickup from "./pages/airport/AirportPickup";
import AirportDrop from "./pages/airport/AirportDrop";
import AirportBookings from "./pages/airport/AirportBookings";

// Railway
import RailwayPickup from "./pages/railway/RailwayPickup";
import RailwayDrop from "./pages/railway/RailwayDrop";
import RailwayBookings from "./pages/railway/RailwayBookings";

// Rental
import HourlyRental from "./pages/rental/HourlyRental";
import HalfDayRental from "./pages/rental/HalfDayRental";
import FullDayRental from "./pages/rental/FullDayRental";
import RentalBookings from "./pages/rental/RentalBookings";

// Sightseeing
import LocalSightseeing from "./pages/sightseeing/LocalSightseeing";
import SightseeingBookings from "./pages/sightseeing/SightseeingBookings";

// Outstation
import OneWay from "./pages/outstation/OneWay";
import RoundTrip from "./pages/outstation/RoundTrip";
import MultiDayTour from "./pages/outstation/MultiDayTour";
import OutstationBookings from "./pages/outstation/OutstationBookings";

// Transport
import Transport from "./pages/transport/Transport";

// Events
import EventTransport from "./pages/events/EventTransport";
import WeddingTransport from "./pages/events/WeddingTransport";
import CorporateTransport from "./pages/events/CorporateTransport";
import ConferenceTransport from "./pages/events/ConferenceTransport";
import ExhibitionTransport from "./pages/events/ExhibitionTransport";
import VIPGuestTransport from "./pages/events/VIPGuestTransport";
import EventShuttle from "./pages/events/EventShuttle";
import CustomEvent from "./pages/events/CustomEvent";

// Booking Management
import BookingHistory from "./pages/bookings/BookingHistory";
import BookingDetails from "./pages/bookings/BookingDetails";
import Invoice from "./pages/bookings/Invoice";
import CancelBooking from "./pages/bookings/CancelBooking";

// Wallet
import Wallet from "./pages/wallet/Wallet";
import AddFunds from "./pages/wallet/AddFunds";
import Transactions from "./pages/wallet/Transactions";
import CommissionHistory from "./pages/wallet/CommissionHistory";

// Reports
import DailyReport from "./pages/reports/DailyReport";
import MonthlyReport from "./pages/reports/MonthlyReport";
import BookingReport from "./pages/reports/BookingReport";
import RevenueReport from "./pages/reports/RevenueReport";

// Notifications
import Notifications from "./pages/notifications/Notifications";

// Support
import Support from "./pages/support/Support";
import RaiseTicket from "./pages/support/RaiseTicket";
import TicketHistory from "./pages/support/TicketHistory";

// Profile
import HotelProfile from "./pages/profile/HotelProfile";
import BankDetails from "./pages/profile/BankDetails";
import GSTDetails from "./pages/profile/GSTDetails";
import ChangePassword from "./pages/profile/ChangePassword";

// Settings
import Settings from "./pages/settings/Settings";
import Preferences from "./pages/settings/Preferences";
import NotificationSettings from "./pages/settings/NotificationSettings";

function RoutePage() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Authentication */}
                <Route path="/" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* Dashboard */}
                <Route path="/dashboard" element={<Dashboard />} />

                {/* New Booking */}
                <Route path="/new-booking" element={<NewBooking />} />

                {/* Airport */}
                <Route path="/airport/pickup" element={<AirportPickup />} />
                <Route path="/airport/drop" element={<AirportDrop />} />
                <Route path="/airport/bookings" element={<AirportBookings />} />
                <Route path="/airport" element={<Airport />} />
                {/* Railway */}
                <Route path="/railway/pickup" element={<RailwayPickup />} />
                <Route path="/railway/drop" element={<RailwayDrop />} />
                <Route path="/railway/bookings" element={<RailwayBookings />} />

                {/* Rental */}
                <Route path="/rental/hourly" element={<HourlyRental />} />
                <Route path="/rental/half-day" element={<HalfDayRental />} />
                <Route path="/rental/full-day" element={<FullDayRental />} />
                <Route path="/rental/bookings" element={<RentalBookings />} />

                {/* Sightseeing */}
                <Route path="/sightseeing/local" element={<LocalSightseeing />} />
                <Route path="/sightseeing/bookings" element={<SightseeingBookings />} />

                {/* Outstation */}
                <Route path="/outstation/one-way" element={<OneWay />} />
                <Route path="/outstation/round-trip" element={<RoundTrip />} />
                <Route path="/outstation/multi-day" element={<MultiDayTour />} />
                <Route path="/outstation/bookings" element={<OutstationBookings />} />

                {/* Transport */}
                <Route path="/transport" element={<Transport />} />

                {/* Events */}
                <Route path="/events/transport" element={<EventTransport />} />
                <Route path="/events/wedding" element={<WeddingTransport />} />
                <Route path="/events/corporate" element={<CorporateTransport />} />
                <Route path="/events/conference" element={<ConferenceTransport />} />
                <Route path="/events/exhibition" element={<ExhibitionTransport />} />
                <Route path="/events/vip" element={<VIPGuestTransport />} />
                <Route path="/events/shuttle" element={<EventShuttle />} />
                <Route path="/events/custom" element={<CustomEvent />} />

                {/* Booking Management */}
                <Route path="/bookings" element={<BookingHistory />} />
                <Route path="/bookings/:id" element={<BookingDetails />} />
                <Route path="/bookings/:id/invoice" element={<Invoice />} />
                <Route path="/bookings/:id/cancel" element={<CancelBooking />} />

                {/* Wallet */}
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/wallet/add-funds" element={<AddFunds />} />
                <Route path="/wallet/transactions" element={<Transactions />} />
                <Route path="/wallet/commission-history" element={<CommissionHistory />} />

                {/* Reports */}
                <Route path="/reports/daily" element={<DailyReport />} />
                <Route path="/reports/monthly" element={<MonthlyReport />} />
                <Route path="/reports/bookings" element={<BookingReport />} />
                <Route path="/reports/revenue" element={<RevenueReport />} />

                {/* Notifications */}
                <Route path="/notifications" element={<Notifications />} />

                {/* Support */}
                <Route path="/support" element={<Support />} />
                <Route path="/support/raise-ticket" element={<RaiseTicket />} />
                <Route path="/support/ticket-history" element={<TicketHistory />} />

                {/* Profile */}
                <Route path="/profile" element={<HotelProfile />} />
                <Route path="/profile/bank-details" element={<BankDetails />} />
                <Route path="/profile/gst-details" element={<GSTDetails />} />
                <Route path="/profile/change-password" element={<ChangePassword />} />

                {/* Settings */}
                <Route path="/settings" element={<Settings />} />
                <Route path="/settings/preferences" element={<Preferences />} />
                <Route path="/settings/notifications" element={<NotificationSettings />} />

            </Routes>
        </BrowserRouter>
    );
}

export default RoutePage;