import SectionTitle from "@/components/SectionTitle";

export default function ContactPage() {
  return (
    <>
      <SectionTitle title="Contact Us" />

      <div className="max-w-xl mx-auto bg-white shadow rounded-xl p-8">
        <p className="mb-3">
          📧 support@studentportal.com
        </p>

        <p className="mb-3">
          📞 +92 300 1234567
        </p>

        <p>
          📍 Lahore, Pakistan
        </p>
      </div>
    </>
  );
}