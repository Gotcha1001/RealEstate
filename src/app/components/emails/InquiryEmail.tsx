import { formatPrice } from "@/app/property/[propertyId]/page";

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
  Hr,
  Button,
} from "react-email";

interface InquiryEmailProps {
  senderEmail: string;
  senderName: string;
  senderPhone: string;
  ownerName: string;
  message: string;
  propertyTitle: string;
  propertyPrice: string;
}

const RealEstateInquiryEmail = ({
  senderEmail,
  senderName,
  senderPhone,
  ownerName,
  message,
  propertyPrice,
  propertyTitle,
}: InquiryEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>
          New property inquiry from {senderEmail} - {propertyTitle}
        </Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <section>
            <Text>Dear {ownerName},</Text>
          </section>
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[32px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[24px] font-bold text-gray-900 m-0 mb-[8px]">
                New Property Inquiry
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                You have received a new inquiry from a potential client
              </Text>
            </Section>

            {/* Property Information */}
            <Section className="mb-[32px] p-[20px] bg-gray-50 rounded-[8px]">
              <Heading className="text-[18px] font-semibold text-gray-900 m-0 mb-[16px]">
                Property Details
              </Heading>
              <Text className="text-[16px] font-semibold text-gray-900 m-0 mb-[8px]">
                {propertyTitle}
              </Text>
              <Text className="text-[16px] font-semibold text-blue-600 m-0">
                💰 {formatPrice(propertyPrice)}
              </Text>
            </Section>

            {/* Inquirer Information */}
            <Section className="mb-[32px]">
              <Heading className="text-[18px] font-semibold text-gray-900 m-0 mb-[16px]">
                Contact Information
              </Heading>
              <Text className="text-[14px] text-gray-700 m-0 mb-[8px]">
                <strong>Name:</strong> {senderName}
              </Text>
              <Text className="text-[14px] text-gray-700 m-0 mb-[8px]">
                <strong>Email:</strong>{" "}
                <Link
                  href={`mailto:${senderEmail}`}
                  className="text-blue-600 underline"
                >
                  {senderEmail}
                </Link>
              </Text>
              <Text className="text-[14px] text-gray-700 m-0 mb-[16px]">
                <strong>Phone:</strong>{" "}
                <Link
                  href={`tel:${senderPhone}`}
                  className="text-blue-600 underline"
                >
                  {senderPhone}
                </Link>
              </Text>
            </Section>

            {/* Inquiry Message */}
            <Section className="mb-[32px]">
              <Heading className="text-[18px] font-semibold text-gray-900 m-0 mb-[16px]">
                Message
              </Heading>
              <Text className="text-[14px] text-gray-700 leading-[22px] m-0 p-[16px] bg-gray-50 rounded-[8px] border-l-[4px] border-blue-500">
                {message}
              </Text>
            </Section>

            {/* Action Buttons */}
            <Section className="text-center mb-[32px]">
              <Button
                href={`mailto:${senderEmail}?subject=${encodeURIComponent(`Re: Inquiry about ${propertyTitle}`)}`}
                className="bg-blue-600 text-white px-[24px] py-[12px] rounded-[6px] text-[14px] font-semibold no-underline box-border mr-[12px] mb-[12px]"
              >
                Reply to Inquiry
              </Button>
            </Section>

            <Hr className="border-gray-200 my-[24px]" />

            {/* Footer */}
            <Section className="text-center">
              <Text className="text-[12px] text-gray-500 m-0 mb-[8px]">
                © {new Date().getFullYear()} NextProperties. All rights
                reserved.
              </Text>
              <Text className="text-[12px] text-gray-500 m-0">
                123 Real Estate Avenue, Property City, PC 12345
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default RealEstateInquiryEmail;
