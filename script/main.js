async function checkAuth() {
    const token = localStorage.getItem('token');
    
    if (!token) {
        document.getElementById('user-section').textContent = "Login";
        document.getElementById('user-section').href = "../login.html";
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
        document.getElementById('user-section').href = "#";
  
    } catch (error) {
      console.error('Error:', error);
      // Nếu check auth thất bại, xóa token và hiển thị form login
      localStorage.removeItem('token');
    }
}

document.getElementById('user-section').addEventListener('click', () => {
    const token = localStorage.getItem('token');
  
    if (token) {
      window.location.href = "../personal-page.html";
    }
  });
  
document.addEventListener('DOMContentLoaded', checkAuth);

document.getElementById('search_input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    const query = e.target.value;
    window.location.href = `search.html?q=${query}`;
  }
});