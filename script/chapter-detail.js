document.addEventListener('DOMContentLoaded', function() {
    // Lấy course ID từ URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const chapterId = urlParams.get('id');
    
    if (chapterId) {
        fetchChapterDetail(chapterId);
        console.log(chapterId)
    } else {
        showError('Không tìm thấy thông tin chương');
    }
});

async function fetchChapterDetail(chapterId) {
    try {
        const response = await fetch(`http://localhost:8081/chapter/${chapterId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayChapterDetail(data);
    } catch (error) {
        console.error('Error:', error);
        showError('Có lỗi xảy ra khi tải thông tin chương học');
    }
}

function displayChapterDetail(data) {
    const lesson_id = document.getElementById("lesson_list")
    const lesson_list = data.lessonList;
    console.log(lesson_list);
    lesson_list.forEach(lesson => {
        lesson_id.innerHTML+=`<li class="justify-content-between d-flex">
                                    <p>${lesson.title}</p>
                                    <a class="primary-btn text-uppercase" href="./lesson-detail.html?id=${lesson.id}">LEARN</a>
                                </li>`
    });
}