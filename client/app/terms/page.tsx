export default function TermsPage() {
  return (
    <div className="min-h-screen bg-off-white">
      <div className="container py-16 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-soft-black mb-4">Terms of Service</h1>
          <p className="text-slate-gray text-lg">Last updated: January 1, 2024</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-soft-black mb-4">1. Acceptance of Terms</h2>
              <p className="text-slate-gray leading-relaxed">
                By accessing and using SierraStay's services, you accept and agree to be bound by the terms and
                provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-soft-black mb-4">2. Use License</h2>
              <p className="text-slate-gray leading-relaxed mb-4">
                Permission is granted to temporarily download one copy of SierraStay's materials for personal,
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and
                under this license you may not:
              </p>
              <ul className="list-disc pl-6 text-slate-gray space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-soft-black mb-4">3. Booking Terms</h2>
              <p className="text-slate-gray leading-relaxed mb-4">When you make a booking through our platform:</p>
              <ul className="list-disc pl-6 text-slate-gray space-y-2">
                <li>You agree to provide accurate and complete information</li>
                <li>You are responsible for all charges incurred under your account</li>
                <li>Cancellation policies vary by property and are clearly stated during booking</li>
                <li>We act as an intermediary between you and the accommodation provider</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-soft-black mb-4">4. Payment Terms</h2>
              <p className="text-slate-gray leading-relaxed">
                Payment is due at the time of booking unless otherwise specified. We accept major credit cards and other
                payment methods as indicated on our platform. All prices are subject to change without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-soft-black mb-4">5. Limitation of Liability</h2>
              <p className="text-slate-gray leading-relaxed">
                SierraStay shall not be liable for any damages arising from the use or inability to use our services,
                including but not limited to direct, indirect, incidental, punitive, and consequential damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-soft-black mb-4">6. Governing Law</h2>
              <p className="text-slate-gray leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of Sierra Leone,
                and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-soft-black mb-4">7. Contact Information</h2>
              <p className="text-slate-gray leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at legal@sierrastay.sl.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
