document.addEventListener("DOMContentLoaded", function() {
    // alert("JS Loaded");

    // Initialize EmailJS
    emailjs.init("fcWvYUKRwAn9Qt6HA");

    const form = document.getElementById("job-form");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const fileInput = document.getElementById("slip");
        const file = fileInput.files[0];

        if (!file) {
            alert("Please upload payment slip");
            return;
        }

        // Upload file to Cloudinary
        const cloudData = new FormData();
        cloudData.append("file", file);
        cloudData.append("upload_preset", "Eonith payment slip");

        let fileURL = "";

        try {
            const cloudRes = await fetch(
                "https://api.cloudinary.com/v1_1/diqfsmilg/auto/upload",
                { method: "POST", body: cloudData }
            );
            const cloudResult = await cloudRes.json();
            fileURL = cloudResult.secure_url;
        } catch (err) {
            alert("File upload failed");
            console.error(err);
            return;
        }

        // Collect form data
        const formData = new FormData(this);

        const templateParams = {
            first_name: formData.get("first_name"),
            last_name: formData.get("last_name"),
            age: formData.get("age"),
            dob: formData.get("DOB"),
            email: formData.get("email"),
            gender: formData.get("gender"),
            address: formData.get("address"),
            state: formData.get("state"),
            city: formData.get("city"),
            pin_code: formData.get("code"),
            phone: formData.get("phn"),
            alt_phone: formData.get("alphn"),
            slip_link: fileURL
        };

        // Send email
        emailjs.send("service_0w1t2a6", "template_ayf33xo", templateParams)
            .then(() => {
                window.location.href = "success.html";
            })
            .catch((error) => {
                alert("Email sending failed");
                console.error(error);
            });
    });
});
