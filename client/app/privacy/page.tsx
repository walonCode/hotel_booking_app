export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-off-white">
      <div className="container py-16 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-soft-black mb-4">Privacy Policy</h1>
          <p className="text-slate-gray text-lg">Last updated: January 1, 2024</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-soft-black mb-4">1. Information We Collect</h2>
              <p className="text-slate-gray leading-relaxed mb-4">
                We collect information you provide directly to us, such as when you create an account, make a booking,
                or contact us for support. This may include:
              </p>
              <ul className="list-disc pl-6 text-slate-gray space-y-2">
                <li>Personal information (name, email address, phone number)</li>
                <li>Payment information (credit card details, billing address)</li>
                <li>Travel preferences and booking history</li>
                <li>Communication records with our support team</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-soft-black mb-4">2. How We Use Your Information</h2>
              <p className="text-slate-gray leading-relaxed mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-slate-gray space-y-2">
                <li>Process and manage your bookings</li>
                <li>Provide customer support and respond to your inquiries</li>
                <li>Send booking confirmations and travel-related communications</li>
                <li>Improve our services and develop new features</li>
                <li>Comply with legal obligations and protect against fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-soft-black mb-4">3. Information Sharing</h2>
              <p className="text-slate-gray leading-relaxed mb-4">We may share your information with:</p>
              <ul className="list-disc pl-6 text-slate-gray space-y-2">
                <li>Hotels and accommodation providers to process your bookings</li>
                <li>Payment processors to handle transactions securely</li>
                <li>Service providers who assist us in operating our platform</li>
                <li>Law enforcement or regulatory authorities when required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-soft-black mb-4">4. Data Security</h2>
              <p className="text-slate-gray leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
                over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-soft-black mb-4">5. Your Rights</h2>
              <p className="text-slate-gray leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-slate-gray space-y-2">
                <li>Access and update your personal information</li>
                <li>Request deletion of your account and data</li>
                <li>Opt out of marketing communications</li>
                <li>Request a copy of your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-soft-black mb-4">6. Contact Us</h2>
              <p className="text-slate-gray leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at privacy@sierrastay.sl or
                through our contact form.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
