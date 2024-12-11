async function checkAuth() {
    const token = localStorage.getItem('token');
    
    if (!token) {
        document.getElementById('user-section').textContent = "Login";
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8082/api/v1/auth/check_auth', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Authentication failed');
      }
  
      const userData = await response.json();
      
      // Hiển thị tên người dùng
      document.getElementById('user-section').textContent = userData.username;
  
    } catch (error) {
      console.error('Error:', error);
      // Nếu check auth thất bại, xóa token và hiển thị form login
      localStorage.removeItem('token');
    }
}
  
document.addEventListener('DOMContentLoaded', checkAuth);
