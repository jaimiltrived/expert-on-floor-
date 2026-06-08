import mjml2html from "mjml";

export const otpTemplate = (otp) => {

    const template = `
<mjml>
  <mj-body background-color="#F8FAFC">

    <mj-section background-color="#FFFFFF" padding="30px">

      <mj-column>

        <mj-text
          align="center"
          font-size="32px"
          font-weight="bold"
          color="#111827"
        >
          🟢 ExpertMentor
        </mj-text>

        <mj-spacer height="20px"/>

        <mj-text
          align="center"
          font-size="28px"
          font-weight="bold"
          color="#111827"
        >
          Password Reset
        </mj-text>

        <mj-text
          align="center"
          font-size="16px"
          color="#6B7280"
        >
          Use the OTP below to reset your password.
        </mj-text>

      </mj-column>

    </mj-section>

    <mj-section background-color="#FFFFFF">

      <mj-column>

        <mj-text
          align="center"
          color="#6B7280"
          font-size="15px"
        >
          Your Verification Code
        </mj-text>

        <mj-text
          align="center"
          font-size="42px"
          font-weight="bold"
          color="#16A34A"
          letter-spacing="8px"
        >
          ${otp}
        </mj-text>

        <mj-text
          align="center"
          color="#6B7280"
        >
          This OTP expires in 10 minutes.
        </mj-text>

      </mj-column>

    </mj-section>

    <mj-section background-color="#FFFFFF">

      <mj-column>

        <mj-text
          align="center"
          color="#374151"
        >
          If you did not request this password reset,
          please ignore this email.
        </mj-text>

      </mj-column>

    </mj-section>

    <mj-section>

      <mj-column>

        <mj-divider border-color="#E5E7EB"/>

        <mj-text
          align="center"
          color="#9CA3AF"
          font-size="13px"
        >
          © 2026 ExpertMentor
        </mj-text>

      </mj-column>

    </mj-section>

  </mj-body>
</mjml>`
        ;

    const { html, errors } = mjml2html(template);
    if (errors && errors.length > 0) {
        console.error('MJML conversion errors:', errors);
    }
    // Fallback to the raw template if conversion failed
    return html || template;
};