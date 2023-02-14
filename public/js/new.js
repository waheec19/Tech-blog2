const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value.trim();
    const content = document.querySelector('textarea[name="post-body"]').value.trim();
  
    if (title && content) {
      const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({
          title,
          content
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    } else {
      alert('Empty fields not allowed!!');
    }
  };
  
  document
    .querySelector('#new-post-form')
    .addEventListener('submit', newFormHandler);