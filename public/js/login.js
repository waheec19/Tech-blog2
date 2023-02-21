const loginFormHandler = async (event) => {
    event.preventDefault();
  
   
    const name = document.querySelector('#name-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (name && password) {
    
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
          name,
          password
        }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        
        document.location.replace('/dashboard');
      } else {
        alert('user does not exist!');
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);