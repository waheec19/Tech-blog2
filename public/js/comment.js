const post_id = document.querySelector('input[name="post-id"]').value.trim();

const commentFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector('textarea[name="comment-body"]').value.trim();

  if(content) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('#new-comment-form')
  .addEventListener('submit', commentFormHandler);