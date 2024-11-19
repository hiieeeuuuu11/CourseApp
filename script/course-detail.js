document.addEventListener('DOMContentLoaded', function() {
    // Lấy course ID từ URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    
    if (courseId) {
        fetchCourseDetail(courseId);
        console.log(courseId)
    } else {
        showError('Không tìm thấy thông tin khóa học');
    }
});

async function fetchCourseDetail(courseId) {
    try {
        const response = await fetch(`http://localhost:8081/course/${courseId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayCourseDetail(data);
    } catch (error) {
        console.error('Error:', error);
        showError('Có lỗi xảy ra khi tải thông tin khóa học');
    }
}

function displayCourseDetail(data) {
    const main_image = document.getElementById('main_image_id');
    const chapters_id = document.getElementById('chapter_list');
    const course_info = document.getElementById('course_info');
    const description_id = document.getElementById('description');
    const enrollCourseLink = document.getElementById("enrollCourseLink");
    const course = data.course;
    const chapters = data.chapterList;

    fetch(`http://localhost:8081/course/checkEnrollment?studentId=1&courseId=${course.id}`)
        .then(response => response.json())
        .then(data => {
            if (data === true) {
                enrollCourseLink.style.display = 'none';  
            }
        })
        .catch(error => {
            console.error("Error checking enrollment:", error);
        });

    console.log(data)
    main_image.innerHTML = `<img class="img-fluid" src="${course.imageUrl}" alt="">`;
    chapters.forEach(chapter => {
        chapters_id.innerHTML+=`<li class="justify-content-between d-flex">
                                    <p>${chapter.title}</p>
                                    <p>${chapter.description}</p>
                                    <a class="primary-btn text-uppercase" href="./chapter-detail.html?id=${chapter.id}">LEARN</a>
                                </li>`
    });
    course_info.innerHTML+=`                        <li>
                            <a class="justify-content-between d-flex" href="#">
                                <p>Course’s Name</p>
                                <span class="or" id="course_name">${course.title}</span>
                            </a>
                        </li>
                        <li>
                            <a class="justify-content-between d-flex" href="#">
                                <p>Course Fee </p>
                                <span>${course.price.toLocaleString('vi-VN')} VNĐ</span>
                            </a>
                        </li>`
    description_id.innerHTML+=course.description;
    enrollCourseLink.onclick = async function (event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định

        try {
            // Gọi API booking
            const bookingResponse = await fetch('http://localhost:8081/payment/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                },
                body: JSON.stringify({
                    "userId": 1, // Thay đổi userId nếu cần
                    "courseId": [course.id] // Lấy courseId từ data
                })
            });
            const bookingId = await bookingResponse.json();

            // Gọi API submitOrder
            const submitOrderResponse = await fetch(`http://localhost:8081/payment/submitOrder?id=${bookingId}`, {
                method: 'POST',
                headers: {
                    'accept': '*/*'
                }
            });

            const submitOrderData = await submitOrderResponse.json();
            const paymentUrl = submitOrderData.paymentUrl; // Lấy paymentUrl từ response
            console.log(paymentUrl); 

            // Chuyển hướng người dùng đến trang thanh toán
            window.location.href = paymentUrl; // Mở trang thanh toán trực tiếp
        } catch (error) {
            console.error("Có lỗi xảy ra:", error);
        }
    };
}

function showError(message) {
    document.getElementById('courseDetail').innerHTML = `
        <div class="alert alert-danger" role="alert">
            ${message}
        </div>
    `;
}