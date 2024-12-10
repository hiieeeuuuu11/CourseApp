document.addEventListener("DOMContentLoaded", function () {
  fetchCourses();
});

async function fetchCourses() {
  try {
    const response = await fetch("http://localhost:8081/course");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const courses = await response.json();
    displayCourses(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    document.getElementById("courseList").innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-danger" role="alert">
                    Có lỗi xảy ra khi tải danh sách khóa học. Vui lòng thử lại sau!
                </div>
            </div>`;
  }
}

function displayCourses(courses) {

  const courseList = document.getElementById("popular_course");

  if (courses.length === 0) {
    courseList.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-info" role="alert">
                    Hiện chưa có khóa học nào!
                </div>
            </div>`;
    return;
  }

  courses.forEach((courseData) => {
    const course = courseData.course;
    const chapters = courseData.chapterList;
    const provider = courseData.provider;
    const courseCard = `
        <div class="single_course col-lg-4">
                <div class="course_head">
                  <img class="img-fluid" src="./img/courses/c1.jpg" alt="" />
                </div>
                <div class="course_content">
                  <span class="price">${course.price.toLocaleString('vi-VN')} VNĐ</span>
                  <span class="tag mb-4 d-inline-block">${course.topic.name}</span>
                  <h4 class="mb-3">
                    <a href="course-details.html?id=${course.id}">${course.title}</a>
                  </h4>
                  <p>
                  ${course.description}
                  </p>
                  <div
                    class="course_meta d-flex justify-content-lg-between align-items-lg-center flex-lg-row flex-column mt-4"
                  >
                    <div class="authr_meta">
                      <img src="img/courses/author1.png" alt="" />
                      <span class="d-inline-block ml-2">${provider.name}</span>
                    </div>
                    <div class="mt-lg-0 mt-3">
                      <span class="meta_info mr-4">
                        <a href="#"> <i class="ti-user mr-2"></i>25 </a>
                      </span>
                      <span class="meta_info"
                        ><a href="#"> <i class="ti-heart mr-2"></i>35 </a></span
                      >
                    </div>
                  </div>
                </div>
              </div>    
        `;
    courseList.innerHTML += courseCard;
  });
}
