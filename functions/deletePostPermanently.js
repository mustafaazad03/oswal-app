export const deletePostPermanently = async (postId) => {
  if (!postId) {
    console.error('No postId provided for restoration');
    throw new Error('EnquiryId is required');
  }
  const form = { isPermanentlyDeleted: true };
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_ENDPOINT}/post/${postId}`;
  console.log(`Attempting to restore post at: ${url}`);

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `Failed to restore post. Server responded with ${response.status}: ${errorBody}`
      );
      throw new Error(`Failed to restore post: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error in restoring post:', error);
    throw error;
  }
};
