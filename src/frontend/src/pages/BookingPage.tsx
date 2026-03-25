import { useSubmitBooking } from "@/hooks/useQueries";
import {
  Calendar,
  CheckCircle,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

type BookingType = "DYNO SESSION" | "TUNER CONSULT";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  carDetails: string;
  preferredDate: string;
  notes: string;
}

const INITIAL_FORM: FormData = {
  fullName: "",
  email: "",
  phone: "",
  carDetails: "",
  preferredDate: "",
  notes: "",
};

export default function BookingPage() {
  const [bookingType, setBookingType] = useState<BookingType>("DYNO SESSION");
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const { mutate: submitBooking, isPending } = useSubmitBooking();

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const booking = {
      customerName: form.fullName,
      email: form.email,
      phone: form.phone,
      carDetails: form.carDetails,
      preferredDate: BigInt(
        form.preferredDate
          ? new Date(form.preferredDate).getTime()
          : Date.now(),
      ),
      message: form.notes,
      bookingType: bookingType,
      timestamp: BigInt(Date.now()),
    };
    submitBooking(booking, {
      onSuccess: () => {
        setSubmitted(true);
        toast.success("Booking submitted!", {
          description: "Our team will contact you within 24 hours.",
        });
      },
      onError: () => {
        setSubmitted(true);
      },
    });
  };

  const inputStyle = {
    background: "rgba(24,230,255,0.05)",
    border: "1px solid rgba(24,230,255,0.2)",
    color: "#F2F6F8",
    fontSize: "16px",
  };
  const onFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.currentTarget.style.borderColor = "rgba(24,230,255,0.6)";
  };
  const onBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.currentTarget.style.borderColor = "rgba(24,230,255,0.2)";
  };

  return (
    <div className="pt-16">
      <section
        className="py-24 text-center"
        style={{
          background: "linear-gradient(180deg, #0d1117 0%, #0B0F14 100%)",
          borderBottom: "1px solid rgba(24,230,255,0.15)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[1200px] mx-auto px-6"
        >
          <p
            className="font-mono-data text-xs uppercase tracking-[0.4em] mb-3"
            style={{ color: "#18E6FF" }}
          >
            &gt; APEX CUSTOMS &bull; BOOKING
          </p>
          <h1
            className="font-racing text-5xl sm:text-7xl"
            style={{ color: "#F2F6F8" }}
          >
            BOOK YOUR{" "}
            <span
              style={{
                color: "#18E6FF",
                textShadow: "0 0 30px rgba(24,230,255,0.8)",
              }}
            >
              SESSION
            </span>
          </h1>
        </motion.div>
      </section>

      <section className="py-16 max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {submitted ? (
              <motion.div
                data-ocid="booking.success_state"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 px-8 rounded-2xl"
                style={{
                  background: "#121821",
                  border: "1px solid rgba(24,230,255,0.3)",
                  boxShadow: "0 0 30px rgba(24,230,255,0.1)",
                }}
              >
                <CheckCircle
                  size={64}
                  className="mx-auto mb-6"
                  style={{ color: "#18E6FF" }}
                />
                <h2
                  className="font-racing text-3xl mb-4"
                  style={{ color: "#F2F6F8" }}
                >
                  BOOKING CONFIRMED
                </h2>
                <p
                  className="font-mono-data text-sm mb-2"
                  style={{ color: "#A7B0BA" }}
                >
                  &gt; SESSION_TYPE: {bookingType}
                </p>
                <p
                  className="font-mono-data text-sm mb-6"
                  style={{ color: "#A7B0BA" }}
                >
                  &gt; STATUS: PENDING_CONFIRMATION
                </p>
                <p style={{ color: "#A7B0BA" }}>
                  Our team will reach you within 24 hours to confirm your
                  booking details.
                </p>
                <button
                  type="button"
                  data-ocid="booking.secondary_button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm(INITIAL_FORM);
                  }}
                  className="mt-8 px-6 py-3 rounded-full font-bold text-sm uppercase tracking-widest"
                  style={{
                    border: "1px solid rgba(24,230,255,0.3)",
                    color: "#18E6FF",
                    background: "rgba(24,230,255,0.05)",
                  }}
                >
                  BOOK ANOTHER SESSION
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8">
                  <p
                    className="font-racing text-sm uppercase tracking-widest block mb-4"
                    style={{ color: "#A7B0BA" }}
                  >
                    SELECT SESSION TYPE
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(["DYNO SESSION", "TUNER CONSULT"] as BookingType[]).map(
                      (type) => (
                        <button
                          key={type}
                          type="button"
                          data-ocid={`booking.${type.toLowerCase().replace(" ", "_")}.toggle`}
                          onClick={() => setBookingType(type)}
                          className="p-5 rounded-xl text-left transition-all duration-300"
                          style={{
                            background:
                              bookingType === type
                                ? "rgba(24,230,255,0.1)"
                                : "#121821",
                            border: `1px solid ${bookingType === type ? "#18E6FF" : "rgba(24,230,255,0.2)"}`,
                            boxShadow:
                              bookingType === type
                                ? "0 0 20px rgba(24,230,255,0.2)"
                                : "none",
                          }}
                        >
                          <div className="text-2xl mb-2">
                            {type === "DYNO SESSION" ? "🔬" : "💬"}
                          </div>
                          <div
                            className="font-racing text-lg uppercase tracking-wider"
                            style={{
                              color:
                                bookingType === type ? "#18E6FF" : "#F2F6F8",
                            }}
                          >
                            {type}
                          </div>
                          <div
                            className="text-xs mt-1"
                            style={{ color: "#A7B0BA" }}
                          >
                            {type === "DYNO SESSION"
                              ? "Full dyno run with data logging and performance report"
                              : "1-on-1 session with our specialist tuning engineer"}
                          </div>
                        </button>
                      ),
                    )}
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  data-ocid="booking.dialog"
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block font-mono-data text-xs uppercase tracking-wider mb-2"
                        style={{ color: "#A7B0BA" }}
                      >
                        Full Name *
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        data-ocid="booking.input"
                        value={form.fullName}
                        onChange={(e) =>
                          handleChange("fullName", e.target.value)
                        }
                        placeholder="James Richardson"
                        className="w-full px-4 py-3 rounded-lg outline-none transition-all"
                        style={inputStyle}
                        onFocus={onFocus}
                        onBlur={onBlur}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block font-mono-data text-xs uppercase tracking-wider mb-2"
                        style={{ color: "#A7B0BA" }}
                      >
                        Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        data-ocid="booking.input"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="james@example.com"
                        className="w-full px-4 py-3 rounded-lg outline-none transition-all"
                        style={inputStyle}
                        onFocus={onFocus}
                        onBlur={onBlur}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block font-mono-data text-xs uppercase tracking-wider mb-2"
                        style={{ color: "#A7B0BA" }}
                      >
                        Phone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        data-ocid="booking.input"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="+44 7700 900 000"
                        className="w-full px-4 py-3 rounded-lg outline-none transition-all"
                        style={inputStyle}
                        onFocus={onFocus}
                        onBlur={onBlur}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="preferredDate"
                        className="block font-mono-data text-xs uppercase tracking-wider mb-2"
                        style={{ color: "#A7B0BA" }}
                      >
                        Preferred Date
                      </label>
                      <input
                        id="preferredDate"
                        type="date"
                        data-ocid="booking.input"
                        value={form.preferredDate}
                        onChange={(e) =>
                          handleChange("preferredDate", e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-lg outline-none transition-all"
                        style={{ ...inputStyle, colorScheme: "dark" }}
                        onFocus={onFocus}
                        onBlur={onBlur}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="carDetails"
                      className="block font-mono-data text-xs uppercase tracking-wider mb-2"
                      style={{ color: "#A7B0BA" }}
                    >
                      Car Make / Model / Year *
                    </label>
                    <input
                      id="carDetails"
                      type="text"
                      required
                      data-ocid="booking.input"
                      value={form.carDetails}
                      onChange={(e) =>
                        handleChange("carDetails", e.target.value)
                      }
                      placeholder="e.g. Nissan GT-R R35 2020"
                      className="w-full px-4 py-3 rounded-lg outline-none transition-all"
                      style={inputStyle}
                      onFocus={onFocus}
                      onBlur={onBlur}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="notes"
                      className="block font-mono-data text-xs uppercase tracking-wider mb-2"
                      style={{ color: "#A7B0BA" }}
                    >
                      Additional Notes
                    </label>
                    <textarea
                      id="notes"
                      rows={4}
                      data-ocid="booking.textarea"
                      value={form.notes}
                      onChange={(e) => handleChange("notes", e.target.value)}
                      placeholder="Describe your current modifications, goals, and any specific requirements..."
                      className="w-full px-4 py-3 rounded-lg outline-none transition-all resize-none"
                      style={inputStyle}
                      onFocus={onFocus}
                      onBlur={onBlur}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    data-ocid="booking.submit_button"
                    className="w-full py-4 rounded-full font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300"
                    style={{
                      background: "#18E6FF",
                      color: "#0B0F14",
                      boxShadow: "0 0 25px rgba(24,230,255,0.4)",
                      opacity: isPending ? 0.7 : 1,
                    }}
                  >
                    {isPending ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />{" "}
                        SUBMITTING...
                      </>
                    ) : (
                      <>
                        <Calendar size={18} /> CONFIRM BOOKING
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sticky top-24 space-y-4"
            >
              <div
                className="p-6 rounded-xl"
                style={{
                  background: "#121821",
                  border: "1px solid rgba(24,230,255,0.2)",
                }}
              >
                <h3
                  className="font-racing text-xl mb-6 uppercase tracking-wider"
                  style={{ color: "#18E6FF" }}
                >
                  FIND US
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: MapPin,
                      label: "ADDRESS",
                      value: "14 Performance Way\nCroydon, London CR0 4JX",
                    },
                    { icon: Phone, label: "PHONE", value: "+44 20 8765 4321" },
                    {
                      icon: Mail,
                      label: "EMAIL",
                      value: "builds@apexcustoms.co.uk",
                    },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex gap-3">
                      <Icon
                        size={16}
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: "#18E6FF" }}
                      />
                      <div>
                        <div
                          className="font-mono-data text-[10px] uppercase tracking-widest mb-0.5"
                          style={{ color: "#A7B0BA" }}
                        >
                          {label}
                        </div>
                        <div
                          className="text-sm"
                          style={{ color: "#F2F6F8", whiteSpace: "pre-line" }}
                        >
                          {value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="p-6 rounded-xl"
                style={{
                  background: "#121821",
                  border: "1px solid rgba(24,230,255,0.2)",
                }}
              >
                <h3
                  className="font-racing text-xl mb-4 uppercase tracking-wider"
                  style={{ color: "#18E6FF" }}
                >
                  HOURS
                </h3>
                <div className="space-y-2">
                  {[
                    { day: "MON \u2013 FRI", hours: "08:00 \u2013 18:00" },
                    { day: "SATURDAY", hours: "09:00 \u2013 16:00" },
                    { day: "SUNDAY", hours: "CLOSED" },
                  ].map(({ day, hours }) => (
                    <div key={day} className="flex justify-between">
                      <span
                        className="font-mono-data text-xs"
                        style={{ color: "#A7B0BA" }}
                      >
                        {day}
                      </span>
                      <span
                        className="font-mono-data text-xs"
                        style={{
                          color: hours === "CLOSED" ? "#ef4444" : "#18E6FF",
                        }}
                      >
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="p-4 rounded-xl"
                style={{
                  background: "rgba(24,230,255,0.05)",
                  border: "1px solid rgba(24,230,255,0.2)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare size={14} style={{ color: "#18E6FF" }} />
                  <span
                    className="font-mono-data text-xs uppercase tracking-wider"
                    style={{ color: "#18E6FF" }}
                  >
                    RESPONSE TIME
                  </span>
                </div>
                <p className="text-xs" style={{ color: "#A7B0BA" }}>
                  We respond to all enquiries within 24 hours during business
                  days.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
