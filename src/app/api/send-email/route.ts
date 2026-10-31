// import RealEstateInquiryEmail from "@/app/components/emails/InquiryEmail";
// import { resend } from "@/lib/resend";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     const {
//       ownerEmail,
//       ownerName,
//       propertyTitle,
//       propertyPrice,
//       senderEmail,
//       senderName,
//       message,
//       senderPhone,
//     } = body;

//     // Send the email
//     resend.emails.send({
//       from: process.env.EMAIL_FROM!,
//       subject: `Property Inquiry from ${senderName}`,
//       react: RealEstateInquiryEmail({
//         senderEmail,
//         senderName,
//         senderPhone,
//         ownerName,
//         propertyPrice,
//         propertyTitle,
//         message,
//       }),
//       to: "wesleyolivier443@gmail.com",
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       {
//         error: "Failed to send email",
//       },
//       { status: 500 },
//     );
//   }
// }
import RealEstateInquiryEmail from "@/app/components/emails/InquiryEmail";
import { resend } from "@/lib/resend";
import { NextRequest, NextResponse } from "next/server";

const isValidEmail = (value: unknown): value is string =>
  typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("[send-email] Incoming body:", body);

    const {
      ownerEmail,
      ownerName,
      propertyTitle,
      propertyPrice,
      senderEmail,
      senderName,
      message,
      senderPhone,
    } = body;

    // Validate required fields
    if (!isValidEmail(ownerEmail)) {
      console.error("[send-email] Missing or invalid ownerEmail:", ownerEmail);
      return NextResponse.json(
        { error: "Recipient (ownerEmail) is missing or invalid" },
        { status: 400 },
      );
    }

    if (!isValidEmail(senderEmail)) {
      console.error(
        "[send-email] Missing or invalid senderEmail:",
        senderEmail,
      );
      return NextResponse.json(
        { error: "Your email is missing or invalid" },
        { status: 400 },
      );
    }

    if (!senderName || !message) {
      console.error("[send-email] Missing senderName or message");
      return NextResponse.json(
        { error: "Name and message are required" },
        { status: 400 },
      );
    }

    console.log("[send-email] Sending", {
      from: process.env.EMAIL_FROM,
      to: ownerEmail,
      replyTo: senderEmail,
    });

    // Send the email
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: ownerEmail.trim(),
      replyTo: senderEmail.trim(),
      subject: `Property Inquiry from ${senderName}`,
      react: RealEstateInquiryEmail({
        senderEmail,
        senderName,
        senderPhone,
        ownerName,
        propertyPrice,
        propertyTitle,
        message,
      }),
    });

    if (error) {
      console.error("[send-email] Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("[send-email] Sent successfully. Resend id:", data?.id);
    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("[send-email] Unexpected error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
