fetch('Students.xml')
  .then(response => response.text())
  .then(xmlString => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    function updateStudentProfiles() {
      const studentNames = document.querySelectorAll('.studentName');
      const studentAges = document.querySelectorAll('.studentAge');
      const studentGenders = document.querySelectorAll('.studentGender');
      const studentAddresses = document.querySelectorAll('.studentAddress');

      const profileElements = xmlDoc.getElementsByTagName('profile');

      for (let i = 0; i < profileElements.length; i++) {
        const profile = profileElements[i];
        const name = profile.querySelector('name').textContent;
        const age = profile.querySelector('age').textContent;
        const gender = profile.querySelector('gender').textContent;
        const address = profile.querySelector('address').textContent;

        studentNames[i].textContent = name;
        studentAges[i].textContent = age;
        studentGenders[i].textContent = gender;
        studentAddresses[i].textContent = address;
      }
    }

    updateStudentProfiles();
  })
  .catch(error => {
    console.error('Error fetching or parsing XML:', error);
  });