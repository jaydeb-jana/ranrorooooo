/**
 * Generates natural, authentic review drafts based strictly on customer selections.
 * Does NOT invent services or facts not confirmed by the customer.
 */

export function generateReviewDrafts({
  businessName = 'this business',
  selectedServices = [],
  sentiment = 'exceptional',
  answers = {},
}) {
  const serviceNames = selectedServices.map((s) => (typeof s === 'string' ? s : s.name));
  const staffMember = answers.staffMember?.trim();
  const highlight = answers.highlight?.trim();
  const additionalNotes = answers.additionalNotes?.trim();

  // Helper to format service list naturally into a sentence
  function formatList(items) {
    if (!items || items.length === 0) return '';
    if (items.length === 1) return items[0];
    if (items.length === 2) return `${items[0]} and ${items[1]}`;
    return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
  }

  const servicesPhrase = serviceNames.length > 0 ? formatList(serviceNames) : 'their service';

  // Tone variations based on sentiment
  if (sentiment === 'critical' || sentiment === 'needs_improvement') {
    return [
      {
        id: 'constructive_direct',
        title: 'Direct & Constructive Feedback',
        description: 'Clear summary of what was received and areas that could be improved.',
        text: `I recently visited ${businessName} regarding ${servicesPhrase}.${
          highlight ? ` Specifically, ${highlight}.` : ''
        }${additionalNotes ? ` ${additionalNotes}.` : ''} While there were some aspects handled, my overall experience did not fully meet expectations. I hope this honest feedback helps the team make improvements.`,
      },
      {
        id: 'constructive_balanced',
        title: 'Balanced Overview',
        description: 'Mentions the services received while respectfully outlining room for improvement.',
        text: `Sharing my recent experience with ${businessName} for ${servicesPhrase}. ${
          staffMember ? `I dealt with ${staffMember}. ` : ''
        }${highlight ? `The main observation was: ${highlight}. ` : ''}There is clear room for improvement here, and I hope management addresses these points for future clients.`,
      },
    ];
  }

  if (sentiment === 'neutral') {
    return [
      {
        id: 'neutral_standard',
        title: 'Fair & Balanced',
        description: 'Objective overview of the services received.',
        text: `I had an appointment with ${businessName} for ${servicesPhrase}.${
          staffMember ? ` ${staffMember} handled my visit.` : ''
        }${highlight ? ` ${highlight}.` : ''} Overall, the service was satisfactory and covered the basics.${
          additionalNotes ? ` ${additionalNotes}` : ''
        }`,
      },
      {
        id: 'neutral_concise',
        title: 'Short & Direct',
        description: 'Brief, straightforward summary.',
        text: `Visited ${businessName} for ${servicesPhrase}. Service was decent and straightforward.${
          highlight ? ` ${highlight}.` : ''
        }`,
      },
    ];
  }

  // Positive & Exceptional Sentiments (4-5 stars)
  const isTopTier = sentiment === 'exceptional';

  // Option 1: Detailed & Comprehensive
  let detailedText = isTopTier
    ? `I had an outstanding experience with ${businessName}!`
    : `I had a very positive experience with ${businessName}.`;

  if (serviceNames.length > 0) {
    detailedText += ` I specifically used them for ${servicesPhrase}, and the entire process was handled with true professionalism.`;
  }

  if (staffMember) {
    detailedText += ` A special thank you to ${staffMember}, who was attentive, courteous, and made sure every detail was taken care of.`;
  }

  if (highlight) {
    detailedText += ` What really stood out to me was ${highlight.charAt(0).toLowerCase() + highlight.slice(1)}.`;
  }

  if (additionalNotes) {
    detailedText += ` ${additionalNotes}.`;
  }

  detailedText += isTopTier
    ? ` I highly recommend ${businessName} to anyone seeking dependable, top-tier service.`
    : ` Would definitely recommend their team based on my visit.`;

  // Option 2: Concise & Direct
  let conciseText = `Really impressed with ${businessName}.`;
  if (serviceNames.length > 0) {
    conciseText += ` They delivered excellent work on ${servicesPhrase}.`;
  }
  if (staffMember) {
    conciseText += ` Thanks to ${staffMember} for the great support.`;
  }
  if (highlight) {
    conciseText += ` ${highlight}.`;
  }
  conciseText += ` Professional, prompt, and easy to recommend.`;

  // Option 3: Warm & Personal
  let warmText = `Huge thanks to the team at ${businessName}!`;
  if (serviceNames.length > 0) {
    warmText += ` From the moment I reached out regarding ${servicesPhrase}, they were welcoming and thorough.`;
  }
  if (staffMember) {
    warmText += ` ${staffMember} went above and beyond to make the whole experience seamless.`;
  }
  if (highlight) {
    warmText += ` It was especially great that ${highlight.charAt(0).toLowerCase() + highlight.slice(1)}.`;
  }
  warmText += ` It is refreshing to find a business that truly takes pride in customer care!`;

  return [
    {
      id: 'detailed',
      title: 'Detailed & Specific',
      description: 'Comprehensive review highlighting your exact services and positive notes.',
      text: detailedText.trim(),
    },
    {
      id: 'concise',
      title: 'Short & Direct',
      description: 'Clear, 2-3 sentence review that is quick and punchy.',
      text: conciseText.trim(),
    },
    {
      id: 'warm',
      title: 'Warm & Personal',
      description: 'Friendly, appreciative tone focused on customer care.',
      text: warmText.trim(),
    },
  ];
}
