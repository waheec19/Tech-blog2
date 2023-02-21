const post_id = document.querySelector('input[name="post-id"]').value.trim();

const editFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();
  const content = document.querySelector('textarea[name="post-body"]').value.trim();

  console.log(title);
  console.log(content);

  const response = await fetch(`/api/post/${post_id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    
  }
  document.location.replace('/dashboard');
};

const deleteClickHandler = async () => {
  await fetch(`/api/post/${post_id}`, {
    method: 'DELETE'
  });

  document.location.replace('/dashboard');
};


document
  .querySelector('#edit-post-form')
  .addEventListener('submit', editFormHandler);
document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteClickHandler);