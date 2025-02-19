function calculateAge() {
  // Get input values
  const birthDate = new Date(document.getElementById('birthDate').value);
  const specificDateInput = document.getElementById('specificDate').value;
  const specificDate = specificDateInput ? new Date(specificDateInput) : new Date(); // Use current date if no specific date is provided

  // Check if birth date is valid
  if (!birthDate || isNaN(birthDate)) {
    alert('Please enter a valid birth date.');
    return;
  }

  // Check if birth date is in the future
  if (birthDate > specificDate) {
    alert('Birth date cannot be in the future.');
    return;
  }

  // Calculate age
  let years = specificDate.getFullYear() - birthDate.getFullYear();
  let months = specificDate.getMonth() - birthDate.getMonth();
  let days = specificDate.getDate() - birthDate.getDate();

  // Adjust for negative months or days
  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }
  if (days < 0) {
    const lastMonthDate = new Date(specificDate.getFullYear(), specificDate.getMonth(), 0).getDate();
    days += lastMonthDate;
    months--;
  }

  // Display the result
  const result = `Your age is: ${years} years, ${months} months, and ${days} days.`;
  document.getElementById('result').innerText = result;
}
