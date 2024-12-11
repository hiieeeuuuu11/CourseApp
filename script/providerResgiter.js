const form = document.getElementById('providerForm');

// Gắn sự kiện submit
form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form

    // Lấy dữ liệu từ form
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        description: formData.get('description'),
        website: formData.get('website')
    };

    try {
        // Gọi API bằng fetch
        const response = await fetch('http://localhost:8081/provider-courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            alert('Provider created successfully!');
            console.log(result);
        } else {
            const error = await response.json();
            alert('Failed to create provider: ' + error.message);
            console.error(error);
        }
    } catch (err) {
        console.error('Error:', err);
        alert('An error occurred while creating the provider.');
    }
});