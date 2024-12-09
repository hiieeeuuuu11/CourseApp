document.addEventListener('DOMContentLoaded', function() {
    // Lấy course ID từ URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const lessonId = urlParams.get('id');
    
    if (lessonId) {
        fetchLessonData(lessonId);
    
    } else {
        showError('Không tìm thấy thông tin');
    }
});

async function fetchLessonData(lessonId) {
    try {
        const response = await fetch(`http://localhost:8081/lesson/`+lessonId);
        const data = await response.json();
        console.log(data);
        // Cập nhật tiêu đề
        document.getElementById('lessonTitle').innerHTML += data.title;

        // Cập nhật video source
        const videoPlayer = document.getElementById('videoPlayer');
        videoPlayer.src = data.videoUrl;
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
    }
}

// Gọi hàm fetch khi trang được tải
document.addEventListener('DOMContentLoaded', fetchLessonData);