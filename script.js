const nameInput = document.getElementById('name');
const jobInput = document.getElementById('job');
const aboutInput = document.getElementById('about');
const skillsInput = document.getElementById('skills');
const experienceInput = document.getElementById('experience');
const educationInput = document.getElementById('education');
const contactInput = document.getElementById('contact');

const previewName = document.getElementById('preview-name');
const previewJob = document.getElementById('preview-job');
const previewAbout = document.getElementById('preview-about');
const previewSkills = document.getElementById('preview-skills');
const previewExperience = document.getElementById('preview-experience');
const previewEducation = document.getElementById('preview-education');
const previewContact = document.getElementById('preview-contact');

const themeSelect = document.getElementById('theme');
const fontSelect = document.getElementById('font');
const profileInput = document.getElementById('profile-pic');
const profileImg = document.getElementById('profile-img');

const resume = document.getElementById('resume');

// Live Update
[nameInput, jobInput, aboutInput, experienceInput, educationInput, contactInput].forEach(input => {
    input.addEventListener('input', () => {
        previewName.textContent = nameInput.value || 'Your Name';
        previewJob.textContent = jobInput.value || 'Job Title';
        previewAbout.textContent = aboutInput.value || 'About yourself will appear here...';
        previewExperience.textContent = experienceInput.value;
        previewEducation.textContent = educationInput.value;
        previewContact.textContent = contactInput.value;
    });
});

skillsInput.addEventListener('input', () => {
    previewSkills.innerHTML = '';
    skillsInput.value.split(',').forEach(skill => {
        if(skill.trim() !== '') {
            const li = document.createElement('li');
            li.textContent = skill.trim();
            previewSkills.appendChild(li);
        }
    });
});

// Theme & Font Change
themeSelect.addEventListener('change', () => {
    document.body.setAttribute('data-theme', themeSelect.value);
});
fontSelect.addEventListener('change', () => {
    document.body.style.fontFamily = fontSelect.value;
});

// Profile Image Upload
profileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if(file) {
        const reader = new FileReader();
        reader.onload = () => {
            profileImg.src = reader.result;
            profileImg.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

// Download Resume as PDF (Only Resume Section)
document.getElementById('download').addEventListener('click', async () => {
    const canvas = await html2canvas(resume);
    const imgData = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'pt', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('My_Resume.pdf');
});

// Reset Form & Preview
document.getElementById('reset').addEventListener('click', () => {
    document.querySelectorAll('.form-section input, .form-section textarea').forEach(el => el.value = '');
    previewName.textContent = 'Your Name';
    previewJob.textContent = 'Job Title';
    previewAbout.textContent = 'About yourself will appear here...';
    previewSkills.innerHTML = '';
    previewExperience.textContent = '';
    previewEducation.textContent = '';
    previewContact.textContent = '';
    profileImg.style.display = 'none';
})