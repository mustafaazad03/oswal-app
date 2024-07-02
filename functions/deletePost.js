export const handleDeletePost = async ({ postId }) => {
  if (!postId) {
    console.error('No postId provided for deletion');
    throw new Error('EnquiryId is required');
  }

  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_ENDPOINT}/post/${postId}`;
  console.log(`Attempting to delete post at: ${url}`);

  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `Failed to delete post. Server responded with ${response.status}: ${errorBody}`
      );
      throw new Error(`Failed to delete post: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error in deleting post:', error);
    throw error;
  }
};
