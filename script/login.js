
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('http://localhost:8082/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const data = await response.json();
      
      // Lưu token vào localStorage
      localStorage.setItem('token', data.token);
      
      alert('Login successful!');
      // Có thể chuyển hướng người dùng sau khi đăng nhập thành công
      window.location.href = '../index.html';
  
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed. Please try again.');
    }
  });