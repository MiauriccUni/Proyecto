function selectPaymentMethod(method, cardElement) {
    // Remove 'selected' class from all cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('selected');
        // Hide all hidden divs
        card.querySelector('.escondido').style.display = 'none';
    });

    // Add 'selected' class to the clicked card
    cardElement.classList.add('selected');
    // Show the hidden div of the selected card
    cardElement.querySelector('.escondido').style.display = 'block';

}
