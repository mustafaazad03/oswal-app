export const handleDeleteEnquiry = async ({ enquiryId }) => {
  if (!enquiryId) {
    console.error('No enquiryId provided for deletion');
    throw new Error('EnquiryId is required');
  }

  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_ENDPOINT}/enquiry/${enquiryId}`;
  console.log(`Attempting to delete enquiry at: ${url}`);

  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `Failed to delete enquiry. Server responded with ${response.status}: ${errorBody}`
      );
      throw new Error(`Failed to delete enquiry: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error in handleDeleteEnquiry:', error);
    throw error;
  }
};
